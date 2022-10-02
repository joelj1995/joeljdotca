#!/bin/bash
touch /tmp/init-script-ran

# Wordpress configuration
sudo apt update -y
sudo apt install -y apache2 \
  ghostscript \
  libapache2-mod-php \
  mysql-server \
  php \
  php-curl \
  php-json \
  php-mysql \
  php-xml

sudo mkdir -p /srv/www
sudo chown www-data: /srv/www

sudo a2enmod rewrite
sudo a2enmod ssl

# NFS dependency
sudo apt install -y nfs-common

touch /tmp/init-script-completed

# AZ Copy v10
wget https://aka.ms/downloadazcopy-v10-linux
tar -xvf downloadazcopy-v10-linux
sudo rm -f /usr/bin/azcopy
sudo cp ./azcopy_linux_amd64_*/azcopy /usr/bin/