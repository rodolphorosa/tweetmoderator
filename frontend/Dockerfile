FROM node:16.13.1

LABEL version="1.0"
LABEL description="Essa é a imagem Docker para o frontend do moderador de tweets."
LABEL maintainer = ["rodolphorosa05@gmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]