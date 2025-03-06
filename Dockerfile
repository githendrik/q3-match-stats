FROM node:18 AS build

WORKDIR /usr/src/app

ADD . .

RUN npm ci
RUN npm run build

FROM node:18 AS prod

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/.output /usr/src/app/.output
COPY entrypoint.sh entrypoint.sh

CMD ["sh" , "entrypoint.sh"]