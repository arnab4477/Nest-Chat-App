FROM node:16

WORKDIR /server

# Installing the dependancies beforehand so that docker can cache it for opyimization
COPY package*.json ./

# Only install the production dependancies and omit dev dependancies
RUN npm ci

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start:dev"]