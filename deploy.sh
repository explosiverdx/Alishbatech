#!/bin/bash

# AlishbaTech Deployment Script
# Run this script on your server to deploy the application

set -e  # Exit on error

echo "🚀 Starting AlishbaTech Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Please run as root${NC}"
    exit 1
fi

# Update system
echo -e "${YELLOW}Updating system packages...${NC}"
apt update && apt upgrade -y

# Install Node.js if not installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Installing Node.js...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
fi

# Install Nginx if not installed
if ! command -v nginx &> /dev/null; then
    echo -e "${YELLOW}Installing Nginx...${NC}"
    apt install -y nginx
fi

# Install PM2 if not installed
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}Installing PM2...${NC}"
    npm install -g pm2
fi

# Install Certbot if not installed
if ! command -v certbot &> /dev/null; then
    echo -e "${YELLOW}Installing Certbot...${NC}"
    apt install -y certbot python3-certbot-nginx
fi

# Navigate to project directory
PROJECT_DIR="/var/www/Alishbatech"
cd $PROJECT_DIR

# Setup Backend
echo -e "${YELLOW}Setting up backend...${NC}"
cd backend
npm install --production

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file for backend...${NC}"
    cat > .env << EOF
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb://localhost:27017/alishbatech
JWT_SECRET=$(openssl rand -base64 32)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
EOF
    echo -e "${GREEN}Backend .env created. Please edit it with your actual values.${NC}"
fi

# Setup Frontend
echo -e "${YELLOW}Setting up frontend...${NC}"
cd ../frontend
npm install

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file for frontend...${NC}"
    echo "VITE_API_URL=https://alishbatech.in/api" > .env
fi

# Build frontend
echo -e "${YELLOW}Building frontend...${NC}"
npm run build

# Setup Nginx
echo -e "${YELLOW}Configuring Nginx...${NC}"
cat > /etc/nginx/sites-available/alishbatech.in << 'NGINX_EOF'
server {
    listen 80;
    server_name alishbatech.in www.alishbatech.in;

    root /var/www/Alishbatech/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
NGINX_EOF

# Enable site
ln -sf /etc/nginx/sites-available/alishbatech.in /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and restart Nginx
nginx -t
systemctl restart nginx

# Setup PM2
echo -e "${YELLOW}Setting up PM2...${NC}"
cd $PROJECT_DIR/backend
pm2 delete alishbatech-backend 2>/dev/null || true
pm2 start src/server.js --name alishbatech-backend
pm2 save

# Setup firewall
echo -e "${YELLOW}Configuring firewall...${NC}"
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo -e "${GREEN}✅ Deployment setup complete!${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Edit /var/www/Alishbatech/backend/.env with your actual values"
echo "2. Setup MongoDB (local or Atlas)"
echo "3. Run: certbot --nginx -d alishbatech.in -d www.alishbatech.in"
echo "4. Configure DNS records to point to this server"
echo "5. Restart backend: pm2 restart alishbatech-backend"
