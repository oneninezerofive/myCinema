<template>
  <div id="movies">
    <!-- header -->
    <header class="navbar">
      <h1 class="nav-header">猫眼电影</h1>
    </header>
    <!-- -header end-->
    <!-- 标签页 -->
    <van-tabs v-model="active">
      <!--  address entry -->
      <div class="addressentry">
        <span class="city-name" @click="toaddress" v-text="locations"></span>
        <i class="city-entry-arrow"></i>
      </div>
      <!-- 正在上映 -->
      <van-tab title="正在热映">
        <!-- movieLIST -->
        <div class="movielist">
          <!--  -->
          <div
            class="main-block"
            v-for="(item,index) in movielistdata"
            :key="index"
            @click="tocinema"
          >
            <!-- 图 -->
            <div class="main-img">
              <img :src="item.img" />
            </div>
            <!-- 信息 -->
            <div class="main-message">
              <div class="main-message-box">
                <h3 v-text="item.nm">电影名称/</h3>
                <h4>
                  观众评：
                  <span v-text="item.sc">分数/</span>
                </h4>
                <h5>
                  主演：
                  <span v-text="item.star">王某某/</span>
                </h5>
                <h6 v-text="item.showInfo">今日放映/</h6>
              </div>
              <!-- 购票 -->
              <div class="mainbtn">
                <span>购票</span>
              </div>
            </div>
            <div style="width: 100px;height:10px"></div>
          </div>
          <!--  -->
        </div>
      </van-tab>
      <!-- 即将上映 -->
      <van-tab title="即将上映">
        <div class="movielist">
          <!--  -->
          <div class="main-block" v-for="(item2,index) in comingsoon" :key="index">
            <!-- 图 -->
            <div class="main-img">
              <img :src="item2.img" />
            </div>
            <!-- 信息 -->
            <div class="main-message">
              <div class="main-message-box">
                <h3 v-text="item2.nm">电影名称/</h3>
                <h4>
                  <span v-text="item2.wish"></span>人想看
                </h4>
                <h5>
                  主演：
                  <span v-text="item2.star">王某某/</span>
                </h5>
                <h6 v-text="item2.comingTitle">今日放映/</h6>
              </div>
              <!-- 购票 -->
              <div class="mainbtn2">
                <span>预售</span>
              </div>
            </div>
            <div style="width: 100px;height:10px"></div>
          </div>
          <!--  -->
        </div>
      </van-tab>
      <!--search entry  -->
      <div class="search-entry search-icon" data-type="movie" @click="tosearch">
        <img src="../assets/images/movies-search2.png" alt />
      </div>
    </van-tabs>
    <!-- 标签页 end -->
    <!-- 底部标签栏 -->
    <van-tabbar
      v-model="active2"
      active-color="#f03d37"
      inactive-color="#696969"
      class="movies_footer"
    >
      <van-tabbar-item icon="photo-o">电影</van-tabbar-item>
      <van-tabbar-item icon="home-o" @click="tocinema">影院</van-tabbar-item>
      <van-tabbar-item icon="manager-o" @click="tomine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //地址信息
      locations: "",
      //标签页
      active: 2,
      //底部标签栏
      active2: 0,
      //电影内容
      movielistdata: {},
      comingsoon: {}
      //
    };
  },
  methods: {
    //jump to address
    toaddress() {
      this.$router.push({
        name: "citylist"
      });
    },
    //jump to search
    tosearch() {
      this.$router.push({
        name: "search"
      });
    },
    //jump to cinema
    tocinema() {
      this.$router.push({
        name: "Cinema"
      });
    },
    //jump to mine
    tomine() {
      this.$router.push({
        name: "mine"
      });
    }
  },
  async created() {
    //正在上映
    let movielistdata = await this.$axios(
      "https://www.easy-mock.com/mock/5d48f0b7e466ff2326eec0cd/movie/movielist"
    );
    this.movielistdata = movielistdata.data.movieList;
    // 即将上映
    let comingsoon = await this.$axios(
      "https://www.easy-mock.com/mock/5d48f0b7e466ff2326eec0cd/movie/comingList"
    );
    this.comingsoon = comingsoon.data.coming;
    // 获取地址

    this.locations = this.$store.state.city[0]
      ? this.$store.state.city[0]
      : "广州";
  }
};
</script>

