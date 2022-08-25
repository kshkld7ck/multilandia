const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://multilandia.tv:4433/',
            changeOrigin: true,
        })
    );
};