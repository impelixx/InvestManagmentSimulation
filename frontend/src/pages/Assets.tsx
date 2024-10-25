import React, { useEffect, useState } from 'react'
import {
	Container,
	Typography,
	Grid,
	Card,
	CardContent,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	IconButton,
	Box,
	Snackbar,
	Alert,
} from '@mui/material'
import ReactECharts from 'echarts-for-react'
import SellIcon from '@mui/icons-material/AttachMoney'

interface Asset {
	name: string
	value: number
	amount?: number
}

const GetData = async (): Promise<Asset[]> => {
	try {
		const response = await fetch('http://localhost:5252/assets/getUser', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ userId: localStorage.getItem('id') }),
		})
		const data = await response.json()
		console.log('Data:', data)
		if (!data || data.length === 0) return []

		const assets = data[0].assets
		console.log('Assets:', assets)
		const assetData: Asset[] = []

		const cashAmount = assets.cash.amount
		assetData.push({ name: assets.cash.currency, value: cashAmount, amount: cashAmount })

		for (const stock of assets.stocks) {
			console.log('Stock:', stock)
			assetData.push({ name: stock.name, value: stock.price * stock.quantity, amount: stock.quantity })
		}

		for (const crypto of assets.cryptocurrencies) {
			console.log('Crypto:', crypto)
			assetData.push({
				name: crypto.name,
				value: crypto.price * crypto.quantity,
				amount: crypto.quantity,
			})
		}

		for (const metal of assets.metals) {
			console.log('Metal:', metal)
			assetData.push({ name: metal.type, value: metal.price * metal.quantity, amount: metal.quantity })
		}
		console.log('Asset data:', assetData)
		return assetData
	} catch (error) {
		console.error('Error fetching data:', error)
		return []
	}
}

const UserAssets: React.FC = () => {
	const [userAssets, setUserAssets] = useState<Asset[]>([])
	const [open, setOpen] = useState(false)
	const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
	const [sellAmount, setSellAmount] = useState(0)
	const [snackbarOpen, setSnackbarOpen] = useState(false)
	const [snackbarMessage, setSnackbarMessage] = useState('')
	const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')

	useEffect(() => {
		GetData().then(data => {
			setUserAssets(data)
		})
	}, [])

	const totalValue = userAssets.reduce((sum, asset) => sum + asset.value, 0)

	const pieChartOptions = {
		title: {
			text: 'Процентное распределение активов',
			subtext: 'Общая стоимость: $' + totalValue,
			left: 'center',
		},
		tooltip: {
			trigger: 'item',
		},
		series: [
			{
				name: 'Активы',
				type: 'pie',
				radius: '50%',
				data: userAssets.map(asset => ({
					value: asset.value,
					name: asset.name,
				})),
				anchor: 'center',
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)',
					},
				},
			},
		],
	}

	const handleClickOpen = (asset: Asset) => {
		setSelectedAsset(asset)
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
		setSellAmount(0)
		setSelectedAsset(null)
	}

	const handleSnackbarClose = () => {
		setSnackbarOpen(false)
	}

	const handleSell = async () => {
		try {
			await fetch('http://localhost:5252/backend/sellActive', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userId: localStorage.getItem('id'),
					assetName: selectedAsset?.name,
					amount: sellAmount,
				}),
			})
				.then(async response => {
				const data = await response.json()
				console.log('Response:', data)
				if (response.ok) {
					setUserAssets(await GetData())
					handleClose()
					setSnackbarMessage('Актив успешно продан')
					setSnackbarSeverity('success')
					setSnackbarOpen(true)
				}
				else {
					console.log(data);
					setSnackbarMessage(data.error)
					setSnackbarSeverity('error')
					setSnackbarOpen(true)
				}
			})
		} catch (error) {
			console.error('Error selling asset:', error)
			setSnackbarMessage('Error selling asset')
			setSnackbarSeverity('error')
			setSnackbarOpen(true)
		}
	}

	const handleBuy = () => {
		try {
			fetch('http://localhost:5252/backend/buyActive', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userId: localStorage.getItem('id'),
					assetName: selectedAsset?.name,
					amount: sellAmount,
				}),
			})
			.then(async response => {
				const data = await response.json()
				console.log('Response:', data)
				if (response.ok) {
					setUserAssets(await GetData())
					handleClose()
					setSnackbarMessage('Актив успешно куплен')
					setSnackbarSeverity('success')
					setSnackbarOpen(true)
				} else {
					console.log(data)
					setSnackbarMessage(data.error)
					setSnackbarSeverity('error')
					setSnackbarOpen(true)
				}
			})
		} catch (error) {
			console.error('Error buying asset:', error)
			setSnackbarMessage('Error buying asset')
			setSnackbarSeverity('error')
			setSnackbarOpen(true)
		}
	}

	return (
		<Container>
			<Typography
				variant='h4'
				align='center'
				style={{ margin: '20px 0', fontWeight: 'bold' }}
			>
				Активы пользователя
			</Typography>
			<Grid container spacing={4}>
				{userAssets.map((asset, index) => (
					<Grid item xs={12} sm={6} md={4} key={index}>
						<Card elevation={3} style={{ borderRadius: '15px' }}>
							<CardContent>
								<Typography variant='h6' style={{ fontWeight: 'bold' }}>
									{asset.name}
								</Typography>
								<Typography variant='body1'>
									Текущая стоимость: <strong>${asset.value}</strong>
								</Typography>
								<Typography variant='body2'>
									Количество: <strong>{asset.amount}</strong>
								</Typography>
								<Box display='flex' justifyContent='flex-end' mt={2}>
									<IconButton
										color='secondary'
										onClick={() => handleClickOpen(asset)}
										aria-label={`Продать часть ${asset.name}`}
									>
										<SellIcon />
									</IconButton>
								</Box>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>

			<Typography
				variant='h5'
				align='center'
				style={{ marginTop: '40px', fontWeight: 'bold' }}
			>
				Процентное распределение активов
			</Typography>

			<ReactECharts
				option={pieChartOptions}
				style={{ height: '400px', width: '100%' }}
			/>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Продать часть {selectedAsset?.name}</DialogTitle>
				<DialogContent>
					<Box display='flex' flexDirection='column' alignItems='center'>
						<TextField
							autoFocus
							margin='dense'
							label='Количество для продажи'
							fullWidth
							value={sellAmount === 0 ? '' : sellAmount}
							type='number'
							onChange={e => {
								const value = e.target.value
								if (/^\d*\.?\d*$/.test(value)) {
									setSellAmount(Number(value))
								}
							}}
							style={{ marginBottom: '20px' }}
							variant='outlined'
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleClose}
						color='primary'
						style={{ fontWeight: 'bold' }}
					>
						Отмена
					</Button>
					<Button
						onClick={handleBuy}
						style={{ fontWeight: 'bold', color: 'green' }}
					>
						Купить
					</Button>
					<Button
						onClick={handleSell}
						color='secondary'
						style={{ fontWeight: 'bold', color: 'red' }}
					>
						Продать
					</Button>
				</DialogActions>
			</Dialog>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleSnackbarClose}
			>
				<Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</Container>
	)
}

export default UserAssets
