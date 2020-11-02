#!/bin/bash

# abort on error
set -e;

# restart pm2
pm2 reload $1;

echo "restarted";
