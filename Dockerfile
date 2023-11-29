# Use the official Node.js 20 slim image as the base image
FROM node:20-slim AS base

# Set the environment variable for PNPM home
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Enable corepack to use pnpm
RUN corepack enable

# Copy your application files to the /app directory in the container
COPY . /app
WORKDIR /app

# Install production dependencies in a separate stage
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# Build the application in a separate stage
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# Final stage: Copy the production dependencies and the built application
FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

# Set the default command to run the CLI
ENTRYPOINT ["node", "dist/index.js"]