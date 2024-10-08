import React from 'react'
import { Box, Typography } from '@mui/material'

const Tetris: React.FC = () => {
	return (
		<Box
			display='flex'
			justifyContent='center'
			alignItems='center'
			height='100%'
			border='1px solid gray'
			borderRadius='8px'
		>
			<Typography variant='h6'>Interactive Tetris</Typography>
		</Box>
	)
}

export default Tetris
