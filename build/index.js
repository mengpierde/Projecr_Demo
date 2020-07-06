/**
 * 打包dist包，更新版本号，打包zip包
 */
const path = require('path');
const vueConfig = require('../vue.config');
const upVersion = require('./plugins/upVersion');
const zipUtil = require('./util/zipUtil');
const pkg = require('../package');

const distConfig = path.join(vueConfig.outputDir || 'dist', 'config.js');

/**
 * 打包zip文件
 */
async function zipDist () {
    let distDir = './../dist';
    // 打包文件
    let zipName = `${pkg.name}_${pkg.version}.zip`;
    let dirPath = path.join(__dirname, distDir);
    let zipPath = path.join(__dirname, `${distDir}/${zipName}`);

    // await zipUtil.zipDir(dirPath, zipPath,'','.map') // 去除map文件
    await zipUtil.zipDir(dirPath, zipPath, '', '.zip');

    return zipPath;
}

(async function () {
    console.log('********  打包压缩包  **********');

    // XXX 更改版本号
    await upVersion(distConfig);

    // XXX 打包压缩包
    let filePath = await zipDist();

    console.log(`filePath:\n${filePath}`);
    console.log('********  完成打包  **********');
})();