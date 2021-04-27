FROM node:14-alpine

WORKDIR /rating

COPY package*.json ./

RUN npm install

COPY . .

#EXPOSE 3003

CMD [ "node" , "rating.js"]