# Use the official Node.js image with the specified version as the base image Use the official Node.js image with the specified version as the base image
FROM node:20

# create and set the working directory
WORKDIR /app/server

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install --only=production

# Copy the rest of the application files to the working directory
COPY . .


# Set environment variables
ENV PORT=5000

# YOUR SHORT DOMAIN NAME URL
ENV SHORTCUT_URL_DOMAIN = "http://localhost:5000"

#JWT Secure key
ENV SecretKey = "shuuuu...."

# MYSQL Credentials
ENV MYSQL_HOST = "localhost"
ENV MYSQL_USER = "root"
ENV MYSQL_PASSWORD = ""
ENV MYSQL_DATABASE_NAME = "url_shorter"

# Expose the port
EXPOSE $PORT

# Start the application
CMD ["npm", "start"]
