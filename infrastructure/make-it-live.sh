#!/bin/bash

set -e

APACHE_SITE_NAME=$1
DEPLOYMENT_NUMBER=$2

SYMBOLIC_PATH="/srv/www/$APACHE_SITE_NAME"
HARD_PATH="$SYMBOLIC_PATH-$DEPLOYMENT_NUMBER"

# On the first deployment, clean up actual files
if [ "$(stat -c %h -- "$SYMBOLIC_PATH")" -gt 1 ]; then
  echo "[Deploy:Remote] Hard files still exist at target path. Deleting them..."
  sudo rm -rf $SYMBOLIC_PATH
fi

echo "[Deploy:Remote] Do it live!"
echo "[Deploy:Remote] Hard path: $HARD_PATH"
echo "[Deploy:Remote] Symbolic path: $SYMBOLIC_PATH"

sudo sh -c 'hostname > $HARD_PATH/what-host.txt'
sudo ln -sfn $HARD_PATH $SYMBOLIC_PATH

sudo ln -sfn /etc/joeljca/uploads $HARD_PATH/wordpress/wp-content/uploads