FROM node:22

WORKDIR /var/www/html

COPY package.json .

RUN npm install

COPY . .

RUN npm run build
