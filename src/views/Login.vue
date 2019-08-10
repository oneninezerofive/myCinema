<template>
  <div>
    <van-nav-bar title="猫眼电影" left-text="返回" left-arrow @click-left="onClickLeft" class="m_header" />
    <van-tabs v-model="activeName">
      <van-tab title="美团账号登陆" name="a">
        <van-cell-group>
          <van-field
            v-model="username"
            required
            clearable
            label="用户名"
            right-icon="question-o"
            placeholder="请输入用户名"
            @click-right-icon="$toast('手机号或者美团账号')"
          />
          <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required />
        </van-cell-group>
        <van-button type="primary" size="large" class="submit" @click="subBtn()">登陆</van-button>
        <a href="#/reg" class="reg_a">立即注册</a>
        <a href class="find_a">找回密码</a>
        <p class="tel_p">
          © 猫眼电影 客服电话：
          <span>400-670-5335</span>
        </p>
      </van-tab>
      <van-tab title="手机验证登陆" name="b">
        <van-cell-group>
          <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
            <van-button slot="button" size="small" type="primary">发送验证码</van-button>
          </van-field>
        </van-cell-group>
        <van-cell-group>
          <van-field v-model="value" placeholder="请输入用户名" />
        </van-cell-group>
        <van-button type="primary" size="large" class="submit">登陆</van-button>
        <a href="#/reg" class="reg_a">立即注册</a>
        <a href="###" class="find_a">找回密码</a>
        <p class="tel_p">
          © 猫眼电影 客服电话：
          <span>400-670-5335</span>
        </p>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      username: "", //用户名
      password: "", //密码
      sms: "",
      value: "",
      activeName: "a"
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "Index"
      });
    },
    async subBtn() {
      let nameVal = this.username;
      let psdVal = this.password;
      if (nameVal && psdVal) {
        await this.$axios
          .post("http://localhost:4567/login/login", {
            name: nameVal,
            psd: psdVal
          })
          .then(response => {
            //返回的数据在这里
            // console.log(response.data);//no
            if (response.data == "ok") {
              this.$store.commit("setUsername", nameVal);
              this.$router.push({
                name: "Index"
              });
              this.$store.commit("setLogin", "y_login");
              // let flag = this.$store.getters.getLogin;
              // console.log(flag);
            } else if (response.data == "no") {
              Dialog.alert({
                message: "登录失败"
              }).then(() => {
                this.username = this.password = "";
              });
              this.$store.commit("setLogin", "n_login");
            }
          });
      } else {
        Dialog.alert({
          message: "请将登录信息填写完整"
        });
      }
    }
  }
  //   created() {
  //         let flag = this.$store.getters.getLogin;
  //         console.log(flag);
  //   },
};
</script>
<style>
.submit {
  height: 30px;
  text-align: center;
  padding: 0 16px;
  border-radius: 5px;
  color: #fff;
  border: 0;
  font-size: 14px;
  vertical-align: middle;
  line-height: 30px;
  box-sizing: border-box;
  cursor: pointer;
  -webkit-user-select: none;
  background-color: #df2d2d;
  margin-bottom: 20px;
}
.reg_a {
  float: left;
}
.find_a {
  float: right;
}
.tel_p {
  font-size: 14px;
  margin-top: 20px;
}
.m_header {
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: #e54847;
  color: #fff;
}
</style>