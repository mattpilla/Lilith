#!/bin/bash

# abort on error
set -e;

# pull latest changes
git pull;

# reinstall dependencies in case they change
yarn ci;

# restart pm2
pm2 reload $1;

echo "updated";
