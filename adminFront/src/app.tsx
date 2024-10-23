import React, { useState } from 'react'
import {
	Container,
	Grid,
	Typography,
	Box,
	IconButton,
	Button,
} from '@mui/material'
import AssetGrowthChart from './components/AssetGrowthChart'
import AssetsDistributionPieChart from './components/AssetsDistributionPieChart'
import UserAssetsTable from './components/UserAssetsTable'
import EditUserAssets from './components/EditUserAssets'
import FullscreenIcon from '@mui/icons-material/Fullscreen'

type FullscreenComponent = 'growth' | 'distribution' | 'table' | 'edit' | null

const App: React.FC = () => {
	const [fullscreenComponent, setFullscreenComponent] =
		useState<FullscreenComponent>(null)

	const exitFullscreen = () => setFullscreenComponent(null)

	return (
		<Container className='p-8'>
			<Typography variant='h4' className='mb-6 text-center'>
				Наверстал говна
			</Typography>
			{fullscreenComponent === null ? (
				<Grid container spacing={4}>
					<Grid item xs={12} md={6}>
						<Box
							className='p-4 bg-white rounded shadow-lg'
							style={{ height: '300px' }}
						>
							<Box
								display='flex'
								justifyContent='space-between'
								alignItems='center'
							>
								<Typography variant='h6' className='mb-2'>
									Говно
								</Typography>
								<IconButton
									onClick={() => setFullscreenComponent('growth')}
									style={{ marginLeft: 'auto' }}
								>
									<FullscreenIcon fontSize='small' />
								</IconButton>
							</Box>
							<Box style={{ height: 'calc(100% - 40px)', width: '100%' }}>
								<AssetGrowthChart />
							</Box>
						</Box>
					</Grid>

					<Grid item xs={12} md={6}>
						<Box
							className='p-4 bg-white rounded shadow-lg'
							style={{ height: '300px' }}
						>
							<Box
								display='flex'
								justifyContent='space-between'
								alignItems='center'
							>
								<Typography variant='h6' className='mb-2'>
									Залупа
								</Typography>
								<IconButton
									onClick={() => setFullscreenComponent('distribution')}
									style={{ marginLeft: 'auto' }}
								>
									<FullscreenIcon fontSize='small' />
								</IconButton>
							</Box>
							<Box style={{ height: 'calc(100% - 40px)', width: '100%' }}>
								<AssetsDistributionPieChart />
							</Box>
						</Box>
					</Grid>

					<Grid item xs={12}>
						<Box
							className='p-4 bg-white rounded shadow-lg'
							style={{ height: '300px' }}
						>
							<Box
								display='flex'
								justifyContent='space-between'
								alignItems='center'
							>
								<Typography variant='h6' className='mb-2'>
									Пенис
								</Typography>
								<IconButton
									onClick={() => setFullscreenComponent('table')}
									style={{ marginLeft: 'auto' }}
								>
									<FullscreenIcon fontSize='small' />
								</IconButton>
							</Box>
							<Box style={{ height: 'calc(100% - 40px)', width: '100%' }}>
								<UserAssetsTable />
							</Box>
						</Box>
					</Grid>
				</Grid>
			) : (
				<Box
					className='p-8 bg-white rounded shadow-lg full-screen-box'
					style={{ height: '90vh', width: '90vw' }}
				>
					<Button
						variant='contained'
						onClick={exitFullscreen}
						style={{ marginBottom: '20px' }}
					>
						Exit Fullscreen
					</Button>
					{fullscreenComponent === 'growth' && (
						<>
							<Typography variant='h6' className='mb-2'>
								Asset Growth (Fullscreen)
							</Typography>
							<Box style={{ height: 'calc(100% - 40px)', width: '100%' }}>
								<AssetGrowthChart />
							</Box>
						</>
					)}
					{fullscreenComponent === 'distribution' && (
						<>
							<Typography variant='h6' className='mb-2'>
								Assets Distribution (Fullscreen)
							</Typography>
							<Box style={{ height: 'calc(100% - 40px)', width: '100%' }}>
								<AssetsDistributionPieChart />
							</Box>
						</>
					)}
					{fullscreenComponent === 'table' && (
						<>
							<Typography variant='h6' className='mb-2'>
								User Assets Table (Fullscreen)
							</Typography>
							<Box style={{ height: 'calc(100% - 40px)', width: '100%' }}>
								<UserAssetsTable />
							</Box>
						</>
					)}
				</Box>
			)}
		</Container>
	)
}

export default App
