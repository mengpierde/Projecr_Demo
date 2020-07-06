/**
 * 测试本地打包之后的dist文件夹服务器
 * 打包之后读取dist，默认读取根目录下dist
 */
const path = require('path');
const express = require('express');
const proxy = require('http-proxy-middleware');

const port = 3010; // 测试服务器端
const statictDir = './../../dist'; // 静态资源站点路径

const app = express();

// 配置静态资源
app.use(express.static(path.resolve(__dirname, statictDir)));

// XXX 代理Proxy（未拦截到继续执行代理）

// XXX 模拟应用名
const appName = 'compare';
const target = 'http://localhost:8080';

// 模拟nginx代理转发
app.use(`/${appName}`, proxy(
    // 代理的后台服务器地址
    {
        target: target,
        changeOrigin: true,
        pathRewrite: {
            [`^/${target}/${appName}/`]: '/'
        }
    },
));

// app.use('/', proxy(
//     // 代理的后台服务器地址
//     {target: target, changeOrigin: true},
// ));

app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    const uri = 'http://localhost:' + port;
    console.log('Listening at ' + uri + '\n');
    // opn(uri) // 打开浏览器
});
