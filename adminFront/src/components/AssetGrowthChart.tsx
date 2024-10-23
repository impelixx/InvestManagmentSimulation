import React, { useEffect, useState } from 'react'
import ReactEcharts from 'echarts-for-react'

interface UserData {
	_id: string
	pnl: number[]
	userId: number
}

const AssetGrowthChart: React.FC = () => {
	const [data, setData] = useState<UserData[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('http://localhost:5252/admin/getUsersPnL')
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

	if (loading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>{error}</div>
	}

	const seriesData = data.map(user => ({
		name: `User ${user.userId}`,
		type: 'line',
		data: user.pnl,
	}))

	const option = {
		tooltip: {
			trigger: 'axis',
		},
		legend: {
			data: data.map(user => `User ${user.userId}`),
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
		},
		yAxis: {
			type: 'value',
		},
		series: seriesData,
	}

	return (
		<div style={{ height: '100%', width: '110%' }}>
			<ReactEcharts option={option} style={{ height: '100%', width: '100%' }} />
		</div>
	)
}

export default AssetGrowthChart
