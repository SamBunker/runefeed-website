# ── Build stage ──
FROM node:20-alpine AS build
WORKDIR /build
COPY package*.json ./
RUN npm ci --quiet
COPY . .
# VITE_WS_URL is baked in at build time — set it in docker-compose
ARG VITE_WS_URL=ws://localhost:3900
ENV VITE_WS_URL=$VITE_WS_URL
RUN npm run build

# ── Serve stage ──
# Use a minimal static file server (no Node.js at runtime)
FROM nginx:alpine
COPY --from=build /build/dist /usr/share/nginx/html
# SPA fallback — all routes serve index.html
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf
EXPOSE 80
