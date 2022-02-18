FROM node:16-alpine

WORKDIR /src
COPY package*.json /
COPY ./src /src
COPY ./app /app
EXPOSE 3000

RUN touch ../app/.env && echo "NEXT_PUBLIC_API_HOST=\"\"" > ../app/.env
RUN cd ../app && npm i && npm run build && cd ..
CMD npm i && npm start