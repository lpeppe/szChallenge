FROM node:11
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm i -g @adonisjs/cli
RUN npm install
COPY . /usr/src/app
EXPOSE 3333
CMD ["adonis", "serve"]