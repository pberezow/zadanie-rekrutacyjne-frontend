# FROM node:13.12.0-alpine

# WORKDIR /app

# # add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# # install app dependencies
# COPY ./package.json ./package.json
# COPY ./package-lock.json ./package-lock.json
# RUN npm install --silent

# # add app
# COPY ./src ./src
# COPY ./public ./public
# COPY ./.env ./.env

# # start app
# CMD ["npm", "start"]

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
COPY --from=builder /code/build ./build

RUN npm install -g serve

ENTRYPOINT serve -s build -l 8080