#!/bin/bash

TARGET_HOST=$1

rm -rf joeljca
mkdir joeljca
cp ./blog-app/dist/blog-app/* ./joeljca
cp ./infrastructure/joeljca.htaccess ./joeljca/.htaccess

ssh service@$TARGET_HOST "sudo rm -r /srv/www/joeljca"

rsync -avz ./joeljca service@$TARGET_HOST:/srv/www
rsync --rsync-path="sudo rsync" ./infrastructure/*.conf service@$TARGET_HOST:/etc/apache2/sites-enabled