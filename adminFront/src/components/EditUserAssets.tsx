import React, { useEffect, useState } from 'react'
import {
	Card,
	CardContent,
	Typography,
	Grid,
	Divider,
	TextField,
	Button,
} from '@mui/material'


interface EditUserAssetsProps {
	userId: number | null
	onClose: () => void
}


interface AssetData {
	cash?: {
		amount: number
		currency: string
	}
	cryptocurrencies?: {
		name: string
		price: number
		quantity: number
	}[]
	metals?: {
		type: string
		price: number
		quantity: number
	}[]
	stocks?: {
		name: string
		price: number
		quantity: number
	}[]
}

const EditUserAssets: React.FC<EditUserAssetsProps> = ({ userId }) => {
	const [assets, setAssets] = useState<AssetData | null>(null)
	const [editedAssets, setEditedAssets] = useState<AssetData | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`http://localhost:5252/admin/getUserAssets?userId=${userId}`
				)
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				const jsonData = await response.json()

				// Извлечение данных активов из объекта assets
				setAssets(jsonData.assets)
				setEditedAssets(jsonData.assets) // Установить начальные редактируемые активы
			} catch (err) {
				console.error(err)
			}
		}

		fetchData()
	}, [userId])

	const handleChange = (field: keyof AssetData, index: number | null, value: any) => {
		if (index !== null) {
			setEditedAssets(prev => {
				const updatedField = Array.isArray(prev?.[field]) ? [...(prev?.[field] || [])] : []
				updatedField[index] = { ...updatedField[index], ...value }
				return { ...prev, [field]: updatedField }
			})
		} else {
			setEditedAssets(prev => ({
				...prev,
				[field]: {
					...prev?.[field],
					...value,
				},
			}))
		}
	}

	const handleSave = async () => {
		try {
			const response = await fetch(
				`http://localhost:5252/admin/updateUserAssets`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						userId: userId,
						assets: editedAssets,
					}),
				}
			)

			if (!response.ok) {
				throw new Error('Failed to save changes')
			}

			const jsonResponse = await response.json()
			console.log('Assets updated successfully:', jsonResponse)
      setAssets(editedAssets)
      window.location.reload()
		} catch (err) {
			console.error(err)
		}
	}

	if (!assets) {
		return <div>Loading...</div>
	}

	return (
		<div style={{ padding: '20px' }}>
			<Card variant='outlined'>
				<CardContent>
					<Typography variant='h5' gutterBottom>
						User Assets
					</Typography>

					<Divider />
					{editedAssets?.cash ? (
						<>
							<Typography variant='h6' gutterBottom>
								Cash
							</Typography>
							<label>USD</label>
							<TextField
								label='Amount'
								type='number'
								value={editedAssets.cash.amount}
								onChange={e =>
									handleChange('cash', null, {
										amount: parseFloat(e.target.value),
									})
								}
								fullWidth
								margin='normal'
							/>
						</>
					) : (
						<Typography variant='h6' gutterBottom>
							Cash: No data available
						</Typography>
					)}

					<Divider />

					<Typography variant='h6' gutterBottom>
						Cryptocurrencies
					</Typography>
					<Grid container spacing={2}>
						{editedAssets?.cryptocurrencies &&
						editedAssets.cryptocurrencies.length > 0 ? (
							editedAssets.cryptocurrencies.map((crypto, index) => (
								<Grid item xs={12} sm={6} md={4} key={crypto.name}>
									<Card variant='outlined'>
										<CardContent>
											<Typography variant='subtitle1'>{crypto.name}</Typography>
											<label>Price: {crypto.price}</label>
											<TextField
												label='Quantity'
												type='number'
												value={crypto.quantity}
												onChange={e =>
													handleChange('cryptocurrencies', index, {
														quantity: parseInt(e.target.value),
													})
												}
												fullWidth
												margin='normal'
											/>
										</CardContent>
									</Card>
								</Grid>
							))
						) : (
							<Typography>No cryptocurrencies available</Typography>
						)}
					</Grid>

					<Divider />

					<Typography variant='h6' gutterBottom>
						Metals
					</Typography>
					<Grid container spacing={2}>
						{editedAssets?.metals && editedAssets.metals.length > 0 ? (
							editedAssets.metals.map((metal, index) => (
								<Grid item xs={12} sm={6} md={4} key={metal.type}>
									<Card variant='outlined'>
										<CardContent>
											<Typography variant='subtitle1'>{metal.type}</Typography>
											<label>Price: {metal.price}</label>
											<TextField
												label='Quantity'
												type='number'
												value={metal.quantity}
												onChange={e =>
													handleChange('metals', index, {
														quantity: parseInt(e.target.value),
													})
												}
												fullWidth
												margin='normal'
											/>
										</CardContent>
									</Card>
								</Grid>
							))
						) : (
							<Typography>No metals available</Typography>
						)}
					</Grid>

					<Divider />

					<Typography variant='h6' gutterBottom>
						Stocks
					</Typography>
					<Grid container spacing={2}>
						{editedAssets?.stocks && editedAssets.stocks.length > 0 ? (
							editedAssets.stocks.map((stock, index) => (
								<Grid item xs={12} sm={6} md={4} key={stock.name}>
									<Card variant='outlined'>
										<CardContent>
											<Typography variant='subtitle1'>{stock.name}</Typography>
											<label>Price: {stock.price}</label>
											<TextField
												label='Quantity'
												type='number'
												value={stock.quantity}
												onChange={e =>
													handleChange('stocks', index, {
														quantity: parseInt(e.target.value),
													})
												}
												fullWidth
												margin='normal'
											/>
										</CardContent>
									</Card>
								</Grid>
							))
						) : (
							<Typography>No stocks available</Typography>
						)}
					</Grid>

					<Button
						variant='contained'
						color='primary'
						onClick={handleSave}
						style={{ marginTop: '20px' }}
					>
						Save Changes
					</Button>
				</CardContent>
			</Card>
		</div>
	)
}

export default EditUserAssets
