<template>
    <div class="container">
        <div class="container">
            <Tree @getTheNode="getNode" v-bind:new_tree="id" v-if="id==='new'" v-bind:docId=" $route.query.id"></Tree><!--点击新建帮助文档时进入的二叉树-->
            <Tree @getTheNode="getNode" v-bind:docId=" $route.query.id" v-else></Tree><!--编辑已存在帮助文档时进入的二叉树-->
        </div>
        <form class="form-inline" method="post" action="">
            <div class="form-group">
                <span v-if="node_info.hasOwnProperty('title')">节点序号：<span>{{node_info.title}}</span></span>
                <span v-else>请选择一个节点进行编辑</span>
            </div>
            <div class="form-group">
                <span>节点标题：</span><input ref="title" class="form-control" type="text" v-bind:value="node_info.title">
            </div>
            <div></div>
            <Editor :value="node_info.body"></Editor>
            <div id="submit">
                <button class="btn btn-default" @click="submit">完成</button>
            </div>
        </form>
    </div>
</template>

<script>
    import '../assets/css/every.css'
    import Editor from '../components/admin-editor'
    import Tree from '../components/admin-tree'
    export default {
        name: "admin-form",
        props:['id','title'],
        data:function(){
            return{
                node_info:{//获取到的节点相关数据，也是未来发送的数据
                    parentId:'',
                    body:'',
                    type:''
                },
                new_doc:false
            }
        },
        watch:{
            id:function (val) {
                if (val === 'new'){
                    this.node_info = {};
                }
            }
        },
        components:{
            Editor,Tree
        },
        methods:{
            getNode(a){
                this.node_info = a;
            },
            check(){
                let node_title = this.$refs.title.value;
                if(!this.node_info.hasOwnProperty('title')){
                    this.instance('warning');
                    return false;
                }else if(node_title === ''){
                    this.instance('info');
                    this.$refs.title.value = this.node_info.title;
                }
                return true;
            },
            submit(){
                if(this.check()){
                    this.postForm();
                }
            },
            instance (type) {
                switch (type) {
                    case 'info':
                        this.$Modal.info({
                            title: '提示',
                            content: '<p>节点标题为空，已经自动赋默认值</p>'
                        });
                        break;
                    case 'success':
                        this.$Modal.success({
                            title: '成功',
                            content: '数据提交成功'
                        });
                        break;
                    case 'warning':
                        this.$Modal.warning({
                            title: '警告',
                            content: '<p>请选择节点编辑后提交</p>'
                        });
                        break;
                    case 'error':
                        this.$Modal.error({
                            title: '错误',
                            content: '节点提交失败'
                        });
                        break;
                }
            },
            postForm(){//发送编辑的节点数据给后台
                let post_data = this.node_info;
                // let post_data = {//节点数据
                //     title:'Sit non.',
                //     parentId:9,
                //     body:'aaaaaa',
                //     type:'left'
                // };
                console.log(post_data);
                let post_url = 'http://10.1.38.20/api/articles';//后台接口
                // this.axios.post(post_url,post_data)
                //     .then(response => {
                //         if (response.status === 200){
                //             this.instance('success');
                //         }
                //     })
                //     .catch(err => {
                //         this.instance('error');
                //     })
            }
        }
    }
</script>

<style scoped>
    div {
        margin-bottom: 15px;
    }
    #submit{
        text-align: center;
    }
</style>