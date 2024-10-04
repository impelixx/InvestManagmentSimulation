import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HamburgerMenu from './components/HamburgerMenu'
import Home from './pages/Home'
import Markets from './pages/Markets'
import Assets from './pages/Assets'
import Help from './pages/Help'
import Register from './pages/Register'
import Start from './pages/start'
import Settings from './pages/Settings'


const App: React.FC = () => {
	return (
		<div style={{ overflowX: 'hidden', width: '100vw' }}>
			<Router>
				<HamburgerMenu />
				<main style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
					<Routes>
						<Route path='/' element={<Register />} />
						<Route path='/Start' element={<Start />} />
						<Route path='/Home' element={<Home />} />
						<Route path='/markets' element={<Markets />} />
						<Route path='/assets' element={<Assets />} />
						<Route path='/help' element={<Help />} />
						<Route path='/settings' element={<Settings />} />
					</Routes>
				</main>
			</Router>
		</div>
	)
}

export default App
