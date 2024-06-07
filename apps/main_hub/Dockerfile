FROM node:alpine as builder

WORKDIR /home/node/app

COPY ./package*.json ./

RUN chown -R node:node /home/node/app

USER node

RUN npm install -f

COPY --chown=node:node . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]