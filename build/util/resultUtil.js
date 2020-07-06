/**
 * 包装返回结果
 * @param data
 * @returns {{code: string, time: number, data: *, success: boolean}}
 */
module.exports.wrapResult = function (data) {
    return {
        'code': '999999',
        'time': Date.now(),
        'data': data,
        'success': true,
    };
};