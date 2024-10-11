import React from 'react'
import { Box, Typography, List, ListItem, Divider } from '@mui/material'

const StockQuotes: React.FC = () => {
	const stocks = [
		{ name: 'AAPL', price: 145.09, change: -1.2 },
		{ name: 'TSLA', price: 752.29, change: 2.5 },
		{ name: 'AMZN', price: 3450.99, change: 0.8 },
		{ name: 'GOOGL', price: 2767.39, change: -0.5 },
		{ name: 'MSFT', price: 299.72, change: 1.3 },
		{ name: 'FB', price: 343.18, change: -0.8 },
	]

	return (
		<Box>
			<List>
				{stocks.map(stock => (
					<React.Fragment key={stock.name}>
						<ListItem>
							<Box>
								<Typography variant='h6'>{stock.name}</Typography>
								<Typography>
									Price: ${stock.price.toFixed(2)}{' '}
									<span style={{ color: stock.change >= 0 ? 'green' : 'red' }}>
										({stock.change >= 0 ? '+' : ''}
										{stock.change}%)
									</span>
								</Typography>
							</Box>
						</ListItem>
						<Divider />
					</React.Fragment>
				))}
			</List>
		</Box>
	)
}

export default StockQuotes
