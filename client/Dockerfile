FROM node:12 as build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
ARG configuration=production
RUN npm run build -- --outputPath=./dist/out --configuration 

FROM nginx
COPY --from=build /usr/src/app/dist/out/ /usr/share/nginx/html
COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
