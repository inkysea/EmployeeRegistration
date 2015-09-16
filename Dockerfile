# VERSION 0.2
# DOCKER-VERSION 0.3.4
# To build:
# 1. Install docker (http://docker.io)
# 2. Checkout source: git@github.com:gasi/docker-node-hello.git
# 3. Build container: docker build .


FROM node:0.10

EXPOSE 3000

# App
ADD ./package.json /tmp/package.json

RUN cd /tmp && \
    npm install && \
    npm install -g nodemon && \
    npm install express \
    npm install mongodb \
    npm install stylus

RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

ADD . /opt/app

WORKDIR /opt/app

# Execute nodemon on the /app/index.js file. nodemon will poll the file for updates.
CMD ["nodemon", "/opt/app/app.js"]