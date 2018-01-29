#!/usr/bin/env bash

if [ "$CIRCLE_BRANCH" = "develop" ] 
then
    source ci/scripts/build_develop.sh
fi

if [ "$CIRCLE_BRANCH" = "master" ] 
then
    source ci/scripts/build_master.sh
fi