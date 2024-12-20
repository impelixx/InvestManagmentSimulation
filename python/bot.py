import logging
import logging.handlers
from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
from bcrypt import hashpw, gensalt, checkpw
import requests
from pymongo import MongoClient
import random

asset_document = {
    'userId': 1,
    'assets': {
        'stocks': [
            {'name': 'Apple', 'quantity': 10, 'price': 1500},
            {'name': 'Nvidia', 'quantity': 5, 'price': 1200},
            {'name': 'Facebook', 'quantity': 8, 'price': 1000}
        ],
        'cryptocurrencies': [
            {'name': 'Bitcoin', 'quantity': 0.5, 'price': 25000},
            {'name': 'Ethereum', 'quantity': 2, 'price': 4000}
        ],
        'cash': {'currency': 'USD', 'amount': 5000},
        'metals': [
            {'type': 'Gold', 'quantity': 1.5, 'price': 3000}
        ]
    }
}
StockPrices = {
    "Apple": 150,
    "Nvidia": 300,
    "Facebook": 250,
    "Bitcoin": 50000,
    "Ethereum": 2000,
    "Gold": 2000,
    "USD": 1,
    "TON": 5.5,
    "YNDX": 20,
    "GOOGL": 2000,
    "AMZN": 3000,
    "VKontakte": 100,
    "Tesla": 600,
    "Microsoft": 250,
    "Netflix": 500,
    "Twitter": 100,
    "Snapchat": 50,
    "Silver": 25,
    "Platinum": 1000,
    "Palladium": 500,
    "Oil": 50,
}

log_formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
log_file = 'app.log'
open(log_file, 'w').close()

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

def create_finance_table():
    client = MongoClient('localhost', 6969)
    logger.info('Подключение к базе данных c активами')
    db = client['assets']
    
    if 'financial_assets' in db.list_collection_names():
        logger.info('Коллекция уже существует')
    else:
        logger.info('Создание коллекции')
        db.create_collectxion('financial_assets')
        logger.info('Коллекция создана')
    
    global financial_assets
    financial_assets = db['financial_assets']
    # financial_assets.insert_one(asset_document)

def create_stock_prices_table():
    client = MongoClient('localhost', 6969)
    logger.info('Подключение к базе данных c ценами активов')
    db = client['assets']
    
    if 'stock_prices' in db.list_collection_names():
        logger.info('Коллекция уже существует')
    else:
        logger.info('Создание коллекции')
        db.create_collection('stock_prices')
        logger.info('Коллекция создана')
    
    global stock_prices
    stock_prices = db['stock_prices']
    if stock_prices.count_documents({}) == 0:
        logger.info('Добавление цен активов в базу данных')
        stock_prices.insert_one(StockPrices)
        logger.info('Цены активов добавлены в базу данных')

def updateStockPrices(StockPrice):
    client = MongoClient('localhost', 6969)
    db = client['assets']
    stock_prices = db['stock_prices']
    stock_prices.update_one({}, {"$set": StockPrice})
    logger.info('Цены активов обновлены')
    users = financial_assets.find({})

    for user in users:
        for stock in user['assets']['stocks']:
            stock['price'] = StockPrice.get(stock['name'], stock['price'])
        for crypto in user['assets']['cryptocurrencies']:
            crypto['price'] = StockPrice.get(crypto['name'], crypto['price'])
        for metal in user['assets']['metals']:
            metal['price'] = StockPrice.get(metal['type'], metal['price'])
        financial_assets.update_one({"userId": user['userId']}, {"$set": user})

def GetUsersActives(user_id):
    client = MongoClient('localhost', 6969)
    db = client['assets']
    user = db['financial_assets'].find_one({'userId': user_id})
    return user


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

def createPnLTable():
    client = MongoClient('localhost', 6969)
    logger.info('Подключение к базе данных c PnL пользователей')
    db = client['assets']

    if 'user_pnl' in db.list_collection_names():
        logger.info('Коллекция уже существует')
    else:
        logger.info('Создание коллекции')
        db.create_collection('user_pnl')
        logger.info('Коллекция создана')

