#!/usr/bin/env bash

IS_FULL="false"

while test $# -gt 0; do
  case "$1" in
    --full)
      IS_FULL="true"
      shift
      ;;
  esac
done

if [ "$IS_FULL" == "true" ]; then
  yarn cache:clean
fi

yarn install

bash ./scripts/generateCC.sh

(
  trap 'kill 0' SIGINT;
  yarn watch "bash ./scripts/generateCC.sh -w true"  ./content -inherit &
  yarn next:dev
)