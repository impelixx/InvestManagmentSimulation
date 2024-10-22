import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { useTheme } from './ThemeProvider'

interface AssetData {
	name: string
	value: number
}

const GetData = async (): Promise<AssetData[]> => {
	try {
		const response = await fetch('http://localhost:5252/assets/getUser', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ userId: localStorage.getItem('id') }),
		})
		const data = await response.json()
		console.log('Data:', data)

		if (!data || data.length === 0) return []

		const assets = data[0].assets
		console.log('Assets:', assets)
		const assetData: AssetData[] = []

		const cashAmount = assets.cash.amount
		assetData.push({ name: assets.cash.currency, value: cashAmount })

		if (Array.isArray(assets.stocks)) {
			for (const stock of assets.stocks) {
				console.log('Stock:', stock)
				assetData.push({ name: stock.name, value: stock.price * stock.quantity })
			}
		}

		if (Array.isArray(assets.cryptocurrencies)) {
			for (const crypto of assets.cryptocurrencies) {
				console.log('Crypto:', crypto)
				assetData.push({ name: crypto.name, value: crypto.price * crypto.quantity })
			}
		}

		if (Array.isArray(assets.metals)) {
			for (const metal of assets.metals) {
				console.log('Metal:', metal)
				assetData.push({ name: metal.type, value: metal.price * metal.quantity })
			}
		}

		console.log('Asset data:', assetData)
		return assetData
	} catch (error) {
		console.error('Error fetching data:', error)
		return []
	}
}

const AssetPieChart: React.FC = () => {
	const { isDarkMode } = useTheme()
	const [assetData, setAssetData] = useState<AssetData[]>([])

	useEffect(() => {
		const fetchData = async () => {
			const data = await GetData()
			setAssetData(data)
		}

		fetchData()
	}, [])

	const getOption = () => {
		return {
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b}: {c} ({d}%)',
			},
			legend: {
				show: false,
			},
			series: [
				{
					name: 'Assets',
					type: 'pie',
					radius: '50%',
					data: assetData,
					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)',
						},
					},
					itemStyle: {
						color: (params: { dataIndex: number }) => {
							const colors = isDarkMode
								? [
										'#f44336',
										'#2196F3',
										'#4CAF50',
										'#FFC107',
										'#9C27B0',
										'#FF9800',
										'#3F51B5',
									]
								: [
										'#FF6384',
										'#36A2EB',
										'#FFCE56',
										'#FF5722',
										'#795548',
										'#607D8B',
										'#CDDC39',
									]
							return colors[params.dataIndex % colors.length]
						},
					},
				},
			],
			backgroundColor: isDarkMode ? '#424242' : '#ffffff',
		}
	}
	

	return (
		<div style={{ width: '100%', height: '400px' }}>
			<ReactECharts
				option={getOption()}
				style={{ width: '100%', height: '100%' }}
			/>
		</div>
	)
}

export default AssetPieChart
