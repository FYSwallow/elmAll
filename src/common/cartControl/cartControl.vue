<template>
    <div class="cartControl-wrapper">
        <transition name='fade'>
            <div class="cart-decrease" v-show="food.count && food.count !== 0" @click.prevent="decreaseCart">
                <transition name="inner">
                    <span class="inner ">-</span>
                </transition>
            </div>
        </transition>
        <span class="cart-count" v-show="food.count !== 0">{{food.count}}</span>
        <span class="cart-add" @click.prevent="addCart">+</span>
    </div>
</template>

<script>
export default {
    // props:['food'],
    data() {
        return {
            food: []
        }
    },
    methods: {
        addCart(e){
            if(!this.food.count) {
                this.$set(this.food, 'count', 1)
            }else {
                this.food.count++
            }
            this.$emit('func', {
                posX: e.clientX,
                posY: e.clientY
            })
        },
        decreaseCart() {
            console.log(1)

            if(this.food.count === 0) return
            this.food.count--
            // this.$emit('result', this.food)
        }

    },
    created(){
    }
}
</script>

<style lang="scss">
.cartControl-wrapper {
    text-align: right;
    .cart-decrease, .cart-add {
        display: inline-block;
        padding: 4px 6px 6px 6px;
        &.fade-enter-active, &.fade-leave-active {
            transition: all 0.4s linear;
        }
        &.fade-enter, &.fade-leave-active{
            opacity: 0;
            transform: translateX(24px);
        }
        .inner {
            display: inline-block;
            line-height: 24px;
            font-size: 24px;
            vertical-align: top;
            color: rgb(0, 160, 220);
        }
        
    }
    .cart-count {
        display: inline-block;
        font-size: 14px;
        line-height: 24px;
        width: 12px;
        vertical-align: top;
        padding-top: 6px;
        text-align: center;
        color: rgb(147, 153, 159);
    }
    .cart-add {
        display: inline-block;
        padding: 6px;
        line-height: 24px;
        font-size: 24px;
        vertical-align: top;
        color: rgb(0, 160, 220)
    }
}   
</style>