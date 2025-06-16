# Use official Node.js LTS image
FROM node:20

# Set working directory
WORKDIR /app

# Install dependencies first (cache efficiently)
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application
COPY . .

# Set environment variables (optional)
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["node", "server.js"]
