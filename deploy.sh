#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

export PATH=$PATH:/root/.nvm/versions/node/v24.14.1/bin

echo "🚀 Starting deployment..."

cd /var/www/website_landing_page

echo "📦 Pulling latest code..."
git pull origin main

# server setup



echo "Enter server folder"
cd /var/www/website_landing_page/server

echo "📥 Installing dependencies..."
pnpm install

echo "🔨 Building app..."
pnpm run build

echo "🔄 Restarting PM2..."
pm2 restart idokan_server

# client setup

echo "Enter client folder"
cd /var/www/website_landing_page/client 

echo "📦 Pulling latest code..."
git pull origin main

echo "📥 Installing dependencies..."
pnpm install

echo "🔨 Building app..."
pnpm run build

echo "🔄 Restarting PM2..."
pm2 restart idokan_client

echo "✅ Deployment done!" 