def addUserPnL(user_id):
    client = MongoClient('localhost', 6969)
    db = client['assets']
    user_pnl = db['user_pnl']
    user_pnl.insert_one({'userId': int(user_id), 'pnl': [50000,]})
    logger.info(f'Добавлен пользователь с ID {user_id} в коллекцию PnL')

def addUserWithId(user_id):
    client = MongoClient('localhost', 6969)
    db = client['assets']
    financial_assets = db['financial_assets']
    new_user = {
        "userId": int(user_id),
        "assets": {
            "stocks": [],
            "cryptocurrencies": [],
            'cash': {'currency': 'USD', 'amount': 50000},
            "metals": []
        }
    }
    financial_assets.insert_one(new_user)
    addUserPnL(user_id)
    logger.info(f'Добавлен пользователь с ID {user_id} в коллекцию активов')

def updatePnL(user_id):
    client = MongoClient('localhost', 6969)
    db = client['assets']
    user_pnl = db['user_pnl']
    user = financial_assets.find_one({'userId': user_id})
    pnl = user_pnl.find_one({'userId': user_id})
    if pnl is None:
        addUserPnL(user_id)
        pnl = user_pnl.find_one({'userId': user_id})
    pnl = pnl['pnl']
    total = GetUserActivePrices(user_id)
    pnl.append(total)
    user_pnl.update_one({'userId': user_id}, {"$set": {'pnl': pnl}})
    logger.info(f'PnL пользователя {user_id} обновлен')

def updatePnLAll():
    client = MongoClient('localhost', 6969)
    db = client['assets']
    user_pnl = db['user_pnl']
    users = financial_assets.find({})
    print(users)
    for user in users:
        logger.info(f'Обновление PnL пользователя {user["userId"]}')
        updatePnL(user['userId'])

def GetUserActivePrices(user_id): # get all money and assets of user and calculate total value
    client = MongoClient('localhost', 6969)
    db = client['assets']
    user = db['financial_assets'].find_one({'userId': user_id})
    total = user['assets']['cash']['amount']
    for stock in user['assets']['stocks']:
        total += stock['quantity'] * stock['price']
    for crypto in user['assets']['cryptocurrencies']:
        total += crypto['quantity'] * crypto['price']
    for metal in user['assets']['metals']:
        total += metal['quantity'] * metal['price']
    print(total)
    return total

def updateUserPnL(): # create mongo db userPnl and update on nextstep step invoke
    client = MongoClient('localhost', 6969)
    logger.info('Подключение к базе данных c PnL пользователей')
    db = client['assets']
    

@app.route('/backend/updatePrices', methods=['GET'])
def updatePrices():
    logger.info('Обновление цен активов')
    data = {
        "Apple": random.randint(100, 200),
        "Nvidia": random.randint(200, 400),
        "Facebook": random.randint(200, 300),
        "Bitcoin": random.randint(1000, 60000),
        "Ethereum": random.randint(2000, 3000),
        "Gold": random.randint(1900, 2100),
        "USD": 1,
        "TON": random.uniform(5.0, 6.0),
        "YNDX": random.randint(15, 25),
        "GOOGL": random.randint(1900, 2200),
        "AMZN": random.randint(2900, 3200),
        "VKontakte": random.randint(90, 110),
        "Tesla": random.randint(500, 700),
        "Microsoft": random.randint(200, 300),
        "Netflix": random.randint(400, 600),
        "Twitter": random.randint(90, 120),
        "Snapchat": random.randint(40, 60),
        "Silver": random.randint(20, 30),
        "Platinum": random.randint(900, 1100),
        "Palladium": random.randint(400, 600),
        "Oil": random.randint(40, 60),
    }
    updateStockPrices(data)
    updatePnLAll()
    return jsonify({'message': 'Цены обновлены'}), 200

