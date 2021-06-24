<template>
  <view class="context flex align-center justify-center ">
    <view>
      <view class="animation-slide-bottom" style="text-align: center;" :style="[{animation: 'show ' + 0.1+ 's 1'}]">
        <image src="/static/login3.png" mode='aspectFit' class="zai-logo"></image>
        <view class="zai-title ">请选择登录方式</view>
      </view>
      <view class="padding flex flex-direction" :style="[{animation: 'show ' + 0.1+ 's 1'}]">
<!--        <button class="cu-btn bg-green lg"  open-type="getPhoneNumber" bindgetphonenumber="getWxPhone">微信账号快速登录</button>-->
        <button class="cu-btn bg-green lg"  open-type="getPhoneNumber" @getphonenumber="getWxPhone">微信账号快速登录</button>
        <button class="cu-btn bg-orange margin-tb-sm lg" @click="$Router.replace({name:'login'})">手机登录或注册</button>
      </view>
    </view>
  </view>
</template>

<script>
import {http} from "@/common/service/service";

export default {
  components: {
  },
  data() {
    return {

    };
  },
  onLoad: function () {

  },
  methods: {
    //获取微信绑定的手机号码
    getWxPhone:function(e){
      debugger
      var that = this;
      var userInfo=that.$store.getters.userInfo;
      if (!userInfo.wxSessionKey){
        uni.showToast({
          title: '获取失败，请用手机注册或登录'
        })
      }
      uni.checkSession({
        success:function(res){
          console.log("success");
          debugger
          http.get('/wechat/xcx.api',{params:{//拿着这些信息，后端回去微信接口拿手机号
              session_id: userInfo.wxSessionKey,
              wxuid: userInfo.unionId,
              xcxOpenid: userInfo.openid,
              encryptedData: e.detail.encryptedData,
              iv: e.detail.iv,
            }}).then(res1=>{
            // SESSIONKEY: "uu532ghnmsi0fd468h192qk3ka"
            // msg: "success"
            // phone: "13960392037"
            // status: 1
            // token: "16dd5a6ax3XOwyHMyg+OVQau5kR7RNJkXLPNkPyQeSgS+LjRweQAjGNm7KbogRYDY3fTW04"
            // uid: "1346721"
              debugger
            console.log(res1);
            if (res1.data.status==1){
              var uid = res1.data.uid;
              var phone = res1.data.phone;
              // uid='';//cny用于测试未注册场景
              if (phone && !uid){
                wx.showModal({
                  title: '该手机号码未注册',
                  content: '马上去注册...',
                  success: function (res) {
                    if (res.confirm) {
                      // wx.navigateTo({ url: '/page/miLogin/miLogin?phone=' + phone });
                      that.$Router.push({name:'register',params:{phone:phone}});//TODO
                    }
                  }
                })
                return;
              }

              var token = res1.data.token;
              var SESSIONKEY = res1.data.SESSIONKEY;
              var userInfo=that.$store.getters.userInfo;
              userInfo.uid=uid;
              userInfo.token=token;
              userInfo.SESSIONKEY=SESSIONKEY;
              //把SESSIONKEY存入storage
              uni.setStorage({
                key: 'userInfo',
                data: userInfo
              })

              //获取简历
              // getApp().getResumeRow(uid, SESSIONKEY);//TODO
              // that.onShow();//cny逻辑更改
			  that.$tip.success('绑定成功!').then(res=>{
			  		that.$Router.back(1);//返回来源页
			  })
            }
          });
        },
        fail:function(res){
          uni.showToast({
            title: '获取失败，请用手机注册或登录'
          })
        }
      })
    }
  }
}
</script>

<style>
page,.context{height: 100%;}
.zai-logo {
  /*width: 200upx;*/
  /*height: 300upx;*/
  width: 128upx!important;
  height: 128upx !important;
  margin: 140upx 0 20upx;
}

.zai-title {
  font-size: 36upx;
  /*color: #000000;*/
  color: #333333;
  text-align: center;
  margin-bottom: 160upx;
}
</style>
