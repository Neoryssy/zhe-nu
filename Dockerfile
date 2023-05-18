FROM node:18.16.0

WORKDIR /app
COPY package*.json /app
RUN npm ci --omit=dev && npm install typescript -g
COPY . .

CMD ["npm", "start"]
