<template>
    <div class="container">
        <div class="row" v-for="helpdocument in helpdocuments">
            <div class="col-md-1"></div>
            <router-link class="col-md-8" :to="{ path:'/Form',query:{id:helpdocument.id}}">{{helpdocument.title}}</router-link>           <!-- 打印根节点title -->
            <model v-bind:node_del_num="helpdocument.id"></model>
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
            this.axios.get("http://10.1.38.20/api/articles?onlyRoot=1")
                .then(response => {
                    let data = response.data.data                         //const:常量 let:局部变量 var:全局变量   三种变量
                    this.helpdocuments = data                               //传递后端参数
                    console.log(this.helpdocuments);
                });
        },
        components:{
            model
        }
    }
</script>

<style scoped>

</style>