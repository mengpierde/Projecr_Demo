/**
 * 案件轨迹信息
 * @type {}
 */
module.exports = {
    dataInfo: {
        // 登录平台门户用户密码登录接口
        getInitDataInfo: {
            path: '/classManager/getOrgList',
            method: 'POST'
        },
        /**
         * 获取查询参数信息
         */
        getSearchCondition: {
            path: '/conditionSearch/getSearchCondition',
            method: 'POST'
        },
    }
}
