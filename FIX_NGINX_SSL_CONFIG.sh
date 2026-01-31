#!/bin/bash
# Fix Nginx SSL Configuration - Separate Server Blocks for Each Domain

# Backup current config
cp /etc/nginx/sites-available/alishbatech /etc/nginx/sites-available/alishbatech.backup.$(date +%Y%m%d_%H%M%S)

# Create proper config with separate server blocks
cat > /etc/nginx/sites-available/alishbatech << 'NGINX_EOF'
# HTTP redirect for .in domain
server {
    listen 80;
    server_name alishbatech.in www.alishbatech.in;
    
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }
    
    location / {
        return 301 https://$host$request_uri;
    }
}

# HTTPS for .in domain
server {
    listen 443 ssl http2;
    server_name alishbatech.in www.alishbatech.in;

    ssl_certificate /etc/letsencrypt/live/alishbatech.in/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/alishbatech.in/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

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

# HTTP redirect for .com domain
server {
    listen 80;
    server_name alishbatech.com www.alishbatech.com;
    
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }
    
    location / {
        return 301 https://$host$request_uri;
    }
}

# HTTPS for .com domain
server {
    listen 443 ssl http2;
    server_name alishbatech.com www.alishbatech.com;

    ssl_certificate /etc/letsencrypt/live/alishbatech.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/alishbatech.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

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

echo "✅ Configuration created"
echo "📋 Testing Nginx configuration..."
nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Nginx config test passed"
    echo "🔄 Reloading Nginx..."
    systemctl reload nginx
    echo "✅ Nginx reloaded"
    echo ""
    echo "🧪 Testing domains..."
    echo "Testing alishbatech.in:"
    curl -I https://alishbatech.in 2>&1 | head -5
    echo ""
    echo "Testing alishbatech.com:"
    curl -I https://alishbatech.com 2>&1 | head -5
    echo ""
    echo "✅ Done! Clear browser HSTS cache and test."
else
    echo "❌ Nginx config test failed. Check errors above."
    exit 1
fi
