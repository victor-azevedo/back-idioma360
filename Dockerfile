FROM node:16.20.0

WORKDIR /app

COPY . .

RUN npm cache clean --force && \
    npm install -g npm@latest && \
    npm install

RUN npm run build

CMD ["npm", "run", "start:migrate"]