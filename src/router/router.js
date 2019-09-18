import Vue from 'vue'
import Router from 'vue-router'
const Home = res => require(['@/components/home/home'], res)
const Forget = res => require(['@/components/forget/forget'], res)

Vue.use(Router)

export default new Router({
    routes: [
        {path: '/', redirect: '/home'},
        {path: '/home', component: Home},
        {path: '/forget', component: Forget},
    ]
})