#!/bin/bash
set -e

echo "======================================"
echo " お菓子のみよしや LP - デプロイ"
echo "======================================"

# 最新コードを取得
git pull origin main

# コンテナを再ビルド・再起動
docker compose -f docker-compose.prod.yml --env-file .env.production build --no-cache
docker compose -f docker-compose.prod.yml --env-file .env.production down
docker compose -f docker-compose.prod.yml --env-file .env.production up -d

echo ""
echo "✅ デプロイ完了！"
echo "🌐 http://$(hostname -I | awk '{print $1}'):3000"
