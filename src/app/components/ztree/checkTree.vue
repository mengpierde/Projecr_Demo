<!--
    文件：src/components/ztree/checkTree.vue
    作者：
    时间：2019-5-22
    描述：勾选树
-->

<template>
    <div id="areaTree">
        <div class="tree-box">
            <div class="zTreeDemoBackgroundleft">
                <ul id="treeDemo" class="ztree" style="max-height: 200px;min-height: 50px">

                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import '../ztree/js/jquery-1.4.4.min.js'
    import '../ztree/js/jquery.ztree.core.min.js'
    import '../ztree/js/jquery.ztree.excheck.min.js'

    export default {
        props: {
            zNodes: Array
        },
        data () {
            return {
                setting: {
                    // 展示勾选框
                    check: {
                        enable: false,
                        chkboxType: {Y: '', N: 's'},
                        autoCheckTrigger: false,
                        selectedMulti: false
                    },
                    data: {
                        key: {
                            name: 'description'
                        },
                        simpleData: {
                            enable: true,
                            idKey: 'dictionaryCd',
                            pIdKey: 'parentDictionaryCd',
                            rootPld: 0
                        }
                    },
                    async: {
                        enable: true
                    },
                    callback: {
                        onClick: this.zTreeOnClick,
                        onAsyncSuccess: this.onAsyncSuccess,
                    }
                },
                organCd: ''
            }
        },
        mounted () {
            // window.$.fn.zTree.init(window.$('#treeDemo'), this.setting, this.zNodes).expandAll(true)
        },
        methods: {
            freshArea (zNodes) {
                zNodes[0].open = true
                zNodes.forEach((item) => {
                    item.iconSkin = 'bgClass'
                })
                zNodes.forEach((item) => {
                    item.url = ''
                })
                let treeObj = window.$.fn.zTree.init(window.$('#treeDemo'), this.setting, zNodes)
                // treeObj.expandAll(true)
                let nodes = treeObj.getNodes()
                if (nodes.length > 0) {
                    treeObj.selectNode(nodes[0])
                    this.organCd = nodes[0]
                    this.$emit('func', this.organCd)
                }
            },
            /**
             * 树节点勾选返回值
             */
            onCheckList () {
                let checklist = []
                let treeObj = window.$.fn.zTree.getZTreeObj('treeDemo')
                let nodes = treeObj.getCheckedNodes(true)
                nodes.forEach((item) => {
                    checklist.push(item.functionCd)
                })
                // 321183010100
                return checklist
            },
            /**
             * 树节点点击事件
             */
            zTreeOnClick (event, treeId, treeNode) {
                    this.$emit('getOrgCode', treeNode)
            },
            /**
             * 默认选中
             */
            selectDefaultt () {
                let treeObj = window.$.fn.zTree.getZTreeObj('treeDemo')
                let node = treeObj.getNodeByParam('organCode', 321183010100)
                treeObj.checkNode(node, true)
            },
            /**
             * 默认展开一级节点
             */
            onAsyncSuccess (event, treeId) {
                let treeObj = window.$.fn.zTree.getZTreeObj(treeId)
                let nodes = treeObj.getNodes()
                if (nodes.length > 0) {
                    for (let i = 0; i < nodes.length; i++) {
                        treeObj.expandNode(nodes[i], true, false, false)
                    }
                }
            }
        }
    }
    ;
</script>

<style lang="scss">
    @import 'css/demo.css';
    @import 'css/zTreeStyle/zTreeStyle.css';
    ul.ztree {
        margin-top: 10px;
        max-height: 500px;
        min-height: 100px;
        width: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .ztree::-webkit-scrollbar {
        width: 2px;
        height: 4px;
    }
    .ztree::-webkit-scrollbar-thumb {
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: rgba(0, 0, 0, 0.2);
    }
    .ztree::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 0;
        background: rgba(0, 0, 0, 0.1);
    }
    .ztree li a.curSelectedNode {
        padding-top: 0px;
        background-color: #aacdf3;
        color: black;
        height: 26px;
        border: 1px #f3f1ef solid;
        opacity: 0.8;
        border-radius: 2px;
    }
</style>
