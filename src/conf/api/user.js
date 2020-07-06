/**
 * 用户信息
 * @type {}
 */
module.exports = {
    user: {
        // 登录平台门户用户密码登录接口
        login: {
            // path: '/wplogin/login', // 泰州台门户
            path: '/pflogin/login', // 句容平台门户
            // path: '/user/loginCC', // 周海星平台门户
            method: 'POST',
            server: 'wp'
        },
        // 本应用单点登录
        isAccessAllowed: {
            path: '/user/isAccessAllowed',
            method: 'POST',
        },
        // 数据在线单点登录
        isAccessAllowedTwo: {
            path: '/ucuser/isAccessAllowed',
            method: 'POST',
            server: 'dataonline'
        },
        getSysdate:{
            path: '/sys/getSysdate',
            method: 'POST',
        }

    }
}
