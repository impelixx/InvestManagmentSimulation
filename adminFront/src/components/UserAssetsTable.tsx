import React, { useState, useEffect } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from '@mui/material'
import EditUserAssets from './EditUserAssets'

interface UserData {
	active_prices: number
	user: number
}

const UserAssetsTable: React.FC = () => {
	const [data, setData] = useState<UserData[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [open, setOpen] = useState<boolean>(false)
	const [selectedUserId, setSelectedUserId] = useState<number | null>(null) // Хранение только ID пользователя

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('http://localhost:5252/admin/getUsers')
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				const jsonData = await response.json()
				setData(jsonData)
				setLoading(false)
			} catch (err) {
				setError('Failed to fetch data')
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	const handleEditClick = (user: UserData) => {
		setSelectedUserId(user.user) // Сохраняем только ID пользователя
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
		setSelectedUserId(null)
	}

	if (loading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>{error}</div>
	}

	if (!data.length) {
		return <div>No data available</div>
	}

	return (
		<>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>User ID</TableCell>
							<TableCell>Active Prices</TableCell>
							<TableCell>Отредачить</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map(user => (
							<TableRow key={user.user}>
								<TableCell>{user.user}</TableCell>
								<TableCell>{user.active_prices}</TableCell>
								<TableCell>
									<Button
										variant='contained'
										color='primary'
										onClick={() => handleEditClick(user)}
									>
										Edit
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Редактировать активы пользователя</DialogTitle>
				<DialogContent>
					{/* Передаем только ID пользователя в EditUserAssets */}
					<EditUserAssets userId={selectedUserId} onClose={handleClose} />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						Закрыть
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default UserAssetsTable
