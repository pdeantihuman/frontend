<template>
    <div class="container">
        <div class="container">
            <Tree @getTheNode="getNode" v-bind:docId=" $route.query.id" ></Tree>
        </div>
        <form class="form-inline" method="post" action="#">
            <div class="form-group">
                <span v-if="node_info.hasOwnProperty('title')">节点序号：<span>{{node_info.id}}</span></span>
                <span v-else>请选择一个节点进行编辑</span>
            </div>
            <div class="form-group">
                <span>节点标题：</span><input ref="title" class="form-control" type="text" v-bind:value="node_info.title">
            </div>
            <div></div>
            <Editor v-bind:body_value="this.node_info.body"></Editor>
            <div id="submit">
                <button class="btn btn-default" @click.prevent="submit">完成</button>
            </div>
        </form>
    </div>
</template>

<script>
    import '../assets/css/every.css'
    import Editor from '../components/admin-editor'
    import Tree from '../components/admin-tree'
    import api from "../api/api";
    export default {
        name: "admin-form",
        props:['title'],
        data:function(){
            return{
                node_info:{},//获取到的节点相关数据，也是未来发送的数据
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
                if(!this.node_info.hasOwnProperty('title')){//如果没有title属性说明没有选中节点，要求用户选择一个节点编辑
                    this.$Modal.warning({
                        title: '警告',
                        content: '<p>请选择节点编辑后提交</p>'
                    });
                    return false;
                }else if(node_title === ''){//如果选中后将节点标题清空，默认提交节点初始title
                    this.$Message.info('节点标题为空，已经自动赋默认值');
                    this.$refs.title.value = this.node_info.title;
                }else {//选中节点后编辑标题，编辑的值将改写节点标题
                    this.node_info.title = this.$refs.title.value;
                }
                return true;
            },
            submit(){
                if(this.check()){
                    this.postForm();
                }
            },
            postForm(){//发送编辑的节点数据给后台
                this.node_info.body = document.getElementById('editor').value;
                let post_id = this.node_info.id;
                // let post_url = `http://helper.test/api/articles/${post_id}`;//后台接口
                let post_url = `${api.for_node}${post_id}`;//后台接口
                axios.patch(post_url,{
                    title:this.node_info.title,
                    parentId:this.node_info.parentId,
                    body:this.node_info.body,
                    type:this.node_info.type
                })
                    .then(response => {
                            this.$Modal.success({
                                title: '成功',
                                content: response.status
                            });
                    })
                    .catch(error => {
                        this.$Modal.error({
                            title: '错误',
                            content:'错误'
                        });
                    })
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