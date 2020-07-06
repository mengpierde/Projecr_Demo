window.config = {
    // 版本号
    version: 'VERSION',

    servers: {
        default: 'http://localhost:3010/appName', // 必须和浏览器打开的ip端口相同
        wp: 'http://localhost:3010/wp', // 平台门户登录模拟
    },

    // 风险目标管理轨迹
    fxmbgl: 'http://50.48.7.10:16018/#/trackDisplay',

    // 跳转超级搜索
    ck: 'http://50.48.7.12:13000/#/archives2/index',

    systemId: 'APP023',

    systemTwoId: 'APP023',
    // 指挥中心权限编码
    commandCentre: '11010001',
    // 合成作战权限编码
    hczzRoleId: '11010001',

    // 登录错误，跳转到平台门户
    wpUrl: 'http://50.48.7.10:16006/#/',
};
