#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run public:build

# navigate into the build output directory
cd public/.vuepress/dist


git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:horizonfleet/horizonfleet.github.io.git master


cd -