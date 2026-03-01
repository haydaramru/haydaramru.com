# Stage 1: builder
FROM oven/bun:1-alpine AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build
RUN bun build server.ts --outfile dist/entry.js --target bun --external "./dist/server/server.js"

# Stage 2: runner — nginx + bun in one container
FROM oven/bun:1-alpine
RUN apk add --no-cache nginx supervisor

WORKDIR /app
ENV NODE_ENV=production

# Copy built app
COPY --from=builder /app/dist ./dist

# Copy nginx config
COPY nginx/haydaramru.com /etc/nginx/http.d/default.conf

# Copy supervisord config
COPY supervisord.conf /etc/supervisord.conf

# Create nginx cache/temp directories
RUN mkdir -p /var/lib/nginx/tmp && chown -R bun:bun /var/lib/nginx /var/log/nginx /run/nginx

EXPOSE 2602
CMD ["supervisord", "-c", "/etc/supervisord.conf"]
