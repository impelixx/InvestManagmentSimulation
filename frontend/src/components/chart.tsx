import React from 'react'
import ReactECharts from 'echarts-for-react'

const FinancialChart: React.FC = () => {
	const getOption = () => {
		return {
			title: {
				text: 'Тест',
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
				},
			},
			xAxis: {
				type: 'category',
				data: [
					'2024-09-20',
					'2024-09-21',
					'2024-09-22',
					'2024-09-23',
					'2024-09-24',
					'2024-09-25',
					'2024-09-26',
					'2024-09-27',
					'2024-09-28',
					'2024-09-29',
					'2024-09-30',
					'2024-10-01',
					'2024-10-02',
					'2024-10-03',
					'2024-10-04',
					'2024-10-05',
					'2024-10-06',
					'2024-10-07',
					'2024-10-08',
					'2024-10-09',
				],
				boundaryGap: true,
			},
			yAxis: {
				type: 'value',
				scale: true,
			},
			grid: {
				left: '10%',
				right: '10%',
				bottom: '15%',
			},
			dataZoom: [
				{
					type: 'inside',
					start: 50,
					end: 70,
					zoomOnMouseWheel: false,
					zoomOnTouch: true,
				},
				{
					show: true,
					type: 'slider',
					top: '90%',
					start: 50,
					end: 100,
					handleSize: '100%',
				},
			],
			series: [
				{
					name: 'Свечи',
					type: 'candlestick',
					data: [
						[220, 232, 210, 215],
						[230, 235, 220, 230],
						[220, 225, 215, 220],
						[215, 222, 210, 225],
						[220, 215, 200, 220],
						[230, 240, 225, 235],
						[240, 250, 230, 245],
						[250, 260, 240, 255],
						[260, 270, 250, 265],
						[265, 280, 260, 275],
						[275, 285, 265, 280],
						[285, 290, 275, 285],
						[290, 300, 280, 295],
						[295, 305, 285, 300],
						[300, 310, 290, 305],
						[305, 315, 295, 310],
						[310, 320, 300, 315],
						[315, 325, 305, 320],
						[320, 330, 310, 325],
						[325, 335, 315, 330],
					],
					itemStyle: {
						color: '#06B800',
						color0: '#FF0000',
						borderColor: '#06B800',
						borderColor0: '#FF0000',
					},
					barWidth: '100%',
				},
			],
		}
	}

	return (
		<div style={{ width: '100vw', height: '100vh' }}>
			<ReactECharts
				option={getOption()}
				style={{ width: '100%', height: '100%' }}
			/>
		</div>
	)
}

export default FinancialChart
