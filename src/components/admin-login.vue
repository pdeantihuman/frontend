<template>
    <form class="container" v-on:submit="checkForm">
        <div class="row form-inline">
            <div class="col-md-5">
                <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                <label >用户名：</label>
            </div>
            <input id="user" class="form-control col-md-6" type="text">
        </div>
        <div class="row form-inline">
            <div class="col-md-5">
                <span class="glyphicon glyphicon-inbox" aria-hidden="true"></span>
                <label>密码：</label>
            </div>
            <input id="password" type="password" class="form-control col-md-6">
        </div>
        <div class="row" id="submit">
            <button class="btn btn-default" type="submit">登陆</button>
        </div>
    </form>
</template>

<script>
    export default {
        name: "admin-login",
        methods:{
            checkForm:function () {
                let user = document.getElementById('user').value;
                let password = document.getElementById('password').value;
                if (password === ''||user === ''){
                    this.$Modal.warning({
                        title: '警告',
                        content: '<p>请输入正确的用户名或密码</p>'
                    });
                }
            }
        },
        mounted(){
            this.$emit('hiddenButton',false);
        }
    }
</script>

<style scoped>
    form div {
        margin-bottom: 20px;
    }
    .row{
        margin-left: 0;
        margin-right: 0;
    }
    #submit{
        text-align: center;
    }
    label{
        height: 34px;
        padding-top: 6px;
        padding-bottom: 6px;
    }
    .row div{
        text-align: right;
    }
</style>