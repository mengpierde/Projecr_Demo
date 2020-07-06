let fs = require('fs');
require('shelljs/global');

module.exports = {
    mkdir (assetsPath) {
        mkdir('-p', assetsPath);
    },

    /**
     * 获取文件列表
     * @param dir
     * @returns {Promise<any>}
     */
    getFileList (dir) {
        return new Promise((resolve, reject) => {
            let array = [];
            this._getFileList(dir, array);
            resolve(array);
        });
    },
    /**
     * 内部函数
     * @param dirPath
     * @param array
     * @private
     */
    _getFileList (dirPath, array) {
        let temp = fs.readdirSync(dirPath);
        if (temp && temp.length > 0) {
            let path = require('path');

            for (let item of temp) {
                let chirdPath = path.normalize(dirPath + '/' + item);
                let info = fs.statSync(chirdPath);
                if (info.isDirectory()) {
                    this._getFileList(chirdPath, array);
                } else {
                    if (item.indexOf('~$') === 0 || info.size === 0) {
                        continue;
                    }
                    array.push({
                        path: chirdPath,
                        size: info.size,
                    });
                }
            }
        }
    },
};