FROM node:18-alpine

WORKDIR /home/node/app

COPY ./package.json ./yarn.lock ./

RUN chown -R node:node /home/node/app

USER node

RUN yarn

COPY --chown=node:node . .

EXPOSE 3002

CMD [ "yarn", "start:linux" ]