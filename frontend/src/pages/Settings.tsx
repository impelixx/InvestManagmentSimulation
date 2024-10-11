import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios, { Axios } from 'axios'
import '../style.css'

const Settings: React.FC = () => {
	const navigate = useNavigate()

	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [notificationsEnabled, setNotificationsEnabled] = useState(false)

	const handleSave = () => {
		console.log('Настройки сохранены:', {
			username,
			email,
			notificationsEnabled,
		})
		localStorage.setItem('username', username)
		navigate('/Home')
	}
	const CheckButtonPressed = () => {
		console.log('Кнопка нажата')
		axios.get('http://localhost:5252/backend/getWallet').then((response) => {
			console.log(response)
			console.log(response.data)
		}, (error) => {
			console.log(error)
		})
	}

	return (
		<div className='flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100'>
			<h1 className='mb-4 text-2xl font-bold'>Настройки</h1>
			<div className='w-full max-w-md p-6 bg-white rounded shadow-md'>
				<div className='mb-4'>
					<label className='block text-sm font-medium text-gray-700'>
						Имя пользователя
					</label>
					<input
						type='text'
						value={username}
						onChange={e => setUsername(e.target.value)}
						className='block w-full p-2 mt-1 border border-gray-300 rounded'
						placeholder='Введите имя пользователя'
					/>
				</div>
				<div className='mb-4'>
					<label className='block text-sm font-medium text-gray-700'>
						Электронная почта
					</label>
					<input
						type='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						className='block w-full p-2 mt-1 border border-gray-300 rounded'
						placeholder='Введите адрес электронной почты'
					/>
				</div>
				<div className='mb-4'>
					<label className='flex items-center'>
						<input
							type='checkbox'
							checked={notificationsEnabled}
							onChange={() => setNotificationsEnabled(!notificationsEnabled)}
							className='mr-2'
						/>
						Включить уведомления
					</label>
				</div>
				<button
					onClick={handleSave}
					className='w-full py-2 text-white transition duration-200 bg-blue-500 rounded hover:bg-blue-600'
				>
					Сохранить настройки
				</button>
				<button
					onClick={CheckButtonPressed}
					className='w-full py-2 mt-2 text-white transition duration-200 bg-red-500 rounded hover:bg-red-600'
				>
					Проверка запроса
				</button>
			</div>
		</div>
	)
}

export default Settings
