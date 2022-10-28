#!/usr/bin/env bash

yarn install

bash ./scripts/generateCC.sh

yarn next:build