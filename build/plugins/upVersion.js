/**
 * Created by cmfsea on 2017/4/14.
 */
const pkg = require('../../package');
const appHelper = require('../util/appHelper');

/**
 * 更新版本信息，当前版本编号+打包日期 v2.1.11.21081010
 */
module.exports = async function upVersion (filePath) {
    let str = await appHelper.readString(filePath);
    let version = `${pkg.version}.${new Date().toLocaleDateString().replace(new RegExp(/-/g), '')}`;
    let info = str.replace(new RegExp(`VERSION`), version);
    await appHelper.writeString(filePath, info);
};