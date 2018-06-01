<template>
    <div class="container">
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <span class="navbar-brand">管理员页面</span>
                </div>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav navbar-right" v-if="childLogin">
                        <li><a @click.prevent="handleRender"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> 新建帮助手册</a></li>
                        <!--<li><router-link @click.prevent="toLogout" to="/Logout"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span> 注销</router-link></li>-->
                        <li><a @click.prevent="toLogout" ><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span> 注销</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    import api from "../api/api";

    export default {
        name: "admin-head",
        props:['childLogin'],
        methods:{
            toLogout:function(){
                let post_url = api.logout;
                axios.post(post_url)
                    .then(()=>{
                        window.location.href = '/login'
                    })
            },
            handleRender () {
                this.$Modal.confirm({
                    title:"新建文档树：",
                    content:'<input  id="title" autocomplete="off" spellcheck="false" type="text" placeholder="输入文档标题" autofocus="autofocus" class="ivu-input" required><input id="body" autocomplete="off" spellcheck="false" type="text" placeholder="输入文档描述" autofocus="autofocus" class="ivu-input" style="margin-top: 10px" required>',
                    onOk:()=>{
                        let title_value = document.getElementById('title').value;
                        let body_value = document.getElementById('body').value;
                        if(title_value===''||body_value===''){
                            console.log(title_value)
                            this.$Message.error('文档标题和描述不能为空');
                        }else {
                            // const post_url = `http://10.1.38.20/api/articles_root`;
                            const post_url = api.head_for_new;
                            axios.post(post_url,{
                                title:title_value,
                                body:body_value
                            })
                                .then(response=>{
                                    if (response.status === 201){
                                        this.modal_loading = false;
                                        this.modal2 = false;
                                        this.$Message.success('成功新建该文档');
                                        this.$parent.reload();
                                    }
                                })
                                .catch(error => {
                                    this.modal_loading = false;
                                    this.modal2 = false;
                                    this.$Message.error('无法新建该文档');
                                })
                        }

                    }
                })
            }
        }
    }
</script>

<style scoped>
    nav{
        margin-top: 15px;
    }
</style>