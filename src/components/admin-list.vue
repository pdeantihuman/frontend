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
    import api from "../api/api";

    export default {
        name: "admin-list",
        data(){
            return{
                helpdocuments:[]
            }
        },
        mounted(){
            axios.get(api.list)
                .then(response => {
                    let data = response.data.data
                    this.helpdocuments = data
                });
        },
        components:{
            model
        }
    }
</script>

<style scoped>
</style>