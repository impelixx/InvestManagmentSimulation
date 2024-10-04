import express, { json } from 'express'
import pg from 'pg'
import { hash } from 'bcrypt'
import cors from 'cors'
import { compare } from 'bcrypt'

const app = express()
const PORT = 5001

const pool = new pg.Pool({
	user: 'impelix',
	host: 'localhost',
	database: 'postgres',
	password: '123',
	port: 5432,
})

const createUsersTable = async () => {
	const client = await pool.connect()

	try {
		await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            )
        `)
		console.log('Таблица users успешно создана или уже существует.')
	} catch (err) {
		console.error('Ошибка при создании таблицы users:', err)
	} finally {
		client.release()
	}
}

createUsersTable()
	.then(() => {
		app.use(json())
		app.use(
			cors({
				origin: 'http://localhost:3000',
				methods: ['GET', 'POST'],
			})
		)

		app.post('/api/register', async (req, res) => {
			const { username, email, password } = req.body
			if (!username || !email || !password) {
				return res.status(400).send('Пожалуйста, заполните все поля.')
			}

			try {
				const existingUser = await pool.query(
					'SELECT * FROM users WHERE email = $1',
					[email]
				)
				if (existingUser.rows.length > 0) {
					return res
						.status(400)
						.send('Этот адрес электронной почты уже зарегистрирован.')
				}

				const hashedPassword = await hash(password, 10)

				const result = await pool.query(
					'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
					[username, email, hashedPassword]
				)

				res
					.status(201)
					.json({
						message: 'Пользователь зарегистрирован',
						user: result.rows[0],
					})
				console.log(
					'Пользователь ' + email + ' ' + password + ' ' + username + ' зареган'
				)
			} catch (err) {
				console.error('Ошибка при регистрации пользователя', err)
				res.status(500).send('Ошибка сервера. Попробуйте позже.')
			}
		})

		app.post('/api/login', async (req, res) => {
			const { email, password } = req.body

			if (!email || !password) {
				return res.status(400).send('Пожалуйста, заполните все поля.')
			}

			try {
				const result = await pool.query(
					'SELECT * FROM users WHERE email = $1',
					[email]
				)
				const user = result.rows[0]

				if (!user) {
					return res
						.status(400)
						.send('Пользователь с таким адресом электронной почты не найден.')
				}

				const isMatch = await compare(password, user.password)
				if (!isMatch) {
					return res.status(400).send('Неверный пароль.')
				}

				res.status(200).json({
					message: 'Вход выполнен успешно!',
					user: {
						id: user.id,
						username: user.username,
						email: user.email,
					},
				})
			} catch (err) {
				console.error('Ошибка при входе:', err)
				res.status(500).send('Ошибка сервера. Попробуйте позже.')
			}
		})

		app.listen(PORT, () => {
			console.log(`Сервер запущен на http://localhost:${PORT}`)
		})
	})
	.catch(err =>
		console.error('Ошибка при подключении к серверу PostgreSQL:', err)
	)
