# Use Node.js 20 LTS
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

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

# Expose port
EXPOSE 3000

# Start the application
CMD ["serve", "-s", ".output/public", "-l", "3000"]
