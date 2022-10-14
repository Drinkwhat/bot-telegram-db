# Installs Node.js image
FROM node:16.13.1-alpine3.14
# sets the working directory for any RUN, CMD, COPY command
# all files we put in the Docker container running the server will be in /usr/src/app (e.g. /usr/src/app/package.json)
WORKDIR /usr/src/app

# Copies package.json, package-lock.json, tsconfig.json, .env to the root of WORKDIR
COPY  package.json ./

# Copies everything in the src directory to WORKDIR/src
COPY . .
EXPOSE ${PORT}
# Installs all packages
RUN npm install
RUN npm run build

# Runs the dev npm script to build & start the server
CMD npm start 