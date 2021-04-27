FROM node:14-alpine

WORKDIR /comm

COPY package*.json ./

RUN npm install

COPY . .

#EXPOSE 3002

CMD [ "node" , "comm.js"]