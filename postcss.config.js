/* eslint-disable import/no-extraneous-dependencies */
const postcssImports = require('postcss-import');
const autoprefixer = require('autoprefixer');

module.exports = {
  parser: 'postcss',
  plugins: [
    postcssImports(),
    autoprefixer
  ]
};
