#!/bin/bash

set -e

echo '[WP_CONFIG] Transforming WP configuration file'
WP_DB_HOST=$1
WP_DB_PASSWORD=$2
WP_CONFIG_KEYS=$3
WP_SITE_URL=$4
WP_DB_USER=$5
WP_DB_NAME=$6
APACHE_SITE_NAME=$7

cp ./wordpress/wp-config.php.template ./wordpress/wp-config.php

sed -i "s/{{WP_DB_HOST}}/$WP_DB_HOST/" ./wordpress/wp-config.php
sed -i "s/{{WP_DB_PASSWORD}}/$WP_DB_PASSWORD/" ./wordpress/wp-config.php
sed -i "s/{{WP_CONFIG_KEYS}}/$(echo $WP_CONFIG_KEYS | sed -e 's/\\/\\\\/g; s/\//\\\//g; s/&/\\\&/g')/" ./wordpress/wp-config.php
sed -i "s/{{WP_SITE_URL}}/$WP_SITE_URL/" ./wordpress/wp-config.php
sed -i "s/{{WP_DB_USER}}/$WP_DB_USER/" ./wordpress/wp-config.php
sed -i "s/{{WP_DB_NAME}}/$WP_DB_NAME/" ./wordpress/wp-config.php
sed -i "s/{{APACHE_SITE_NAME}}/$APACHE_SITE_NAME/" ./wordpress/wp-config.php

echo '[WP_CONFIG] Config transformation succeeded'