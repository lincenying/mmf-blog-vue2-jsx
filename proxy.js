module.exports = {
    '/api': {
        target: 'http://www.mmxiaowu.com',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/api'
        }
    }
}
