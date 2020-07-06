/**
 * 返回JSON对象或方法
 * @returns {{code: string, time: number, data: *[], success: boolean}}
 */
module.exports = function () {
    return {
        'code': '999999',
        'time': 1523329299763,
        'data': '使用 mockConfig.js 返回的数据',
        'success': true,
    };
};