# Use Node LTS on Alpine Linux
FROM node:lts-alpine
EXPOSE 4000
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install -g @angular/cli
COPY . /app
RUN ng build --configuration=production
COPY dist/openai-whisper-client /app/
RUN ls -la
CMD [ "sh", "-c", "node server/server.mjs" ]


