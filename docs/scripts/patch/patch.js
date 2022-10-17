#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

const contentLayerFilename = '../node_modules/@contentlayer/core/dist/getConfig/index.js';

fs.writeFileSync(
    contentLayerFilename,
    fs.readFileSync(contentLayerFilename).toString().replace(`const unknownWarnings`, 'const unknownWarnings = [];//'),
);
