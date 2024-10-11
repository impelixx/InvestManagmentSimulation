import React from 'react'
import { Box, Typography, List, ListItem, Divider } from '@mui/material'

const NewsFeed: React.FC = () => {
	const news = [
		{
			title: 'Ф',
			summary: 'Олег лох',
		},
		{
			title: 'Hui',
			summary: 'Федор лох',
		},
		{
			title: 'Антон',
			summary: 'Антон сигма',
		},
	]

	return (
		<Box>
			<List>
				{news.map((article, index) => (
					<React.Fragment key={index}>
						<ListItem>
							<Box>
								<Typography variant='h6'>{article.title}</Typography>
								<Typography>{article.summary}</Typography>
							</Box>
						</ListItem>
						<Divider />
					</React.Fragment>
				))}
			</List>
		</Box>
	)
}

export default NewsFeed
