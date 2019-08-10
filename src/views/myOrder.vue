<template>
  <div>
    <div class="head">
      <van-icon name="arrow-left" @click="back" />
      <div class="headContent">我的电影订单</div>
    </div>
    <div class="wrapper" v-show="show">
      <span class="tip-text">您最近还没有新订单，赶快去下一单吧</span>
    </div>
    <div class="body" style>
      <div class="order-content">
        <div class="order-list">
          <div class="order-item mb-line-tb" v-for="(item,idx) in orderList" :key="idx">
            <div class="order-title mb-line-b">
              <a class="cinema-name line-ellipsis" v-text="item.location"></a>
            </div>
            <a class="order-detail-link">
              <div class="order-info">
                <img :src="item.movieImg" alt />
                <div class="order-desc">
                  <div class="movie-name line-ellipsis">
                    {{item.movie}}
                    <span>{{item.num}}张</span>
                  </div>
                  <div class="showTime line-ellipsis">{{item.date}} {{item.time}}</div>
                  <div class="position line-ellipsis">{{item.hall}}</div>
                </div>
                <div class="link-status see">
                  <div>查看取票码</div>
                </div>
              </div>
            </a>
            <div class="order-more mb-line-t">
              <div class="price">
                <span>单价：{{item.price}}元 总价：{{item.totalPrice}}元</span>
              </div>
              <div class="status">
                <span class="undone">{{item.status?"已观看":"未完成"}}</span>
                <van-button type="primary" @click="finish(idx)" v-show="!item.status">完成</van-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../assets/css/myorder.css";
export default {
  data() {
    return {
      orderList: [],
      show: false
    };
  },
  methods: {
    finish(idx) {
      this.orderList[idx].status = true;
    },
    back() {
      this.$router.go(-1);
    }
  },
  async created() {
    // let data = await this.$axios(
    //   "https://www.easy-mock.com/mock/5d47f13f9b2e425ab0a9de6d/maoyan/myorder"
    // );
    // this.orderList = data.data.orderlist;
    let Allorder = this.$store.getters.getOrder;
    for (let i = 0; i < Allorder.length; i++) {
      if (Allorder[i].name == this.$store.state.username) {
        this.orderList.push(Allorder[i]);
      }
    }
    // this.orderList = this.$store.getters.getOrder;
    let bool = false;
    if (this.orderList.length == 0) {
      bool = true;
    }
    this.show = bool;
  }
};
</script>
<style lang="scss" scoped>
.head {
  height: 50.5px;
  color: #fff;
  background: #e54847;
  border-bottom: 1px solid #e54847;
  .van-icon {
    width: 10%;
    display: inline-block;
    height: 50.5px;
    line-height: 50.5px;
    font-size: 30px;
    vertical-align: middle;
  }
  .headContent {
    display: inline-block;
    width: 80%;
    height: 50.5px;
    line-height: 50.5px;
    vertical-align: middle;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    margin-right: 10%;
  }
}
.wrapper {
  background-image: url("../assets/images/no.png");
  background-repeat: no-repeat;
  background-position: top center;
  top: 50%;
  margin-top: 60px;
  height: 300px;
  padding-top: 200px;
  box-sizing: border-box;
  text-align: center;
}
.undone {
  margin-right: 5px;
}
</style>