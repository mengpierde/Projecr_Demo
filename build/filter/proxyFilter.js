let proxy = require('http-proxy-middleware');

/**
 * 处理代理
 * 启动指定代理目标服务器
 * @param app
 * @param host      本地地址端口
 * @param target    目标服务器地址
 * @param proxyURL  需要拦截的url段
 */
module.exports = function proxyFilter (app, { host, target, proxyURL } = { proxyURL: 'proxy_wp' }) {
    if (!host || !target || !proxyURL) {
        throw Error('ProxyFilter.js 请配置正确的代理服务器参数');
    }

    let options = {
        target,
        changeOrigin: true,               // needed for virtual hosted sites
        ws: true,                         // proxy websockets
        pathRewrite: {
            // '^/api/old-path': '/api/new-path',     // rewrite path
            [`^/${proxyURL}/`]: '/',           // remove base path
        },
        router: {
            // when request.headers.host == 'dev.localhost:3000',
            // override target 'http://www.example.org' to 'http://localhost:8000'
            [host]: target,
        },
    };

    // create the proxy (without context)
    let exampleProxy = proxy(options);

    // mount `exampleProxy` in web server
    app.use(`/${proxyURL}/`, exampleProxy);
};