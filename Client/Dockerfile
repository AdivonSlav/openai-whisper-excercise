# Use Node LTS on Alpine Linux
FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json .
RUN npm install
RUN npm install -g @angular/cli
COPY . .
RUN ng build --configuration=production

FROM node:lts-alpine AS base
EXPOSE 4000
WORKDIR /app
COPY --from=build /app/dist/openai-whisper-client .
CMD [ "sh", "-c", "node server/server.mjs" ]



