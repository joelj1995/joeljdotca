#!/bin/bash

SOURCE_LOCATION=$1
AZ_CONNECTION=$2

TODAY=$(date '+%Y-%m-%d')
DEST_LOCATION="/tmp/$TODAY.tar"

tar -cvf $DEST_LOCATION $SOURCE_LOCATION

BACKUP_HASH=($(sha1sum $DEST_LOCATION))
BACKUP_NAME="/$TODAY.$BACKUP_HASH.tar"
AZ_CONTAINER="${AZ_CONNECTION/__BLOBNAME__/""}"
EXISTING_HASH=$(azcopy list $AZ_CONTAINER | cut -d ' ' -f 2 | cut -d '.' -f 2 | grep $BACKUP_HASH)
AZ_TARGET="${AZ_CONNECTION/__BLOBNAME__/"$BACKUP_NAME"}"

if [ -z "$EXISTING_HASH" ]
then
  echo 'Backup does not exist'
  azcopy copy $DEST_LOCATION "$AZ_TARGET"
else
  echo 'Backup already exists'
fi