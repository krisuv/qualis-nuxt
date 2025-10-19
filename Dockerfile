# Use Node.js 20.19.0 specifically
FROM node:20.19.0-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (needed for build)
RUN npm ci

# Copy source code
COPY . .

# Set default environment variables
ENV API_BASE_URL=""
ENV RECAPTCHA_SITE_KEY=""
ENV RECAPTCHA_PRIVATE_KEY=""

# Build the application
RUN npm run generate

# Install a simple static file server
RUN npm install -g serve

# Show build output for debugging (optional, won't fail build)
RUN echo "=== Build output check ===" && \
    ls -la .output/ 2>/dev/null || echo "No .output directory" && \
    ls -la .output/public/ 2>/dev/null || echo "No .output/public directory"

# Expose port
EXPOSE 3000

# Start the application
CMD ["serve", "-s", ".output/public", "-l", "3000", "-n"]
