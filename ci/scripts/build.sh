#!/usr/bin/env bash

git checkout "$CIRCLE_BRANCH"
yarn release -t ''
GIT_TAG=$(jq -r ".version" package.json)
git reset HEAD^1

yarn build 

if [ "$CIRCLE_BRANCH" = "develop" ] && [[ "$GIT_COMMIT_DESC" != *"ci(build): update library to version "* ]]
then
    git add lib/
    git commit -m "ci(build): update library to version ${GIT_TAG}"
    git push origin "$CIRCLE_BRANCH"
fi