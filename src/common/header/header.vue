<template>
    <header class="head">
        <slot name="logo"></slot>
        <slot name="search"></slot>
        <section v-if="goBack" @click="$router.go(-1)">
            <span class="fa fa-angle-left"></span>
        </section>
        <section v-if="headTitle" class="head_title">
            <span class="ellipsis">{{headTitle}}</span>
        </section>
        <slot name="msite-title"></slot>
        <router-link :to="userInfo? '/user':'/login'" tag="span" v-if="signinUp">
            <span class="fa fa-user-circle" v-if="userInfo"></span>
            <span v-else>登录|注册</span>
        </router-link>
        <slot name="changecity"></slot>
        <slot name="edit"></slot>
    </header>
</template>

<script>
import { mapState } from "vuex";
export default {
    props: ["goBack", "headTitle", "signinUp"],
    computed: {
        ...mapState(["userInfo"])
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin";
.head {
    @include fj;
    @include wh(100%, 50px);
    @include font(20px, 50px);
    position: fixed;
    z-index: 99;
    padding: 0 10px;
    color: #fff;
    background-color: #3190e8;
    .head_title {
        position: absolute;
        width: 50%;
        height: 45px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        font-weight: 600;
        span {
            display: inline-block;
            width: 200px;
        }
    }
}
</style>