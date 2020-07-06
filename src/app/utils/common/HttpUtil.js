/**
 * 获取请求、html页面相关工具函数
 */
export default {
    /**
     * 获取浏览器url参数键值对
     */
    getUrlParams () {
        return window.location.hash.replace(/.+\?/, '').split('&').reduce((prev, next) => {
            const list = next.split('=');
            prev[list[0]] = list[1];
            return prev;
        }, {});
    },

    /**
     * 获取地址栏全部参数键值对
     * @returns {{}}
     */
    getParams () {
        let name, value;
        let str = window.location.href; // 取得整个地址栏
        let num = str.indexOf('?');
        str = str.substr(num + 1); // 取得所有参数   stringlet.substr(start [, length ]

        str = decodeURI(str);
        const arr = str.split('&'); // 各个参数放到数组里

        const params = {};
        for (let i = 0; i < arr.length; i++) {
            num = arr[i].indexOf('=');
            if (num > 0) {
                name = arr[i].substring(0, num);
                value = arr[i].substr(num + 1);
                params[name] = value;
            }
        }
        return params;
    }
};