<template>
    <div>
        <Header goBack = "true" headTitle="订单列表"></Header>
        <section class="order_container">
            <ul>
                <li v-for="(item, index) in selectedFoods" :key="index">
                    <img :src="imgBaseUrl + item[0].image_path">
                    <div class="food_detail">
                        <div class="show_title">
                            <div class="show_left">
                                <h4>{{item.name}}<span class="fa fa-angle-right"></span></h4>
                                <p>{{item.date | dateFormate()}}</p>
                            </div>
                            <div class="show_right">
                                <span v-show="!isEnd" >等待支付</span>
                                <span v-show="isEnd" >支付超时</span>
                            </div>
                        </div>
                        <div class="food_content">
                            <div class="content_left">
                                {{item[0].name}}
                                <span v-if="count > 1">等{{count}}件商品</span>
                            </div>
                            <div class="content_right">
                                ¥{{total}}
                            </div>
                        </div>
                        <div class="pay_time">
                            <span v-show="!isEnd" class="time">去支付还剩({{item.minutes}}分{{item.seconds}}秒)</span>
                            <span v-show="isEnd">再来一单</span>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
        <Footer></Footer>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '@/common/header/header'
import Footer from '@/common/footer/footer'
export default {
    data() {
        return {
            imgBaseUrl: 'http://elm.cangdu.org/img/', //图片域名地址
            count: 0,
            total: 0,
            createdTime: '',//订单创建时间
            isEnd: false, //倒计时是否结束
        }
    },
    computed: {
        ...mapState(
            ['selectedFoods']
        ),
    },
    created() {
        this.countNum()
        this.totalMoney()
        this.setEndTime()
    },
    methods: {
        countNum() {
            this.selectedFoods.forEach(item => {
                item.forEach(value => {
                    this.count += value.count
                })
            })
        },
        totalMoney() {
            this.selectedFoods.forEach(item => {
                item.forEach(value => {
                    this.total += value.count * 20
                })
            })
        },
        setEndTime(){
            var interval = setInterval(() =>{
                let nowDate = new Date()
                for(let i= 0; i < this.selectedFoods.length; i++){
                    this.date = 15*60*1000 + this.selectedFoods[i].date.getTime() - nowDate.getTime()
                    if(this.date <= 0) {
                        this.isEnd = true
                        clearInterval(interval)
                    }else {
                        this.$set(this.selectedFoods[i], 'minutes', Math.floor(parseInt((this.date / 1000 / 60) % 60)))
                        this.$set(this.selectedFoods[i], 'seconds', Math.floor(parseInt((this.date / 1000) % 60)))
                    }
                }
            },1000)
        }
    },
    filters: {
        dateFormate: function(dataStr, pattern=''){
            var y = dataStr.getFullYear()
            var m = (dataStr.getMonth() + 1).toString().padStart(2, '0')
            var d = dataStr.getDate().toString().padStart(2, '0')

            if (pattern.toLowerCase() === 'yyyy-mm-dd') {
                return `${y}-${m}-${d}`
            } else {
                var hh = dataStr.getHours().toString().padStart(2, '0')
                var mm = dataStr.getMinutes().toString().padStart(2, '0')
                var ss = dataStr.getSeconds().toString().padStart(2, '0')

                return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
            } 
        }
    },
    components:{
        Header,
        Footer
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/mixin';
.order_container {
    padding-top: 45px;
    ul li {
        @include fj;
        padding: 10px;
        background-color: #fff;
        margin-bottom: 10px;
        img {
            width: 60px;
            height: 60px;
        }
        .food_detail {
            flex: 1;
            padding-left: 10px;
            .show_title {
                @include fj;
                border-bottom: 1px solid #eee;
                padding-bottom: 10px;
                .show_left  {
                    width: 50%;
                    h4 {
                        font-size: 25px;
                    }
                    p {
                        font-size: 16px;
                        color: #999;
                    }
                }
            }
            .food_content {
                height: 40px;
                line-height: 40px;
                border-bottom: 1px solid #eee;
                @include fj;
                .content_left {
                    font-size: 20px;
                }
                .content_right {
                    color: #FF6600;
                    font-weight: 700;
                    font-size: 20px;
                }
            }
            .pay_time {
                height: 40px;
                line-height: 40px;
                float: right;
                span {
                    font-size: 14px;
                    border-radius: 3px;
                    padding: 3px;
                }
                .time {
                    color: #FF6600;
                    border: 1px solid #ff6600;
                    
                }
                .more {
                    color: #3190e8;
                    border: 1px solid #3190e8;
                }
            }
        }
    }
}
.loading-enter-active, .loading-leave-active {
    transition: opacity .7s
}
.loading-enter, .loading-leave-active {
    opacity: 0
}
</style>