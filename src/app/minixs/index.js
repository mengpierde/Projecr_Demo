export default {
    methods: {
        // 日期时间格式化 数组转*Start/*End两个属性
        datetimeTurn (value, name) {
            let params = {}
            if (Array.isArray(value)) {
                params[name + 'Start'] = value[0]
                params[name + 'End'] = value[1]
            }
            return params
        }
    }
}


