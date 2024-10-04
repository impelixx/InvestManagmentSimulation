import React from 'react'
import '../style.css'
import { useNavigate } from 'react-router-dom'

const handleButtonClick = () => {
	navigate('/Home')
}

const Settings: React.FC = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100'>
			<div className='max-w-3xl p-8 text-center bg-white rounded-lg shadow-lg'>
				<h1 className='mb-6 text-4xl font-bold text-gray-800'>
					Инвестируй в говно
				</h1>
				<p className='mb-6 text-lg text-gray-600'>
					Добро пожаловать в игру <strong>Инвестируй в говно</strong>! Ваш путь
					к вершинам финансового успеха начинается с 100$, которые вы заработали
					разгрузив 20 фур, кажется Вас обманули, но это уже не важно, ведь
					скоро вы станете <strong>КРИПТОДОЛЛАРОВЫМ МИЛЛИОНЕРОМ</strong>.
					Управляйте деньгами, принимайте решения и смотрите, как ваши деньги
					сгорают. Готовы бросить вызов рынку и стать настоящим финансовым как{' '}
					<strong>Артем Дедов?</strong>?
				</p>
				<div className='flex justify-center space-x-4'>
					<button
						className='px-6 py-3 font-semibold text-white transition bg-blue-500 rounded-lg hover:bg-blue-600'
						onClick={handleButtonClick}
					>
						Начать игру
					</button>
					<a
						href='https://journal.tinkoff.ru/pro/fingram/intro-fingram/'
						target='_blank'
						rel='noopener noreferrer'
					>
						<button className='px-6 py-3 font-semibold text-white transition bg-green-500 rounded-lg hover:bg-green-600'>
							Учебник
						</button>
					</a>
					<button className='px-6 py-3 font-semibold text-white transition bg-gray-500 rounded-lg hover:bg-gray-600'>
						Настройки
					</button>
				</div>
			</div>
		</div>
	)
}

export default Settings
