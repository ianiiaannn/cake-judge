FROM node:lts AS ANGULAR

RUN apt update
RUN apt install -y build-essential python3-dev

ADD ./angular /app/angular
WORKDIR /app/angular
RUN npm i
RUN npm run build

# FROM node:lts AS NODE
WORKDIR /app
ADD ./package.json /app
ADD ./package-lock.json /app
USER root
RUN npm i
ADD . /app
# COPY --from=ANGULAR /app/angular /app/angular
RUN npm run build
CMD npm start
