import React from 'react'
import { useTheme } from '../components/ThemeProvider'
import { Box, Typography } from '@mui/material'

const SomeComponent = () => {
	const { themeStyles } = useTheme()

	return (
		<Box
			sx={{
				background: themeStyles.background,
				color: themeStyles.color,
				padding: '16px',
				borderRadius: '8px',
				boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
			}}
		>
			<Typography variant='h5'>Some Component</Typography>
			<Typography>
				This component changes its style based on the selected theme!
			</Typography>
		</Box>
	)
}

export default SomeComponent
