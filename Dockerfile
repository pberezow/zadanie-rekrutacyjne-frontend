FROM node:13.12.0-alpine as builder

ARG REACT_APP_SERVER_BASE_URL

WORKDIR /code

# COPY ./ .
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install --silent

# add app
COPY ./src ./src
COPY ./public ./public
COPY ./.env* ./


RUN npm install \
    && npm run build


FROM node:13.12.0-alpine as final

WORKDIR /app
COPY --from=builder /code/build ./

COPY ./.env* ./

RUN npm install -g serve

EXPOSE $PORT

ENTRYPOINT serve -s /app/build -l $PORT