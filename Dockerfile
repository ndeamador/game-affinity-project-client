FROM node:16-alpine3.11 AS build-image
WORKDIR /usr/src/gap-client

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build


FROM nginx:1.19.10-alpine

COPY --from=build-image /usr/src/gap-client/build /usr/share/nginx/html

RUN adduser -D appuser
USER appuser