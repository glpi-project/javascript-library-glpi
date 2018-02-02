#!/usr/bin/env bash

git checkout "$CIRCLE_BRANCH"
yarn release -t '' --prerelease beta
GIT_TAG=$(jq -r ".version" package.json)

yarn build 

if [[ "$GIT_COMMIT_DESC" != *"build(npm): update library to version "* ]]
then
    git add lib/
    git commit -m "build(npm): update library to version ${GIT_TAG}" --amend
    git push origin "$CIRCLE_BRANCH"
    npm publish --tag beta --access public
fi