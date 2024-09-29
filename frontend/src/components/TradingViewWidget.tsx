// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react'

function TradingViewWidget() {
	const container = useRef()

	useEffect(() => {
		const script = document.createElement('script')
		script.src =
			'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
		script.type = 'text/javascript'
		script.async = true
		script.innerHTML = `
        {
          "width": "1000",
          "height": "1000",
          "symbol": "BITSTAMP:BTCUSD",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "gridColor": "rgba(120, 63, 4, 0.06)",
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`
		if (container.current) {
			container.current.appendChild(script)
		}
	}, [])

	return (
		<div className='tradingview-widget-container' ref={container}>
			<div className='tradingview-widget-container__widget'></div>
			<div className='tradingview-widget-copyright'>
				<a
					href='https://www.tradingview.com/'
					rel='noopener nofollow'
					target='_blank'
				>
					<span className='blue-text'>Track all markets on TradingView</span>
				</a>
			</div>
		</div>
	)
}

export default memo(TradingViewWidget)
