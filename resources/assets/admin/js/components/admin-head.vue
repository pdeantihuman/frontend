<template>
    <div class="container">
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <span class="navbar-brand">管理员页面</span>
                </div>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav navbar-right" v-if="childLogin">
                        <li><router-link to="/Build/new"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> 新建帮助手册</router-link></li>
                        <li><router-link to="/Login"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span> 注销</router-link></li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "admin-head",
        props:['childLogin']
    }
</script>

<style scoped>
    nav{
        margin-top: 15px;
    }
</style>