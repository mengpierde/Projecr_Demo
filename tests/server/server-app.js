/**
 * 开发模拟后台服务器，进行部分请求拦截，伪造数据（也可以使用前端mock进行拦截）
 */
const express = require('express');
const {wrapResult} = require('../../build/util/resultUtil');
const proxy = require('http-proxy-middleware');
const bodyParser = require('body-parser');

/**
 * 模拟后台服务接口
 * @type {number}
 */
const port = 8080;

// 模拟测试服务器
const serverApp = express();

// 解析数据 将请求数据转换为 req.body
serverApp.use(bodyParser.json());

// 使用路由
const router = express.Router();

// 拦截post请求
router.post('/user/isAccessAllowed', function (req, res) {
    res.send(require('../../mock/user/isAccessAllowed')());
});

router.post('/wp/user/isAccessAllowed', function (req, res) {
    res.send(require('../../mock/user/isAccessAllowed')());
});

router.all('/wp/wplogin/login', function (req, res) {
    res.send(require('../../mock/user/isAccessAllowed')());
});

// 拦截全部类型请求
router.all('/sysCommon/queryConfig', function (req, res) {
    const result = {msg: 'Hello World', api: '/sysCommon/queryConfig'};
    res.send(wrapResult(result));
});

router.all('/test/testMock', function (req, res) {
    const result = {msg: '未连接mock数据', api: '/test/testMock'};
    res.send(wrapResult(result));
});

router.all('/', function (req, res) {
    const result = {msg: '通用方法'};
    res.send(wrapResult(result));
});

// 添加请求前缀（应用名）
// serverApp.use('/appName', router);
serverApp.use('', router);

serverApp.get('/test', function (req, res) {
    res.send({data: [12, 34, 5, 56, 6]});
});

// 启动服务器，监听端口
serverApp.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    const uri = 'http://localhost:' + port;
    console.log('Listening at ' + uri + '\n');
    // opn(uri) // 打开浏览器
});
