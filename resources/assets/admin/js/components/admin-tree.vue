<template>
    <Tree :data="data3" :render="renderContent" ref="tree" v-if="new_tree==='new'"></Tree>
    <Tree :data="data1" :render="renderContent" ref="tree" v-else></Tree>
</template>
<script>
    export default {
        props:['new_tree'],
        data () {
            return {
                data1: [//可嵌套的节点属性的数组，生成tree的数据
                    {
                        title: 'parent 1',//根节点标题
                        expand: true,//是否展开所属节点
                        render: (h, { root, node, data }) => {//定义当前节点渲染内容
                            return h('span', {//根节点渲染规则
                                style: {
                                    display: 'inline-block',
                                    width: '100%'
                                },
                            }, [
                                h('span', [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-folder-outline'
                                        },
                                        style: {
                                            marginRight: '8px'
                                        }
                                    }),
                                    h('span', {
                                        domProps:{
                                            innerHTML:data.title
                                        },
                                        // attrs:{
                                        //     tabindex:"1"//使span元素也能使用:focus
                                        // },
                                        'class':{
                                            mouse_over:true
                                        },
                                        on: {
                                            click: () => { this.getNode(data) }//给根节点的标题绑定点击事件
                                        }
                                    })
                                ]),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        float: 'right',
                                        marginRight: '32px'
                                    }
                                }, [
                                    h('Button', {
                                        props: Object.assign({}, this.buttonProps, {
                                            icon: 'ios-plus-empty',
                                            type: 'primary'
                                        }),
                                        style: {
                                            width: '52px'
                                        },
                                        on: {
                                            click: () => { this.append(data) }
                                        }
                                    })
                                ])
                            ]);
                        },
                        children: [//子节点属性数组
                            {
                                title: 'child 1-1',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-1-1',
                                        expand: true
                                    },
                                    {
                                        title: 'leaf 1-1-2',
                                        expand: true
                                    }
                                ]
                            },
                            {
                                title: 'child 1-2',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1',
                                        expand: true
                                    },
                                    {
                                        title: 'leaf 1-2-1',
                                        expand: true
                                    }
                                ]
                            }
                        ]
                    }
                ],
                data2:[],//需要一个对象数组，里面包含一个对象
                data3: [//新文档的初始数据
                                {
                                    title: 'parent 1',//新根节点标题
                                    expand: true,//是否展开所属节点
                                    render: (h, { root, node, data }) => {//定义当前节点渲染内容
                                        return h('span', {//根节点渲染规则
                                            style: {
                                                display: 'inline-block',
                                                width: '100%'
                                            }
                                        }, [
                                            h('span', [
                                                h('Icon', {
                                                    props: {
                                                        type: 'ios-folder-outline'
                                                    },
                                                    style: {
                                                        marginRight: '8px'
                                                    }
                                                }),
                                                h('span', {
                                                    domProps:{
                                                        innerHTML:data.title
                                                    },
                                                    attrs:{
                                                        tabindex:"1"
                                                    },
                                                    'class':{
                                                        mouse_over:true
                                                    },
                                                    on: {
                                                        click: () => { this.getNode(data) }//给根节点的标题绑定点击事件
                                                    }
                                                })
                                            ]),
                                            h('span', {
                                                style: {
                                                    display: 'inline-block',
                                                    float: 'right',
                                                    marginRight: '32px'
                                                }
                                            }, [
                                                h('Button', {
                                                    props: Object.assign({}, this.buttonProps, {
                                                        icon: 'ios-plus-empty',
                                                        type: 'primary'
                                                    }),
                                                    style: {
                                                        width: '52px'
                                                    },
                                                    on: {
                                                        click: () => { this.append(data) }
                                                    }
                                                })
                                            ])
                                        ]);
                                    }
                                }
                            ],
                buttonProps: {//设置加减按钮属性
                    type: 'ghost',
                    size: 'small',
                },
                select_count:-1//用于防止重复点击节点时弹出确认框
            }
        },
        watch:{
            new_tree:function () {//当编辑页面在新建和编辑现有两种情况下跳转时,重新初始化select_count
                this.select_count = -1;
            }
        },
        methods: {
            renderContent (h, { root, node, data }) {//内容渲染相关的属性
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    }
                }, [
                    h('span', [//渲染标题部分
                        h('Icon', {
                            props: {
                                type: 'ios-paper-outline'
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', {
                            domProps:{
                                innerHTML:data.title
                            },
                            attrs:{
                                tabindex:"1"
                            },
                            'class':{
                                mouse_over:true
                            },
                            on: {
                                click: () => { this.getNode(data) }//给每个节点的标题绑定点击事件
                            }
                        })
                    ]),
                    h('span', {//渲染加减按钮部分
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px'
                        }
                    }, [
                        h('Button', {//加
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-plus-empty'
                            }),
                            style: {
                                marginRight: '8px'//加减按钮的间距
                            },
                            on: {
                                click: () => { this.append(data) }
                            }
                        }),
                        h('Button', {//减
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-minus-empty'
                            }),
                            on: {
                                click: () => { this.remove(root, node, data) }
                            }
                        })
                    ])
                ]);
            },
            getNode(data){
                if (this.select_count === -1){//第一次点击和重复点击不提示确认框
                    this.select_count = data.nodeKey;
                    this.$emit('getTheNode',data);
                }else if(this.select_count !== data.nodeKey){//重复点击弹出确认框
                    this.$Modal.confirm({
                        title:'提示',
                        content:'<p>是否确定切换节点?</p><p>切换后未提交的编辑内容将被清除!</p>',
                        onOk:()=>{
                            this.$emit('getTheNode',data);
                            this.select_count = data.nodeKey;
                            this.$Message.info('切换成功');
                        },
                        onCancel:()=>{
                            this.$Message.info('取消切换');
                        }
                    });
                }
            },
            append (data) {//增加一个节点
                const children = data.children || [];
                children.push({//节点数据为数组形式
                    // title: 'appended node',
                    title:`appended node ${data.title}`,
                    expand: true,
                });
                this.$set(data, 'children', children);//$set是全局Vue.set的别名，用于动态生成data对象中的属性值
            },
            remove (root, node, data) {//删除一个节点
                const parentKey = root.find(el => el === node).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                parent.children.splice(index, 1);//删除数组parent.children中index位置的一个元素
            }
        },
        // mounted(){
        //     let title = null;//标题属性
        //     let message = null;//节点内容
        //     let data4_array = []//data4的预备数组
        //     for (let i=0;i<sessionStorage.length;i++){//遍历本地存储
        //         console.log(sessionStorage.length);
        //         let data = {};//sessionStorage中数据向data4_array中转移的中间量
        //         title = parseInt(sessionStorage.key(i));//将本地存储的title序号转换为数字
        //         message = sessionStorage.getItem(title);//将本地存储的title序号的值取出
        //         if (title === 1){
        //             data.title = 'parent 1';//标题属性赋值
        //             data.expand = true;//expand属性赋值
        //             data.message = message;//节点内容属性赋值
        //             data.render = (h, { root, node, data }) => {//定义当前节点渲染内容
        //                 return h('span', {
        //                     style: {
        //                         display: 'inline-block',
        //                         width: '100%'
        //                     }
        //                 }, [
        //                     h('span', [
        //                         h('Icon', {
        //                             props: {
        //                                 type: 'ios-folder-outline'
        //                             },
        //                             style: {
        //                                 marginRight: '8px'
        //                             }
        //                         }),
        //                         h('span', data.title)
        //                     ]),
        //                     h('span', {
        //                         style: {
        //                             display: 'inline-block',
        //                             float: 'right',
        //                             marginRight: '32px'
        //                         }
        //                     }, [
        //                         h('Button', {
        //                             props: Object.assign({}, this.buttonProps, {
        //                                 icon: 'ios-plus-empty',
        //                                 type: 'primary'
        //                             }),
        //                             style: {
        //                                 width: '52px'
        //                             },
        //                             on: {
        //                                 click: () => { this.append(data) }
        //                             }
        //                         })
        //                     ])
        //                 ]);
        //             }
        //             data4_array.push(data);
        //         }else if (title>10 && title<100) {
        //             let children_data = {};
        //             children_data.title = `child ${title}`;
        //             children_data.expand = true;
        //             children_data.message = message;
        //             if (!data4_array[0].children){//检测是否已经存在子节点
        //                 data4_array[0].children = [];
        //                 data4_array[0].children.push(children_data);
        //             } else {
        //                 data4_array[0].children.push(children_data);
        //             }
        //         }else if(title>100 && title<1000){
        //             // brother_data = {}
        //         }
        //     }
        //     this.data4 = data4_array;
        //     console.log(data4_array)
        // }
        mounted(){
            let data2_before = sessionStorage.key(0);
            // TODO:复制上面的渲染函数
            this.data2 = data2_before;
        }
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