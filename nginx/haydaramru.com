upstream haydaramru_app {
    server 127.0.0.1:3000;
    keepalive 16;
}

server {
    listen 2602;
    server_name haydaramru.com www.haydaramru.com;

    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
    gzip_min_length 256;

    # Serve static assets directly
    location /assets/ {
        alias /app/dist/client/assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    location / {
        proxy_pass http://haydaramru_app;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Connection "";
    }
}
