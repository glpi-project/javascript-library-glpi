#!/usr/bin/env bash

git checkout "$CIRCLE_BRANCH"
GIT_COMMIT_DESC=$(git log --pretty=oneline -n 1 $CIRCLE_SHA1)
yarn release -t '' --prerelease beta
GIT_TAG=$(jq -r ".version" package.json)
git reset HEAD^1

yarn build 

if [[ "$GIT_COMMIT_DESC" != *"build(npm): update library to version "* ]]
then
    git add lib/ package.json
    git commit -m "build(npm): update library to version ${GIT_TAG}"
    git push origin "$CIRCLE_BRANCH"
    npm publish --tag beta --access public
fi