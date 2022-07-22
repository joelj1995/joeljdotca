echo '[WP_CONFIG] Transforming WP configuration file'
WP_DB_HOST=$1
WP_DB_PASSWORD=$2
WP_CONFIG_KEYS=$3
echo "$WP_DB_HOST"
sed -i "s/{{WP_DB_HOST}}/$WP_DB_HOST/" ./wordpress/wp-config.php

echo '[WP_CONFIG] Config transformation succeeded'