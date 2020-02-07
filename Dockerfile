# Base Image
FROM node:10-alpine

# Not sure about this line
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# set the working directory
WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD ["node", "app.js"]

