#!/bin/bash

# Update script for AlishbaTech
# Run this to update the application after code changes

set -e

PROJECT_DIR="/var/www/Alishbatech"
cd $PROJECT_DIR

echo "🔄 Updating AlishbaTech..."

# Pull latest code
echo "📥 Pulling latest code..."
git pull origin main

# Update backend
echo "🔧 Updating backend..."
cd backend
npm install --production
pm2 restart alishbatech-backend

# Update frontend
echo "🎨 Updating frontend..."
cd ../frontend
npm install
npm run build

# Reload Nginx
echo "🔄 Reloading Nginx..."
systemctl reload nginx

echo "✅ Update complete!"
