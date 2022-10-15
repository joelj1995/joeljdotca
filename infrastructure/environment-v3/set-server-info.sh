TARGET_HOST=$1
REVISION=$2

echo '[DEPLOY] Substituting template values'
sed -i "s/{{HOST}}/$TARGET_HOST/" ./blog-app/src/assets/server-info.js
sed -i "s/{{REVISION}}/$REVISION/" ./blog-app/src/assets/server-info.js