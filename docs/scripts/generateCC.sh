#!/usr/bin/env bash

IS_WATCH="false"

while getopts w: flag
do
    case "${flag}" in
        w) IS_WATCH="true";;
    esac
done


if [ "$IS_WATCH" == "false" ]; then
  rm -rf ./scripts/generate/dist

  yarn tsc --build  ./scripts/generate/src

  node ./scripts/generate/dist/generate.js
else
  node ./scripts/generate/dist/generate.js
fi
