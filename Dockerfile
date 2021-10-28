FROM gcc:latest
RUN mkdir /tmp/cake-judge

FROM node
WORKDIR /app
ADD . /app
USER root
RUN npm i
CMD node .
