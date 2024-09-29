import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TradingViewWidget from './components/TradingViewWidget.tsx'

import './style.css'
import { HelloPage } from './pages/Hello/HelloPage.tsx'
// import axios from 'axios';

createRoot(document.getElementById('root')!).render(
	<div className='h-100 w-700'>
		<TradingViewWidget />
	</div>
)
