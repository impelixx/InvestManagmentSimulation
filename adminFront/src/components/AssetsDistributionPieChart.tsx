import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactEcharts from 'echarts-for-react'

const AssetsDistributionPieChart: React.FC = () => {
	const [data, setData] = useState<{ [key: string]: number }>({})
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					'http://localhost:5252/admin/getAssetsDistribution'
				)
				setData(response.data)
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

	const filteredData = Object.entries(data).filter(
		([asset, value]) => value > 0
	)
	const seriesData = filteredData.map(([asset, value]) => ({
		name: asset,
		value: value,
	}))

	const option = {
		title: {
			text: 'Assets Distribution',
			left: 'center',
		},
		tooltip: {
			trigger: 'item',
		},
		legend: {
			orient: 'vertical',
			left: 'left',
		},
		series: [
			{
				name: 'Assets',
				type: 'pie',
				radius: '50%',
				data: seriesData,
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)',
					},
				},
			},
		],
	}

	return <ReactEcharts option={option} />
}

export default AssetsDistributionPieChart