@app.route('/assets/getPrices', methods=['GET']) 
def getPrices():
    logger.info('Получение цен активов')
    client = MongoClient('localhost', 6969)
    db = client['assets']
    stock_prices = db['stock_prices']
    prices = stock_prices.find_one({}, {'_id': 0}) or {}
    if prices is None:
        logger.warning('Цены активов не найдены в базе данных')
        return jsonify({'error': 'Цены активов не найдены'}), 404
    logger.info('Цены активов успешно получены')
    return jsonify(prices), 200

@app.route('/admin/getUsersPnL', methods=['GET'])
def getUsersPnL():
    logger.info('Запрос на получение PnL всех пользователей')
    try:
        client = MongoClient('localhost', 6969)
        db = client['assets']
        user_pnl = db['user_pnl']
        users = user_pnl.find({})
        user_list = []
        for user in users:
            user['_id'] = str(user['_id'])
            user_list.append(user)
        logger.info('PnL всех пользователей успешно получен')
        return jsonify(user_list), 200
    except Exception as e:
        logger.error(f'Ошибка при получении PnL всех пользователей: {str(e)}')
        return jsonify({'error': str(e)}), 500

@app.route('/admin/getAssetsDistribution', methods=['GET'])
def getAssetsDistribution():
    logger.info('Запрос на получение распределения активов')
    try:
        client = MongoClient('localhost', 6969)
        db = client['assets']
        financial_assets = db['financial_assets']
        users = financial_assets.find({})
        ans = {
            'Apple': 0,
            'Nvidia': 0,
            'Facebook': 0,
            'Ethereum': 0,
            'Bitcoin': 0,
            'Gold': 0,
            'USD': 0,
        }
        for user in users:
            for stock in user['assets']['stocks']:
                ans[stock['name']] += stock['quantity'] * stock['price']
            for crypto in user['assets']['cryptocurrencies']:
                ans[crypto['name']] += crypto['quantity'] * crypto['price']
            for metal in user['assets']['metals']:
                ans[metal['type']] += metal['quantity'] * metal['price']
            ans['USD'] += user['assets']['cash']['amount']
        logger.info('Распределение активов успешно получено')
        return jsonify(ans), 200
    except Exception as e:
        logger.error(f'Ошибка при получении распределения активов: {str(e)}')
        return jsonify({'error': str(e)}), 500

@app.route('/admin/getUsers', methods=['GET'])
def getUsers():
    logger.info('Запрос на получение всех пользователей')
    try:
        client = MongoClient('localhost', 6969)
        db = client['assets']
        financial_assets = db['financial_assets']
        users = financial_assets.find({})

        user_list = []
        for user in users:
            user['_id'] = str(user['_id'])
            GetUserActivePrices(user_id=user['userId'])
            logger.info(f'Активы пользователя {user["userId"]} успешно получены, их цена: {GetUserActivePrices(user["userId"])}')
            user_list.append({"user": user["userId"], "active_prices": GetUserActivePrices(user["userId"])})
        logger.info('Пользователи успешно получены')
        return jsonify(user_list), 200
    except Exception as e:
        logger.error(f'Ошибка при получении пользователей: {str(e)}')
        return jsonify({'error': str(e)}), 500

@app.route('/admin/getUserAssets', methods=['GET'])
def getUserAssets():
    user_id = request.args.get('userId')
    print("hui", user_id)
    if not user_id:
        logger.error('userId is required')
        return jsonify({"error": "userId is required"}), 400

    logger.info(f'Получение активов для пользователя с ID: {user_id}')
    
    try:
        client = MongoClient('localhost', 6969)
        db = client['assets']
        financial_assets = db['financial_assets']
        user_assets = financial_assets.find_one({'userId': int(user_id)})

        if not user_assets:
            logger.warning(f'Активы не найдены для пользователя с ID: {user_id}')
            return jsonify({"error": "Активы не найдены"}), 404

        user_assets['_id'] = str(user_assets['_id'])
        logger.info(f'Активы пользователя {user_id} успешно получены')
        return jsonify(user_assets), 200

    except Exception as e:
        logger.error(f'Ошибка при получении активов для пользователя {user_id}: {str(e)}')
        return jsonify({"error": "Internal server error"}), 500


