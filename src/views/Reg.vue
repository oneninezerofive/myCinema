<template>
    <div>
            <van-nav-bar
            title="猫眼电影"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            class="m_header"
            />
        <p class="reg_p">
            <van-tabs v-model="active">
                <van-tab title="输入手机号">
                    <van-cell-group>
                        <van-field v-model="telValue" placeholder="请输入手机号" @input="tel()"/>
                    </van-cell-group>
                    <van-checkbox v-model="checked">
                        我已阅读并同意
                        <a href="">《美团网用户协议》</a>
                    </van-checkbox>
                    <button v-bind:class="[isActive ? activeClass : 'reg_btn1']" @click="y_btn()">获取验证码</button>
                    <p>© 猫眼电影 客服电话：<span>400-670-5335</span></p>
                </van-tab>
                <van-tab title="输入验证码">
                    <van-cell-group>
                        <van-field v-model="yzmValue" placeholder="请输入验证码"/>
                    </van-cell-group>
                    <button class="reg_btn2" @click="yzmBtn()">提交验证码</button>
                    <p>© 猫眼电影 客服电话：<span>400-670-5335</span></p>
                </van-tab>
                <van-tab title="设置密码">
                <van-password-input
                    :value="psdVal"
                    info="密码为 6 位数字"
                    @focus="showKeyboard = true"
                    />
                    <!-- 数字键盘 -->
                    <van-number-keyboard
                    :show="showKeyboard"
                    @input="onInput"
                    @delete="onDelete"
                    @blur="showKeyboard = false"
                    />
                    <!-- <van-cell-group>
                    //     <van-field v-model="psdVal" placeholder="请输入密码"/>
                    // </van-cell-group>-->
                    <button class="reg_btn2" @click="reg_btns()">设置密码</button>
                    <p>© 猫眼电影 客服电话：<span>400-670-5335</span></p>
                </van-tab>
            </van-tabs>
        </p>
        
    </div>
</template>
<script>
import { Dialog } from 'vant';
export default {
  data() {
    return {
      telValue: '',//手机号
      checked: true,//默认选中复选框
      isActive: false,//btn高亮样式
      activeClass: 'reg_btn2',//btn默认样式
      show: false,//是否显示弹框
      titles: '',
      hide: false,//隐藏取消按钮
      megs: '',//随机验证码
      yzmValue: '',//填写的验证码
      active: 0,
      psdVal: '',//密码
      showKeyboard: true

    }
  },
  methods: {
        tel(){//手机号正则验证
            let telreg = /^1[3456789]\d{9}$/;
            let telVal = this.telValue;
            if(telreg.test(telVal)){
                this.telValue = telVal;
                this.isActive = true;
            }else{
                this.isActive = false;
            }
        },
        y_btn(){//弹出框
            this.megs = "";//清除验证码
            if(this.isActive){
                this.show = true;
                this.title = "验证码"
                //随机验证码
                let yzm = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
                for(let i = 0; i <4; i++){
                    let a = Math.floor(Math.random() * yzm.length);
                    this.megs += yzm[a];
                    Dialog.alert({
                    message: this.megs
                    }).then(() => {
                        this.active = 1;
                    });
                }
            }else{
                this.show = true;
                this.titles = "错误";
                this.megs = "请输入正确的手机号";
            }
        },
        onClickLeft() {//跳转到登录页
            this.$router.push({
                name: 'login'
            });
        },
        onInput(key) {//输入密码
            this.psdVal = (this.psdVal + key).slice(0, 6);
        },
        onDelete() {//删除密码
            this.psdVal = this.psdVal.slice(0, this.psdVal.length - 1);
        },
        yzmBtn(){//提交验证码
            let a = this.megs;
            let b = this.yzmValue;
            if(a == b){
                this.active = 2;
            }else{
                Dialog.alert({
                    message: '验证码错误,注意大小写'
                }).then(() => {
                    this.active = 0;
                });
            }
        },
        reg_btns(){//注册
                this.$axios.post('http://localhost:4567/reg/reg', {
                name: this.telValue,
                psd: this.psdVal
            })
            .then(function (response) {
                if(response.data.result.ok == '1'){
                    Dialog.alert({
                    message: '注册成功'
                    }).then(() => {
                        window.location.href = '#/login';
                    });
                }
            })
        },
    }
}


</script>
<style>
    .reg_p{
        height: 40px;
        line-height: 40px;
    }
    .reg_btn1{
        width: 100%;
        height: 47px;
        background-color: #dcdcdc;
        color: #999;
        border: 0;
    }
    .reg_btn2{
        width: 100%;
        height: 47px;
        background-color: red;
        color: #fff;
        border: 0;
    }
</style>