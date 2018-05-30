<template>
    <div class="container">
        <div class="row" v-for="helpdocument in helpdocuments">
            <div class="col-md-1"></div>
            <router-link class="col-md-8" to="/Form">{{helpdocument.message}}</router-link>
            <model v-bind:node_del="helpdocument.message"></model>
        </div>
    </div>
</template>

<script>
    import model from './model'

    export default {
        name: "admin-list",
        data(){
            return{
                helpdocuments:[]
            }
        },
        mounted(){
            this.axios.get("http://localhost/list.php?")
                .then(response => {
                    for(let i in response.data){
                        let a = { message:response.data[i] };
                        this.helpdocuments.push(a);
                    }
                });
        },
        components:{
            model
        },
        beforeRouteLeave:function(to,from,next){//进入相关文档之前在路由钩子函数中为下一个路由获取数据并存入本地
            this.axios.get("http://localhost/tree.php?id=1")
                .then(response => {
                    for(let i in response.data){
                        sessionStorage[i] = response.data[i];//sessionStorage是一个对象，数据以属性（键值对）的形式存入
                    }
                    next();
                })
        }
    }
</script>

<style scoped>

</style>