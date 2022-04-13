FROM node:lts

RUN apt update
RUN apt install -y build-essential python3-dev

WORKDIR /app/angular
ADD ./angular/package.json /app/angular/package.json
ADD ./angular/package-lock.json /app/angular/package-lock.json
RUN npm i

WORKDIR /app
ADD ./package.json /app
ADD ./package-lock.json /app
RUN npm install

ADD . /app
WORKDIR /app/angular
RUN npm run build
WORKDIR /app
RUN npm run build
CMD npm start
