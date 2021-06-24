<template>
  <view class="zai-box">
    <scroll-view scroll-y class="page">
      <view style="text-align: center;" :style="[{animation: 'show ' + 0.4+ 's 1'}]">
        <image src="/static/login3.png" mode='aspectFit' class="zai-logo"></image>
        <view class="zai-title">直聊好工作</view>
      </view>
      <view class="box padding-lr-xl login-paddingtop" :style="[{animation: 'show ' + 0.6+ 's 1'}]">

<!--        <view class="username cu-form-group margin-top radius shadow-blur">-->
<!--          <view class="title">账号:</view>-->
<!--          <input placeholder="请输入账号/邮箱/手机号" name="input" v-model="userName"></input>-->
<!--        </view>-->
<!--        <view class="password cu-form-group margin-top radius">-->
<!--          <view class="title">密码:</view>-->
<!--          <input placeholder="请输入密码" name="input" type="password" v-model="password"></input>-->
<!--        </view>-->
        <view class="padding-left-lg padding-right-lg">
          <view class="cu-item cu-form-group">
            <view class="title">账号</view>
            <input placeholder="请输入账号/邮箱/手机号" type="text" name="input" v-model="userName"/>
          </view>
          <view class="cu-item cu-form-group solid-bottom">
            <view class="title">密码</view>
            <input placeholder="请输入密码" type="password" name="input" v-model="password"/>
          </view>
        </view>
        <view class="padding  flex  flex-direction">
          <button class="cu-btn bg-red radius lg" :loading="loading"
                  @tap="onLogin"> {{ loading ? "绑定中..." : "绑定" }}
          </button>
          <view class="flex justify-between padding-sm">
            <text class="text-red text-left" @click="$Router.replace({name:'register'})">注册绑定新账号</text>
            <text class="text-gray text-right" @click="$Router.replace({name:'forgetPwd'})">忘记密码</text>
          </view>

        </view>
        <!-- #ifdef APP-PLUS -->
<!--        <view class="padding flex flex-direction  text-center  ">-->
<!--          当前版本:{{ version }}-->
<!--        </view>-->
        <!-- #endif -->

      </view>


    </scroll-view>
    <!-- 登录加载弹窗 -->
    <view class="cu-load load-modal" v-if="loading">
      <!-- <view class="cuIcon-emojifill text-orange"></view> -->
      <image src="/static/login3.png" mode="aspectFit"></image>
      <view class="gray-text">登录中...</view>
    </view>
    <!-- <my-image-upload></my-image-upload>
    <my-select></my-select> -->
    <!-- <my-page></my-page> -->
  </view>

</template>

<script>
import {ACCESS_TOKEN, USER_NAME, USER_INFO} from "@/common/util/constants"
import {mapActions} from "vuex"
import myImageUpload from "@/components/my-componets/my-image-upload.vue"
import mypage from "@/components/my-componets/my-page.vue"
import myselect from "@/components/my-componets/my-select.vue"

export default {
  components: {
    'my-image-upload': myImageUpload,
    'my-select': myselect
  },
  data() {
    return {
      loading: false,
      userName: '',
      password: '',
      phoneNo: '',
      smsCode: '',
      showPassword: false, //是否显示明文
      loginWay: 1, //1: 账密，2：验证码
      smsCountDown: 0,
      smsCountInterval: null,
      toggleDelay: false,
      version: ''
    };
  },
  onLoad: function () {
    debugger
    // #ifdef APP-PLUS
    var that = this
    plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
      that.version = wgtinfo.version
    });
    // #endif
  },
  methods: {
    ...mapActions(["mLogin", "PhoneLogin"]),

    onLogin: function () {
      if (!this.userName || this.userName.length != 11) {
        this.$tip.toast('请填写正确的手机号码');
        return;
      }
      if (!this.password || this.password.length <6) {
        this.$tip.toast('请填写不小于6位数密码');
        return;
      }
      let userInfo = {
        username: this.userName,
        password: this.password
      }
      this.loading = true;
	  var that=this;
      this.mLogin(userInfo).then((res) => {
        console.log("mLogin", res)
        debugger
        this.loading = false;
        if (res.data.msg=='登录成功') {
          this.$tip.success('绑定成功!').then(res=>{
			  that.$Router.back(1);//返回来源页
		  })
          // this.$Router.replaceAll({name: 'index'})
          /* uni.reLaunch({
           url: '/pages/index/index'
           }); */
        } else {
          this.$tip.alert(res.data.msg);
        }
      }).catch((err) => {
        let msg = err.data.message || "请求出现错误，请稍后再试"
        this.$tip.alert(msg);
      }).finally(() => {
        this.loading = false;
      })
    }
  }
}
</script>

<style>
page{background-color: #FFFFFF}
.login-paddingtop {
  padding-top: 20upx;
}

.zai-box {
  padding: 0 20upx;
  padding-top: 100upx;
  position: relative;
}

.zai-logo {
  /*width: 200upx;*/
  /*height: 300upx;*/
  width: 128upx!important;
  height: 128upx !important;
  margin: 140upx 0 20upx;
}

.zai-title {
  font-size: 48upx;
  color: #000000;
  text-align: center;
  margin-bottom: 160upx;
}

.input-placeholder, .zai-input {
  /*color: #94afce;*/
  color: #aaaaaa;
}

.zai-label {
  padding: 60upx 0;
  text-align: center;
  font-size: 30upx;
  color: #a7b6d0;
}

.zai-btn {
  background: #ff65a3;
  color: #fff;
  border: 0;
  border-radius: 100upx;
  font-size: 36upx;
}

.zai-btn:after {
  border: 0;
}

/*按钮点击效果*/
.zai-btn.button-hover {
  transform: translate(1upx, 1upx);
}

.cu-btn.lg {
  margin-top: 100upx;
}

.username, .password {
  margin-left: 30upx;
  margin-right: 30upx;
}
.cu-form-group{
  min-height: 80rpx!important;
}
</style>
