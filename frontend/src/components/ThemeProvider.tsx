import React, { createContext, ReactNode, useContext, useState } from 'react'

const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
  themeStyles: {
	background: 'linear-gradient(to bottom, #ffffff, #e0e0e0)',
	color: '#000000',
  },
})

export const useTheme = () => useContext(ThemeContext)

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const [isDarkMode, setIsDarkMode] = useState(false)

	const toggleTheme = () => {
		setIsDarkMode(prev => !prev)
	}

	const themeStyles = {
		background: isDarkMode
			? 'linear-gradient(to bottom, #3c3c3c, #1c1c1c)'
			: 'linear-gradient(to bottom, #ffffff, #e0e0e0)',
		color: isDarkMode ? '#ffffff' : '#000000',
	}

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme, themeStyles }}>
			<div
				style={{
					background: themeStyles.background,
					color: themeStyles.color,
					minHeight: '100vh',
					minWidth: '100vh'
				}}
			>
				{children}
			</div>
		</ThemeContext.Provider>
	)
}
