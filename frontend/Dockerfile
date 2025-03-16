# Use Node.js as the base image for the build stage
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire frontend source code and build the app
COPY . .
RUN npm run build

# Use Nginx to serve the built frontend
FROM nginx:alpine

# Copy the built frontend files to Nginx's default directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port for the frontend server
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
