# Temel imaj olarak Nginx kullan
FROM nginx:alpine

# Çalışma dizinini ayarla
WORKDIR /usr/share/nginx/html

# Mevcut dizindeki tüm dosyaları konteynere kopyala
COPY . .

# Nginx çalıştır
CMD ["nginx", "-g", "daemon off;"]
