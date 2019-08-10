<template>
    <div>
        <van-nav-bar
            title="我的周边商品"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            class="m_header"
            />

        <div class="wrapper">
            <div class="tip-text">您最近还没有新订单，赶快去下一单吧</div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        onClickLeft() {
            window.location.href = '#/mine';
        }
    },
}
</script>
<style>
    .wrapper{
        background-image: url('../assets/images/no.png');
        background-repeat: no-repeat;
        background-position: top center;
        top: 50%;
        margin-top: 60px;
        height: 300px;
        padding-top: 200px;
        box-sizing: border-box;
    }
</style>