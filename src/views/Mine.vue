<template>
  <div id="mine_div">
    <header class="m_header">我的</header>
    <div class="img_div">
      <img class="user-poster" src="https://img.meituan.net/maoyanuser/350bff22b2ac2c7e5b11937b8dc8f9d212207.png"/>
    </div>
    <div>
        <van-divider>我的订单</van-divider>
        <div class="m_orders">
            <div>
              <a href="#/myorder"><img src="../assets/images/mine_dypng.png"/></a>
              <p>电影</p>
            </div>
            <div>
              <a href="#/myrim"><img src="../assets/images/mine_dd.png"/></a>
              <p>商城</p>
            </div>
        </div>
    </div>
    <van-cell-group>
      <van-cell icon="points" title="在线观影" is-link />
      <van-cell icon="gold-coin-o" title="优惠券" is-link />
      <van-cell icon="gift-o" title="折扣卡" is-link />
    </van-cell-group>
    <!-- 底部标签栏 -->
    <van-tabbar v-model="active2" active-color="#f03d37" inactive-color="#696969" class="mine_footer">
      <van-tabbar-item icon="photo-o" @click="toindex()">电影</van-tabbar-item>
      <van-tabbar-item icon="home-o" @click="tocinema()">影院</van-tabbar-item>
      <van-tabbar-item icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup } from 'vant';
export default {
  data() {
    return {
      active2: 2,
    }
  },
  methods: {
    toindex() {
      this.$router.push({
      name: "Index"
      })
    },
    //jump to cinema
    tocinema() {
      this.$router.push({
        name: "Cinema"
      })
    }
  },
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  }
};
</script>

<style>
    .user-poster {
        width: 100%;
        height: 53vw;
        display: block;
    }
    .user-group {
        margin-bottom: 15px;
    }
    .user-links {
        padding: 15px 0;
        font-size: 12px;
        text-align: center;
        background-color: #fff;
    }
    van-icon {
        display: block;
        font-size: 24px;
    }
    .van-cell__title{
        text-align: left;
    }
    .m_header{
      height: 50px;
      line-height: 50px;
      text-align: center;
      background: #e54847;
      color: #fff;
    }
    .img_div{
      background-color: #f03d37;
      background-image: url('../assets/images/mine_bg.png');
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: 100% 150px;
      height: 150px;
      overflow: hidden;
      text-align: center;
    }
    .img_div img{
      display: inline-block;
      margin-top: 30px;
      width: 60px;
      height: 60px;
      border-radius: 50px;
      border: 3px solid #fff;
    }
    .m_orders{
      display: flex;
    }
    .m_orders div{
      width: 50%;
      height: 97px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .m_orders div img{
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .m_orders div p{
      margin: 10px 0;
    }
    #mine_div .mine_footer{
      position: fixed;
    }
   .van-tabbar-item__icon {
      font-size: 24px;
    }   
</style>