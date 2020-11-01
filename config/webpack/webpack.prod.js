const baseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');

const config = {
    mode: 'production',
};

module.exports = merge(
    baseConfig,
    config,
)
