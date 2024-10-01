import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { ThemeProvider } from './components/ThemeProvider' // Импортируйте ThemeProvider

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
