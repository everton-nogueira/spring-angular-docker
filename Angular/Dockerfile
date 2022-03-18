FROM node:latest as angular
WORKDIR /app-angular
COPY package.json /app-angular
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular /app-angular/dist/angular /usr/share/nginx/html
COPY ./conf/nginx.conf /etc/nginx/conf.d/default.conf


