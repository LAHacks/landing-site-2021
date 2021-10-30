FROM node:alpine
MAINTAINER cobular
WORKDIR /app
COPY server/package.json .
COPY server/package-lock.json .
RUN npm install --only=production
COPY server/server.js .
VOLUME ["/app/build"]
EXPOSE 3030
CMD ["npm", "run", "serve"]
