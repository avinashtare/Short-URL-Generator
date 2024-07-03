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
ENV SERVER_URL=http://localhost:5000
ENV VITE_Server_URL=$SERVER_URL

# Expose the port
EXPOSE 5173


# Start the application
CMD ["npm", "run", "dev","--","--host"]
