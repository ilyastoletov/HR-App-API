FROM node:19 AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build
# RUN npx prisma generate

EXPOSE 3000
CMD [ "npm", "run", "start:dev" ]
