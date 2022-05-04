FROM node:16

WORKDIR /backend-app
COPY package.json /backend-app/
RUN npm config set unsafe-perm true
RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install node-fetch@2.6.1
RUN npm install
RUN npm install --save-dev sequelize-cli-typescript
COPY . /backend-app/
EXPOSE 8080
CMD [ "npm", "run", "start:dev"]