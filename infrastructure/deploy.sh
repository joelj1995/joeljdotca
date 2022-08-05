#!/bin/bash

set -e

echo "[DEPLOY] Deployment started against target host $1"
TARGET_HOST=$1
APACHE_SITE_NAME=$2
WP_SITE_URL=$3
AZ_NFS=$4
REVISION=$5
DEPLOYMENT_NUMBER=$6

echo '[DEPLOY] Staging site files locally'
rm -rf $APACHE_SITE_NAME
mkdir $APACHE_SITE_NAME
cp -r ./blog-app/dist/blog-app/* ./$APACHE_SITE_NAME
cp ./infrastructure/apache/joeljca.htaccess ./$APACHE_SITE_NAME/.htaccess
mkdir $APACHE_SITE_NAME/wordpress
cp -r ./wordpress/ ./$APACHE_SITE_NAME

echo '[DEPLOY] Substituting template values'
sed -i "s/{{HOST}}/$TARGET_HOST/" ./$APACHE_SITE_NAME/assets/server-info.js
sed -i "s/{{REVISION}}/$REVISION/" ./$APACHE_SITE_NAME/assets/server-info.js
cp ./infrastructure/apache/template-ssl.conf ./infrastructure/apache/$APACHE_SITE_NAME-ssl.conf
sed -i "s/{{APACHE_SITE_NAME}}/$APACHE_SITE_NAME/" ./infrastructure/apache/$APACHE_SITE_NAME-ssl.conf
sed -i "s/{{WP_SITE_URL}}/$WP_SITE_URL/" ./infrastructure/apache/$APACHE_SITE_NAME-ssl.conf
cp ./infrastructure/apache/template.conf ./infrastructure/apache/$APACHE_SITE_NAME.conf
sed -i "s/{{APACHE_SITE_NAME}}/$APACHE_SITE_NAME/" ./infrastructure/apache/$APACHE_SITE_NAME.conf
sed -i "s/{{WP_SITE_URL}}/$WP_SITE_URL/" ./infrastructure/apache/$APACHE_SITE_NAME.conf

echo '[DEPLOY] Syncing site files to server'
mv ./$APACHE_SITE_NAME ./$APACHE_SITE_NAME-$DEPLOYMENT_NUMBER
rsync --rsync-path="sudo rsync" -az ./$APACHE_SITE_NAME-$DEPLOYMENT_NUMBER service@$TARGET_HOST:/srv/www
rsync --rsync-path="sudo rsync" ./infrastructure/apache/$APACHE_SITE_NAME.conf service@$TARGET_HOST:/etc/apache2/sites-enabled
rsync --rsync-path="sudo rsync" ./infrastructure/apache/$APACHE_SITE_NAME-ssl.conf service@$TARGET_HOST:/etc/apache2/sites-enabled

echo '[DEPLOY] Updating symbolic link'
ssh service@$TARGET_HOST "bash -s $APACHE_SITE_NAME $DEPLOYMENT_NUMBER" < ./infrastructure/make-it-live.sh

echo '[DEPLOY] Updating owner of /srv/www to www-data'
ssh service@$TARGET_HOST "sudo chown -R www-data: /srv/www"

echo '[DEPLOY] Deployment succeeded'