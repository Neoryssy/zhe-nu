FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

ENV PRODUCTION true

VOLUME ["/app/logs"]

CMD ["npm", "start"]
