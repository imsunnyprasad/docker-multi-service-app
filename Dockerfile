# Stage 1: Build Stage (using a fuller image to install dependencies)
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json first to take advantage of Docker cache
COPY api/package*.json ./

RUN npm install

# Copy the rest of the application code
COPY api/ .

# Stage 2: Production Stage (using a smaller base image for security and size)
FROM node:18-alpine

WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server.js .

# Expose the port the app runs on (documentation)
EXPOSE 3000

# Set the command to run the application
CMD ["node", "server.js"]
