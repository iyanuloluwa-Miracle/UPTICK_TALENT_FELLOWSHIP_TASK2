# Stage 1: Build the Node.js application
FROM node:14 AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3005

CMD [ "node", "app.js" ]

# Stage 2: Create the final image with MongoDB
FROM mongo:latest

# Copy the Node.js application files from the build stage
COPY --from=build /usr/src/app /usr/src/app

# Set the working directory
WORKDIR /usr/src/app

# Expose the port (if needed)
EXPOSE 3005

# Start your Node.js application
CMD [ "node", "app.js" ]
