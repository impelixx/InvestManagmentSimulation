import React, { useState } from 'react'
import { useTheme } from '../components/ThemeProvider'
import {
	Box,
	Typography,
	List,
	ListItem,
	Button,
	Grid,
	Paper,
} from '@mui/material'
import FinancialChart from '../components/chart.tsx'

interface Asset {
	name: string
	price: number
	change: number
	chartData: number[][]
}

const SomeComponent = () => {
	const theme = useTheme()
	const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)

	const assets: Asset[] = [
		{
			name: 'AAPL',
			price: 145.09,
			change: -1.2,
			chartData: [
				[230, 240, 220, 235],
				[240, 250, 230, 245],
				[250, 260, 240, 255],
				[260, 270, 250, 265],
				[270, 280, 260, 275],
				[280, 290, 270, 285],
			],
		},
		{
			name: 'TSLA',
			price: 752.29,
			change: 2.5,
			chartData: [
				[240, 250, 230, 245],
				[250, 260, 240, 255],
				[260, 270, 250, 265],
				[270, 280, 260, 275],
				[280, 290, 270, 285],
				[290, 300, 280, 295],
			],
		},
		{
			name: 'AMZN',
			price: 3450.99,
			change: 0.8,
			chartData: [
				[250, 260, 240, 255],
				[260, 270, 250, 265],
				[270, 280, 260, 275],
				[280, 290, 270, 285],
				[290, 300, 280, 295],
				[300, 310, 290, 305],
			],
		},
		{
			name: 'GOOGL',
			price: 2748.59,
			change: -0.5,
			chartData: [
				[260, 270, 250, 265],
				[270, 280, 260, 275],
				[280, 290, 270, 285],
				[290, 300, 280, 295],
				[300, 310, 290, 305],
				[310, 320, 300, 315],
			],
		},
		{
			name: 'MSFT',
			price: 289.67,
			change: 0.3,
			chartData: [
				[270, 280, 260, 275],
				[280, 290, 270, 285],
				[290, 300, 280, 295],
				[300, 310, 290, 305],
				[310, 320, 300, 315],
				[320, 330, 310, 325],
			],
		},
		{
			name: 'NFLX',
			price: 513.97,
			change: -0.7,
			chartData: [
				[280, 290, 270, 285],
				[290, 300, 280, 295],
				[300, 310, 290, 305],
				[310, 320, 300, 315],
				[320, 330, 310, 325],
				[330, 340, 320, 335],
			],
		},
		{
			name: 'FB',
			price: 354.7,
			change: 0.1,
			chartData: [
				[290, 300, 280, 295],
				[300, 310, 290, 305],
				[310, 320, 300, 315],
				[320, 330, 310, 325],
				[330, 340, 320, 335],
				[340, 350, 330, 345],
			],
		},
		{
			name: 'NVDA',
			price: 197.45,
			change: 0.9,
			chartData: [
				[300, 310, 290, 305],
				[310, 320, 300, 315],
				[320, 330, 310, 325],
				[330, 340, 320, 335],
				[340, 350, 330, 345],
				[350, 360, 340, 355],
			],
		},
		{
			name: 'PYPL',
			price: 286.5,
			change: -0.4,
			chartData: [
				[310, 320, 300, 315],
				[320, 330, 310, 325],
				[330, 340, 320, 335],
				[340, 350, 330, 345],
				[350, 360, 340, 355],
				[360, 370, 350, 365],
			],
		},
		{
			name: 'INTC',
			price: 55.68,
			change: 0.2,
			chartData: [
				[320, 330, 310, 325],
				[330, 340, 320, 335],
				[340, 350, 330, 345],
				[350, 360, 340, 355],
				[360, 370, 350, 365],
				[370, 380, 360, 375],
			],
		},
		{
			name: 'CSCO',
			price: 55.55,
			change: -0.6,
			chartData: [
				[330, 340, 320, 335],
				[340, 350, 330, 345],
				[350, 360, 340, 355],
				[360, 370, 350, 365],
				[370, 380, 360, 375],
				[380, 390, 370, 385],
			],
		},
	]

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
							<Button
								onClick={handleBackClick}
								style={{ marginBottom: '20px' }}
							>
								Back
							</Button>
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
											background: 'f9f9f9',
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
				<Grid>
					<Box display='flex' justifyContent='right'>
						<Box>
							<iframe
								width='512'
								height='800'
								src='https://www.youtube.com/embed/zZ7AimPACzc?si=bJRrgDIxHpFfzJmC'
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
