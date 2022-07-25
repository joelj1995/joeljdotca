#!/bin/bash

set -e

echo "[DEPLOY] Deployment started against target host $1"
TARGET_HOST=$1

echo '[DEPLOY] Staging site files locally'
rm -rf joeljca
mkdir joeljca
cp ./blog-app/dist/blog-app/* ./joeljca
cp ./infrastructure/joeljca.htaccess ./joeljca/.htaccess
mkdir joeljca/wordpress
cp -r ./wordpress/ ./joeljca

echo "[DEPLOY] Unmounting the file share"
ssh service@$TARGET_HOST "sudo umount -f -l /srv/www/joeljca/wordpress/wp-content/uploads"

echo '[DEPLOY] Removing site files on server'
ssh service@$TARGET_HOST "sudo rm -rf /srv/www/joeljca"

echo '[DEPLOY] Syncing site files to server'
rsync -az ./joeljca service@$TARGET_HOST:/srv/www
rsync --rsync-path="sudo rsync" ./infrastructure/*.conf service@$TARGET_HOST:/etc/apache2/sites-enabled

echo '[DEPLOY] Mounting the file share'
# TODO: inject the name of the storage account so this is environment agnostic
ssh service@$TARGET_HOST "sudo mkdir -p /srv/www/joeljca/wordpress/wp-content/uploads"
ssh service@$TARGET_HOST "sudo mount -t nfs joeljca.file.core.windows.net:/joeljca/wp-uploads /srv/www/joeljca/wordpress/wp-content/uploads -o vers=4,minorversion=1,sec=sys"

echo '[DEPLOY] Updating owner of /srv/www to www-data'
ssh service@$TARGET_HOST "sudo chown -R www-data: /srv/www"

echo '[DEPLOY] Deployment succeeded'