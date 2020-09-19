FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

ENV SERVER_PORT 3000
ENV REPOSITORY_FILE_PATH employees-dev.txt
ENV REPOSITORY_FILE_ENCODING utf8

CMD [ "node", "build/index.js" ]
