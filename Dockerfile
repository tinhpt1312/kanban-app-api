######################--------------- BASE STAGE ---------------######################
FROM node:20-alpine AS base

# Define environment variables for paths
ENV APP_HOME=/usr/src/app

# Set up working directory
WORKDIR $APP_HOME


######################--------------- DEPENDENCIES STAGE ---------------######################
FROM base AS deps

COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --network-timeout 1200000 && yarn cache clean


######################--------------- BUILDER STAGE ---------------######################
FROM base AS builder

COPY --from=deps $APP_HOME/node_modules ./node_modules

COPY . .
RUN yarn build


######################--------------- RUNNER STAGE ---------------######################
FROM base AS runner

ENV NODE_ENV=production

COPY --from=deps $APP_HOME/node_modules/ ./node_modules/
COPY --from=builder $APP_HOME/dist/ ./dist/

EXPOSE 3000
CMD ["node", "dist/main.js"]
