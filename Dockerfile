
FROM node:16
ENV NODE_ENV=production

WORKDIR /app
COPY src/ /app
RUN npm install --production


EXPOSE 3000
CMD [ "node", "server.js" ]
