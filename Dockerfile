FROM node:14

# Add MongoDB
FROM mongo:latest
VOLUME ["mongodb-data:/data/db"]


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3005

CMD [ "node","mongod","app.js" ]