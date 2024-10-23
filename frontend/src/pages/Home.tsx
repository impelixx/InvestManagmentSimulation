import React, { useState } from 'react'
import { Box, Grid, Paper, Typography, Button, IconButton, Snackbar } from '@mui/material'
import { PlayArrow, VideoLabel } from '@mui/icons-material'
import AssetPieChart from '../components/PieChart.tsx'
import StockQuotes from '../components/StockQuotes'
import NewsFeed from '../components/NewsFeed'
import { useTheme } from '../components/ThemeProvider'

const Home: React.FC = () => {
	const { isDarkMode } = useTheme()
	const [showGame, setShowGame] = useState(true)

	const assetData = [
		{ name: 'AAPL', value: 50 },
		{ name: 'TSLA', value: 30 },
		{ name: 'AMZN', value: 20 },
	]

	const toggleContent = () => {
		setShowGame(prev => !prev)
	}

	const [snackbarOpen, setSnackbarOpen] = useState(false)
	const [snackbarMessage, setSnackbarMessage] = useState('')

	const showSnackbar = (message: string) => {
		setSnackbarMessage(message)
		setSnackbarOpen(true)
	}

	const handleCloseSnackbar = () => {
		setSnackbarOpen(false)
	}

	const NextStepButton = async () => {
		await fetch('Http://localhost:5252/backend/updatePrices')
			.then(response => response.json())
			.then(data => {
				console.log(data)
			})
			.catch(error => {
				console.error('Error:', error)
			})
		// Store snackbar message in localStorage
		localStorage.setItem('snackbarMessage', 'Цены обновлены')
		// reload page
		window.location.reload()
	}

	React.useEffect(() => {
		const message = localStorage.getItem('snackbarMessage')
		if (message) {
			showSnackbar(message)
			localStorage.removeItem('snackbarMessage')
		}
	}, [])

	return (
		<Box p={3} style={{ height: '100vh', overflow: 'hidden' }}>
			<Grid container spacing={1} style={{ height: '100%' }}>
				<Grid item xs={6} style={{ height: '47%' }}>
					<Paper
						elevation={3}
						style={{
							height: '100%',
							padding: '10px',
							overflow: 'hidden',
							backgroundColor: isDarkMode ? '#424242' : '#ffffff',
							color: isDarkMode ? '#ffffff' : '#000000',
						}}
					>
						<Typography variant='h6' gutterBottom>
							Все активы
						</Typography>
						<Grid container spacing={1} alignItems='center'>
							<Grid item xs={9}>
								<AssetPieChart assetData={assetData} />
							</Grid>
							<Grid item xs={3}>
							</Grid>
						</Grid>
					</Paper>
				</Grid>

				<Grid item xs={6} style={{ height: '47%' }}>
					<Paper
						elevation={3}
						style={{
							height: '100%',
							padding: '10px',
							overflow: 'hidden',
							backgroundColor: isDarkMode ? '#424242' : '#ffffff',
							color: isDarkMode ? '#ffffff' : '#000000',
						}}
					>
						<Typography variant='h6' gutterBottom>
							Цены
						</Typography>
						<StockQuotes />
					</Paper>
				</Grid>

				<Grid item xs={6} style={{ height: '47%' }}>
					<Paper
						elevation={3}
						style={{
							height: '100%',
							padding: '10px',
							overflow: 'hidden',
							backgroundColor: isDarkMode ? '#424242' : '#ffffff',
							color: isDarkMode ? '#ffffff' : '#000000',
						}}
					>
						<Typography variant='h6' gutterBottom>
							Новости
						</Typography>
						<NewsFeed />
					</Paper>
				</Grid>

				<Grid item xs={6} style={{ height: '47%' }}>
					<Paper
						elevation={3}
						style={{
							height: '100%',
							padding: '10px',
							overflow: 'hidden',
							backgroundColor: isDarkMode ? '#424242' : '#ffffff',
							color: isDarkMode ? '#ffffff' : '#000000',
						}}
					>
						<Typography variant='h6' gutterBottom>
							Для СДВГшников
						</Typography>
						<IconButton
							style={{ position: 'absolute', right: '25px', top: '565px' }}
							onClick={toggleContent}
							color='inherit'
						>
							{showGame ? <VideoLabel /> : <PlayArrow />}
						</IconButton>
						<div style={{ width: '100%', height: '400px' }}>
							<iframe
								width='100%'
								height='100%'
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
								allowFullScreen
							></iframe>
							<Snackbar
								open={snackbarOpen}
								autoHideDuration={6000}
								onClose={handleCloseSnackbar}
								message={snackbarMessage}
							/>
						</div>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	)
}

export default Home
