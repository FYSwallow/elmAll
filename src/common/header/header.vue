<template>
    <header class="head">
        <span class="head_left">elm</span>
        <span class="head_right fa fa-user-circle"></span>
    </header>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
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
    span {
        display: inline-block;
        position: absolute;
    }
    .head_left {
    }
    .head_right {
        right: 10px;
        top: 13px;
    }
}  
</style>