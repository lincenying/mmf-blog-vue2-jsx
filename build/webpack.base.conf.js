/* global require, module, __dirname */

var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var browserslist = require('browserslist')
var HappyPack = require('happypack')

var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
    entry: {
        app: './src/main.js',
        login: './src/login.js'
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: config.build.assetsPublicPath,
        filename: '[name].js'
    },
    externals: {
        'jquery': 'jQuery'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components')
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        loaders: [{
            test: /\.js|\.jsx$/,
            loader: 'babel',
            include: projectRoot,
            exclude: /node_modules/,
            happy: { id: 'jsx' }
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }]
    },
    postcss: [
        autoprefixer({ browsers: browserslist('last 2 version, > 0.1%')})
    ],
    plugins: [
        new HappyPack({ id: 'jsx', threads: 4 }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, "../src"),
            manifest: require("../static/vendor-manifest.json")
        })
    ]
}
