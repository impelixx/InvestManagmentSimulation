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
	Switch,
	IconButton as MuiIconButton,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'
import { useTheme } from './ThemeProvider'
import MoonIcon from '@mui/icons-material/Brightness2'
import SunIcon from '@mui/icons-material/WbSunny'



const HamburgerMenu: React.FC = () => {
	const [isOpen, setIsOpen] = React.useState(false)
	const navigate = useNavigate()
	const { isDarkMode, toggleTheme } = useTheme()

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

	return (
		<div>
			<IconButton
				edge='start'
				color='inherit'
				aria-label='menu'
				size='large'
				onClick={toggleDrawer(true)}
			>
				<MenuIcon />
			</IconButton>
			<Drawer
				anchor='left'
				open={isOpen}
				onClose={toggleDrawer(false)}
				PaperProps={{
					style: {
						width: 250,
						background: isDarkMode
							? 'linear-gradient(to bottom, #3c3c3c, #1c1c1c)'
							: 'linear-gradient(to bottom, #ffffff, #e0e0e0)',
						boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
					},
				}}
			>
				<div style={{ padding: '16px', textAlign: 'center' }}>
					<Avatar
						alt='User Avatar'
						src='https://mighty.tools/mockmind-api/content/human/75.jpg'
						style={{
							width: 100,
							height: 100,
							margin: '0 auto',
							border: '3px solid #ffffff',
						}}
					/>
					<Typography
						variant='h6'
						style={{
							marginTop: '8px',
							color: isDarkMode ? '#ffffff' : '#000000',
						}}
					>
						Impelix
					</Typography>
				</div>
				<Divider style={{ backgroundColor: '#ffffff' }} />
				<List>
					{[
						{ text: 'Домашняя страница', path: '/' },
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
										transition: 'transform 0.2s ease-in-out',
									},
									textAlign: 'center',
									padding: '12px 24px',
									borderRadius: '8px',
									margin: '8px 0',
									width: '100%',
								}}
							>
								<ListItemText
									primary={item.text}
									primaryTypographyProps={{
										style: {
											fontWeight: 'bold',
											color: isDarkMode ? '#ffffff' : '#000000', // Text color based on theme
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
						onClick={toggleTheme}
					>
						<ListItemText
							primary='Темная тема'
							style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
						/>
						<MuiIconButton>
							{isDarkMode ? (
								<SunIcon style={{ color: '#ffeb3b' }} />
							) : (
								<MoonIcon style={{ color: '#ffffff' }} />
							)}
						</MuiIconButton>
					</ListItemButton>
				</ListItem>
			</Drawer>
		</div>
	)
}

export default HamburgerMenu
