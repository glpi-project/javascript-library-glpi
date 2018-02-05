#!/usr/bin/env bash

TAG=$(jq -r ".version" package.json)

if [ "$TAG" = "0.0.0" ] 
then
    yarn release -t '' --first-release
fi

if [ "$CIRCLE_BRANCH" = "develop" ] 
then
    source ci/scripts/build_develop.sh
fi

if [ "$CIRCLE_BRANCH" = "master" ] 
then
    source ci/scripts/build_master.sh
fi