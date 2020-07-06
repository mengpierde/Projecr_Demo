const path = require('path');
const fileUtil = require('./fileUtil');

module.exports = {
    /**
     * 延迟执行
     * @param time (0-60000)
     * @returns {Promise<any>}
     */
    sleep (time = 1000) {
        time = Math.min(60000, time);
        time = Math.max(0, time);
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve();
            }, time);
        });
    },

    /**
     * 保存文件
     * @param filePath
     * @param strData
     * @return {Promise}
     */
    writeString (filePath, strData) {
        return new Promise(async (resolve, reject) => {
            // console.log('writeString', filePath);
            let parent = path.dirname(filePath);
            let err = await fileUtil.mkdir(parent);
            if (err) {
                resolve(err);
            } else {
                let str = require('iconv-lite').encode(strData, 'utf-8');
                require('fs').writeFile(filePath, str, async (err) => {
                    await this.sleep(0);
                    resolve(err);
                });
            }
        });
    },

    /**
     * 读取文件
     * @param filePath
     * @returns {Promise}
     */
    readString (filePath) {
        return new Promise(function (resolve, reject) {
            require('fs').readFile(filePath, 'utf-8', function (err, data) {
                if (err) {
                    resolve();
                } else {
                    resolve(data);
                }
            });
        });
    },
};