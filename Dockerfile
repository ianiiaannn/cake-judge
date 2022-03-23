FROM lypnol/isolate AS ISOLATE

FROM gcc:latest

FROM node
COPY --from=ISOLATE / /

RUN mkdir /tmp/cake-judge
WORKDIR /app
ADD . /app
USER root
RUN npm i
RUN npm run build
CMD npm run start
