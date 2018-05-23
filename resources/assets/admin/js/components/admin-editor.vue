<template>
    <div>
        <textarea name="body" class="form-control" id="editor" rows="3" placeholder="请填入至少三个字符的内容。" required>{{node_message}}</textarea>
    </div>
</template>

<script>

    export default {
        name: "admin-editor",
        props:['node_message'],
        mounted(){
            $(document).ready(function(){
                var editor = new Simditor({
                    textarea: $('#editor'),
                        upload: {
                            url: '',//TODO:后台上传图片路径，由前端向后台获取：'{{ route('topics.upload_image') }}'
                        params: { _token: '{{ csrf_token() }}' },
                        fileKey: 'upload_file',
                        connectionCount: 3,
                        leaveConfirm: '文件上传中，关闭此页面将取消上传。'
                    },
                    pasteImage: true,
                });
            });
        }
    }

</script>

<style scoped>

</style>