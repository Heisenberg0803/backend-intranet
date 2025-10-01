# Etapa 1: build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

# Etapa 2: runtime
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app ./

# aplica migrations no start
CMD npx prisma migrate deploy && npm run start
