<template>
  <div id="cinema">
    <!-- header -->
    <header class="navbar">
      <h1 class="nav-header">影院</h1>
    </header>
    <!-- header end-->
    <!-- 搜索 -->
    <div
      class="onsearch"
      style="margin-top:50px;background: #f5f5f5;position: fixed;
    width: 100%;z-index:10000"
    >
      <div class="addressentry">
        <span class="city-name" @click="toaddress" v-text="locations"></span>
        <i class="city-entry-arrow"></i>
      </div>
      <van-search
        shape="round"
        placeholder="搜影院"
        background="#f5f5f5"
        @click="tosearch"
        v-model="value1"
      />
    </div>
    <!-- 筛选 -->
    <div
      class="onscreen"
      style="margin-top:96px;position: fixed; 
    width: 100%;z-index:10000;background:#fff; "
    >
      <van-dropdown-menu active-color="#dd403b">
        <!-- 全部 -->
        <van-dropdown-item :title="valueqb">
          <van-tabs v-model="activeName" color="#dd403b">
            <van-tab title="商区" name="a">
              <!-- 商区分类 -->
              <van-tree-select
                :items="items"
                :main-active-index="mainActiveIndex"
                :active-id="activeId"
                @click-nav="onClickNav"
                @click-item="onClickItem"
              />
            </van-tab>
            <van-tab title="地铁站" name="b">
              <!-- 地铁分类 -->
              <van-tree-select
                :items="items2"
                :main-active-index="mainActiveIndex2"
                :active-id="activeId2"
                @click-nav="onClickNav2"
                @click-item="onClickItem2"
              />
            </van-tab>
          </van-tabs>
        </van-dropdown-item>
        <!-- 品牌 -->
        <van-dropdown-item v-model="valuepp" :options="option2" />
        <!-- 特色 -->
        <van-dropdown-item title="特色" ref="item">
          <van-switch-cell active-color="#dd403b" v-model="switch1" title="可改签" />
          <van-switch-cell active-color="#dd403b" v-model="switch2" title="可退票" />
          <van-switch-cell active-color="#dd403b" v-model="switch3" title="小吃团购" />
          <van-switch-cell active-color="#dd403b" v-model="switch4" title="会员折扣" />
          <van-button block type="info" @click="onConfirm">确认</van-button>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>
    <!-- 展示 -->
    <div class="movielist">
      <!--  -->
      <div class="main-block" v-for="(item,index) in cinemas" :key="index" @click="toshow(item)">
        <h4>
          <span v-text="item.nm" class="h41"></span>
          <span v-text="item.sellPrice" class="h42"></span>
          <span class="h43">元起</span>
        </h4>
        <h5>
          <span v-text="item.addr" class="h51"></span>
          <span v-text="item.distance" class="h52"></span>
        </h5>
        <div class="label-block">
          <div class="allowRefund" :class="[item.tag.allowRefund ? 'allowRefund' : 'dn']">退</div>
          <div class="endorse" :class="[item.tag.endorse ? 'endorse' : 'dn']">改签</div>
          <div class="snack" :class="[item.tag.snack ? 'snack' : 'dn']">小吃</div>
          <div class="vipTag" :class="[item.tag.endorse ? 'vipTag' : 'dn']">折扣卡</div>
        </div>
        <!-- <div style="width: 100px;height:10px"></div> -->
      </div>
      <!--  -->
    </div>
    <!-- 底部标签栏 -->
    <van-tabbar
      v-model="active2"
      active-color="#f03d37"
      inactive-color="#696969"
      class="cinema_footer"
    >
      <van-tabbar-item icon="photo-o" @click="toindex">电影</van-tabbar-item>
      <van-tabbar-item icon="home-o">影院</van-tabbar-item>
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
      activeName: "a",
      //底部标签栏
      active2: 1,
      //电影内容
      movielistdata: {},
      //影院信息
      cinemas: {},
      //搜索栏
      value1: "",
      //筛选下拉菜单
      value: 0,
      valuepp: 0,
      valueqb: "全部",
      switch1: false,
      switch2: false,
      switch3: false,
      switch4: false,
      option2: [
        { text: "品牌", value: 0 },
        { text: "全部", value: 1 },
        { text: "金逸影城", value: 2 },
        { text: "大地影院", value: 3 },
        { text: "哈艺时尚影城", value: 4 },
        { text: "万达影城", value: 5 },
        { text: "星美国际影城", value: 6 },
        { text: "中影佰纳国际影城", value: 7 },
        { text: "左岸国际影城", value: 8 },
        { text: "横店电影城", value: 9 },
        { text: "飞扬影城", value: 10 },
        { text: "百丽宫影城", value: 11 }
      ],
      //商区分类
      items: [],
      // 左侧高亮元素的index
      mainActiveIndex: 0,
      // 被选中元素的id
      activeId: 1,
      //地铁分类
      items2: [],
      // 左侧高亮元素的index
      mainActiveIndex2: 0,
      // 被选中元素的id
      activeId2: 1
      //
    };
  },
  methods: {
    //关闭下拉菜单
    onConfirm() {
      this.$refs.item.toggle();
    },
    // 商区分类
    onClickNav(index) {
      this.mainActiveIndex = index;
    },
    onClickItem(data) {
      this.activeId = data.id;
      this.valueqb = data.text;
    },
    // 地铁分类
    onClickNav2(index) {
      this.mainActiveIndex2 = index;
    },
    onClickItem2(data) {
      this.activeId2 = data.id;
      this.valueqb = data.text;
    },
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
    //jump to index
    toindex() {
      this.$router.push({
        name: "Index"
      });
    },
    //jump to mine
    tomine() {
      this.$router.push({
        name: "mine"
      });
    },
    //jump to show
    toshow(item) {
      let obj = {
        name: item.nm,
        addr: item.addr
      };
      this.$store.commit("setCinema", obj);
      this.$router.push({
        name: "show"
      });
    }
    //
  },
  async created() {
    //影院信息
    let cinemas = await this.$axios(
      "https://www.easy-mock.com/mock/5d48f0b7e466ff2326eec0cd/movie/cinemaList"
    );
    this.cinemas = cinemas.data.cinemas;
    // console.log(cinemas.data.cinemas[0].tag.allowRefund);

    //商区分类
    let items = await this.$axios(
      "https://www.easy-mock.com/mock/5d48f0b7e466ff2326eec0cd/movie/district"
    );
    this.items = items.data;
    // this.items2 = items.data;
    // console.log(items.data);
    //商区分类
    let items2 = await this.$axios(
      "https://www.easy-mock.com/mock/5d48f0b7e466ff2326eec0cd/movie/subway"
    );
    this.items2 = items2.data;
    // 从仓库获取当前地址
    this.locations = this.$store.state.city[0];
  }
};
</script>

