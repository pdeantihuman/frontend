<template>
    <div>
        <Button @click="modal2 = true">删除</Button>
        <Modal v-model="modal2" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除</span>
            </p>
            <div style="text-align:center">
                <p>确定删除吗？{{node_del_num}}</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="postDel">删除</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import 'iview/dist/styles/iview.css'
    import api from "../api/api";
    export default {
        name: "model",
        props:['node_del_num'],
        data () {
            return {
                modal2: false,
                modal_loading: false
            }
        },
        methods: {
            postDel () {
                const post_del_num = this.node_del_num;
                // const post_url = `http://helper.test/api/articles/${post_del_num}?id=${post_del_num}`;
                const post_url = `${api.for_node}${post_del_num}?id=${post_del_num}`;
                this.modal_loading = true;
                axios.delete(post_url)
                    .then(response=>{
                        if (response.status === 204){
                            this.modal_loading = false;
                            this.modal2 = false;
                            this.$parent.$parent.reload();//重新刷新list组件，调用list中的reload()
                            this.$Message.success('成功删除');
                        }else if (response.status === 500) {
                            this.modal_loading = false;
                            this.modal2 = false;
                            this.$Message.warning('删除失败');
                        }
                    })
                    .catch(error => {
                        this.modal_loading = false;
                        this.modal2 = false;
                        this.$Message.error('404 没有要删除的文件');
                    })

            }
        }
    }
</script>

<style scoped>

</style>