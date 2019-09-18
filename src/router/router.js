import Vue from 'vue'
import Router from 'vue-router'
const Home = res => require(['@/components/home/home'], res)
const Forget = res => require(['@/components/forget/forget'], res)
const City = res => require(['@/components/city/city'], res)
const Msite = res => require(['@/components/msite/msite'], res)
const Food = res => require(['@/components/food/food'], res)
const Shop = res => require(['@/components/shop/shop'], res)
const Search = res => require(['@/components/search/search'], res)
const User = res => require(['@/components/user/user'], res)
const Info = res => require(['@/components/user/children/info'], res)
const SetUserName = res => require(['@/components/user/children/children/setusername'], res)
const Address = res => require(['@/components/user/children/children/address'], res)
const Add = res => require(['@/components/user/children/children/children/add'], res)
const AddDetail = res => require(['@/components/user/children/children/children/children/addDetail'], res)
const Banlance = res => require(['@/components/banlance/banlance'], res)
Vue.use(Router)

export default new Router({
    routes: [
        {path: '/', redirect: '/home'},
        {path: '/home', component: Home},
        {path: '/forget', component: Forget},
        {path: '/city', component: City},
        {path: '/msite', component: Msite},
        {path: '/food', component: Food},
        {path: '/shop', component: Shop},
        {path: '/search', component: Search},
        {path: '/banlance', component: Banlance},
        {path: '/user', component: User},
        {path: '/user/info', component: Info},
        {path: '/user/info/setusername', component: SetUserName},
        {path: '/user/info/address', component: Address},
        {path: '/user/info/address/add', component: Add},
        {path: '/user/info/address/add/addDetail', component: AddDetail},
    ]
})