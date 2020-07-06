<template>
    <el-select size="mini" v-model="checkedNames" multiple @remove-tag="handleRemoveTag">
        <el-option style="height: auto;" :value="checkedIds">
            <el-tree :data="treeData"
                     :props="treeConfig"
                     show-checkbox
                     node-key="organCode"
                     ref="tree"
                     @check-change="handleCheckChange">
            </el-tree>
        </el-option>
    </el-select>
</template>

<script>
    import _ from 'lodash'

    export default {
        name: 'treeSelect',
        data () {
            return {
                // 原始的平滑的数据
                flatData: {},
                // 树形结构的数据
                treeData: [],
                // 被选中的数据
                checkedNode: [],
                treeConfig: {
                    label: 'name',
                    children: 'children'
                }
            }
        },
        props: {
            // 树形展示的数据 1单位 2案件类别
            type: {
                type: Number,
                default: 1
            }
        },
        computed: {
            checkedIds () {
                return this.checkedNode.length ? this.checkedNode.map(item => item.organCode) : []
            },
            checkedNames () {
                return this.checkedNode.length ? this.checkedNode.map(item => item.name) : []
            }
        },
        methods: {
            async init () {
                let result = await this.$backend.request(this.$api.assistQuery.queryCompanyAndCaseTypeTree)
                if (this.type === 1) {
                    this.flatData = result.data.DW
                    this.treeData = this.transformData(result.data.DW)
                } else if (this.type === 2) {
                    this.flatData = result.data.AJLBTWO
                    this.treeData = this.transformData(result.data.AJLBTWO)
                }
            },
            transformData (list) {
                let obj = {}, tree = []
                list.forEach(item => {
                    obj[item.organCode] = item
                })
                list.forEach(item => {
                    let parent = obj[item.parentCode]
                    if (parent) {
                        (parent.children || (parent.children = [])).push(item)
                    } else {
                        tree.push(item)
                    }
                })
                return tree
            },

            handleCheckChange () {
                this.checkedNode = this.$refs.tree.getCheckedNodes()
                this.$emit('on-select', this.checkedNode)
            },
            handleRemoveTag () {
                let newNodes = []
                this.flatData.map(item => {
                    if (this.checkedNames.includes(item.name)) {
                        newNodes.push(item)
                    }
                })
                this.$refs.tree.setCheckedNodes(newNodes)
            }
        },
        mounted () {
            this.init()
        }
    }
</script>

<style scoped>

</style>