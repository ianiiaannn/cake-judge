FROM node:lts

RUN apt update
RUN apt install -y build-essential python3-dev \
  # https://groups.google.com/g/open-lighting/c/gt-iuxiwWRU
  libtool autoconf bison flex make python-protobuf python-numpy protobuf-compiler libprotobuf-dev libftdi-dev libftdi1 uuid-dev libcppunit-dev libmicrohttpd-dev libprotobuf-dev libprotoc-dev zlib1g-dev libusb-1.0-0-dev liblo-dev libavahi-client-dev \
  # for building the nsjail
  libnl-3-dev libnl-route-3-dev

# fake root
RUN mkdir /chroot
# fix net.h
RUN ln -s /usr/include/libnl3/netlink /usr/include/netlink
# build nsjail
WORKDIR /app/nsjail
ADD ./nsjail .
RUN make

# install frontend dependencies
WORKDIR /app/angular
ADD ./angular/package.json /app/angular/package.json
ADD ./angular/package-lock.json /app/angular/package-lock.json
RUN npm i

# install backend dependencies
WORKDIR /app
ADD ./package.json /app
ADD ./package-lock.json /app
RUN npm install

# build frontend and backend
ADD . /app
WORKDIR /app/angular
RUN npm run build
WORKDIR /app
RUN npm run build

# RUN!
CMD npm start
