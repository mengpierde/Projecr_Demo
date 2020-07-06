let configDev = require('../../vue.dev');
const proxy = require('http-proxy-middleware');

/**
 * 模拟Nginx代理其他静态资源
 * @returns {Function}
 */
module.exports = function nginxMiddleware (app) {
    if (configDev.nginx) {
        for (let item of configDev.nginx) {
            // XXX 代理Proxy（未拦截到继续执行代理）

            if (Array.isArray(item.location)) {
                for (let itemStr of item.location) {
                    app.use(itemStr,
                        proxy({
                            target: item.proxy_pass,
                            changeOrigin: true,
                        }));
                }
            } else {
                app.use(item.location,
                    proxy({
                        target: item.proxy_pass,
                        changeOrigin: true,
                    }));
            }
        }
    }
};
