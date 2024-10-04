import React from 'react'
import { useTheme } from '../components/ThemeProvider'
import { Box, Typography } from '@mui/material'
import MyChart from '../components/chart'

const SomeComponent = () => {
	const { themeStyles } = useTheme()

	return (
		<div>
			<MyChart />
		</div>
	)
}

export default SomeComponent
