FROM alpine:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN rm .env
RUN mv .env.docker .env
RUN apk add nodejs npm
RUN npm install
EXPOSE 3000
#SETTING UP PRISMA
RUN npm install -g prisma
CMD ["npm", "run", "build"]