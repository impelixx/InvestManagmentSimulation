import logging
import logging.handlers
from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
from bcrypt import hashpw, gensalt, checkpw
import requests


log_formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
log_file = 'app.log'

file_handler = logging.handlers.RotatingFileHandler(log_file, maxBytes=10 * 1024 * 1024, backupCount=5)
file_handler.setFormatter(log_formatter)

logger = logging.getLogger()
logger.setLevel(logging.INFO)
logger.addHandler(file_handler)

app = Flask(__name__)
CORS(app)

conn = psycopg2.connect(
    dbname="postgres",
    user="impelix",
    password="123",
    host="localhost",
    port="5432"
)

def create_users_table():
    with conn.cursor() as cur:
        cur.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            )
        """)
        conn.commit()
        logger.info('Таблица users успешно создана или уже существует.')

create_users_table()

@app.route('/backend/getWallet', methods=['GET'])
def getWallet():
    logger.info('Получение кошелька')
    url = 'http://localhost:8080/back/wallet'
    try:
        response = requests.get(url)
        response.raise_for_status()
        logger.info('Кошелек получен')
        return jsonify(response.json()), response.status_code
    
    except requests.exceptions.RequestException as e:
        logger.error(f'Ошибка при получении кошелька: {str(e)}')
        return jsonify({'error': str(e)}), 500

@app.route('/backend/buyActive', methods=['POST'])
def buyActive():
    logger.info('Запрос на покупку актива')
    url = 'http://localhost:8080/back/buyActive'
    try:
        data = request.json
        response = requests.post(url, json=data)
        response.raise_for_status()
        logger.info('Актив куплен')
        return jsonify(response.json()), response.status_code
    
    except requests.exceptions.RequestException as e:
        logger.error(f'Ошибка при покупке актива: {str(e)}')
        return jsonify({'error': str(e)}), 500

@app.route('/backend/sellActive', methods=['POST'])
def sellActive():
    logger.info('Запрос на продажу актива')
    url = 'http://localhost:8080/back/sellActive'
    try:
        data = request.json
        response = requests.post(url, json=data)
        response.raise_for_status()
        logger.info('Актив продан')
        return jsonify(response.json()), response.status_code
    
    except requests.exceptions.RequestException as e:
        logger.error(f'Ошибка при продаже актива: {str(e)}')
        return jsonify({'error': str(e)}), 500

@app.route('/backend/getPrices', methods=['GET'])
def getPrice():
    logger.info('Получение цен')
    url = 'http://localhost:8080/back/prices'
    try:
        response = requests.get(url)
        response.raise_for_status()
        logger.info('Цены получены')
        return jsonify(response.json()), response.status_code
    
    except requests.exceptions.RequestException as e:
        logger.error(f'Ошибка при получении цен: {str(e)}')
        return jsonify({'error': str(e)}), 500

@app.route('/backend/getActive', methods=['GET'])
def getActive():
    logger.info('Получение активов')
    url = 'http://localhost:8080/back/active'
    try:
        response = requests.get(url)
        response.raise_for_status()
        logger.info('Активы получены')
        return jsonify(response.json()), response.status_code
    
    except requests.exceptions.RequestException as e:
        logger.error(f'Ошибка при получении активов: {str(e)}')
        return jsonify({'error': str(e)}), 500

@app.route('/db/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    logger.info(f'Регистрация пользователя {username} с адресом {email}')

    if not username or not email or not password:
        return jsonify({'error': 'Пожалуйста, заполните все поля.'}), 400

    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        logger.info(f'Поиск пользователя с адресом {email}')
        cur.execute('SELECT * FROM users WHERE email = %s', (email,))
        existing_user = cur.fetchone()

        if existing_user:
            logger.warning(f'Пользователь с адресом {email} уже существует.')
            return jsonify({'error': 'Этот адрес электронной почты уже зарегистрирован.'}), 400
        
        hashed_password = hashpw(password.encode('utf-8'), gensalt()).decode('utf-8')

        cur.execute(
            'INSERT INTO users (username, email, password) VALUES (%s, %s, %s) RETURNING *',
            (username, email, hashed_password)
        )
        logger.info(f'Добавление пользователя {username} с почтой {email} в базу данных.')
        user = cur.fetchone()
        conn.commit()

        logger.info(f'Пользователь {username} успешно зарегистрирован с адресом {email}')

        return jsonify({
            'message': 'Пользователь зарегистрирован',
            'user': {
                'id': user['id'],
                'username': user['username'],
                'email': user['email']
            }
        }), 201

@app.route('/db/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Пожалуйста, заполните все поля.'}), 400

    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute('SELECT * FROM users WHERE email = %s', (email,))
        user = cur.fetchone()

        if not user:
            return jsonify({'error': 'Пользователь с таким адресом электронной почты не найден.'}), 400

        if not checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
            return jsonify({'error': 'Неверный пароль.'}), 400

        logger.info(f'Пользователь {email} успешно вошел в систему.')
        return jsonify({
            'message': 'Вход выполнен успешно!',
            'user': {
                'id': user['id'],
                'username': user['username'],
                'email': user['email']
            }
        }), 200

if __name__ == '__main__':
    app.run(port=5001)