@app.route('/admin/updateUserAssets', methods=['POST'])
def updateUserAssets():
    data = request.json
    user_id = data.get('userId')
    new_assets = data.get('assets')
    logger.info(f'Обновление активов пользователя {user_id}')
    
    if not user_id or not new_assets:
        logger.error('userId и assets обязательны')
        return jsonify({'error': 'userId и assets обязательны'}), 400

    try:
        client = MongoClient('localhost', 6969)
        db = client['assets']
        financial_assets = db['financial_assets']
        print(user_id)
        ass = {}
        user = financial_assets.find_one({'userId': int(user_id)})

        if not user:
            logger.warning(f'Пользователь с ID {user_id} не найден')
            return jsonify({'error': 'Пользователь не найден'}), 404

        financial_assets.delete_one({'userId': int(user_id)})
        ass['userId'] = user_id
        ass['assets'] = new_assets
        financial_assets.delete_one({'userId': int(user_id)})
        logger.info("delete user")
        financial_assets.insert_one(ass)
        logger.info(f'Активы пользователя {user_id} успешно обновлены')
        return jsonify({'message': 'Активы успешно обновлены'}), 200

    except Exception as e:
        logger.error(f'Ошибка при обновлении активов пользователя {user_id}: {str(e)}')
        return jsonify({'error': str(e)}), 500

@app.route('/backend/buyActive', methods=['POST'])
def buyActive():
    logger.info('Запрос на покупку актива')
    data = request.json
    user_id = data.get('userId')
    asset = data.get('assetName')
    amount = data.get('amount')
    print(user_id, asset, amount)
    logger.info(f'Пользователь {user_id} хочет купить {amount} единиц актива {asset}')

    if not user_id or not asset or not amount:
        logger.error('userId, asset и amount обязательны')
        return jsonify({'error': 'userId, asset и amount обязательны'}), 400
    try:
        client = MongoClient('localhost', 6969)
        db = client['assets']
        financial_assets = db['financial_assets']
        user = financial_assets.find_one({'userId': int(user_id)})
        
        if not user:
            logger.warning(f'Пользователь с ID {user_id} не найден')
            return jsonify({'error': 'Пользователь не найден'}), 404
        
        stock_price = StockPrices.get(asset)
        if not stock_price:
            logger.warning(f'Актив {asset} не найден')
            return jsonify({'error': 'Актив не найден'}), 404
        
        total_value = amount * stock_price
        if user['assets']['cash']['amount'] < total_value:
            logger.warning(f'Недостаточно средств у пользователя {user_id}')
            return jsonify({'error': 'Недостаточно средств'}), 400
        
        stock_found = False
        for i in range(len(user['assets']['stocks'])):
            if user['assets']['stocks'][i]['name'] == asset:
                stock_found = True
                user['assets']['stocks'][i]['quantity'] += amount
                user['assets']['cash']['amount'] -= total_value
                logger.info(f'Пользователь {user_id} купил {amount} единиц актива {asset} по цене {stock_price} за единицу')
                break
            if user['assets']['cryptocurrencies'][i]['name'] == asset:
                stock_found = True
                user['assets']['cryptocurrencies'][i]['quantity'] += amount
                user['assets']['cash']['amount'] -= total_value
                logger.info(f'Пользователь {user_id} купил {amount} единиц актива {asset} по цене {stock_price} за единицу')
                break
            if user['assets']['metals'][i]['type'] == asset:
                stock_found = True
                user['assets']['metals'][i]['quantity'] += amount
                user['assets']['cash']['amount'] -= total_value
                logger.info(f'Пользователь {user_id} купил {amount} единиц актива {asset} по цене {stock_price} за единицу')
                break
        
        if not stock_found:
            stock = {
                'name': asset,
                'quantity': amount,
                'price': stock_price
            }
            user['assets']['stocks'].append(stock)
            user['assets']['cash']['amount'] -= total_value
            logger.info(f'Пользователь {user_id} купил {amount} единиц актива {asset} по цене {stock_price} за единицу')
        
        financial_assets.delete_one({'userId': int(user_id)})
        financial_assets.insert_one(user)
        logger.info(f'Актив {asset} куплен и долларовый баланс пользователя {user_id} обновлён до {user["assets"]["cash"]["amount"]}')
        return jsonify({'message': 'Актив успешно куплен', 'new_balance_usd': user['assets']['cash']['amount']}), 200

    except Exception as e:
        logger.error(f'Ошибка при покупке актива: {str(e)}')
        return jsonify({'error': str(e)}), 500
        
