# # pull the official base image

# FROM node:current-alpine

# # set working direction

# WORKDIR /product-phase-ui

# # add `/app/node_modules/.bin` to $PATH

# ENV PATH /product-phase-ui/node_modules/.bin:$PATH

# # install application dependencies

# COPY package.json ./

# COPY package-lock.json ./

# RUN npm i

# # add app

# COPY . ./

# # start app

# CMD ["npm", "start"]

# pull the official base image

FROM node:current-alpine

# set working direction

WORKDIR /product-phase-ui

# add `/app/node_modules/.bin` to $PATH

ENV PATH /product-phase-ui/node_modules/.bin:$PATH

# install application dependencies

COPY package.json ./

COPY package-lock.json ./

RUN npm i

# add app

COPY . ./

# start app

CMD ["npm", "start"]