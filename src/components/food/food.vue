<template>
    <div class="food">
        <v-header :headTitle = "headTitle" goBack="true"></v-header>
        <div class="food_container">
            <section class="sort_container">
                <div class="sort_item" :class="{choose_type:sortBy == 'food'}" @click="chooseType('food')">
                    <span>{{foodTitle}}</span>
                    <i class="fa fa-angle-down"></i>
                </div>
                <div class="sort_item" :class="{choose_type:sortBy == 'sort'}" @click="chooseType('sort')">
                    <span>排序</span>
                    <i class="fa fa-angle-down"></i>
                </div>
                <div class="sort_item" :class="{choose_type:sortBy == 'activity'}" @click="chooseType('activity')">
                    <span>筛选</span>
                    <i class="fa fa-angle-down"></i>
                </div>
            </section>
            <transition name='sortlist'>
                <section class="category_container" v-show="sortBy">
                    <div class="sort_item_category_type" v-show="sortBy == 'food'">
                        <div class="sort_item_category_left">
                            <ul>
                                <li v-for="(item, index) in category" :key="index" :class="{'active': restaurant_category_id == item.id}" @click="selectCategoryName(item.id, index)">
                                    <section><img :src="getImgPath(item.image_url)" v-if="index" alt="">{{item.name}}</section>
                                    <section><span>{{item.count}}</span>&gt;</section>
                                </li>
                            </ul>
                        </div>
                        <div class="sort_item_category_right">
                            <ul>
                                <li v-for="(item, index) in categoryDetail" v-if="index" :key="item.id" @click="getCategoryIds(item.id, item.name)" :class="{'active': restaurant_category_ids == item.id}">
                                    <span>{{item.name}}</span>
                                    <span>{{item.count}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="sort_item_category_order" v-show="sortBy == 'sort'">
                        <ul @click="sortList">
                            <!-- 对每一个li绑定事件,会影响界面性能,我们使用事件委托的方法去实现 -->
                            <li :class="{'active': sortByType == 0}" data="0">
                                <img src="@/assets/images/sort1.png" class="sort_logo">
                                <p>智能排序</p>
                                <img src="@/assets/images/current.png" class="choose_logo" v-if="sortByType == 0">
                            </li>
                            <li :class="{'active': sortByType == 1}" data="1">
                                <img src="@/assets/images/sort4.png" class="sort_logo">
                                <p>起送价最低</p>
                                <img src="@/assets/images/current.png" class="choose_logo" v-if="sortByType == 1">
                            </li>
                            <li :class="{'active': sortByType == 2}" data="2">
                                <img src="@/assets/images/sort5.png" class="sort_logo">
                                <p>配送速度最快</p>
                                <img src="@/assets/images/current.png" class="choose_logo" v-if="sortByType == 2">
                            </li>
                            <li :class="{'active': sortByType == 3}" data="3">
                                <img src="@/assets/images/sort6.png" class="sort_logo">
                                <p>评分最高</p>
                                <img src="@/assets/images/current.png" class="choose_logo" v-if="sortByType == 3">
                            </li>
                            <li :class="{'active': sortByType == 5}" data="5">
                                <img src="@/assets/images/sort2.png" class="sort_logo">
                                <p>距离最近</p>
                                <img src="@/assets/images/current.png" class="choose_logo" v-if="sortByType == 5">
                            </li>
                            <li :class="{'active': sortByType == 6}" data="6">
                                <img src="@/assets/images/sort3.png" class="sort_logo">
                                <p>销量最高</p>
                                <img src="@/assets/images/current.png" class="choose_logo" v-if="sortByType == 6">
                            </li>
                        </ul>
                    </div>
                    <div class="sort_item_category_filter" v-show="sortBy == 'activity'">
                        <div class="chooseMethods">
                            <section>
                                <div class="filter_style">配送方式</div>
                                <div class="filter_style_detail">
                                    <ul>
                                        <li  v-for="(item, index) in Delivery" :key="index" @click="selectDeliveryMode(item.id)" :class="{'active': delivery_mode == item.id}">
                                            <img src="@/assets/images/bird.png" v-if="delivery_mode !== item.id">
                                            <img src="@/assets/images/current.png" v-else>
                                            <span>{{item.text}}</span>
                                        </li>
                                    </ul>
                                </div>
                            </section>
                            <section>
                                <div class="filter_style">商家属性(可以多选)</div>
                                <div class="filter_style_detail">
                                    <ul>
                                        <li v-for="(item,index) in Activity" :key="index" @click="selectSupportIds(index, item.id)">
                                            <!-- 动态绑定的img src属性需要将图片放入static文件夹 -->
                                            <img :src="'images/logo'+ (index + 1) +'.png'" v-show="!support_ids[index].status">
                                            <img src="@/assets/images/current.png" v-show="support_ids[index].status">
                                            <span>{{item.name}}</span>
                                        </li>
                                    </ul>
                                </div>
                            </section>
                        </div>
                        <footer>
                            <button class="clear_all" @click="clearSelect">清空</button>
                            <button class="make_sure" @click="confirmSelected">确定<span v-show="filterNum">({{filterNum}})</span></button>
                        </footer>
                    </div>
                </section>  
            </transition>      
        </div>
        <div class="shoplist">
            <v-shoplist :geohash="geohash" :restaurantCategoryId="restaurant_category_id" :restaurantCategoryIds="restaurant_category_ids" :sortByType='sortByType' :deliveryMode="delivery_mode" :confirmSelect="confirmStatus" :supportIds="support_ids" v-if="latitude"></v-shopList>
        </div>
        <transition name="showCover">
            <div class="back_cover" v-show="sortBy"></div>
        </transition>   
    </div>
    
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import vHeader from '@/common/header/header'
import vShoplist from '@/common/shopList/shoplist'
import {
    foodCategory,
    foodDelivery,
    foodActivity
} from '@/api/index'

export default {
    data() {
        return {
            geohash: "", // city页面传递过来的地址geohash
            headTitle: "", // msiet页面头部标题
            foodTitle: "", // 排序左侧头部标题
            restaurant_category_id: "", // 食品类型id值
            restaurant_category_ids: '', //筛选食品类型的id
            position: {},
            sortBy: "", // 筛选的条件,
            category: null, // category分类左侧数据
            categoryDetail: null, // category分类右侧的详细数据
            sortByType: null, // 根据何种方式排序
            Delivery: null, // 配送方式数据
            Activity: null,
            delivery_mode: null, // 选中的配送方式
            support_ids: [], // 选中的商铺活动列表
            filterNum: 0, // 所选中的所有样式的集合
            confirmStatus: false // 确认选择
        }
    },
    created() {
        this.initData()
    },
    computed: {
        ...mapState(['latitude', 'longitude'])
    },
    methods: {
        ...mapMutations(['RECORD_ADDRESS']),
        async initData() {
            this.geohash = this.$route.query.geohash
            this.foodTitle = this.$route.query.title
            this.headTitle = this.foodTitle
            this.restaurant_category_id = this.$route.query.restaurant_category_id;
            // 获取分类列表右侧数据
            const resCategory = await foodCategory(this.latitude, this.longitude)
            this.category = resCategory.data
            this.category.forEach(item => {
                if(this.restaurant_category_id === item.id) {
                    this.categoryDetail = item.sub_categories
                }
            })

            // 获取配送列表
            const resDelivery = await foodDelivery(this.latitude, this.longitude)
            this.Delivery = resDelivery.data

            // 获取筛选列表
            const resActivity = await foodActivity(this.latitude, this.longitude)
            this.Activity = resActivity.data
            // 为商家活动选择状态属性,初始值为false
            this.Activity.forEach((item, index) => {
                this.support_ids[index] = {
                    status: false,
                    id: item.id
                }
            }) 
        },
        chooseType(type) {
            if(this.sortBy !== type) {
                this.sortBy = type
                if(type == 'food') {
                    this.foodTitle = '分类'
                }
                else {
                    this.foodTitle = this.headTitle
                }
            }else {
                this.sortBy = ''
                if(type == 'food') {
                    this.foodTitle = this.headTitle
                }
            }
        },
        // 分类列表点击左边选项,显示对应右选项
        selectCategoryName(id, index){
            if (index === 0) {
                this.restaurant_category_ids = null;
                this.sortBy = "";
                //不是第一个选项时，右侧展示其子级sub_categories的列表
            } else {
                this.restaurant_category_id = id;
                this.categoryDetail = this.category[index].sub_categories;
            }
        },
        // 点击食品分类右侧列表中的某个选项时,进行筛选
        getCategoryIds(id, name){
            this.restaurant_category_ids = id
            this.sortBy = ""
            this.foodTitle = this.headTitle = name
        },
        // 根据事件委托的方法去优化项目性能,为父级元素绑定事件
        sortList(e) {
            if (e.target.nodeName.toUpperCase() === 'P') {
                this.sortByType = e.target.parentNode.getAttribute("data");
                this.sortBy = "";
            }
        },
        //筛选选项中的某个配送方式
        selectDeliveryMode(id) {
            if(this.delivery_mode == null) {
                this.filterNum ++;
                this.delivery_mode = id
            }else if(this.delivery_mode == id){
                this.filterNum--;
                this.delivery_mode = null;
            }else {
                this.delivery_mode = id
            }
        },
        // 点击商家活动,状态取反
        selectSupportIds(index, id){
            this.support_ids.splice(index, 1, {
                status: !this.support_ids[index].status,
                id
            }),
            // 重新计算filterNum即选中的个数
            // 配送方式是单选,要么是0,要么是1
            this.filterNum = this.delivery_mode == null ? 0 : 1;
            this.support_ids.forEach(item => {
                if(item.status) {
                    this.filterNum ++
                }
            })
        },
        // 点击清空按钮清空数据
        clearSelect() {
            this.support_ids.map(item => item.status = false)
            this.filterNum = 0
            this.delivery_mode = null
        },
        confirmSelected() {
           this.confirmStatus = !this.confirmStatus
           this.sortBy = ''
        },
        getImgPath(path) {
			let suffix;
			if (!path) {
				return '//elm.cangdu.org/img/default.jpg'
			}
			if (path.indexOf('jpeg') !== -1) {
				suffix = '.jpeg'
			} else {
				suffix = '.png'
			}
			let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
			return 'https://fuss10.elemecdn.com' + url
		},
    },
    components: {
        vHeader,
        vShoplist
    }  
}
</script>

<style lang="scss" scoped> 
@import '@/assets/style/mixin';
.food {
    @include wh(100%, 100%);
    .food_container {
        position: fixed;
        z-index: 11;
        padding-top: 45px;
        .sort_container {
            position: fixed;display: flex;
            align-items: center;
            @include wh(100%, 50px);
            
            text-align: center;
            top: 45px;
            background-color: #fff;
            border-bottom: 1px solid #f1f1f1;
            z-index: 99;
            .sort_item {
                flex: 1;
                border-right: 1px solid #f1f1f1;
                @include sc(14px, #444);
                i {
                    transition: all 0.2s linear;
                }
            }
            .choose_type {
                color: $blue;
                i {
                    transform: rotate(180deg);
                }
            }
        }
        .category_container {
            position: fixed;
            top: 95px;
            width: 100%;
            height: 50%;
            .sort_item_category_type {
                display: flex;
                height: 100%;
                .sort_item_category_left {
                    flex: 1;
                    height: 100%;
                    overflow: auto;
                    background-color: #eee;
                    ul {
                        
                        li {
                        @include fj;
                        padding: 10px;
                        @include sc(14px, #666);
                        &.active {
                            background-color: #fff;
                        }
                        section:nth-of-type(1){
                            img {
                                width: 20px;
                                height: 20px;
                                vertical-align: middle;
                                margin-right: 10px;
                            }
                        }
                        section:nth-of-type(2) {
                            span {
                                    border: 1px solid #ccc;
                                    border-radius: 14px;
                                    padding: 0 5px;
                                    background-color: #ccc;
                                    @include sc(14px, #fff); 
                                    margin-right: 10px;      
                            }
                                
                        }
                        }
                    }
                }
                .sort_item_category_right {
                    flex: 1;
                    height: 100%;
                    overflow-y: auto;
                    background-color: #fff;
                    padding-left: 10px;
                    @include sc(14px,#333);
                    ul {
                        li {
                            @include fj;
                            border-bottom: 1px solid #ccc;
                            padding: 10px 10px 10px 0;
                            &.active {
                                color: $blue;
                            }
                        }
                    }
                }
            }
            .sort_item_category_order {
                ul {
                    background-color: #fff;
                    li {
                        height: 60px;
                        display: flex;
                        align-items: center;
                        @include sc(14px, #666);
                        position: relative;
                        .sort_logo {
                            height: 30px;
                            padding: 0 10px;
                        }
                        p {
                            flex: 1;
                            height: 50px;
                            line-height: 50px;
                            border-bottom: 1px solid #ccc;
                        }
                        .choose_logo {
                            height: 30px;
                            position: absolute;
                            right: 10px;
                        }
                        &:last-of-type{
                            p {
                                border: none;
                            }
                        }
                        &.active {
                            color: $blue;
                        }
                    }
                }
            }
            .sort_item_category_filter {
                background-color: #fff;
                @include sc(14px, #333);
                .chooseMethods {
                    padding: 10px;
                    section {
                        .filter_style{
                            height: 40px;
                            line-height: 40px;
                        }
                        .filter_style_detail {
                            line-height: 30px;
                            ul {
                                @include fj;
                                flex-wrap: wrap;
                                li {
                                    width: 30%;
                                    border: 1px solid #eee;
                                    padding: 5px;
                                    border-radius: 3px;
                                    margin-bottom: 10px;
                                    img {
                                        width: 25px;
                                        vertical-align: middle;
                                        margin-right: 5px;
                                    }
                                    &.active {
                                        color: $blue;
                                    }
                                }   
                            }
                        }
                    }
                }
                
                footer {
                    @include fj;
                    padding: 5px 10px;
                    background-color: #F5F5F5;
                    button {
                        width: 48%;
                        height: 40px;
                        border-radius: 3px;
                        border: none;
                        font-size: 18px;
                        &:nth-of-type(1) {
                            background-color: #fff;
                            color: #333;
                        }
                        &:nth-of-type(2) {
                            background-color: #56D176;
                            color: #fff;
                        }
                    }
                }
            }
        }  
    } 
    .shoplist {
        padding-top: 95px;
        z-index: 9;
    }
    .back_cover {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        z-index: 10;
        background-color: rgba(0, 0, 0, 0.3);
    }
    .sortlist-enter-active,
    .sortlist-leave-active {
        transition: all 0.3s;
        transform: translateY(0);
    }
    .sortlist-enter,
    .sortlist-leave-active {
        opacity: 0;
        transform: translateY(-100%);
    }
    .showCover-enter-active,
    .showCover-leave-active {
        transition: opacity 0.5s;
    }
    .showCover-enter,
    .showCover-leave-active {
        opacity: 0;
    }
}
 
</style>