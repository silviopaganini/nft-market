FROM node:15.8.0

WORKDIR /usr/app
COPY . .

RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]
