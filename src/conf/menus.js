/**
 * 菜单项目
 */
export default [
    {
        label: '案件经营',
        autoPath: 'cases/uploadData',
        children: [
            {
                label: '案件资料上报',
                path: 'cases/uploadData',
                component: 'cases/uploadData/index',
            },
            {
                label: '视图',
                hidden: true,
                path: 'map',
                component: 'cases/uploadData/components/map/openlayersMap'
            },
            {
                label: '案件档案及流程图',
                path: 'caseFileAndChat',
                component: 'cases/caseFileAndChat/index',
                hidden: true
            },
            {
                label: '案件线索评估',
                path: 'cases/clue',
                component: 'cases/clue/index',
            },
            {
                label: '案件资料查询',
                path: 'cases/information',
                component: 'cases/information/index'
            },
            // {
            //     label: '案件线索查询',
            //     path: 'cases/thread',
            //     component: 'cases/thread/index'
            // },
            {
                label: '案件指令查询',
                path: 'cases/instruct',
                component: 'assistQuery/orderNumberInfoSelect'
            },
            {
                label: '技术比中人员经营',
                path: 'cases/technology/operate',
                component: 'cases/technology/operate'

            },
            {
                label: '技术比中人员办结提示',
                path: 'cases/technology/finish',
                component: 'cases/technology/finish'

            },
            {
                label: '涉案物品经营',
                path: 'cases/materials/goods',
                component: 'cases/materials/goods'
            },
            {
                label: '涉案（警）非机动车检索',
                path: 'cases/materials/nonmotor',
                component: 'cases/materials/nonmotor'
            },
            {
                label: '涉案（警）通讯工具检索',
                path: 'cases/materials/communication',
                component: 'cases/materials/communication'
            },
            {
                label: '涉案（警）机动车检索',
                path: 'cases/materials/motor',
                component: 'cases/materials/motor'
            },
            {
                label: '涉案（警）计算机检索',
                path: 'cases/materials/computer',
                component: 'cases/materials/computer'
            },
            {
                label: '无线索案件经营（侵财类）',
                path: 'cases/nomatter',
                component: 'cases/nomatter/index'
            }
        ]
    },
    {
        label: '狱侦线索经营',
        autoPath: 'prison',
        children: [
            {
                label: '狱侦线索录入',
                path: 'prison',
                component: 'prison/index'

            },
            {
                label: '狱侦线索审核',
                path: 'prisonApproval',
                component: 'prison/approval/index'
            },
            {
                label: '狱侦线索审核详情',
                hidden: true,
                path: 'prisonApprovalDetail',
                component: 'prison/approval/detail'
            },
            {
                label: '狱侦线索反馈',
                hidden: true,
                path: 'prisonFeedback',
                component: 'prison/feedback'
            },
            {
                label: '狱侦指令查询',
                path: 'prisonDirective',
                component: 'prison/directive/prisonDirective'
            },
            {
                label: '狱侦线索查询',
                path: 'prisons',
                component: 'prison/prison'
            }
        ]
    },
    {
        label: '串并案分析',
        autoPath: 'addSerialParallel',
        children: [
            {
                label: '技术串并',
                children: [
                    {
                        label: '技术串并案录入',
                        path: 'addSerialParallel',
                        component: 'serialParallel/index'
                    },
                    {
                        label: '技术串并案查询',
                        path: 'serialParallel',
                        component: 'serialParallel/serialParallel'
                    },
                    {
                        label: '技术串并案详情',
                        hidden: true,
                        path: 'serialParallelDetail',
                        component: 'serialParallel/detail'
                    },
                    {
                        label: '技术串并案续串',
                        hidden: true,
                        path: 'appendSerial',
                        component: 'serialParallel/appendSerial'
                    }
                    
                ]
            },
            {
                label: '基层串并',
                path: '',
                component: '',
                children: [
                    {
                        label: '基层串并案录入',
                        path: 'basicSerial',
                        component: 'serialParallel/basicSerial/index'
                    },
                    {
                        label: '基层串并案查询',
                        path: 'serialParallels',
                        component: 'serialParallel/basicSerial/serialParallels'
                    },
                    {
                        label: '基层串并案管理',
                        path: 'serialParallelManager',
                        component: 'serialParallel/basicSerial/serialParallelManager'
                    },
                    {
                        label: '基层串并案详情',
                        hidden: true,
                        path: 'basicSerialDetail',
                        component: 'serialParallel/basicSerial/detail'
                    },
                    {
                        label: '基层串并案续串',
                        hidden: true,
                        path: 'updateSer',
                        component: 'serialParallel/basicSerial/updateSer'
                    }
                ]
            },
            {
                label: '合成串并',
                children: [
                    {
                        label: '合成串并案录入',
                        path: 'composeIndex',
                        component: 'serialParallel/compose/index'
                    },
                    {
                        label: '合成串并关联',
                        hidden: true,
                        path: 'composeRelation',
                        component: 'serialParallel/compose/relSerial'
                    },
                    {
                        label: '合成串并案审核',
                        path: 'compSerRew',
                        component: 'serialParallel/compose/compSerRew'
                    },
                    {
                        label: '合成串并详情',
                        hidden: true,
                        path: 'compSerqDetail',
                        component: 'serialParallel/compose/compSerqDetail'
                    },
                    {
                        label: '合成串并审核详情',
                        hidden: true,
                        path: 'hcSerialDetail',
                        component: 'serialParallel/compose/detail'
                    },
                    {
                        label: '合成串并案查询',
                        path: 'compSerq',
                        component: 'serialParallel/compose/compSerq',
                    },
                    {
                        label: '合成串并续串',
                        hidden: true,
                        path: 'updateSerq',
                        component: 'serialParallel/compose/updateSerq'
                    },
                    {
                        label: '串并案档案及流程图',
                        hidden: true,
                        path: 'composeDetail',
                        component: 'serialParallel/compose/composeDetail'
                    },
                    {
                        label: '串并案档案',
                        hidden: true,
                        path: 'profile',
                        component: 'serialParallel/compose/profile'
                    },
                    {
                        label: '串并案流程图',
                        hidden: true,
                        path: 'flowsheet',
                        component: 'serialParallel/compose/flowsheet'
                    },
                    {
                        label: '合成串并案线索查询',
                        path: 'composeClud',
                        component: 'serialParallel/compose/composeClud'
                    },
                    {
                        label: '合成串并案指令查询',
                        path: 'compOrderNumber',
                        component: 'serialParallel/compose/compOrderNumber'
                    }
                ]
            }
        ]
    },
    {
        label: '协查指令',
        autoPath: 'assistQuery',
        children: [
            {
                label: '基础信息协查请求录入',
                path: 'assistQuery',
                component: 'assistQuery/index'
            },
            {
                label: '基础信息协查请求查询',
                path: 'assistSelect',
                component: 'assistQuery/indexSelect'
            },
            {
                label: '指令信息发布',
                path: 'orderNumber',
                component: 'assistQuery/orderNumberInsert'
            },
            {
                label: '指令签收反馈查询',
                path: 'orderNumberFeedBack',
                component: 'assistQuery/orderNumberFeedBackSelect'
            },
            {
                label: '反馈详情页',
                hidden: true,
                path: 'feedBackDetail',
                component: 'assistQuery/feedBackDetail'
            },
            {
                label: '指令信息查询',
                path: 'orderNumberInfoSelect',
                component: 'assistQuery/orderNumberInfoSelect'
            }
        ]
    },
    {
        label: '辅助工具',
        autoPath: 'tools/photos',
        children: [
            {
                label: '照片辨认系统',
                children: [
                    {
                        label: '照片辨认工具',
                        path: 'tools/photos',
                        component: 'tools/photos/selectMain'
                    },
                    {
                        label: '常口数据导入',
                        path: 'tools/photos/often',
                        component: 'tools/photos/selectInput',
                        query: {
                            type: 1
                        }
                    },
                    {
                        label: '暂口数据导入',
                        path: 'tools/photos/temp',
                        component: 'tools/photos/selectInput',
                        query: {
                            type: 2
                        }
                    },
                    {
                        label: '数据维护',
                        children: [
                            {
                                label: '数据维护',
                                path: 'tools/photos/selectWh',
                                component: 'tools/photos/selectWh'
                            },
                            {
                                label: '数据新增',
                                path: 'tools/photos/dataAdd',
                                component: 'tools/photos/dataAdd'
                            }
                        ]
                    },
                    {
                        label: '照片审核',
                        path: 'tools/photos/selectSh',
                        component: 'tools/photos/selectSh'
                    },
                    {
                        label: '审核详情（隐藏菜单）',
                        hidden: true,
                        path: 'tools/photos/dataSh',
                        component: 'tools/photos/dataSh'
                    },
                    {
                        label: '人像检索',
                        path: 'tools/photos/selectFace',
                        component: 'tools/photos/selectFace'
                    }
                ]
            },
            {
                label: '外部工具',
                children: [
                    {
                        label: '外部工具',
                        path: 'tools/tools/toolsWb',
                        component: 'tools/tools/toolsWb',
                    },
                    {
                        label: '外部工具挂载',
                        children: [
                            {
                                label: '外部工具管理',
                                path: 'tools/tools/toolsGl',
                                component: 'tools/tools/toolsGl',
                            },
                            {
                                label: '外部工具新增',
                                path: 'tools/tools/toolsAdd',
                                component: 'tools/tools/toolsAdd',
                            },
                        ],
                    },
                ],
            },
        ]
    },
]