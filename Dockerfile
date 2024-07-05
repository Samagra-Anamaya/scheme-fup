FROM node:16 AS builder

# Create app directory
WORKDIR /app

# copy dependency files
COPY package.json ./
COPY package-lock.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY . .

RUN npm run build

FROM node:16

WORKDIR /app


COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["npm", "run", "start:migrate:prod"]
