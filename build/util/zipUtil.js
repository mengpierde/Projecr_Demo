require('shelljs/global');
const path = require('path');
const fileUtil = require('./fileUtil');
const appHelper = require('./appHelper');

module.exports = {
    /**
     * 压缩文件夹
     * @param dirPath      文件夹路径
     * @param zipPath      保存的zip文件路径
     * @param dest         zip内容下的前缀文件夹
     * @param extName      需要排除的文件夹
     * @return {Promise.<error|null>}
     */
    zipDir (dirPath, zipPath, dest, extName = '') {
        return new Promise(async (resolve, reject) => {
            let time = Date.now();
            dirPath = path.normalize(dirPath);
            zipPath = path.normalize(zipPath);
            dest = (dest && dest + '/') || '';

            mkdir('-p', path.dirname(zipPath));

            let archive = require('archiver')('zip');

            // XXX 替换函数 start
            let _moduleAppendFun = archive._moduleAppend;
            archive._moduleAppend = function (...args) {
                // TODO webpack打包，临时动态追加 setimmediate
                require('setimmediate');

                if (_moduleAppendFun) {
                    _moduleAppendFun.call(archive, ...args);
                }
            };
            // XXX 替换函数 end

            let output = require('fs').createWriteStream(zipPath);
            let error = null;

            archive.on('error', function (err) {
                error = err;
            });

            archive.on('end', async function (err) {
                output.end();

                if (error) {
                    console.error('ZipUtil.zipPaths', error);
                }

                await appHelper.sleep(200);
                resolve(error);
            });

            archive.pipe(output);

            let pathArray = await fileUtil.getFileList(dirPath);
            let pathUrl;
            let pathLength = dirPath.length;

            for (let pathInfo of pathArray) {
                pathUrl = pathInfo.path;

                // 排除 extName 路径
                if (extName && pathUrl.indexOf(extName) > 0) {
                    continue;
                }

                archive.append(
                    require('fs').createReadStream(pathUrl),
                    { name: path.normalize(dest + pathUrl.slice(pathLength)) });
            }
            archive.finalize();
        });
    },
};