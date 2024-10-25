FROM python:3.11-alpine

COPY requirements.txt /app/requirements.txt
COPY bot.py app/bot.py
WORKDIR /app

RUN apk update && apk add --no-cache \
    clang-dev \
    alpine-sdk \
    dpkg \
    ccache \
    python3 \
    wget \
    unzip

RUN pip install --upgrade pip
RUN pip install -r requirements.txt --index-url=https://pypi.org/simple


CMD ["python3", "bot.py"]