FROM node:18.17.0-alpine

ENV APP_HOME=/usr/src/app

WORKDIR $APP_HOME

# Install necessary packages for HTTPS
RUN apk add --no-cache openssl

# Copy package files first for better caching
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code and SSL certificates
COPY . .

# Build the application
RUN yarn build

# Remove development dependencies
RUN yarn install --production --frozen-lockfile

# Expose both HTTP and HTTPS ports
EXPOSE ${APP_PORT:-3000}
EXPOSE 443

# Command to run the application
CMD ["yarn", "start:prod"]