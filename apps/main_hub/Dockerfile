FROM node:alpine as builder

WORKDIR /app

COPY ./package*.json ./

RUN npm install -f --production

COPY ./ ./

RUN npm run build

EXPOSE 3000

USER node

CMD [ "npm", "start" ]
