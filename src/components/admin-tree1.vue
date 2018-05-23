<template>
    <Tree :data="data1" :load-data="loadData" ref="tree" v-else></Tree>
</template>
<script>
    export default {
        props:['new_tree'],
        data () {

            return {
                data1: [//可嵌套的节点属性的数组，生成tree的数据
                    {
                        title: '载入',//根节点标题
                        loading: false,
                        children: [//子节点属性数组
                        ]
                    }
                ],
            }
        },
        methods: {
            loadData (item, callback) {
                this.axios.get('api/articles/1/tree').then(response => {
                    const data = [
                        response.data,
                    ]
                    callback(data);
                })
            }
        },
    }
</script>

<style>
    .mouse_over:hover{
        background-color: #eaf4fe;
        border-radius:3px;
        padding: 0 4px;
        cursor: pointer;
        transition: all .2s ease-in-out;/*设置0.2秒变化时长*/
    }
    .mouse_over:focus{
        outline:none;/*去除:focus带来的蓝色outline*/
        background-color: #d5e8fc;
        border-radius:3px;
        padding: 0 4px;
        cursor: pointer;
        transition: all ease-in-out;
    }
</style>