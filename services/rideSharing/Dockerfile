FROM node:14

WORKDIR /rideSharing

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD [ "node" , "rs.js"]