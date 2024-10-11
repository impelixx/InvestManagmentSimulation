import React, { useState } from 'react'
import {
	Box,
	Button,
	TextField,
	Typography,
	Paper,
	Grid,
	Avatar,
	Card,
	CardContent,
} from '@mui/material'
import { deepPurple, teal, blueGrey } from '@mui/material/colors'
import SendIcon from '@mui/icons-material/Send'

interface Message {
	sender: 'user' | 'support'
	text: string
}

const Chat: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>([])
	const [inputMessage, setInputMessage] = useState<string>('')

	const sendMessage = async () => {
		if (inputMessage.trim() === '') return

		setMessages(prev => [...prev, { sender: 'user', text: inputMessage }])
		setInputMessage('')

		try {
			const response = await fetch('http://localhost:8080/api/send-message', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					user_id: 12345,
					message: inputMessage,
					username: 'JohnDoe',
				}),
			})

			if (response.ok) {
				const data = await response.json()
				console.log(data)
				setMessages(prev => [...prev, { sender: 'support', text: data.reply }])
			} else {
				setMessages(prev => [
					...prev,
					{ sender: 'support', text: 'Ошибка отправки сообщения' },
				])
			}
		} catch (error) {
			setMessages(prev => [...prev, { sender: 'support', text: 'Ошибка сети' }])
		}
	}

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputMessage(event.target.value)
	}

	const renderMessage = (msg: Message, index: number) => {
		const isUser = msg.sender === 'user'

		return (
			<Grid
				container
				direction={isUser ? 'row-reverse' : 'row'}
				spacing={2}
				alignItems='flex-start'
				key={index}
				sx={{
					margin: '10px 0',
					opacity: 0,
					animation: 'fadeIn 0.5s ease forwards',
				}}
			>
				<Grid item>
					<Avatar
						sx={{
							bgcolor: isUser ? teal[500] : deepPurple[500],
							boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
						}}
					>
						{isUser ? 'U' : 'S'}
					</Avatar>
				</Grid>
				<Grid item xs>
					<Card
						sx={{
							backgroundColor: isUser ? '#e0f7fa' : '#eeeeee',
							display: 'inline-block',
							width: 'fit-content',
							borderRadius: '15px',
							boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
							transform: 'translateY(5px)',
						}}
					>
						<CardContent>
							<Typography variant='body1'>{msg.text}</Typography>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		)
	}

	return (
		<Box
			display='flex'
			flexDirection='column'
			height='100vh'
			width='100vw'
			justifyContent='space-between'
			sx={{
				background: 'linear-gradient(135deg, #f0f4c3, #f9fbe7)',
				overflow: 'hidden',
				position: 'relative',
			}}
		>
			<Box
				component={Paper}
				elevation={3}
				sx={{
					padding: '15px',
					backgroundColor: '#1976d2',
					color: '#fff',
					boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
					borderRadius: '0 0 15px 15px',
				}}
			>
				<Typography
					variant='h5'
					sx={{ fontWeight: 'bold', letterSpacing: '1px' }}
				>
					Чат с поддержкой
				</Typography>
			</Box>

			{/* Основная часть чата */}
			<Box
				flex={1}
				overflow='auto'
				sx={{
					padding: '15px',
					backgroundColor: '#fff',
					borderRadius: '15px',
					boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
					margin: '10px',
					scrollBehavior: 'smooth',
				}}
			>
				{messages.map((msg, index) => renderMessage(msg, index))}
			</Box>

			{/* Нижняя панель для ввода сообщения */}
			<Box
				sx={{
					backgroundColor: '#f9f9f9',
					padding: '10px',
					borderTop: '1px solid #ddd',
					boxShadow: '0 -4px 12px rgba(0,0,0,0.1)',
				}}
			>
				<Grid container spacing={2}>
					<Grid item xs={10}>
						<TextField
							fullWidth
							variant='outlined'
							placeholder='Введите сообщение...'
							value={inputMessage}
							onChange={handleInputChange}
							onKeyPress={e => e.key === 'Enter' && sendMessage()}
							sx={{
								backgroundColor: '#fff',
								borderRadius: '8px',
								boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
							}}
						/>
					</Grid>
					<Grid item xs={2}>
						<Button
							fullWidth
							variant='contained'
							color='primary'
							endIcon={<SendIcon />}
							onClick={sendMessage}
							sx={{
								height: '100%',
								background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
								boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
								borderRadius: '8px',
							}}
						>
							Отправить
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Box>
	)
}

export default Chat
