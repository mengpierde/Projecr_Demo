let fs = require('fs');
let path = require('path');
/**
 * mock拦截
 * @param isNext 是否可以继续执行
 * @returns {Function}
 */
module.exports = function mockMiddleware (isNext = true) {
    // mock配置文件路径
    let configPath = '../../mock/mockConfig.js';
    let mockConfigList = require(configPath);

    let fileUtil = require('../util/fileUtil');
    let dir = './mock/';  // 监控的根文件
    let fileList = [];
    fileUtil.getFileList(dir).then((result) => {
        fileList = result;
        for (let item of fileList) {
            fs.watch(item.path, function (type) {
                if (type === 'change') {
                    // XXX 重新请求数据
                    try {
                        deleteModule(require.cache[require.resolve(configPath)]);
                        mockConfigList = require(configPath);

                        // console.error('dddddd', mockConfigList[1].data.data.dataList[0].filedValue)
                        console.log('更新文件', item.path);
                    } catch (err) {
                        console.error('文件更新失败，请重新启动');
                    }
                }
            });
        }
    });

    return function (req, res, next) {
        let reqURL = req.url.toLowerCase();

        // 排除静态资源请求
        for (let item of mockConfigList) {
            let mockURL = item.url.toLowerCase();
            if (reqURL.indexOf(mockURL) !== -1) {
                if (item.mock) {
                    console.log(`请求mock数据:${mockURL}`);
                    let data = item.data;
                    if (typeof data === 'function') {
                        data = data(req, res, next);
                    }
                    if (data) {
                        res.send(data);
                    }
                    return;
                } else {
                    return next();
                }
            }
        }

        if (isNext) {
            return next();
        } else {
            // 直接拦截结果
            res.send({
                data: null,
                msg: 'mock服务器拦截，未配置的请求',
                code: '000000',
                success: false,
            });
        }
    };
};

/**
 * 卸载模块和子模块
 */
function deleteModule (module) {
    let children = module.children;
    if (Array.isArray(children) && children.length > 0) {
        for (let item of children) {
            deleteModule(item);
        }
    }
    delete require.cache[module.filename];
}