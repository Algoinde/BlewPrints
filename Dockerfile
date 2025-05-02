FROM node:22-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000
ENV BODY_SIZE_LIMIT=3000000
CMD ["node", "build/index.js"]
