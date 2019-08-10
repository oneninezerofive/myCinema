<template>
  <div id="search">
    <div class="head">
      <van-icon name="arrow-left" @click="back" />
      <div class="headContent">猫眼电影</div>
    </div>
    <van-search
      placeholder="搜电影、搜影院"
      showAction
      v-model="searchValue"
      @search="addHistory(searchValue)"
      @focus="showHistory"
    >
      <div slot="action" @click="addHistory(searchValue)">搜索</div>
    </van-search>
    <ul class="searchHistory" v-show="showSearchHistory">
      <van-cell
        v-for="(item,i) in searchHistory"
        :key="i"
        :title="item"
        icon="clock"
        @click="addSearch(item)"
      >
        <van-icon slot="right-icon" name="cross" @click="del(i)" />
      </van-cell>
    </ul>
    <div class="searchRes">
      <div class="movieres res" v-if="show">
        <h3>电影/电视剧/综艺</h3>
        <div class="movieList list">
          <div class="movie cell" v-for="(item,i) in movieList" :key="i" :id="item.id">
            <img class="poster" :src="item.img" alt />
            <div class="info">
              <div class="name-score">
                <p class="name">
                  <span class="one-line" v-text="item.nm"></span>
                  <van-tag plain type="primary" v-for="(t,i) in item.version " :key="i">{{t}}</van-tag>
                </p>
                <span class="score">
                  <span class="num" v-text="item.sc"></span>分
                </span>
              </div>
              <div class="detail-section">
                <div class="detail-items">
                  <p class="ename one-line" v-text="item.enm"></p>
                  <p class="catogary" v-text="item.cat"></p>
                  <p class="release" v-text="item.rt"></p>
                </div>
                <div class="buy-btn sale" :id="item.id">购票</div>
              </div>
            </div>
          </div>
        </div>
        <div class="moviemore more" @click="ToIndex">查看全部{{movie.total}}部影视剧</div>
      </div>
      <div class="cinemares res" v-if="show">
        <h3>影院</h3>
        <div class="cinemaList list">
          <div class="cinema cell" v-for="(item,i) in cinemaList" :key="i">
            <div class="info">
              <p class="name-price">
                <span class="name one-line" v-text="item.nm"></span>
                <span class="sell-price">
                  <span class="price" v-text="item.sellPrice"></span>
                  元起
                </span>
              </p>
              <p class="address one-line" v-text="item.addr"></p>
              <p class="feature-tags">
                <van-tag plain type="primary" v-for="(t,i) in item.hallType " :key="i">{{t}}</van-tag>
              </p>
            </div>
            <div class="distance" v-text="item.distance"></div>
          </div>
        </div>
        <div class="cinemamore more" @click="Tocinema">查看全部{{cinema.total}}家电影院</div>
      </div>
    </div>
  </div>
</template>
<script>
import "../assets/css/common.css";
import "../assets/css/theme.css";
import "../assets/css/cinema.css";

export default {
  data() {
    return {
      searchValue: "",
      searchHistory: [],
      showSearchHistory: 0,
      cinema: {},
      show: 0,
      cinemaList: [],
      movie: {},
      movieList: []
    };
  },
  methods: {
    async addHistory(item) {
      let index = this.searchHistory.indexOf(item);
      if (index != -1) {
        this.searchHistory.splice(index, 1);
      }
      this.searchHistory.unshift(item);
      this.showSearchHistory = true;

      let data = await this.$axios(
        "https://www.easy-mock.com/mock/5d47f13f9b2e425ab0a9de6d/maoyan/search"
      );
      this.show = true;
      this.cinema = data.data.cinemas;
      this.cinemaList = data.data.cinemas.list.slice(0, 3);
      this.movie = data.data.movies;
      this.movieList = data.data.movies.list.slice(0, 3);
      this.showSearchHistory = false;
    },
    del(index) {
      this.searchHistory.splice(index, 1);
    },
    showHistory() {
      this.showSearchHistory = true;
    },
    hideHistory() {
      this.showSearchHistory = false;
    },
    addSearch(item) {
      this.searchValue = item;
    },
    back() {
      this.$router.go(-1);
    },
    Tocinema() {
      this.$router.push({
        name: "Cinema"
      });
    },
    ToIndex() {
      this.$router.push({
        name: "Index"
      });
    }
  },
  async created() {}
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
#search {
  background-color: #f5f5f5;
}
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

.searchRes {
  height: 100%;
  overflow: auto;
}
.res {
  margin-bottom: 10px;
  background-color: #fff;
  h3 {
    font-size: 15px;
    color: #999;
    padding: 9px 15px;
  }
}
.list {
  border-bottom: 1px solid #e6e6e6;
  padding-left: 15px;
  border-top: 1px solid #e6e6e6;
}

.movie {
  padding: 12px 0;
  min-height: 90px;
}
.cell {
  border-bottom: 1px solid #e6e6e6;
  .poster {
    background-color: #eee;
    width: 64px;
    height: 90px;
    float: left;
    margin-right: 10px;
  }
  .info {
    margin-right: 15px;
    margin-top: 1px;
    .name-score {
      font-size: 16px;
      color: #222;
      display: flex;
      -webkit-box-pack: justify;
      justify-content: space-between;
      margin-bottom: 2px;
      .name {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-flex: 1;
        flex-grow: 1;
        max-height: 24px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        .one-line {
          display: inline-block;
          font-weight: 700;
          font-size: 17px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          margin-right: 5px;
        }
      }
      .score {
        color: #fa0;
        font-size: 10px;
        flex-shrink: 0;
        padding-left: 5px;
        .num {
          font-size: 16px;
        }
      }
    }
    .detail-section {
      position: relative;
      .ename {
        font-size: 13px;
        color: #666;
        margin-top: 2px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .catogary {
        font-size: 13px;
        color: #666;
        margin-top: 2px;
      }
      .release {
        font-size: 13px;
        color: #666;
        margin-top: 2px;
      }
      .buy-btn {
        color: #fff;
        border-radius: 4px;
        font-size: 12px;
        -webkit-align-self: flex-end;
        align-self: flex-end;
        flex-shrink: 0;
        width: 48px;
        text-align: center;
        height: 27px;
        line-height: 27px;
        right: 0;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        background-color: #ef4238;
      }
    }
  }
}
.more {
  text-align: center;
  line-height: 44px;
  height: 44px;
  font-size: 15px;
  color: #ef4238;
}
.cinema {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  padding: 15px 15px 15px 0;
  .info {
    flex: 1;
    overflow: hidden;
    .name-price {
      font-size: 16px;
      color: #000;
      margin-bottom: 6px;
      display: flex;
      .one-line {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .sell-price {
        font-size: 11px;
        color: #999;
        white-space: nowrap;
        margin-left: 10px;
        .price {
          font-size: 17px;
          color: #ef4238;
        }
      }
    }
    .address {
      font-size: 13px;
      color: #999;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .feature-tags {
      margin-top: 7px;
      margin-bottom: 2px;
    }
  }
  .distance {
    font-size: 13px;
    color: #999;
  }
}
.van-tag {
  margin-right: 2px;
}
</style>

