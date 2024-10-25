
FROM python:3.9-alpine

WORKDIR /app

# Копируйте файл requirements.txt в контейнер
COPY requirements.txt .

# Установите зависимости
RUN apk update && apk add --no-cache python3 && \
    pip install --no-cache-dir -r requirements.txt

# Копируем остальные файлы вашего приложения
COPY . .

# Запускаем приложение
CMD ["python3", "your_script.py"]  # Замените на ваше приложение
