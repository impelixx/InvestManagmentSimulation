import React, { useState } from 'react'
import {
	Container,
	Grid,
	Typography,
	Box,
	IconButton,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
} from '@mui/material'
import AssetGrowthChart from './components/AssetGrowthChart'
import AssetsDistributionPieChart from './components/AssetsDistributionPieChart'
import UserAssetsTable from './components/UserAssetsTable'
import FullscreenIcon from '@mui/icons-material/Fullscreen'

type FullscreenComponent = 'growth' | 'distribution' | 'table' | null

const App: React.FC = () => {
	const [fullscreenComponent, setFullscreenComponent] =
		useState<FullscreenComponent>(null)
	const [openDialog, setOpenDialog] = useState(false)
	const [steps, setSteps] = useState<number | ''>('')
	const [data, setData] = useState<any>(null)

	const exitFullscreen = () => setFullscreenComponent(null)

	const nSteps = async (steps: number) => {
		for (let i = 0; i < steps; i++) {
			console.log(`Executing step ${i + 1}`)
			await fetch('http://localhost:5252/backend/updatePrices')
			const updatedData = await fetchData()
			setData(updatedData)
		}
	}

	const fetchData = async () => {
		const response = await fetch('http://localhost:5252/assets/getPrices')
		const result = await response.json()
		return result
	}

	const handleNSteps = async () => {
		if (steps && steps > 0) {
			await nSteps(Number(steps))
			setOpenDialog(false)
			setSteps('')
			window.location.reload()
		} else {
			alert('Ты реально даун')
		}
	}

	const handleDialogOpen = () => {
		setOpenDialog(true)
	}

	const handleDialogClose = () => {
		setOpenDialog(false)
		setSteps('')
	}

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
								<AssetGrowthChart data={data} />
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
								<AssetsDistributionPieChart data={data} />{' '}
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
								<UserAssetsTable data={data} />
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
								<AssetGrowthChart data={data} />
							</Box>
						</>
					)}
					{fullscreenComponent === 'distribution' && (
						<>
							<Typography variant='h6' className='mb-2'>
								Assets Distribution (Fullscreen)
							</Typography>
							<Box style={{ height: 'calc(100% - 40px)', width: '100%' }}>
								<AssetsDistributionPieChart data={data} />
							</Box>
						</>
					)}
					{fullscreenComponent === 'table' && (
						<>
							<Typography variant='h6' className='mb-2'>
								User Assets Table (Fullscreen)
							</Typography>
							<Box style={{ height: 'calc(100% - 40px)', width: '100%' }}>
								<UserAssetsTable data={data} />
							</Box>
						</>
					)}
				</Box>
			)}
			<Box display='flex' justifyContent='center' alignItems='center' mt={2}>
				<Button
					variant='contained'
					color='primary'
					style={{ marginRight: '10px' }}
					onClick={async () => {
						await fetch('http://localhost:5252/backend/updatePrices')
						const updatedData = await fetchData()
						setData(updatedData)
						window.location.reload()
					}}
				>
					Следующий шаг
				</Button>
				<Button
					variant='contained'
					color='secondary'
					onClick={handleDialogOpen}
				>
					Набор шагов
				</Button>
			</Box>

			<Dialog open={openDialog} onClose={handleDialogClose}>
				<DialogTitle>Введите количество шагов</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin='dense'
						id='steps'
						label='Количество шагов'
						type='number'
						fullWidth
						value={steps}
						onChange={e => setSteps(e.target.value)}
						inputProps={{ min: '1' }}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDialogClose} color='primary'>
						Отмена
					</Button>
					<Button onClick={handleNSteps} color='primary'>
						Подтвердить
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	)
}

export default App
