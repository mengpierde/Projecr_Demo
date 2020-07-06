/**
 * 开发时获取vue.dev.js中endServers的应用名称
 */
module.exports = function () {
    let Uri = require('uri-js');
    let vueDev = require('./../../vue.dev');

    let proxys = {};
    for (let serverKey in vueDev.endServers) {
        let uriConfig = Uri.parse(vueDev.endServers[serverKey]);
        proxys[`VUE_APP_DEV_${serverKey}`] = uriConfig.path || `/${serverKey}`
    }
    return proxys
};
