module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-standard-scss', 'stylelint-config-prettier'],
  ignoreFiles: [
    '**/*.d.ts',
    '**/*.ts',
    '**/*.ts*',
    '**/*.js',
    '**/*.json',
    '**/*.woff',
    '**/*.ttf',
    '**/*.svg',
    '**/*.eot',
    '**/*.woff2',
    '**/*.tsx',
    '**/*.md*',
    '**/*.sh',
    '**/*.ico',
  ],
  rules: {
    'value-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'no-empty-source': null,
    'no-missing-end-of-source-newline': null,
    'declaration-colon-newline-after': null,
    'value-keyword-case': null,
    'value-list-comma-newline-after': null, // not compatible with prettier
    'function-parentheses-newline-inside': null, // not compatible with prettier
    'string-no-newline': null, // not compatible with prettier
    'selector-class-pattern':'^[a-z][a-zA-Z0-9]+$'
  },
};