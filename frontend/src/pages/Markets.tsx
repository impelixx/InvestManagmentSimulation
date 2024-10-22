import React, { useEffect, useState } from 'react'
import { useTheme } from '../components/ThemeProvider'
import { Box, Typography, List, ListItem, Button, Grid } from '@mui/material'
import FinancialChart from '../components/chart.tsx'

interface Asset {
	name: string
	price: number
	change: number
	chartData: number[][]
}

const convertJsonToStocks = (data: Record<string, number>): Asset[] => {
	return Object.entries(data).map(([name, price]) => ({
		name,
		price,
		change: 0,
		chartData: [
			[230, 240, 220, 235],
			[240, 250, 230, 245],
			[250, 260, 240, 255],
			[260, 270, 250, 265],
			[270, 280, 260, 275],
			[280, 290, 270, 285],
		],
	}))
}

const SomeComponent = () => {
	const theme = useTheme()
	const [assets, setAssets] = useState<Asset[]>([])
	const [error, setError] = useState<string | null>(null)
	const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)

	const getData = async () => {
		console.log('Getting data')
		try {
			const response = await fetch('http://localhost:5252/assets/getPrices', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})

			if (!response.ok) {
				throw new Error('Network response was not ok')
			}

			const data = await response.json()
			console.log('Fetched data:', data)

			// Convert JSON data to Asset array
			const datastocks: Asset[] = convertJsonToStocks(data)
			console.log('Stock data:', datastocks)
			setAssets(datastocks)
		} catch (error) {
			console.error('Error:', error)
			if (error instanceof Error) {
				setError(error.message)
			} else {
				setError('An unknown error occurred')
			}
		}
	}

	useEffect(() => {
		getData()
	}, [])

	const handleAssetClick = (asset: Asset) => {
		setSelectedAsset(asset)
	}

	const handleBackClick = () => {
		setSelectedAsset(null)
	}

	return (
		<Box p={3}>
			<Grid container spacing={3}>
				<Grid item xs={12} md={8}>
					{selectedAsset ? (
						<Box>
							<Box display='flex' justifyContent='flex-end'>
								<Button
									onClick={handleBackClick}
									variant='contained'
									color='primary'
								>
									Back
								</Button>
							</Box>
							<Typography variant='h6' style={{ marginBottom: '15px' }}>
								{selectedAsset.name} Stock Details
							</Typography>
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<FinancialChart chartData={selectedAsset.chartData} />
								</Grid>
							</Grid>
						</Box>
					) : (
						<Box>
							<Typography variant='h5' style={{ marginBottom: '20px' }}>
								Assets Overview
							</Typography>
							{error && (
								<Typography variant='body1' color='error'>
									Ошибка: {error}
								</Typography>
							)}
							<List>
								{assets.map(asset => (
									<ListItem
										button
										key={asset.name}
										onClick={() => handleAssetClick(asset)}
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											padding: '10px 20px',
											backgroundColor: '#f9f9f9',
											marginBottom: '20px',
											borderRadius: '8px',
										}}
									>
										<Box>
											<Typography variant='h6'>{asset.name}</Typography>
											<Typography variant='body2' color='textSecondary'>
												Price: ${asset.price.toFixed(2)}
											</Typography>
										</Box>
										<Typography
											variant='body2'
											style={{
												color: asset.change >= 0 ? 'green' : 'red',
												alignSelf: 'center',
											}}
										>
											{asset.change >= 0 ? '+' : ''}
											{asset.change}%
										</Typography>
									</ListItem>
								))}
							</List>
						</Box>
					)}
				</Grid>
				<Grid item xs={12} md={4}>
					<Box display='flex' justifyContent='right'>
						<Box>
							<iframe
								width='512'
								height='800'
								// src='https://www.youtube.com/embed/zZ7AimPACzc?si=bJRrgDIxHpFfzJmC'
								title='YouTube video player'
								frameBorder='0'
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
								style={{ borderRadius: '8px' }}
							></iframe>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Box>
	)
}

export default SomeComponent