<style scoped>
/* -----header----- */
#movies {
  width: 100%;
  height: 100%;
}
.navbar {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100000;
  width: 100%;
  height: 50.5px;
  color: #fff;
  background: #e54847;
  border-bottom: 1px solid #e54847;
  text-align: center;
}
.navbar h1.nav-header {
  display: block;
  font-size: 18px;
  font-weight: 400;
  text-align: center;
  line-height: 50px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: 0px;
}
/* -----header end----- */
/*  top  end  */
.van-tabs {
  margin-top: 50px;
  background: #fff;
}
.addressentry {
  position: absolute;
  top: 11px;
  /* left:0px; */
  padding-left: 15px;
  font-size: 15px;
  color: #666;
}
.addressentry .city-entry-arrow {
  margin-right: 5px;
  width: 0;
  height: 0;
  border: 4px solid #b0b0b0;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  display: inline-block;
  margin-left: 4px;
  margin-top: 5px;
}
/*  标签页 */
.search-icon {
  position: absolute;
  top: 11px;
  right: 14px;
  width: 22px;
  height: 22px;
}
.search-icon img {
  width: 22px;
  height: 22px;
}
/* movieLIST */
.movielist {
  padding-top: 12px;
  height: calc(100% - 100px);
  overflow: hidden;
}
.main-block {
  height: 90px;
  margin: 0px 16px 28px 16px;
  /* overflow: hidden; */
  box-sizing: border-box;
}
.main-img {
  float: left;
}

/* .main-block > div {
  float: left;
} */
.main-img img {
  width: 64px;
  height: 90px;
}
.main-message {
  width: 298px;
  margin-left: 10px;
  margin-right: 10px;
  border-bottom: 0.5px solid #e6e6e69f;
}

.main-message > div {
  float: left;
}
.main-message h3 {
  font-size: 17px;
  color: #333;
  font-weight: 700;
  padding-right: 5px;
  flex-shrink: 1;
  margin: 0px;
  padding: 0px;
  margin-bottom: 6px;
}
.main-message h4,
h5,
h6 {
  font-size: 13px;
  color: #666;
  font-weight: 500;
  margin: 0px;
  padding: 0px;
  margin-bottom: 4px;
}
.main-message h6 {
  margin-bottom: 12px;
}
.main-message h4 span {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.main-message-box {
  width: 240px;
}
.mainbtn {
  margin-top: 30px;
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  box-sizing: border-box;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  white-space: nowrap;
  font-size: 12px;
  cursor: pointer;
}
.mainbtn2 {
  margin-top: 30px;
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  box-sizing: border-box;
  background-color: #3c9fe6;
  color: #fff;
  border-radius: 4px;
  white-space: nowrap;
  font-size: 12px;
  cursor: pointer;
}
</style>

<style>
/*  标签页 */

#movies .van-tabs--line .van-tabs__wrap {
  height: 44px;
  border-bottom: 0.5px solid #e6e6e6ad;
}
#movies .van-tabs__nav {
  margin-left: 75px;
  margin-right: 75px;
  font-weight: 600;
  font-size: 15px;
}
#movies .van-tabs__line {
  width: 60px;
  background: #e54847;
  height: 2px;
}
#movies .van-tab--active {
  color: #ef4238;
  font-weight: 600;
}
/* 底部标签栏 */
#movies .van-tabbar-item__icon {
  margin-bottom: 3px;
  font-size: 24px;
}
#movies .van-tabbar {
  border-top: 1px solid #e6e6e6;
}

#movies .main-message {
  float: left;
}

#movies .van-tabbar--fixed {
  bottom: -2px;
}

#movies .movies_footer {
  position: fixed;
}
</style>


