import React from 'react'
import ReactECharts from 'echarts-for-react'
import { useTheme } from '../components/ThemeProvider'

interface AssetPieChartProps {
	assetData: { name: string; value: number }[]
}

const AssetPieChart: React.FC<AssetPieChartProps> = ({ assetData }) => {
	const { isDarkMode } = useTheme()

	const getOption = () => {
		return {
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b}: {c} ({d}%)',
			},
			legend: {
				orient: 'vertical',
				left: 'left',
				textStyle: {
					color: isDarkMode ? '#ffffff' : '#000000', 
				},
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
								? ['#f44336', '#2196F3', '#4CAF50'] 
								: ['#FF6384', '#36A2EB', '#FFCE56']
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
