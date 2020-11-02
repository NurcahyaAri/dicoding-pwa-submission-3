const baseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');
const path = require('path');

const config = {
    mode: 'development',

    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        port: 3001,
        open: true,
    },
};

module.exports = merge(
    baseConfig,
    config
);
