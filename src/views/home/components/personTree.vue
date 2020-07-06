<template>
    <el-tree
        :data="personData"
        show-checkbox
        node-key="personId"
        :props="defaultProps"
        :default-expanded-keys="showTree"
        @check-change = "onChecked"
    ></el-tree>
</template>

<script>
export default {
    data() {
        return {
            showTree: [1], 
            personData: [
                {
                    personId: 1,
                    label: "人员",
                    children: [
                        {
                            personId: 2,
                            label: "张三",
                        },{
                            personId: 3,
                            label: "李四",
                        },{
                            personId: 4,
                            label: "王五",
                        }
                    ]
                },
            ],
            defaultProps: {
                children: "children",
                label: "label"
            }
        };
    },
    methods:{
        onChecked (data, isCkecked, isCkeckedChild) {
            console.log(data, isCkecked, isCkeckedChild)
            if(isCkecked && !isCkeckedChild) {
                // 选中的时候传递选中的值
                this.$emit('getCheckedPerson', data)
            } else if(!isCkeckedChild){
                // 删除feature
                console.log(data)
                this.$emit('removeFeature', data)
            }
        }
    }
};
</script>

<style>
</style>