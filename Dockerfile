FROM node:18

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

USER node

ENV PORT=5000

EXPOSE 5000

CMD ["npm", "run", "dev"]