import React, { useEffect, useState } from 'react'
import { Box, Typography, List, ListItem, Divider } from '@mui/material'


interface Stock {
	name: string
	price: number
}

const convertJsonToStocks = (data: Record<string, number>): Stock[] => {
	return Object.entries(data).map(([name, price]) => ({
		name,
		price,
	}))
}

const StockQuotes: React.FC = () => {
	const [stocks, setStocks] = useState<Stock[]>([
		{ name: 'AAPL', price: 50 },
		{ name: 'TSLA', price: 30 },
		{ name: 'AMZN', price: 20 },
		{ name: 'GOOGL', price: 10 },
		{ name: 'MSFT', price: 5 },
		{ name: 'FB', price: 2 },
	])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

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
			console.log('Stocks:', stocks)
			// translate data to stock classes
			const datastocks: Stock[] = convertJsonToStocks(data)
			console.log('Stock data:', datastocks)
			setStocks(datastocks)
		} catch (error) {
			console.error('Error:', error)
			if (error instanceof Error) {
				setError(error.message)
			} else {
				setError('An unknown error occurred')
			}
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getData()
	}, [])

	if (loading) {
		return <Typography variant='body1'>Загрузка...</Typography> // Сообщение о загрузке
	}

	if (error) {
		return (
			<Typography variant='body1' color='error'>
				Ошибка: {error}
			</Typography>
		)
	}
	console.log('Stocks:', stocks)
	return (
		<Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
			{stocks.map(stock => (
				<React.Fragment key={stock.name}>
					<ListItem>
						<Box>
							<Typography variant='h6'>{stock.name}</Typography>
							<Typography>Price: ${stock.price.toFixed(2)}</Typography>
						</Box>
					</ListItem>
					<Divider />
				</React.Fragment>
			))}
		</Box>
	)
}

export default StockQuotes
