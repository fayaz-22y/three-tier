# Use Node base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Make sure uploads folder exists inside container
RUN mkdir -p /app/uploads
COPY uploads /app/uploads

# Expose backend port
EXPOSE 5000

# Start the app
CMD ["npm", "start"]

