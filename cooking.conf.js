/* eslint-disable */

var path = require('path');
var cooking = require('cooking');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer')
var browserslist = require('browserslist')
var CopyWebpackPlugin = require('copy-webpack-plugin');

var config = {
    entry: {
        app: './src/main.js',
        login: './src/login.js',
        vendor: ['vue', 'vue-router', 'vuex', 'vuex-router-sync', 'store2', 'toastr', './src/polyfill']
    },
    dist: './dist/static',
    externals: {
        'jQuery': 'jquery'
    },
    devServer: {
        port: 8080,
        publicPath: '/',
        clean: false,
        proxy: {
            '/api/**': {
                target: 'http://localhost:3000/',
                secure: false,
                changeOrigin: true
            }
        }
    },

    // production
    clean: true,
    hash: true,
    sourceMap: false,
    publicPath: '/static/',
    assetsPath: 'images',
    urlLoaderLimit: 10000,
    extractCSS: 'css/[name].[contenthash:7].css',
    postcss: [
        autoprefixer({ browsers: browserslist('last 2 version, > 0.1%')})
    ],
    extends: ['vue2', 'eslint', 'less', ]
}
if (process.env.NODE_ENV === 'production') {
    config.template = [{
        filename: '../index.html',
        template: 'src/template/index.html',
        chunks: ['common', 'vendor', 'app']
    }, {
        filename: '../login.html',
        template: 'src/template/login.html',
        chunks: ['common', 'vendor', 'login']
    }]
} else {
    config.template = [{
        filename: 'index.html',
        template: 'src/template/index.html',
        chunks: ['vendor', 'app']
    }, {
        filename: 'login.html',
        template: 'src/template/login.html',
        chunks: ['vendor', 'login']
    }]
}

cooking.set(config);
cooking.add('resolve.extensions', ['', '.js', '.vue', '.jsx'])
cooking.add('resolve.alias', {
    'src': path.join(__dirname, 'src')
});

if (process.env.NODE_ENV === 'production') {
    cooking.add('output.filename', 'js/[name].[chunkhash].js')
    cooking.add('output.chunkFilename', 'js/[id].[chunkhash].js')
    cooking.add('plugin.CommonsChunk', new webpack.optimize.CommonsChunkPlugin({
        names: ["common", "vendor"]
    }))
    cooking.add('plugin.CopyWebpackPlugin', new CopyWebpackPlugin([{
        from: 'favicon.ico',
        to: path.join(__dirname, 'dist')
    }, {
        from: {
            glob:'static/editor.md/**/*',
            dot: true
        },
        to: path.join(__dirname, 'dist')
    }]))
}

module.exports = cooking.resolve()
