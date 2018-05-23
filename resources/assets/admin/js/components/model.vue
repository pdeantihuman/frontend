<template>
    <div>
        <Button @click="modal2 = true">删除</Button>
        <Modal v-model="modal2" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除</span>
            </p>
            <div style="text-align:center">
                <p>确定删除 {{node_del}} 吗？</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="postDel">删除</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import 'iview/dist/styles/iview.css'
    export default {
        name: "model",
        props:['node_del'],
        data () {
            return {
                modal2: false,
                modal_loading: false
            }
        },
        mounted(){
            console.log(this.node_del);
        },
        methods: {
            postDel () {
                let post_del = this.node_del;
                let post_url = 'http://localhost/get_form.php';
                this.modal_loading = true;
                this.axios.post(post_url,post_del)
                    .then(response=>{
                        if (response.status === 200){
                            this.modal_loading = false;
                            this.modal2 = false;
                            this.$Message.success('成功删除');
                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>