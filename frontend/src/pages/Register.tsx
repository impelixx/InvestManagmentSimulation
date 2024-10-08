import React, { useState, useEffect } from 'react'
import {
	TextField,
	Button,
	Container,
	Typography,
	Box,
	Paper,
	Snackbar,
	Alert,
	Tabs,
	Tab,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Register: React.FC = () => {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [openSnackbar, setOpenSnackbar] = useState(false)
	const [snackbarMessage, setSnackbarMessage] = useState('')
	const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
		'success'
	)
	const [isLogin, setIsLogin] = useState(true)

	const navigate = useNavigate()

	const handleRegister = async () => {
		if (!username || !email || !password || !confirmPassword) {
			setSnackbarMessage('Пожалуйста, заполните все поля!')
			setSnackbarSeverity('error')
			setOpenSnackbar(true)
			return
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(email)) {
			setSnackbarMessage('Введите корректный адрес электронной почты!')
			setSnackbarSeverity('error')
			setOpenSnackbar(true)
			return
		}

		if (password !== confirmPassword) {
			setSnackbarMessage('Пароли не совпадают!')
			setSnackbarSeverity('error')
			setOpenSnackbar(true)
			return
		}

		try {
			const response = await fetch('http://localhost:5001/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, email, password }),
			})

			if (!response.ok) {
				throw new Error('Ошибка регистрации')
			}

			setSnackbarMessage('Регистрация прошла успешно!')
			setSnackbarSeverity('success')
			setOpenSnackbar(true)
			navigate('/start')
		} catch (error) {
			setSnackbarMessage('Ошибка регистрации. Повторите попытку!')
			setSnackbarSeverity('error')
			setOpenSnackbar(true)
			console.error('Ошибка при регистрации:', error)
		}
	}

	const handleLogin = async () => {
		if (!email || !password) {
			setSnackbarMessage('Заполните все поля!')
			setSnackbarSeverity('error')
			setOpenSnackbar(true)
			return
		}

		try {
			const response = await fetch('http://localhost:5001/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			})

			const data = await response.json()
			if (response.ok) {
				setSnackbarMessage('Вход выполнен успешно!')
				setSnackbarSeverity('success')
				localStorage.setItem('token', data.token)
				localStorage.setItem('username', data.username)
				navigate('/start')
			} else {
				setSnackbarMessage(data)
				setSnackbarSeverity('error')
			}
		} catch (error) {
			console.error('Ошибка при входе:', error)
			setSnackbarMessage('Ошибка входа. Повторите попытку!')
			setSnackbarSeverity('error')
		}
		setOpenSnackbar(true)
	}

	useEffect(() => {
		if (openSnackbar) {
			const timer = setTimeout(() => {
				setOpenSnackbar(false)
			}, 4000)

			return () => clearTimeout(timer)
		}
	}, [openSnackbar])

	return (
		<Container maxWidth='sm'>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					background: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
					borderRadius: '16px',
					p: 3,
					boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
					mt: 8,
					textAlign: 'center',
				}}
			>
				<Typography
					variant='h3'
					color='white'
					sx={{ fontWeight: 'bold', mb: 2 }}
				>
					Добро пожаловать
				</Typography>
				<Typography variant='h6' color='white'>
					{isLogin ? 'Войдите в свой аккаунт' : 'Создайте новый аккаунт'}
				</Typography>
			</Box>

			<Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: '16px' }}>
				<Tabs
					value={isLogin ? 0 : 1}
					onChange={(e, newValue) => setIsLogin(newValue === 0)}
					centered
					sx={{
						'& .MuiTabs-indicator': {
							backgroundColor: '#00f2fe',
							height: '4px',
						},
					}}
				>
					<Tab label='Вход' sx={{ color: isLogin ? '#4facfe' : 'gray' }} />
					<Tab
						label='Регистрация'
						sx={{ color: !isLogin ? '#4facfe' : 'gray' }}
					/>
				</Tabs>

				{isLogin ? (
					<Box component='form' sx={{ mt: 3 }}>
						<TextField
							fullWidth
							label='Электронная почта'
							type='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
							variant='outlined'
							sx={{ mb: 2 }}
						/>
						<TextField
							fullWidth
							label='Пароль'
							type='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
							variant='outlined'
							sx={{ mb: 2 }}
						/>
						<Button
							fullWidth
							variant='contained'
							sx={{
								py: 2,
								borderRadius: '8px',
								background:
									'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
							}}
							onClick={handleLogin}
						>
							Войти
						</Button>
					</Box>
				) : (
					<Box component='form' sx={{ mt: 3 }}>
						<TextField
							fullWidth
							label='Имя пользователя'
							value={username}
							onChange={e => setUsername(e.target.value)}
							required
							variant='outlined'
							sx={{ mb: 2 }}
						/>
						<TextField
							fullWidth
							label='Электронная почта'
							type='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
							variant='outlined'
							sx={{ mb: 2 }}
						/>
						<TextField
							fullWidth
							label='Пароль'
							type='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
							variant='outlined'
							sx={{ mb: 2 }}
						/>
						<TextField
							fullWidth
							label='Подтвердите пароль'
							type='password'
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
							required
							variant='outlined'
							sx={{ mb: 2 }}
						/>
						<Button
							fullWidth
							variant='contained'
							sx={{
								py: 2,
								borderRadius: '8px',
								background:
									'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
							}}
							onClick={handleRegister}
						>
							Зарегистрироваться
						</Button>
					</Box>
				)}
			</Paper>

			<Snackbar
				open={openSnackbar}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				autoHideDuration={4000}
				onClose={() => setOpenSnackbar(false)}
				sx={{ mb: 2 }}
			>
				<Alert
					onClose={() => setOpenSnackbar(false)}
					severity={snackbarSeverity}
					sx={{ width: '100%', borderRadius: '8px' }}
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</Container>
	)
	}
		
export default Register
