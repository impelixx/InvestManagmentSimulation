import React, { useState } from 'react'
import ReactECharts from 'echarts-for-react'

interface FinancialChartProps {
	chartData: number[][]
}

const FinancialChart: React.FC<FinancialChartProps> = ({ chartData }) => {
	const [dataZoomStart, setDataZoomStart] = useState(50)
	const [dataZoomEnd, setDataZoomEnd] = useState(100)

	const getOption = () => {
		return {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
				},
			},
			xAxis: {
				type: 'category',
				data: [
					'2024-09',
					'2024-10',
					'2024-11',
					'2024-12',
					'2025-01',
					'2025-02',
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
				bottom: '10%',
				top: '5%',
			},
			dataZoom: [
				{
					type: 'inside',
					start: dataZoomStart,
					end: dataZoomEnd,
					zoomOnMouseWheel: true,
					zoomOnPinch: true,
					moveOnMouseMove: true,
					moveOnTouch: true,
					preventDefaultMouseMove: true,
				},
				{
					type: 'slider',
					start: dataZoomStart,
					end: dataZoomEnd,
				},
			],
			series: [
				{
					name: 'Candlestick',
					type: 'candlestick',
					data: chartData,
					itemStyle: {
						color: '#06B800',
						color0: '#FF0000',
						borderColor: '#06B800',
						borderColor0: '#FF0000',
					},
					barWidth: '80%',
				},
			],
		}
	}

	const handleChartEvents = (e: any) => {
		if (e.type === 'datazoom') {
			setDataZoomStart(e.batch[0].start)
			setDataZoomEnd(e.batch[0].end)
		}
	}

	return (
		<div style={{ width: '100%', height: '400px' }}>
			<ReactECharts
				option={getOption()}
				style={{ width: '100%', height: '100%' }}
				onEvents={{
					datazoom: handleChartEvents,
				}}
			/>
		</div>
	)
}

export default FinancialChart
