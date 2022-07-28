#!/bin/bash

set -e

echo "[DEPLOY] Deployment started against target host $1"
TARGET_HOST=$1
APACHE_SITE_NAME=$2
WP_SITE_URL=$3

echo '[DEPLOY] Staging site files locally'
rm -rf $APACHE_SITE_NAME
mkdir $APACHE_SITE_NAME
cp ./blog-app/dist/blog-app/* ./$APACHE_SITE_NAME
cp ./infrastructure/joeljca.htaccess ./$APACHE_SITE_NAME/.htaccess
mkdir $APACHE_SITE_NAME/wordpress
cp -r ./wordpress/ ./$APACHE_SITE_NAME

echo "[DEPLOY] Unmounting the file share"
ssh service@$TARGET_HOST "sudo umount -f -l /srv/www/$APACHE_SITE_NAME/wordpress/wp-content/uploads" || echo "Could not unmount share"

echo '[DEPLOY] Removing site files on server'
ssh service@$TARGET_HOST "sudo rm -rf /srv/www/$APACHE_SITE_NAME"

echo '[DEPLOY] Syncing site files to server'
cp ./infrastructure/template-ssl.conf ./infrastructure/$APACHE_SITE_NAME-ssl.conf
sed -i "s/{{APACHE_SITE_NAME}}/$APACHE_SITE_NAME/" ./infrastructure/$APACHE_SITE_NAME-ssl.conf
sed -i "s/{{WP_SITE_URL}}/$WP_SITE_URL/" ./infrastructure/$APACHE_SITE_NAME-ssl.conf
cp ./infrastructure/template.conf ./infrastructure/$APACHE_SITE_NAME.conf
sed -i "s/{{APACHE_SITE_NAME}}/$APACHE_SITE_NAME/" ./infrastructure/$APACHE_SITE_NAME.conf
sed -i "s/{{WP_SITE_URL}}/$WP_SITE_URL/" ./infrastructure/$APACHE_SITE_NAME.conf
rsync -az ./$APACHE_SITE_NAME service@$TARGET_HOST:/srv/www
rsync --rsync-path="sudo rsync" ./infrastructure/$APACHE_SITE_NAME.conf service@$TARGET_HOST:/etc/apache2/sites-enabled
rsync --rsync-path="sudo rsync" ./infrastructure/$APACHE_SITE_NAME-ssl.conf service@$TARGET_HOST:/etc/apache2/sites-enabled

echo '[DEPLOY] Mounting the file share'
# TODO: inject the name of the storage account so this is environment agnostic
ssh service@$TARGET_HOST "sudo mkdir -p /srv/www/$APACHE_SITE_NAME/wordpress/wp-content/uploads"
ssh service@$TARGET_HOST "sudo mount -t nfs joeljca.file.core.windows.net:/joeljca/wp-uploads /srv/www/$APACHE_SITE_NAME/wordpress/wp-content/uploads -o vers=4,minorversion=1,sec=sys"

echo '[DEPLOY] Updating owner of /srv/www to www-data'
ssh service@$TARGET_HOST "sudo chown -R www-data: /srv/www"

echo '[DEPLOY] Deployment succeeded'