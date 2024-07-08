# Use the official Node.js image with the specified version as the base image Use the official Node.js image with the specified version as the base image
FROM node:20

# create and set the working directory
WORKDIR /app/client

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .


# Set environment variables
ENV VITE_Server_URL=http://localhost:5000

ENV PORT=3000

# Expose the port
EXPOSE $PORT

# building react application
RUN npm run build

# jump to the serve directory
WORKDIR /app/client/serve

# Install the dependencies
RUN npm install

CMD ["npm", "start"]
