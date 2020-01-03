FROM postgres:latest

COPY ./postgres-init/init.sql /docker-entrypoint-initdb.d/

FROM node:alpine

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/app

COPY package*.json ./
RUN yarn install

COPY . .

EXPOSE 3333

CMD [ "yarn", "start:prod" ]
