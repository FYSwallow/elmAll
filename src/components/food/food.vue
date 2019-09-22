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
            <section class="category_container">
                <div class="sort_item_category_type" v-show="sortBy == 'food'">
                    <div class="sort_item_category_left">
                        <ul>
                            <li v-for="(item, index) in category" :key="index" :class="{'active': chooseType === index}" @click="selectCategoryName(item.id, index)">
                                <section><img :src="getImgPath(item.image_url)" v-if="index" alt="">{{item.name}}</section>
                                <section><span>{{item.count}}</span>&gt;</section>
                            </li>
                        </ul>
                    </div>
                    <div class="sort_item_category_right">
                        <ul>
                            <li v-for="item in categoryDetail" :key="item.id">
                                <span>{{item.name}}</span>
                                <span>{{item.count}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="sort_item_category_order" v-show="sortBy == 'sort'">
                    <ul>
                        <li>
                            <img src="@/assets/nav.jpg" alt="">
                            <p>智能排序</p>
                        </li>
                        <li>
                            <img src="@/assets/nav.jpg" alt="">
                            <p>智能排序</p>
                        </li>
                    </ul>
                </div>
                <div class="sort_item_category_filter" v-show="sortBy == 'activity'">
                    <div class="chooseMethods">
                        <section>
                            <div class="filter_style">配送方式</div>
                            <div class="filter_style_detail">
                                <ul>
                                    <li  v-for="(item, index) in Delivery" :key="index">
                                        <img src="@/assets/images/bird.png" alt="">
                                        <span>{{item.text}}</span>
                                    </li>
                                </ul>
                            </div>
                        </section>
                        <section>
                            <div class="filter_style">商家属性(可以多选)</div>
                            <div class="filter_style_detail">
                                <ul>
                                    <li v-for="(item,index) in Activity" :key="index">
                                        <!-- 动态绑定的img src属性需要将图片放入static文件夹 -->
                                        <img :src="'images/logo'+ (index + 1) +'.png'">
                                        <span>{{item.name}}</span>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </div>
                    <footer>
                        <button class="clear_all">清空</button>
                        <button class="make_sure">确定</button>
                    </footer>
                </div>
            </section>    
        </div>
        <div class="shoplist">
            <v-shopList></v-shopList>
        </div>
        <div class="back_cover" v-show="sortBy"></div>
    </div>
    
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import Header from '@/common/header/header'
import ShopList from '@/common/shopList/shoplist'
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
            position: {},
            sortBy: "", // 筛选的条件,
            category: null, // category分类左侧数据
            categoryDetail: null, // category分类右侧的详细数据
            Delivery: null, // 配送方式数据
            Activity: null,
        }
    },
    created() {
        this.initData()
        this.getCategory()
        this.getDelivery()
        this.getActivity()
    },
    computed: {
        ...mapState(['latitude', 'longitude'])
    },
    methods: {
        ...mapMutations(['RECORD_ADDRESS']),
        initData() {
            this.geohash = this.$route.query.geohash
            this.foodTitle = this.$route.query.title
            this.headTitle = this.foodTitle
            this.restaurant_category_id = this.$route.query.restaurant_category_id;
            
        },
        async getCategory() {
            const res = await foodCategory(this.latitude, this.longitude)
            this.category = res.data
            this.category.forEach(item => {
                this.categoryDetail = item.sub_categories
            })
            console.log(this.categoryDetail)
            console.log(this.category)
        },
        async getDelivery() {
            const res = await foodDelivery(this.latitude, this.longitude)
            this.Delivery = res.data
        },
        async getActivity() {
            const res = await foodActivity(this.latitude, this.longitude)
            this.Activity = res.data
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
        // 点击分类列表中右边的选项
        selectCategoryName(id, index){
            if(index === 0) {

            }
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
        'v-header': Header,
        'v-shopList': ShopList
    }  
}
</script>

<style lang="scss" scoped> 
@import '@/assets/style/mixin';
.food {
    width: 100%;
    height: 100%;
    .food_container {
        padding-top: 45px;
        position: fixed;
        z-index: 11;
        .sort_container {
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            text-align: center;
            position: fixed;
            top: 45px;
            background-color: #fff;
            border-bottom: 1px solid #f1f1f1;
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
            .sort_item_category_type {
                display: flex;
                .sort_item_category_left {
                    flex: 1;
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
                    background-color: #fff;
                    padding-left: 10px;
                    @include sc(14px,#333);
                    ul {
                        li {
                            @include fj;
                            border-bottom: 1px solid #ccc;
                            padding: 10px 10px 10px 0;
                        }
                    }
                }
            }
            .sort_item_category_order {
                ul {
                    background-color: #fff;
                    li {
                        height: 50px;
                        display: flex;
                        align-items: center;
                        @include sc(14px, #666);
                        img {
                            height: 20px;
                            width: 40px;
                            padding-right: 10px;
                        }
                        p {
                            flex: 1;
                            height: 50px;
                            border-bottom: 1px solid #ccc;
                            line-height: 50px;
                            &:last-of-type{
                                border-bottom: none;
                            }
                        }
                    }
                }
            }
            .sort_item_category_filter {
                background-color: #fff;
                @include sc(12px, #333);
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
                                        height: 30px;
                                        vertical-align: middle;
                                        margin-right: 5px;
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
}
 
</style>