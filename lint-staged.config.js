
module.exports = {
  'client/**/*.{js,jsx,ts,tsx}': [
    'eslint --fix --config ./client/.eslintrc.json',
    'prettier --write'
  ],
  'server/**/*.{js,jsx,ts,tsx}': [
    'eslint --fix --config ./.eslintrc.json',
    'prettier --write'
  ],
  '*.json': [
    'prettier --write'
  ]
};
