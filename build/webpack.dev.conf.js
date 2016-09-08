/* global require, module */

var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HappyPack = require('happypack')

var baseWebpackConfig = require('./webpack.base.conf')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
    output: {
        // necessary for the html plugin to work properly
        // when serving the html from in-memory
        publicPath: '/'
    },
    // eval-source-map is faster for development
    devtool: '#eval-source-map',
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style!css?-autoprefixer!postcss',
            happy: { id: 'css' }
        },  {
            test: /\.less$/,
            loader: 'style!css?-autoprefixer!postcss!less',
            happy: { id: 'less' }
        }]
    },
    plugins: [
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HappyPack({ id: 'css', threads: 4 }),
        new HappyPack({ id: 'less', threads: 4 }),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            chunks: ['app'],
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new HtmlWebpackPlugin({
            chunks: ['login'],
            filename: 'login.html',
            template: 'login.html',
            inject: true
        })
    ]
})
