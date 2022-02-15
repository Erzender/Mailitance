FROM node:16-alpine

WORKDIR /src
COPY package*.json /
COPY ./src /src
COPY ./app /app
EXPOSE 3000

RUN cd ../app && npm i && npm run build && cd ..
CMD npm i && npm start