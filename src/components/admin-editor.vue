<template>
    <div>
        <textarea name="body" class="form-control" id="editor" rows="3" placeholder="请填入至少三个字符的内容。" required></textarea>
    </div>
</template>

<script>
    import api from '../api/api'
    export default {
        name: "admin-editor",
        props:['body_value'],
        mounted(){
            $(document).ready(function(){
                let editor = new Simditor({
                    textarea: $('#editor'),
                    upload: {
                        url: api.upload_img,
                        // url: 'http://helper.test/api/upload_image',
                        params: {},
                        fileKey: 'upload_file',
                        connectionCount: 3,
                        leaveConfirm: '文件上传中，关闭此页面将取消上传。'
                    },
                    pasteImage: true,
                });
            });
        },
        watch:{
            body_value:function () {
                let value = this.body_value;
                $(document).ready(function(){
                    let editor = new Simditor({
                        textarea: $('#editor'),
                        upload: {
                            url: api.upload_img,
                            // url: 'http://helper.test/api/upload_image',
                            params: {},
                            fileKey: 'upload_file',
                            connectionCount: 3,
                            leaveConfirm: '文件上传中，关闭此页面将取消上传。'
                        },
                        pasteImage: true,
                    });
                    editor.setValue(value)
                });
            }
        },
    }

</script>

<style scoped>

</style>