import Vue from 'vue'
import Router from 'vue-router'
const Home = res => require(['@/components/home/home'], res)

Vue.use(Router)

export default new Router({
    routes: [
        {path: '/', redirect: '/home'},
        {path: '/home', component: Home},
    ]
})