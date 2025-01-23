from node:22-alpine

WORKDIR /app

COPY package.json index.js .
RUN npm install

ENTRYPOINT ["npm", "start"]
