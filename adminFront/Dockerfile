FROM alpine:latest

COPY . /app

WORKDIR /app

RUN apk add npm
RUN npm install

RUN npm run build
CMD [ "npm", "run", "preview" ]