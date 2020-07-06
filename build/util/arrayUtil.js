module.exports = {
    /**
     * 数组乱序排序
     * @param array
     */
    randomSort (array) {
        array.sort(function (a, b) {
            return Math.random() > 0.5 ? -1 : 1;
        });
        return array;
    },
};