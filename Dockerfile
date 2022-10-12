FROM node:18

EXPOSE 7000

WORKDIR /app

RUN apt-get update

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
