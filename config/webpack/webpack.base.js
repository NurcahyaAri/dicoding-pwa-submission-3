const MiniCssExtractorPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');

module.exports = {
    entry: ['@babel/polyfill', './src/index.js'],

    output: {
        path: path.join(__dirname, '../../build'),
        filename: '[name].[chunkhash].js',
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractorPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.(jpg|png|PNG|svg|jpe?g)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets/',
                            publicPath: 'src/assets/',
                        },
                    },
                ],
            },
            {
                test: /\.(js)$/i,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractorPlugin({
            filename: '[name].css',
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, '../../public', 'index.html'),
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets' },
                { from: 'manifest.json', to: '.' },
                { from: 'sw.js', to: '.' },
                { from: 'push.js', to: '.' },
            ]
        }),
    ],
}
