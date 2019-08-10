<template>
  <div>
    <mt-index-list>
      <div class="CityList">
        <p class="cityTitle">最近访问城市</p>
        <ul class="cityList">
          <li
            class="cityItem"
            v-for="(item,i) in locations"
            :key="i"
            v-text="item"
            @click="location(item)"
          ></li>
        </ul>
      </div>
      <div class="CityList">
        <p class="cityTitle">热门城市</p>
        <ul class="cityList" ref="city">
          <li
            class="cityItem"
            v-for="(item,i) in hot"
            :key="i"
            v-text="item"
            @click="location(item)"
          ></li>
        </ul>
      </div>
      <mt-index-section v-for="(item,i) in cityList" :key="i" :index="item.title">
        <mt-cell v-for="(lo,idx) in item.list" :key="idx" :title="lo" @click="location(lo)">
          <span @click="location(lo)">{{lo}}</span>
        </mt-cell>
      </mt-index-section>
    </mt-index-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cityList: [],
      hot: [
        "上海",
        "北京",
        "广州",
        "深圳",
        "武汉",
        "天津",
        "西安",
        "南京",
        "杭州",
        "成都",
        "重庆"
      ],
      locations: [],
      now: ""
    };
  },
  methods: {
    location(item) {
      let index = this.locations.indexOf(item);
      if (index == -1) {
        this.$store.commit("setCity", item);
      } else {
        this.$store.state.city.splice(index, 1);
        this.$store.commit("setCity", item);
      }
      this.now = item;

      // console.log(this.$store.state);
      this.$router.go(-1);
    }
  },
  async created() {
    let cityListArr = await this.$axios(
      "https://www.easy-mock.com/mock/5d47f13f9b2e425ab0a9de6d/maoyan/citylist"
    );
    this.cityList = cityListArr.data.cityList;
    this.locations = this.$store.getters.getCity;
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.CityList {
  overflow: hidden;
}
.cityTitle {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  color: #333;
  background-color: #fafafa;
}
.cityItem {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 10px;
  margin-left: 4%;
  margin-bottom: 5px;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-tap-highlight-color: transparent;
  font-size: 14px;
  color: #333;
}
</style>