<style scoped>
/* -----header----- */
#cinema {
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
/* .van-tabs {
  margin-top: 50px;
} */
.addressentry {
  position: fixed;
  top: 63px;
  left: 0px;
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
/* 展示 */
.movielist {
  padding-top: 144px;
  height: calc(100% - 100px);
  overflow: hidden;
  background: #fff;
}
.main-block {
  height: 84px;
  margin: 13px 15px 13px 15px;
  /* overflow: hidden; */
  box-sizing: border-box;
  border-bottom: 0.5px solid #e6e6e6d8;
}
.main-block h4,
h5 {
  font-size: 13px;
  color: #666;
  font-weight: 500;
  margin: 0px;
  padding: 0px;
  margin-bottom: 4px;
}
.h41 {
  line-height: 23px;
  font-size: 16px;
  color: #555;
  font-weight: 600;
}
.h42 {
  margin-left: 12px;
  margin-right: 2px;
  font-size: 18px;
  color: #f03d37;
}
.h43 {
  color: #f03d37;
}
.h5 {
  margin-top: 6px;
  font-size: 13px;
  color: #666;
}
.h51 {
  display: inline-block;
  width: 340px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.label-block {
  display: flex;
}
.label-block > div {
  margin-right: 4px;
  position: relative;
  display: inline-block;
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  font-size: 0.6rem;
}
.allowRefund,
.endorse {
  color: #589daf;
  border: 1px solid #589daf;
}
.snack,
.vipTag {
  color: #f90;
  border: 1px solid #f90;
}

/* 筛选 */
</style>

<style>
/*  标签页 */
#cinema .van-tabs--line .van-tabs__wrap {
  height: 44px;
  border-bottom: 0.5px solid #e6e6e696;
}
/* #cinema .van-tabs__nav {
  margin-left: 75px;
  margin-right: 75px;
  font-weight: 600;
  font-size: 15px;
} */
#cinema .van-tabs__line {
  width: 60px;
  background: #e54847;
  height: 2px;
}
#cinema .van-tab--active {
  color: #ef4238;
  font-weight: 600;
}
/* 底部标签栏 */
#cinema .van-tabbar-item .van-tabbar-item__icon {
  margin-bottom: 3px;
  font-size: 24px;
}
#cinema .van-tabbar {
  border-top: 1px solid #e6e6e6;
}
/* 搜索框 */
#cinema .van-search {
  margin-left: 60px;
  padding: 9px 16px;
}
#cinema .van-search__content {
  height: 20px;
  background-color: #ffffff;
  border-radius: 6px;
  border: 0.5px solid #e6e6e6;
  align-items: center;
  height: 28px;
  font-size: 13px;
  color: #b2b2b2;
}
/* 筛选 */
#cinema .van-dropdown-menu__title {
  font-size: 13px;
  color: #777;
}
#cinema .van-dropdown-menu {
  height: 50px;
}
.dn {
  display: none;
}

#cinema .cinema_footer {
  position: fixed;
}

.dn {
  display: none;
}
#cinema .van-tree-select__item {
  font-weight: 500;
}
#cinema .van-tree-select__nav-item--active {
  font-weight: 500;
  background-color: #fff;
  border-color: #dd403b;
  color: #dd403b;
}
#cinema .van-button--info {
  color: #fff;
  background-color: #dd403b;
  border: 1px solid #dd403b;
}
/* #cinema .van-icon{
      position: absolute;
} */
</style>


