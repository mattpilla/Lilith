#!/bin/bash

# abort on error
set -e;

# navigate to site directory
cd site;

# set up and force push gh-pages branch
git init;
git add -A;
if git commit -m "deploy" ; then
    git push -f git@github.com:mattpilla/Lilith.git master:gh-pages;

    echo "site deployed";
else
    echo "site already up-to-date";
fi
