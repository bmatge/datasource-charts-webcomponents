# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage - Nginx pour servir les fichiers statiques
FROM nginx:alpine

# Copier la config nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier tous les fichiers statiques depuis le builder
COPY --from=builder /app/dist /usr/share/nginx/html/dist
COPY --from=builder /app/index.html /usr/share/nginx/html/
COPY --from=builder /app/builder.html /usr/share/nginx/html/
COPY --from=builder /app/builderIA.html /usr/share/nginx/html/
COPY --from=builder /app/sources.html /usr/share/nginx/html/
COPY --from=builder /app/playground.html /usr/share/nginx/html/
COPY --from=builder /app/demo /usr/share/nginx/html/demo
COPY --from=builder /app/public /usr/share/nginx/html/public

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
