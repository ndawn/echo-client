FROM node:14-alpine as dist

WORKDIR /client

COPY . .

RUN npm install
RUN npm run build

FROM nginx:mainline-alpine

WORKDIR /client

COPY --from=dist /client/dist .
COPY --from=dist /client/echo_client_nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
