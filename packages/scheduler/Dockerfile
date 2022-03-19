FROM node:14.16.1-alpine3.13

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn install --production
COPY . /app/

ENV NODE_ENV development

EXPOSE 3000

CMD node server.js