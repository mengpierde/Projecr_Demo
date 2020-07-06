// 请求标识
let flag = 0;

/**
 * 记录代理的后台请求耗时，监控异常请求
 * @returns {Function}
 */
module.exports = function responseTime () {
    return function (req, res, next) {
        let time = Date.now();
        let url = req.url.toLocaleLowerCase();
        let isEnd = false;
        let flagID = flag++;

        // 排除静态资源请求
        if (url.lastIndexOf('.') > 0) {
            return next();
        }

        function onFinishTime () {
            isEnd = true;
            let date = new Date();
            console.log(date.toLocaleString(), `flagID:${flagID} \ttime:${Date.now() - time} \tmothod:${req.method} \turl:${req.url}`);
        }

        res.once('finish', onFinishTime);
        res.once('close', onFinishTime);

        setTimeout(function () {
            if (!isEnd) {
                let date = new Date();
                if (url.indexOf('__webpack_hmr') >= 0) {
                    console.warn(date.toLocaleString(), `超时请求 flagID:${flagID} \tmothod:${req.method} \turl:${req.url}`);
                } else {
                    console.error(date.toLocaleString(), `超时请求 flagID:${flagID} \tmothod:${req.method} \turl:${req.url}`);
                }
            }
        }, 3000);

        return next();
    };
};