@app.route('/backend/sellActive', methods=['POST'])
def sellActive():
    logger.info('Запрос на продажу актива')
    data = request.json
    user_id = data.get('userId')
    asset = data.get('assetName')
    amount = data.get('amount')
    type = "stocks"
    logger.info(f'Пользователь {user_id} хочет продать {amount} единиц актива {asset}')
    
    if not user_id or not asset or not amount:
        logger.error('userId, asset и amount обязательны')
        return jsonify({'error': 'userId, asset и amount обязательны'}), 400

    try:
        client = MongoClient('localhost', 6969)
        db = client['assets']
        financial_assets = db['financial_assets']
        user = financial_assets.find_one({'userId': int(user_id)})
        
        if not user:
            logger.warning(f'Пользователь с ID {user_id} не найден')
            return jsonify({'error': 'Пользователь не найден'}), 404
        
        stock_found = False
        stock_price = 0
        total_value = 0

        # Check stocks
        for i in range(len(user['assets']['stocks'])):
            if user['assets']['stocks'][i]['name'] == asset:
                stock_found = True
                stock_price = user['assets']['stocks'][i]['price']
                if user['assets']['stocks'][i]['quantity'] < amount:
                    logger.warning(f'Недостаточно акций для продажи у пользователя {user_id}')
                    return jsonify({'error': 'Недостаточно актива для продажи'}), 400
                total_value = amount * stock_price
                user['assets']['stocks'][i]['quantity'] -= amount
                user['assets']['cash']['amount'] += total_value
                logger.info(f'Пользователь {user_id} продал {amount} акций {asset} по цене {stock_price} за единицу')
                break

        # Check cryptocurrencies
        for i in range(len(user['assets']['cryptocurrencies'])):
            if user['assets']['cryptocurrencies'][i]['name'] == asset:
                stock_found = True
                stock_price = user['assets']['cryptocurrencies'][i]['price']
                if user['assets']['cryptocurrencies'][i]['quantity'] < amount:
                    logger.warning(f'Недостаточно криптовалюты для продажи у пользователя {user_id}')
                    return jsonify({'error': 'Недостаточно актива для продажи'}), 400
                total_value = amount * stock_price
                user['assets']['cryptocurrencies'][i]['quantity'] -= amount
                user['assets']['cash']['amount'] += total_value
                logger.info(f'Пользователь {user_id} продал {amount} криптовалюты {asset} по цене {stock_price} за единицу')
                break

        # Check metals
        for i in range(len(user['assets']['metals'])):
            if user['assets']['metals'][i]['type'] == asset:
                stock_found = True
                stock_price = user['assets']['metals'][i]['price']
                if user['assets']['metals'][i]['quantity'] < amount:
                    logger.warning(f'Недостаточно металла для продажи у пользователя {user_id}')
                    return jsonify({'error': 'Недостаточно актива для продажи'}), 400
                total_value = amount * stock_price
                user['assets']['metals'][i]['quantity'] -= amount
                user['assets']['cash']['amount'] += total_value
                logger.info(f'Пользователь {user_id} продал {amount} металла {asset} по цене {stock_price} за единицу')
                break

        if not stock_found:
            logger.warning(f'Актив {asset} не найден у пользователя {user_id}')
            return jsonify({'error': 'Актив не найден у пользователя'}), 404
        
        # Update user's assets
        financial_assets.delete_one({'userId': int(user_id)})
        financial_assets.insert_one(user)
        logger.info(f'Актив {asset} продан. Новый долларовый баланс пользователя {user_id}: {user["assets"]["cash"]["amount"]}')
        
        return jsonify({'message': 'Актив успешно продан', 'new_balance_usd': user['assets']['cash']['amount']}), 200

    except Exception as e:
        logger.error(f'Ошибка: {str(e)}')
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
    logger.info(f'Вход пользователя с адресом {email}')

    if not email or not password:
        logger.info(f'Пользователь не ввел адрес электронной почты или пароль.')
        return jsonify({'error': 'Пожалуйста, заполните все поля.'}), 400

    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        logger.info(f'Поиск пользователя с адресом {email}')
        cur.execute('SELECT * FROM users WHERE email = %s', (email,))
        # cur.execute('SELECT * FROM users WHERE user = %s', (email,))
        user = cur.fetchone()

        if not user:
            logger.warning(f'Пользователь с адресом {email} не найден.')
            return jsonify({'error': 'Пользователь с таким адресом электронной почты не найден.',
                            'status': 'error'}), 400

        if not checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
            logger.warning(f'Неверный пароль для пользователя с адресом {email}.')
            return jsonify({'error': 'Неверный пароль.',
                            'status': "error"}), 400

        logger.info(f'Пользователь {email} успешно вошел в систему.')
        return jsonify({
            'message': 'Вход выполнен успешно!',
            'user': {
                'id': user['id'],
                'username': user['username'],
                'email': user['email']
            }
        }), 200

