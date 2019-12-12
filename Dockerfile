FROM node:11.12.0-alpine

WORKDIR /home/nodejs/app

RUN npm install -g nodemon yarn

COPY package.json .

#COPY . .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["yarn","start:dev"]