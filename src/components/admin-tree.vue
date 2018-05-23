<template>
    <div>
        <Tree :data="data3" :load-data="loadData" :render="renderContent" ref="tree" v-if="new_tree==='new'"></Tree>
        <Tree :data="data3" :load-data="loadData" :render="renderContent" ref="tree" v-else></Tree>
    </div>

</template>
<script>
    export default {
        props:['new_tree','docId'],//docId是文档id
        data () {
            return {
                // data1: [//可嵌套的节点属性的数组，生成tree的数据
                //     {
                //         title: 'parent 1',//根节点标题
                //         expand: true,//是否展开所属节点
                //         render: (h, { root, node, data }) => {//定义当前节点渲染内容
                //             return h('span', {//根节点渲染规则
                //                 style: {
                //                     display: 'inline-block',
                //                     width: '100%'
                //                 },
                //             }, [
                //                 h('span', [
                //                     h('Icon', {
                //                         props: {
                //                             type: 'ios-folder-outline'
                //                         },
                //                         style: {
                //                             marginRight: '8px'
                //                         }
                //                     }),
                //                     h('span', {
                //                         domProps:{
                //                             innerHTML:data.title
                //                         },
                //                         // attrs:{
                //                         //     tabindex:"1"//使span元素也能使用:focus
                //                         // },
                //                         'class':{
                //                             mouse_over:true
                //                         },
                //                         on: {
                //                             click: () => {
                //                             this.getNode(data);
                //                             }//给根节点的标题绑定点击事件
                //                         }
                //                     })
                //                 ]),
                //                 h('span', {
                //                     style: {
                //                         display: 'inline-block',
                //                         float: 'right',
                //                         marginRight: '32px'
                //                     }
                //                 }, [
                //                     h('Button', {
                //                         props: Object.assign({}, this.buttonProps, {
                //                             icon: 'ios-plus-empty',
                //                             type: 'primary'
                //                         }),
                //                         style: {
                //                             width: '52px'
                //                         },
                //                         on: {
                //                             click: () => { this.append(data) }
                //                         }
                //                     })
                //                 ])
                //             ]);
                //         },
                //         children: [//子节点属性数组
                //             {
                //                 title: 'child 1-1',
                //                 expand: true,
                //                 children: [
                //                     {
                //                         title: 'leaf 1-1-1',
                //                         expand: true
                //                     },
                //                     {
                //                         title: 'leaf 1-1-2',
                //                         expand: true
                //                     }
                //                 ]
                //             },
                //             {
                //                 title: 'child 1-2',
                //                 expand: true,
                //                 children: [
                //                     {
                //                         title: 'leaf 1-2-1',
                //                         expand: true
                //                     },
                //                     {
                //                         title: 'leaf 1-2-1',
                //                         expand: true
                //                     }
                //                 ]
                //             }
                //         ]
                //     }
                // ],
                data3: [//新文档的初始数据
                                {
                                    title: 'parent 1',//新根节点标题
                                    expand: false,//是否展开所属节点
                                    loading:false,
                                    children:[],
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
                                                        click: () => {
                                                            this.getNode(data)//给根节点的标题绑定点击事件
                                                        }

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
        	loadData (item, callback) {
        	    let url = `api/articles/${this.docId}/tree`;
        	    console.log(url);
                this.axios.get('api/articles/9/tree')
                    .then(response => {
                    const data = [
                        response.data,
                    ]
                    callback(data);
                })
                    .catch(error => {
                        this.$Message.error('404');
                    })
            },

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
                    console.log(data);
                    this.$emit('getTheNode',data);
                }else if(this.select_count !== data.nodeKey){//重复点击弹出确认框
                    this.$Modal.confirm({
                        title:'提示',
                        content:'<p>是否确定切换节点?</p><p>切换后未提交的编辑内容将被清除!</p>',
                        onOk:()=>{
                            console.log(data);
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
        	    //要形成一个二叉树，每个父节点下只能有两个子节点
        	    if(!data.children){//当该节点下没有子节点，创建的节点为其左子树节点
                    const children = data.children || [];
                    children.push({//节点数据为数组形式
                        title:`appended node ${data.title}`,
                        parentId:data.id,
                        body:'左子树',
                        type:'left',
                    });
                    console.log(children)
                    this.$set(data, 'children', children);//$set是全局Vue.set的别名，用于动态生成data对象中的属性值
                }else if(data.children[1]===undefined){//当该节点下有一个节点时，创建的节点为其右子树节点
                    const children = data.children || [];
                    children.push({//节点数据为数组形式
                        title:`appended node ${data.title}`,
                        parentId:data.id,
                        body:'右子树',
                        type:'right',
                    });
                    console.log(children)
                    this.$set(data, 'children', children);//$set是全局Vue.set的别名，用于动态生成data对象中的属性值
                } else {
                    this.$Message.info('每个父节点只能有两个子节点！');
                }

        },
            remove (root, node, data) {//删除一个节点
                const parentKey = root.find(el => el === node).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                parent.children.splice(index, 1);//删除数组parent.children中index位置的一个元素
            }
        },
        // mounted(){
        //     let data2_before = sessionStorage.key(0);
        //     // TODO:复制上面的渲染函数
        //     this.data2 = data2_before;
        // }
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