REVISION=$1

echo '[DEPLOY] Substituting template values'
sed -i "s/{{REVISION}}/$REVISION/" ./blog-app/src/app/version-info.json