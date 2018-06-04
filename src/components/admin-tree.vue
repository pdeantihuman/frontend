<template>
    <div>
        <Tree :data="data3" :load-data="loadData" :render="renderContent" ref="tree"></Tree>
    </div>
</template>
<script>
    import api from "../api/api";

    export default {
        props:['new_tree','docId'],//docId是文档id
        data () {
            return {
                data3: [//新文档的初始数据
                                {
                                    title: '帮助文档二叉树',//新根节点标题
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
                axios.get(url)
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
                                click: () => { this.remove(root,node,data) }
                            }
                        })
                    ])
                ]);
            },
            getNode(data){//点击节点，获取节点信息然后告知form组件
                const post_url = `${api.for_node}${data.id}?id=${data.id}`;
                if (this.select_count === -1){//第一次点击和重复点击不提示确认框
                    this.select_count = data.nodeKey;
                    axios.get(post_url)
                        .then(response=>{
                            data.body = response.data.data.body;
                            this.$emit('getTheNode',data)
                        })
                }else if(this.select_count !== data.nodeKey){//跳转点击弹出确认框
                    this.$Modal.confirm({
                        title:'提示',
                        content:'<p>确定切换节点?</p><p>切换后未提交的编辑内容将被清除!</p>',
                        onOk:()=>{
                            axios.get(post_url)
                                .then(response=>{
                                    data.body = response.data.data.body;
                                    this.$emit('getTheNode',data)
                                })
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
                // axios.get('http://helper.test/api/articles')//获取了数据库中所有的节点，以及相关信息
                axios.get(api.for_node)//获取了数据库中所有的节点，以及相关信息
                    .then(response=>{
                        let rule_table = response.data.data;
                        for (let i=0;i<rule_table.length;i++){
                            if(rule_table[i].id===data.id){

                                if (rule_table[i].leftChild!==0 && rule_table[i].rightChild!==0){//如果该节点有两个子节点
                                    this.$Message.info('每个父节点只能有两个子节点！');
                                }else if(rule_table[i].leftChild===0){//如果该节点没有左节点，为其创建左节点
                                    this.$Modal.confirm({
                                               title:'提示',
                                               content:'<p>此节点将新建左节点，是否创建?</p><p>新建后为空白节点，需要选中后再次编辑</p>',
                                               onOk:()=>{
                                                   // const post_url = `http://10.1.38.20/api/articles`;
                                                   const post_url = api.for_node;
                                                   this.modal_loading = true;
                                                   const children = data.children || [];
                                                   children.push({//节点数据为数组形式
                                                       title:`空白节点，父节点： ${data.title}`,
                                                       parentId:data.id,
                                                       body:'新建立的节点',
                                                       type:'left',
                                                   });
                                                   this.$set(data, 'children', children);//$set是全局Vue.set的别名，用于动态生成data对象中的属性值
                                                   const new_index = children.length-1;
                                                   axios.post(post_url,children[new_index])
                                                       .then(response=>{
                                                           if (response.status === 201){
                                                               this.modal_loading = false;
                                                               this.modal2 = false;
                                                               this.$Message.success('成功新建该节点');
                                                               children[new_index].id = response.data.data.id;
                                                               this.$set(data, 'children', children);
                                                           }else if (response.status === 500) {
                                                               this.modal_loading = false;
                                                               this.modal2 = false;
                                                               this.$Message.warning('新建节点失败');
                                                           }
                                                       })
                                                       .catch(error => {
                                                           this.modal_loading = false;
                                                           this.modal2 = false;
                                                           this.$Message.error('无法新建该节点');
                                                       })
                                               },
                                               onCancel:()=>{
                                                   this.$Message.info('已取消新建节点');
                                               }
                                           });
                                }else if(rule_table[i].rightChild===0){//如果该节点没有右节点，为其创建右节点
                                    this.$Modal.confirm({
                                        title:'提示',
                                        content:'<p>此节点将新建右节点，是否创建?</p><p>新建后为空白节点，需要选中后再次编辑</p>',
                                        onOk:()=>{
                                            // const post_url = `http://10.1.38.20/api/articles`;
                                            const post_url = api.for_node;
                                            this.modal_loading = true;
                                            const children = data.children || [];
                                            children.push({//节点数据为数组形式
                                                title:`空白节点，父节点： ${data.title}`,
                                                parentId:data.id,
                                                body:'新建立的节点',
                                                type:'right',
                                            });
                                            this.$set(data, 'children', children);//$set是全局Vue.set的别名，用于动态生成data对象中的属性值
                                            const new_index = children.length-1;
                                            axios.post(post_url,children[new_index])
                                                .then(response=>{
                                                    if (response.status === 201){
                                                        this.modal_loading = false;
                                                        this.modal2 = false;
                                                        this.$Message.success('成功新建该节点');
                                                        children[new_index].id = response.data.data.id;
                                                    }else if (response.status === 500) {
                                                        this.modal_loading = false;
                                                        this.modal2 = false;
                                                        this.$Message.warning('新建节点失败');
                                                    }
                                                })
                                                .catch(error => {
                                                    this.modal_loading = false;
                                                    this.modal2 = false;
                                                    this.$Message.error('无法新建该节点');
                                                })
                                        },
                                        onCancel:()=>{
                                            this.$Message.info('已取消新建节点');
                                        }
                                    });
                                }
                            }
                        }
                    })
            },
            remove(root,node,data){
                this.$Modal.confirm({
                    title:'提示',
                    content:'<p>确定删除节点?</p><p>删除后该节点依然存在但内容将被清除，且无法显示!</p>',
                    onOk:()=>{
                        const parentKey = root.find(el => el === node).parent;
                        const parent = root.find(el => el.nodeKey === parentKey).node;
                        const index = parent.children.indexOf(data);
                        parent.children.splice(index, 1,data);
                        const post_del_node = data.id;
                        // const post_url = `http://helper.test/api/articles/${post_del_node}?id=${post_del_node}`;
                        const post_url = `${api.for_node}${post_del_node}?id=${post_del_node}`;
                        this.modal_loading = true;
                        axios.delete(post_url)
                            .then(response=>{
                                if (response.status === 204){
                                    this.modal_loading = false;
                                    this.modal2 = false;
                                    this.$Message.success('成功删除该节点');
                                    const parentKey = root.find(el => el === node).parent;
                                    const parent = root.find(el => el.nodeKey === parentKey).node;
                                    const index = parent.children.indexOf(data);
                                    parent.children.splice(index, 1);
                                    this.select_count === -1
                                    this.$emit('getTheNode',{
                                        body:''
                                    });
                                }else if (response.status === 500) {
                                    this.modal_loading = false;
                                    this.modal2 = false;
                                    this.$Message.warning('删除失败');
                                }
                            })
                            .catch(error => {
                                this.modal_loading = false;
                                this.modal2 = false;
                                this.$Message.error('404 没有要删除的节点');
                            })
                    },
                    onCancel:()=>{
                        this.$Message.info('已取消删除');
                    }
                });
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