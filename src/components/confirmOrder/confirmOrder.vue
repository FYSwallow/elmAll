<template>
    <div>
        <Header goBack="true" headTitle="订单列表"></Header>
        <section class="order_container">
            <ul v-if="userInfo">
                <li v-for="(item, index) in selectedFoods" :key="index">
                    <img :src="imgBaseUrl + item.foods[0].image_path" />
                    <div class="food_detail">
                        <div class="show_title">
                            <div class="show_left">
                                <h4>
                                    {{item.foods[0].name}}
                                    <span class="fa fa-angle-right"></span>
                                </h4>
                                <p>{{item.date | dateFormate()}}</p>
                            </div>
                            <div class="show_right">
                                <span v-if="!item.isEnd">等待支付</span>
                                <span v-else>支付超时</span>
                            </div>
                        </div>
                        <div class="food_content">
                            <div class="content_left">
                                {{item.foods[0].name}}
                                <span
                                    v-if="item.totalCount > 1"
                                >等{{item.totalCount}}件商品</span>
                            </div>
                            <div class="content_right">¥{{item.totalPrice + 5}}</div>
                        </div>
                        <div class="pay_time">
                            <span
                                v-show="!item.isEnd"
                                class="time"
                            >去支付还剩({{item.minutes}}分{{item.seconds}}秒)</span>
                            <span v-show="item.isEnd">再来一单</span>
                        </div>
                    </div>
                </li>
            </ul>

            <div class="gologin" v-else>
                <p>您还未登录,请先登录!!!</p>
                <span @click="goLogin">登录</span>
            </div>
        </section>
        <Footer></Footer>
    </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "@/common/header/header";
import Footer from "@/common/footer/footer";
export default {
    data() {
        return {
            imgBaseUrl: "http://elm.cangdu.org/img/", //图片域名地址
            interval: null //定时器
        };
    },
    computed: {
        ...mapState(["selectedFoods", "userInfo"])
    },
    created() {
        //初始化数据,判断支付是否超时
        this.getTimeFirst();
    },
    mounted() {
        if (this.userInfo) {
            this.interval = setInterval(() => {
                this.getTimeFirst();
            }, 1000);
        }
    },
    methods: {
        //设置定时器
        setEndTime() {},
        //获取是否超时
        getTimeFirst() {
            let nowDate = new Date();

            for (let i = 0; i < this.selectedFoods.length; i++) {
                const date =
                    1 * 60 * 1000 +
                    this.selectedFoods[i].date.getTime() -
                    nowDate.getTime();

                if (date <= 0) {
                    this.$set(this.selectedFoods[i], "isEnd", true);
                    this.$set(this.selectedFoods[i], "minutes", 0);
                    this.$set(this.selectedFoods[i], "seconds", 0);
                } else {
                    this.$set(this.selectedFoods[i], "isEnd", false);
                    this.$set(
                        this.selectedFoods[i],
                        "minutes",
                        Math.floor(parseInt((date / 1000 / 60) % 60))
                    );
                    this.$set(
                        this.selectedFoods[i],
                        "seconds",
                        Math.floor(parseInt((date / 1000) % 60))
                    );
                }
            }
        },
        goLogin() {
            this.$router.push('/login')
        }
    },
    beforeDestroy() {
        clearInterval(this.interval);
    },
    filters: {
        dateFormate: function(dataStr, pattern = "") {
            var y = dataStr.getFullYear();
            var m = (dataStr.getMonth() + 1).toString().padStart(2, "0");
            var d = dataStr
                .getDate()
                .toString()
                .padStart(2, "0");

            if (pattern.toLowerCase() === "yyyy-mm-dd") {
                return `${y}-${m}-${d}`;
            } else {
                var hh = dataStr
                    .getHours()
                    .toString()
                    .padStart(2, "0");
                var mm = dataStr
                    .getMinutes()
                    .toString()
                    .padStart(2, "0");
                var ss = dataStr
                    .getSeconds()
                    .toString()
                    .padStart(2, "0");

                return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
            }
        }
    },
    components: {
        Header,
        Footer
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin";
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
                .show_left {
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
                    color: #ff6600;
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
                    color: #ff6600;
                    border: 1px solid #ff6600;
                }
                .more {
                    color: #3190e8;
                    border: 1px solid #3190e8;
                }
            }
        }
    }
    .gologin {
        margin: 200px auto;
        font-size: 25px;
        text-align: center;
        span {
            display: inline-block;
            width: 100px;
            margin: 50px;
            border: 1px solid #ccc;
            color: #eee;
            background-color: #4cd964;
        }
    }
}
.loading-enter-active,
.loading-leave-active {
    transition: opacity 0.7s;
}
.loading-enter,
.loading-leave-active {
    opacity: 0;
}
</style>