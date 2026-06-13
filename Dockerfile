# syntax=docker/dockerfile:1

# ---- Build stage ----------------------------------------------------------
# Pinned to the Node version used locally. bookworm-slim (glibc) is chosen
# over alpine (musl) so native modules added later (e.g. better-sqlite3 in
# Stage 1) can use prebuilt glibc binaries instead of recompiling.
FROM node:22.14.0-bookworm-slim AS build
WORKDIR /app

# Install dependencies from the lockfile for a reproducible tree.
COPY package.json package-lock.json ./
RUN npm ci

# Build the Nuxt app. routeRules prerender '/' and '/blog/**' to static HTML;
# the rest is compiled into the Node server output at .output/server.
COPY . .
RUN npm run build

# ---- Runtime stage --------------------------------------------------------
FROM node:22.14.0-bookworm-slim AS runtime
WORKDIR /app

ENV NODE_ENV=production
# Nitro reads these at runtime; Coolify maps the container port for you.
ENV NITRO_PORT=3000
ENV NITRO_HOST=0.0.0.0

# Only the self-contained build output is needed at runtime — no node_modules.
COPY --from=build /app/.output ./.output

# Drop root for the running process (the node image ships an unprivileged user).
USER node

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
