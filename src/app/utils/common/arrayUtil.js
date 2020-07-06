export default {
    /**
     * 数组求和
     */
    sum (arr) {
        let count = 0
        if (arr instanceof Array) {
            for (let i = 0; i < arr.length; i++) {
                if (typeof arr[i] === 'string' || typeof arr[i] === 'number') {
                    count += parseFloat(arr[i])
                }
            }
        }
        return count
    },
    addItem (arr, number) {
        if (arr instanceof Array) {
            for (let i = 0; i < number; i++) {
                arr.push([])
            }
            return arr
        }
        return arr
    },
    /**
     * 数组每项的值为空则用_now对应的值替换
     */
    replaceItem (_old, _now) {
        if (_old instanceof Array && _now instanceof Array) {
            for (let i = 0; i < _old.length; i++) {
                if (this.$util.stringUtil.isEmpty(_old[i]) && _now.length > i) {
                    _old[i] = _now[i]
                }
            }
        }
        return _old
    },
    /**
     * 数组去重复
     * @param arr {type=Array} 要去重复的数组
     */
    unique (arr) {
        const result = []
        const hash = {}
        for (let i = 0, elem; (elem = arr[i]) != null; i++) {
            if (!hash[elem]) {
                result.push(elem)
                hash[elem] = true
            }
        }
        return result
    },
    /**
     * 判断数组内容是否有空
     * @param list
     */
    hasEmpty (list) {
        if (Array.isArray(list) && list.length > 0) {
            for (const item of list) {
                if (!item) {
                    return true
                }
            }
            return false
        }
        return true
    },
    /**
     * array 排序
     */
    arrSortByOrder (value, order) {
        const field = order || 'order'
        return value.sort((a, b) => {
            return parseInt(a[field]) > parseInt(b[field]) ? 1 : -1
        })
    }
}
