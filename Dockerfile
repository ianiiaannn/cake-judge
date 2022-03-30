FROM lypnol/isolate AS ISOLATE

FROM gcc:latest AS GCC
FROM openjdk:latest AS JAVA
FROM python:latest AS PYTHON

FROM node
COPY --from=ISOLATE / /
COPY --from=GCC / /
COPY --from=JAVA / /
COPY --from=PYTHON / /

WORKDIR /app
ADD ./package.json /app
ADD ./package-lock.json /app
USER root
RUN npm i
ADD . /app
RUN npm run build
CMD npm run start
