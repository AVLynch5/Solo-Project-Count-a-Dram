FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start"]