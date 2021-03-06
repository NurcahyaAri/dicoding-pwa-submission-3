const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const config = {
  mode: 'production',

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: (module) => /node_modules/.test(module.resource),
          enforce: true,
        },
      },
    },
  },
};

module.exports = merge(
  baseConfig,
  config,
);
