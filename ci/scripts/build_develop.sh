#!/usr/bin/env bash

git checkout "$CIRCLE_BRANCH"
yarn release -t ''
GIT_TAG=$(jq -r ".version" package.json)
git reset HEAD^1

yarn build 

if [[ "$GIT_COMMIT_DESC" != *"build(npm): update library to version "* ]]
then
    git add lib/
    git commit -m "build(npm): update library to version ${GIT_TAG}"
    git push origin "$CIRCLE_BRANCH"
    npm publish --tag beta --access public
fi