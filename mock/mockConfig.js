/**
 * 测试数据配置，可以使用函数或其他工具类生成模拟数据
 * @type {{aaa: Array}}
 */
module.exports = [
    {
        url: '/wp/wplogin/login',
        data: require('./user/isAccessAllowed'),
        mock: false, // 是否启动当前项测试
    },
    {
        url: '/user/isAccessAllowed',
        data: require('./user/isAccessAllowed'),
        mock: false, // 模拟单点登录返回数据
    },
    {
        url: '/test/testMock',
        data: require('./test/testMock'),
        mock: false, // 是否启动当前项测试
    },
    {
        url: '/default/photo/selectOften',
        data: require('./test/selectOften'),
        mock: true,
    },
    {
        url: '/getPoint/queryPersonData',
        data: require('./getPoint/queryPersonData'),
        mock: true,
    },

];