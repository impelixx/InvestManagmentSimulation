import React, { useState } from 'react'
import { Box, Grid, Paper, Typography, Button, IconButton } from '@mui/material'
import { PlayArrow, VideoLabel } from '@mui/icons-material' // Import icons for toggle
import PhaserGame from '../components/PhaserGame'
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
								<Button
									variant='contained'
									color='primary'
									style={{ height: '100%', width: '100%' }}
								>
									Пополнить
								</Button>
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
								src='https://www.youtube.com/embed/3clqk2U3T9Y?si=VRCxd_zwDW3v58PQ&amp;start=120'
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
								allowFullScreen
							></iframe>
						</div>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	)
}

export default Home