@app.route('/assets/getUser', methods=['POST'])
def getUser():
    global financial_assets  # Ensure financial_assets is defined globally
    financial_assets = financial_assets
    user_id = request.json.get('userId')
    logger.info(f'Получение активов для пользователя с ID: {user_id}')
    
    if not user_id:
        return jsonify({"error": "userId is required"}), 400
    print(int(user_id))
    assets = list(financial_assets.find({"userId": int(user_id)}))
    if not assets:
        logger.warning(f'Активы не найдены для пользователя с ID: {user_id}')
        addUserWithId(user_id)
        return jsonify({"message": "No assets found for this user"}), 404
    for asset in assets:
        logger.info(f'Актив найден: {asset}')
        asset["_id"] = str(asset["_id"])
    
    return jsonify(assets), 200

@app.route('/assets/addUser', methods=['POST'])
def addUser():
    data = request.json
    user_id = data.get('userId')
    cash = data.get('cash')
    print(user_id)
    print(data)
    if not user_id:
        logger.error('userId is required')
        return jsonify({"error": "userId is required"}), 400
    logger.info(f'Добавление пользователя {data}')
    new_user = {
        "userId": user_id,
        "assets": {
            "stocks": [],
            "cryptocurrencies": {},
            'cash': {'currency': 'USD', 'amount': 50000},
            "metals": []
        }
    }
    addUserPnL(user_id)
    financial_assets.insert_one(new_user)
    return jsonify({"message": "User added"}), 201

@app.route('/assets/addStock', methods=['POST'])
def addStock():
    user_id = request.json["userId"]
    StockName = request.json["StockName"]
    StockQuantity = request.json["StockQuantity"]
    StockValue = request.json["StockValue"]
    data = request.json
    logger.info(f'Юзер {user_id} добавляет акцию {data["name"]}')
    stock = {
        "name": data["name"],
        "quantity": data["quantity"],
        "value": data["value"]
    }
    financial_assets.update_one({"userId": user_id}, {"$push": {"assets.stocks": stock}})
    return jsonify({"message": "Stock added"}), 201

    

if __name__ == '__main__':
    create_finance_table()
    create_users_table()
    createPnLTable()
    app.run(port=5252)
