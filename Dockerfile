# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY packages/shared/package.json packages/shared/
COPY apps/favorites/package.json apps/favorites/
COPY apps/playground/package.json apps/playground/
COPY apps/sources/package.json apps/sources/
COPY apps/builder-ia/package.json apps/builder-ia/
COPY apps/builder/package.json apps/builder/
RUN npm ci
COPY . .
RUN npm run build:all
RUN node scripts/build-app.js

# Production stage - Nginx pour servir les fichiers statiques
FROM nginx:alpine

# Copier la config nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier tous les fichiers depuis app-dist
COPY --from=builder /app/app-dist /usr/share/nginx/html

# Copier les fichiers publics
COPY --from=builder /app/public /usr/share/nginx/html/public

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
