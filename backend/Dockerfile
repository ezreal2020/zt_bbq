# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire backend source code
COPY . .

# Expose the port for the backend server
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
