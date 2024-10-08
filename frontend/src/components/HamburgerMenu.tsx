import React from 'react'
import {
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemText,
	ListItemButton,
	Avatar,
	Divider,
	Typography,
	IconButton as MuiIconButton,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'
import { useTheme } from './ThemeProvider'
import MoonIcon from '@mui/icons-material/DarkMode'
import SunIcon from '@mui/icons-material/WbSunny'
import SettingsIcon from '@mui/icons-material/Settings'

const HamburgerMenu: React.FC = () => {
	const [isOpen, setIsOpen] = React.useState(false)
	const [username, setUsername] = React.useState<string | null>(null)
	const navigate = useNavigate()
	const { isDarkMode, toggleTheme } = useTheme()

	React.useEffect(() => {
		const storedUsername = "Лудоман"
		setUsername(storedUsername)
	}, [])

	const toggleDrawer =
		(open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === 'keydown' &&
				((event as React.KeyboardEvent).key === 'Tab' ||
					(event as React.KeyboardEvent).key === 'Shift')
			) {
				return
			}
			setIsOpen(open)
		}

	const handleNavigation = (path: string) => {
		navigate(path)
		setIsOpen(false)
	}

	const handleSettingsButtonClick = () => {
		navigate('/Settings')
	}

	return (
		<div>
			<IconButton
				edge='end'
				color='inherit'
				aria-label='menu'
				onClick={toggleDrawer(true)}
				style={{ fontSize: '2.5rem', marginLeft: '10px' }}
			>
				<MenuIcon fontSize='inherit' />
			</IconButton>
			<Drawer
				anchor='left'
				open={isOpen}
				onClose={toggleDrawer(false)}
				PaperProps={{
					style: {
						width: 300,
						background: isDarkMode
							? 'linear-gradient(to bottom, #3c3c3c, #1c1c1c)'
							: 'linear-gradient(to bottom, #ffffff, #e0e0e0)',
						boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
						transition: 'background 1s ease',
					},
				}}
			>
				<div
					style={{
						padding: '24px',
						textAlign: 'center',
						transition: 'color 1s ease',
					}}
				>
					<Avatar
						alt='User Avatar'
						src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.kbO1T90NqtfN3K-K58a20wHaHa%26pid%3DApi&f=1&ipt=b534fc3ee00688160defba9e345b027ebd6b9eab327ecf471425e79fd22b5c80&ipo=images'
						style={{
							width: 120,
							height: 120,
							margin: '0 auto',
							border: '3px solid #ffffff',
						}}
					/>
					<Typography
						variant='h6'
						style={{
							marginTop: '12px',
							color: isDarkMode ? '#ffffff' : '#000000',
							fontSize: '1.25rem',
							transition: 'color 0.5s ease',
						}}
					>
						{username || 'Гость'}{' '}
					</Typography>
				</div>
				<Divider style={{ backgroundColor: '#ffffff' }} />
				<List>
					{[
						{ text: 'Домашняя страница', path: '/Home' },
						{ text: 'Рынки', path: '/markets' },
						{ text: 'Активы', path: '/assets' },
						{ text: 'Помощь', path: '/help' },
					].map((item, index) => (
						<ListItem key={index}>
							<ListItemButton
								onClick={() => handleNavigation(item.path)}
								sx={{
									'&:hover': {
										backgroundColor: isDarkMode ? '#444444' : '#cce7ff',
										transform: 'scale(1.05)',
										transition:
											'transform 0.2s ease-in-out, background-color 0.3s ease',
									},
									textAlign: 'center',
									padding: '16px 24px',
									borderRadius: '8px',
									margin: '10px 0',
									width: '100%',
									transition: 'color 1s ease',
								}}
							>
								<ListItemText
									primary={item.text}
									primaryTypographyProps={{
										style: {
											fontWeight: 'bold',
											color: isDarkMode ? '#ffffff' : '#000000',
											fontSize: '1.1rem',
											transition: 'color 1s ease',
										},
									}}
								/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Divider style={{ backgroundColor: '#ffffff', marginTop: 'auto' }} />
				<ListItem>
					<ListItemButton
						sx={{ display: 'flex', justifyContent: 'space-between' }}
						onClick={handleSettingsButtonClick}
					></ListItemButton>
					<MuiIconButton>
						{isDarkMode ? (
							<SettingsIcon
								style={{
									fontSize: '2rem',
									color: '#ffffff',
									transition: 'color 0.5s ease',
								}}
							/>
						) : (
							<SettingsIcon
								style={{
									fontSize: '2rem',
									color: '#000000',
									transition: 'color 0.5s ease',
									
								}}
							/>
						)}
					</MuiIconButton>
					<ListItemButton
						sx={{ display: 'flex', justifyContent: 'space-between' }}
						onClick={toggleTheme}
					>
						<ListItemText />
						<MuiIconButton>
							{isDarkMode ? (
								<SunIcon
									style={{
										fontSize: '2rem',
										color: 'yellow',
										transition: 'color 0.5s ease',
									}}
								/>
							) : (
								<MoonIcon
									style={{
										fontSize: '2rem',
										color: '#000000',
										transition: 'color 0.5s ease',
									}}
								/>
							)}
						</MuiIconButton>
					</ListItemButton>
				</ListItem>
			</Drawer>
		</div>
	)
}

export default HamburgerMenu
