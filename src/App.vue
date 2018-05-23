<template>
  <div id="app">
      <div id="main">
          <Head id="head" v-bind:childLogin="canSee"></Head>
          <router-view v-if="isReload"  v-on:hiddenButton="hiddenChild"></router-view>
      </div>
      <foot id="foot"></foot>
  </div>
</template>

<script>
    import Head from './components/admin-head'
    import foot from './components/admin-foot'
    export default {
      name: 'app',
      data:function () {
        return {
            isReload:true,
            canSee:true,
            session:sessionStorage
        }
      },
      components:{
          Head,foot
      },
      methods:{
          hiddenChild:function (a) {//管理员登陆时不显示右上角的’新建‘和’登陆‘
              this.canSee = a;
          },
          reload:function () {
              this.isReload = false;
              this.$nextTick(() => (this.isReload = true))
          },
      }
    }
</script>

<style lang="scss">
    html,body{
        height:100%;
    }
    #app{
        height:100%;
    }
    #main{
        min-height: 100%;
        margin-bottom: -65px;//留出foot的空间
        padding-bottom: 50px;//防止内容和foot发生重叠
    }
    /*#footer,#push {*/
        /*height: 100px;*/
    /*}*/
</style>
