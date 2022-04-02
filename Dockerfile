FROM node:lts AS ANGULAR

ADD ./angular /app/angular
WORKDIR /app/angular
RUN npm i
RUN npm run build

FROM node:lts

RUN apt update
RUN apt install -y build-essential python3-dev
WORKDIR /app
ADD ./package.json /app
ADD ./package-lock.json /app
USER root
RUN npm i
ADD . /app
COPY --from=ANGULAR /app/angular/dist /app/angular/dist
RUN npm run build
CMD ["npm", "start"]
