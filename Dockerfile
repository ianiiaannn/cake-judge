FROM node
WORKDIR /app
ADD . /app
RUN npm i
CMD node .
