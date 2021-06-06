FROM node:15
WORKDIR /usr/src/app
ADD src ./src
ADD public ./public
COPY package*.json .env tsconfig.json ./
RUN npm install
RUN npm i -g nodemon
RUN npm i -g express
EXPOSE 3006
CMD ["ls"]
CMD ["ls", "src/"]
CMD ["nodemon", "src/app.ts"]