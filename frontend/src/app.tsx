import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HamburgerMenu from './components/HamburgerMenu'
import Home from './pages/Home'
import Markets from './pages/Markets'
import Assets from './pages/Assets'
import Help from './pages/Help'

const App: React.FC = () => {
	return (
		<Router>
			<div>
				<HamburgerMenu />
				<main style={{ padding: '20px' }}>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/markets' element={<Markets />} />
						<Route path='/assets' element={<Assets />} />
						<Route path='/help' element={<Help />} />
					</Routes>
				</main>
			</div>
		</Router>
	)
}

export default App
