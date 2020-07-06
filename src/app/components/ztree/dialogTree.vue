<!--
    文件：src/components/ztree/dialogTree.vue
    作者：
    时间：2019-5-22
    描述：勾选树
-->

<template>
    <div id="areaTree">
        <div class="tree-box">
            <div class="zTreeDemoBackgroundleft">
                <ul id="otherTree" class="ztree" style="max-height: 150px;min-height: 46px">

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
                        chkboxType: {Y: '', N: ''}
                    },
                    data: {
                        simpleData: {
                            enable: true,
                            idKey: 'organCode',
                            pIdKey: 'parentCode',
                            rootPld: 0
                        },
                        key: {
                            name: 'name'
                        }
                    },
                    callback: {
                        onClick: this.zTreeOnClick,
                    },
                },
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
                window.$.fn.zTree.init(window.$('#otherTree'), this.setting, zNodes)
            },
            /**
             * 树节点勾选返回值
             */
            onCheckList () {
                let checklist = []
                let treeObj = window.$.fn.zTree.getZTreeObj('otherTree')
                let nodes = treeObj.getCheckedNodes(true)
                nodes.forEach((item) => {
                    if (item.roleCd) {
                        checklist.push(item.roleCd)
                    }
                    if (item.organCd) {
                        checklist.push(item.organCd)
                    }
                })
                return checklist
            },
            /**
             * 树节点点击事件
             */
            zTreeOnClick (event, treeId, treeNode) {
                console.log(this.setting.check.enable)
                this.$emit('getOrgCode', treeNode)
            }
        }
    }
    ;
</script>

<style>
    @import 'css/demo.css';
    @import 'css/zTreeStyle/zTreeStyle.css';
</style>
