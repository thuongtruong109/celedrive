FROM node:alpine

WORKDIR /app

COPY ./package*.json ./

RUN yarn

COPY ./ ./

RUN yarn build

EXPOSE 3002

USER node

CMD [ "yarn", "start" ]