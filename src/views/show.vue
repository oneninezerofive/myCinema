<template>
  <div>
    <div class="head">
      <van-icon name="arrow-left" @click="back" />
      <div class="headContent" v-text="cinemaData.name"></div>
    </div>
    <div class="body" style>
      <div class="body-wrap">
        <div class="cinema-wrap">
          <div class="cinema-block">
            <div class="cinema-info">
              <div class="title line-ellipsis" v-text="cinemaData.name"></div>
              <div class="location line-ellipsis" v-text="cinemaData.addr"></div>
              <div class="location-icon" data-bid="dp_wx_cinema_map">
                <img
                  src="data:image/png;base64,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"
                />
              </div>
            </div>
            <div>
              <div>
                <div class="cinema-nav swiper-container swiper-container-horizontal">
                  <div
                    class="swiper-wrapper"
                    style="transform: translate3d(0px, 0px, 0px); transition-duration: 0ms;"
                  >
                    <div
                      class="swiper-slide"
                      v-bind:class="movieActiveidx===idx?'swiper-slide-active':''"
                      v-for="(item,idx) in movieList"
                      :key="idx"
                      @click="changeMovie(idx)"
                    >
                      <div class="post" data-bid="dp_wx_cinema_movie_pic_click">
                        <img :src="item.img" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="movie-info">
                  <div class="movie-title line-ellipsis">
                    <span class="title" v-text="movieList[this.movieActiveidx].nm"></span>
                    <span class="grade">
                      {{movieList[this.movieActiveidx].sc}}
                      <span class="small">分</span>
                    </span>
                  </div>
                  <div
                    class="movie-desc line-ellipsis"
                    v-text="movieList[this.movieActiveidx].desc"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="nav-wrap">
          <div class="nav-block mb-line-t">
            <div class="nav-bar mb-line-b">
              <div class="nav-bar-wrap">
                <div
                  class="nav-item"
                  v-for="(item,idx) in shows"
                  :key="idx"
                  v-bind:class="dateActiveidx===idx?'active':''"
                  data-bid="dp_wx_cinema_show_date"
                  data-id="today-no-movie"
                  @click="changeDate(idx)"
                >
                  <span class="date-title" v-text="item.dateShow"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="seat-wrap">
          <div class="discount-block">
            <div class="vip-tips">
              <a>
                <div class="label">折扣卡</div>
                <div class="label-text line-ellipsis">开卡享优惠</div>
                <div class="process">9.9元起开卡</div>
              </a>
            </div>
          </div>
          <div class="seat-inner-wrap">
            <div class="seat-list">
              <div class="list-wrap">
                <div
                  class="item-outer mb-line-b"
                  v-for="(item,idx) in plist"
                  :key="idx"
                  :id="item.id"
                >
                  <div class="item box-flex">
                    <div class="time-block">
                      <div class="begin" v-text="item.tm"></div>
                      <div class="end">
                        <!-- {{item.tm*60+item.dur}} -->
                        <span class="tui">开场</span>
                      </div>
                    </div>
                    <div class="info-block">
                      <div class="lan">{{item.lang}} {{item.tp}}</div>
                      <div class="hall">{{item.th}}</div>
                    </div>
                    <div class="price">
                      <div class="sellPr">
                        <span class="d">¥</span>
                        <span>
                          <span class="stonefont">{{parseInt(item.vipPrice*1.1)}}</span>
                        </span>
                      </div>
                      <div class="vipPrice">
                        <span class="icon">折扣卡</span>
                        <span class="num">¥{{item.vipPrice}}</span>
                      </div>
                    </div>
                    <div class="button-block">
                      <!-- <div class="button" data-bid="dp_wx_cinema_show_btn">购票</div> -->
                      <van-button type="primary" @click="showPopup(idx)">购票</van-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <van-popup
          v-model="show"
          round
          position="bottom"
          :style="{ height: '35%' }"
          :overlay-style="{background:'#ccc',opacity:0.6}"
        >
          <van-panel title="订单确认" desc="请确认以下电影票信息">
            <van-card
              :price="parseInt(ticket.vipPrice*1.1)"
              :title="this.movieList[this.movieActiveidx].nm"
              :thumb="this.movieList[this.movieActiveidx].img"
            >
              <div slot="desc">
                <div v-text="ticket.dt"></div>
                <div v-text="cinemaData.name"></div>
                <div v-text="ticket.th"></div>
                <div v-text="ticket.tm"></div>
              </div>
              <div slot="footer">
                <van-stepper v-model="num" max="5" integer></van-stepper>
                <div>总价：￥{{parseInt(ticket.vipPrice*1.1)*this.num}}</div>
                <van-button size="mini" type="danger" @click="buySuccess">购买</van-button>
                <van-button size="mini" type="primary" @click="quit">退出</van-button>
              </div>
            </van-card>
          </van-panel>
        </van-popup>
        <van-dialog
          v-model="buy"
          title="购买成功"
          show-cancel-button
          cancelButtonText="继续购物"
          confirmButtonText="跳转到我的订单"
          @confirm="toMyOrder"
        ></van-dialog>
        <div class="tuan-wrap">
          <div class="gap" style="height: 10px; background-color: #f0f0f0;"></div>
          <div class="tuan-list">
            <div class="tuan-title mb-line-b">影院超值套餐</div>
            <div class="tuan-item mb-line-b" v-for="(item,i) in tuanList" :key="i">
              <img data-ui-type="image-viewer" :src="item.imageUrl" />
              <span class="hot-tag" v-show="item.cardTag" v-text="item.cardTag"></span>
              <div class="item-info">
                <div class="title">
                  <span>{{item.recommendPersonNum}}人</span>
                  {{item.title}}
                </div>
                <div class="sell-num" v-text="item.curNumberDesc"></div>
                <div class="price">
                  <span class="sell-price">
                    <span>¥</span>
                    <span class="num" v-text="item.price"></span>
                  </span>
                </div>
                <div class="buy-btn">去购买</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cinemaData: {},
      tuanList: [],
      movieList: [],
      movieActiveidx: 0,
      dateActiveidx: 0,
      num: 1,
      show: false,
      showActiveidx: 0,
      buy: false,
      order: null
    };
  },
  computed: {
    shows: {
      get: function() {
        let item = this.movieList[this.movieActiveidx].shows;
        return item;
      },
      set: function() {}
    },
    plist: {
      get: function() {
        let plist = this.movieList[this.movieActiveidx].shows[
          this.dateActiveidx
        ].plist;
        return plist;
      },
      set: function() {}
    },
    ticket: {
      get: function() {
        let ticket = this.movieList[this.movieActiveidx].shows[
          this.dateActiveidx
        ].plist[this.showActiveidx];
        return ticket;
      },
      set: function() {}
    }
  },
  methods: {
    changeMovie(idx) {
      this.movieActiveidx = idx;
      this.dateActiveidx = 0;
      this.showActiveidx = 0;
    },
    changeDate(idx) {
      this.dateActiveidx = idx;
      this.plist = this.shows[idx].plist;
      this.showActiveidx = 0;
    },
    showPopup(idx) {
      this.show = true;
      this.showActiveidx = idx;
    },
    buySuccess() {
      this.buy = true;
      // 传递数据到仓库
      this.order = {
        name: this.$store.state.username,
        movie: this.movieList[this.movieActiveidx].nm,
        movieImg: this.movieList[this.movieActiveidx].img,
        location: this.cinemaData.name,
        hall: this.ticket.th,
        date: this.ticket.dt,
        time: this.ticket.tm,
        price: parseInt(this.ticket.vipPrice * 1.1),
        num: this.num,
        totalPrice: parseInt(this.ticket.vipPrice * 1.1) * this.num,
        status: false
      };
      this.$store.commit("setOrder", this.order);
    },
    back() {
      this.$router.go(-1);
    },
    quit() {
      this.show = false;
      this.num = 1;
    },
    toMyOrder() {
      this.$router.push({ name: "myorder" });
    }
  },
  async created() {
    let data = await this.$axios(
      "https://www.easy-mock.com/mock/5d47f13f9b2e425ab0a9de6d/maoyan/show"
    );
    this.tuanList = data.data.dealList.dealList;
    this.movieList = data.data.showData.movies;
    this.cinemaData = this.$store.getters.getCinema;
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
.count {
  position: absolute;
  top: 40px;
  left: 52%;
  width: 85px;
}
.item-outer {
  position: relative;
}
</style>
