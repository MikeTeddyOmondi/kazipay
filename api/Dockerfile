FROM node:18.18.2-alpine AS base
WORKDIR /app

FROM base AS install
COPY package.json ./
RUN npm install
COPY . .
ENV NODE_ENV=production
USER node
EXPOSE 3489/tcp
CMD [ "node", "./src/index.js" ]

