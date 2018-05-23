import Vue from 'vue'
import VueRouter from "vue-router"
//引入组件
import List from '../components/admin-list'
import Form from '../components/admin-form'
import Login from '../components/admin-login'
//告诉Vue使用VueRouter
Vue.use(VueRouter)

const routes = [
    { path:'/',component:List },
    { path:'/List',component:List },
    { path:'/Form',component:Form },
    { path:'/Build/:id',component:Form,props:true },
    { path:'/Login',component:Login }
]
const router = new VueRouter({
    routes
})
export default router