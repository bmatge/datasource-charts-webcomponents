#!/bin/bash

# Script de déploiement pour chartsbuilder.matge.com
# Usage: ./deploy.sh

set -e

echo "🚀 Déploiement de gouv-widgets..."

# Couleurs pour les logs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}1/4${NC} Arrêt des conteneurs..."
docker compose down

echo -e "${YELLOW}2/4${NC} Mise à jour du code..."
git pull

echo -e "${YELLOW}3/4${NC} Build de l'image (sans cache)..."
docker compose build --no-cache

echo -e "${YELLOW}4/4${NC} Démarrage des conteneurs..."
docker compose up -d

echo -e "${GREEN}✅ Déploiement terminé !${NC}"
echo ""
echo "📊 Status:"
docker compose ps
echo ""
echo "🔗 URL: https://chartsbuilder.matge.com"
