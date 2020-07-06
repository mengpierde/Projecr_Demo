<!--
    文件：components/common/tabs.vue
    作者：
    时间：2017-06-15
    描述：选项卡
-->
<template>
    <section>
        <el-tabs v-model="activeName" type="card" closable @tab-remove="onRemoveTab" v-if="isClosed">
            <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.title" :name="item.name">
                <div>
                    <component :is="item.component" v-model="item.model"></component>
                </div>
            </el-tab-pane>
        </el-tabs>
        <el-tabs v-model="activeName" type="card" @tab-remove="onRemoveTab" v-if="!isClosed">
            <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.title" :name="item.name">
                <div>
                    <component :is="item.component" v-model="item.model"></component>
                </div>
            </el-tab-pane>
        </el-tabs>
    </section>
</template>

<script>
    import {StringUtils} from '../../utils/common/index.js'

    export default {
        data () {
            return {
                activeName: null,
                tabs: [],
                isClosed: true
            }
        },
        methods: {
            /**
             * 打开一个选项卡
             */
            open (options) {
                if (StringUtils.isEmpty(options.id)) {
                    throw new Error('id不能为空，且须唯一')
                }
                if (typeof options.closable === 'undefined') {
                    options.closable = true
                    this.isClosed = true
                } else {
                    this.isClosed = false
                }
                const name = options.id.toString()
                this.activeName = name

                const index = this.tabs.findIndex(tab => tab.name === name)
                if (index === -1) {
                    const tab = Object.assign({name}, options)
                    this.tabs.push(tab)
                }
            },
            /**
             * 选项卡移除事件
             */
            onRemoveTab (targetName) {
                const tabs = this.tabs
                let activeName = this.activeName
                for (let i = 0; i < tabs.length; i++) {
                    const tab = tabs[i]
                    if (tab.name !== targetName) {
                        continue
                    }
                    if (!tab.closable) {
                        return // 选项卡不允许关闭
                    }
                    if (activeName === targetName) {
                        const nextTab = tabs[i + 1] || tabs[i - 1]
                        if (nextTab) {
                            activeName = nextTab.name
                        }
                    }
                }
                this.activeName = activeName
                this.tabs = tabs.filter(tab => tab.name !== targetName)
            },
            /**
             * 打开指定窗口
             */
            openTab (id) {
                const name = id.toString()
                this.activeName = name
            }
        }
    }
</script>
