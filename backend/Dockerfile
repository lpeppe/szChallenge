FROM node:11
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm i
RUN npm i -g @adonisjs/cli
COPY . /usr/src/app
RUN adonis migration:refresh
RUN adonis seed
EXPOSE 3333
CMD ["adonis", "serve"]