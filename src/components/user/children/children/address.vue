<template>
    <div>
        <Header></Header>
        <section class="address">
            <ul class="address_list">
                <li class="list_item">
                    <h3>四川</h3>
                    <p>成都锦江区</p>
                </li>
            </ul>
            <div class="add_address">
                <h3>新增地址</h3>
                <span>></span>
            </div>
        </section>
    </div>
</template>

<script>
import Header from '@/common/header/header';
export default {
    components: {
        Header
    }
}
</script>

<style lang="scss" scoped>
.address {
    padding-top: 45px;
    .address_list {
        margin: 10px 0;
        background-color: #FFF8C3;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        padding: 10px;
        h3 {
            font-size: 14px;
            font-weight: normal;
        }
        p {
            color: #999;
        }
    }
    .add_address {
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        padding: 10px;
        h3 {
            font-weight: normal;
        }
        span {
            font-weight: 700;
            color: #999;
        }
    }
}   
</style>