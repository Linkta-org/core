module.exports = {
  'client/**/*.{js,jsx,ts,tsx}': [
    'eslint --fix  client/.eslintrc.json',
    'prettier --write client/**/*.js client/**/*.jsx client/**/*.ts client/**/*.tsx'
  ],
  'server/**/*.{js,jsx,ts,tsx}': [
    'eslint --fix --config server/.eslintrc.json',
    'prettier --write server/**/*.js server/**/*.jsx server/**/*.ts server/**/*.tsx'
  ],
  '*.json': [
    'prettier --write'
  ]
};
