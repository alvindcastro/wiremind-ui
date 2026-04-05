# Stage 1: Build the React application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package management files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
# Note: PHASES.md U7.1 specifies node:20-alpine -> nginx:1.27-alpine
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:1.27-alpine

# Copy the build output from the builder stage
# Vite's default output directory is 'dist'
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 (standard for HTTP)
EXPOSE 80

# The default command for nginx:alpine starts the server
CMD ["nginx", "-g", "daemon off;"]
