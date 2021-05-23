FROM node:14-alpine

WORKDIR /client

COPY . .

RUN npm install
RUN npm run build

CMD ["/bin/sh"]
