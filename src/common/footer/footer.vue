<template>
    <div class="tabbar">
        <ul>
            <li><img src="@/assets/nav.jpg" alt=""><span class="active">外卖</span></li>
            <li><img src="@/assets/nav.jpg" alt=""><span>搜索</span></li>
            <li><img src="@/assets/nav.jpg" alt=""><span>订单</span></li>
            <li><img src="@/assets/nav.jpg" alt=""><span>我的</span></li>
        </ul>
    </div>
</template>

<script>

export default {
    
}
</script>

<style lang="scss" scoped>
.tabbar {
    width: 100%;
    position: fixed;
    bottom: 0;
    ul {
        width: 100%;
        height: 50px;
        border-top: 1px solid #ccc;
        display: flex;
        background-color: #fff;
        padding: 2px;
        li {
            flex: 1;
            justify-content: center;
            align-items: center;
            text-align: center;
            img{
                display: block;
                margin: auto;
                width: 25px;
            }
            span {
                color: #666;
                font-size: 14px;
                &.active {
                    color: #3190e8;
                }
            }
        }
    }
}
</style>