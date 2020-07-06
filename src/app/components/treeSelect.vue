<template>
    <div class="objRylb">
        <el-dialog :title="treeTitle" ref="dialogtree" :visible.sync="treeShow" @close="cancel">
            <div class="mh350">
                <el-input
                        placeholder="输入关键字进行过滤"
                        v-model="filterText">
                </el-input>
                <el-tree
                        class="filter-tree"
                        :data="personTreeArr"
                        show-checkbox=""
                        node-key="value"
                        ref="selectTree"
                        :filter-node-method="filterNode"
                        highlight-current
                        :props="defaultProps"
                        :check-strictly="true"
                        :default-expanded-keys='expanded'
                        :default-checked-keys='checked'
                >
                </el-tree>
            </div>
            <div class="tac">
                <el-button type="primary" @click="onSubmit()">确认</el-button>
                <el-button type="primary" @click="onReset">重置</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props: {
            checkObj: {
                type: Array,
                default: () => []
            },
            disabledData: {
                type: Array,
                default: () => []
            },
        },
        data () {
            let self = this
            return {
                filterText: '',
                personTreeArr: [],
                treeTitle: '人员类别',
                treeShow: false,
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                expanded: [],
                checked: [],
            }
        },
        watch: {
            filterText (val) {
                this.$refs.selectTree.filter(val)
            }
        },
        created () {

        },
        mounted () {
            if (this.checkObj.length > 0) {
                this.checkInfo()
            }
            this.getRylb()
        },
        updated () {
        },
        methods: {
            // 获取路由带过来的值，控制tree勾选
            setCheckedData (data) {
                let dataList = [
                    data.value
                ]
                this.$nextTick(() => {
                    this.$refs.selectTree.setCheckedKeys(dataList)
                })
            },
            filterNode (value, data) {
                if (!value) return true
                return data.label.indexOf(value) !== -1
            },
            getRylb () {
                this.$backend.request(this.$api.sysMnange.queryRylb).then((re) => {
                    this.personTreeArr = re.data
                    if (this.disabledData.length > 0) {
                        this.disabledInit()
                    }
                })
            },
            // 重置人员标签-预警类别树中的选中对象
            disabledInit () {
                this.disabledData.forEach(item => {
                    this.disabledRecursive(this.personTreeArr, item)
                })
                this.checked = this.disabledData
                this.expanded = this.disabledData
            },
            // 递归计算选择中的对象禁用按钮
            disabledRecursive (treeArray, rylbData) {
                treeArray = treeArray.map(ele => {
                    if (ele.value === rylbData) {
                        ele.disabled = true
                    }
                    if (ele.children) {
                        this.disabledRecursive(ele.children, rylbData)
                    }
                    return ele
                })
            },
            onReset () {
                this.disabledInit()
                this.$refs.selectTree.setCheckedKeys(this.disabledData)
            },
            onSubmit () {
                let self = this
                let data = this.$refs.selectTree.getCheckedNodes()
                if (data) {
                    this.$emit('getPersonType', data)
                    self.treeShow = false
                    self.$parent.treePageAdd = false
                }
            },
            cancel () {
                let self = this
                self.treeShow = false
                self.$parent.treePageAdd = false
                self.$parent.treePageSelect = false
            },
            checkInfo () {
                this.checkObj.map(ele => {
                    this.checked.push(ele.value)
                    this.expanded.push(ele.value)
                })
            },
            // 点击人员类别回显（勾选）
            getCheckValue (data) {
                this.$nextTick(() => {
                    this.$refs.selectTree.setCheckedKeys(data)
                })
            }
        }
    }
</script>
<style lang="scss">
    .objRylb {
        .el-dialog {
            width: 40% !important;
            .el-dialog__title {
                color: #88b2f4 !important;
            }
            .el-tree__empty-block {
                background: #1f418c;
            }
        }
        .el-dialog__headerbtn {
            top: 8px !important;
        }
        .tac {
            text-align: center;
            margin-top: 15px;
        }
    }
</style>
