#!/usr/bin/env sh

# abort on errors
set -e

# build
vuepress build public

# navigate into the build output directory
cd blog/.vuepress/dist

git init
git add -A

git commit -m "Release latest changes"

git push -f git@github.com:horizonfleet/horizonfleet.github.io.git master

cd -