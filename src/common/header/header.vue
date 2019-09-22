<template>
    <header class="head">
        <slot name="logo"></slot>
        <slot name="search"></slot>
        <section  v-if="goBack" @click="$router.go(-1)" >
            <span class="fa fa-angle-left"></span>
        </section>
        <section v-if="headTitle" class="head_title">
            <slot name="msiteTitle" v-if="msiteTitle"></slot>
        </section>
        <router-link to="/home" tag="span" v-if="signinUp">
            <span class="fa fa-user-circle"></span>
            <span v-if="false">登录|注册</span>
        </router-link>
        <slot name="changecity"></slot>
        <slot name="msite-title"></slot>

    </header>
</template>

<script>
export default {
    props: ['goBack', 'headTitle', 'signinUp']
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/mixin';
.head {
    width: 100%;
    height: 45px;
    background-color: #3190E8;
    font-size: 20px;
    line-height: 45px;
    color: #fff;
    padding: 0 10px;
    position: fixed;
    z-index: 99;
    display: flex;
    justify-content: space-between;
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