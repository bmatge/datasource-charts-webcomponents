# Build stage (optionnel, pour compiler si nécessaire)
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

# Copier les fichiers statiques
COPY --from=builder /app/dist /usr/share/nginx/html/dist
COPY index.html /usr/share/nginx/html/
COPY builder.html /usr/share/nginx/html/
COPY builderIA.html /usr/share/nginx/html/
COPY sources.html /usr/share/nginx/html/
COPY playground.html /usr/share/nginx/html/
COPY demo /usr/share/nginx/html/demo
COPY public /usr/share/nginx/html/public

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
