#!/usr/bin/env bash

yarn install

yarn global add typescript

bash ./scripts/generateCC.sh

yarn next:build