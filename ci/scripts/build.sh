#!/usr/bin/env bash

yarn build 

if [ "$TRAVIS_BRANCH" = "develop" ] && [ "$TRAVIS_COMMIT_MESSAGE" != "ci(build): update compiled" ]
then
    git checkout "$TRAVIS_BRANCH"
    git add .
    git commit -m "ci(build): update compiled"
    git push origin "$TRAVIS_BRANCH"
fi