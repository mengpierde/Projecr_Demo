const configDev = require('../../vue.dev');
const Uri = require('uri-js');
const pathNames = []

/**
 * 开发辅助函数
 * developHelper.js
 */
module.exports = {
    getProxy() {
        let endServers = configDev.endServers;
        let conf = {};
        let serverUrl;
        for (let serverKey in endServers) {
            serverUrl = endServers[serverKey];

            let uriConfig = Uri.parse(serverUrl);
            if (uriConfig.path === '/') {
                // 处理以/结尾的服务地址配置
                throw new Error(`vue.dev.js中服务不能以/结尾 ${serverUrl}`);
            }
            if (uriConfig.path) {
                pathNames.push(uriConfig.path)
            }

            let confPath = `/${serverKey}`;

            if (conf[confPath]) {
                // 后台起一个应用名
                throw new Error(`proxy的地址名不能重复注册 ${confPath}`);
            }

            conf[confPath] = {
                target: serverUrl,
                pathRewrite: {[`^${confPath}`]: ''},
                changerOrigin: true,
                secure: false,
                cookieDomainRewrite: '',
                onProxyRes: onProxyRes,
            };

            // 代理地址配置
            console.log(confPath, serverUrl);
        }

        return conf;
    },
};

/**
 * 过滤cookie path，解决同域下不同path,cookie无法访问问题
 * @param proxyRes
 * @param req
 * @param res
 */
function onProxyRes(proxyRes, req, res) {
    let cookies = proxyRes.headers['set-cookie']
    // 修改cookie Path
    if (cookies) {
        let newCookie = cookies.map(function (cookie) {
            for (let pathName of pathNames) {
                if (cookie.indexOf(`Path=${pathName}`) >= 0) {
                    cookie = cookie.replace(`Path=${pathName}`, 'Path=/')
                    return cookie.replace(`Path=//`, 'Path=/')
                }
            }
            return cookie
        })
        // 修改cookie path
        delete proxyRes.headers['set-cookie']
        // console.log('newCookie', newCookie)
        proxyRes.headers['set-cookie'] = newCookie
    }
}