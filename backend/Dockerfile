# Use official Node image
FROM node:18-slim

# Set working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./ || true
RUN npm install

# Copy the rest of the application source
COPY . .

# Expose port (default 5000)
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
