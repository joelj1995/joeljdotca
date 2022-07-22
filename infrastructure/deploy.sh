#!/bin/bash
echo "[DEPLOY] Deployment started against target host $1"
TARGET_HOST=$1

echo '[DEPLOY] Staging site files locally'
rm -rf joeljca
mkdir joeljca
cp ./blog-app/dist/blog-app/* ./joeljca
cp ./infrastructure/joeljca.htaccess ./joeljca/.htaccess
mkdir joeljca/wordpress
cp -r ./wordpress/ ./joeljca

echo '[DEPLOY] Removing site files on server'
ssh service@$TARGET_HOST "sudo rm -rf /srv/www/joeljca"

echo '[DEPLOY] Syncing site files to server'
rsync -az ./joeljca service@$TARGET_HOST:/srv/www
rsync --rsync-path="sudo rsync" ./infrastructure/*.conf service@$TARGET_HOST:/etc/apache2/sites-enabled

echo '[DEPLOY] Deployment succeeded'