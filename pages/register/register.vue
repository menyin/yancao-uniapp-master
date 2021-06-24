<template>
	<view>
    <form>
<view>
  <view class="wellcome text-lg text-pink text-center"><text class="cuIcon-weblock padding-right-sm"></text>欢迎加入我们，成为597一份子</view>
  <view class="text-gray text-center padding-sm">填写常用手机号码，注册并绑定新账号</view>
</view>
      <view class="padding-left-lg padding-right-lg">
        <view class="cu-item cu-form-group">
          <view class="title">手机号码</view>
          <input placeholder="输入手机号码" name="input" v-model="mobile"/>
          <view class="cu-capsule radius">
            <view class='cu-tag bg-pink'>
              +86
            </view>
            <view class="cu-tag line-pink">
              中国大陆
            </view>
          </view>
        </view>
        <view class="cu-item cu-form-group">
          <view class="title">图形验证码</view>
          <input placeholder="点击刷新验证码" name="input" v-model="imgcode"></input>
          <view class='shadow' @click="getImgCode">
<!--            <image class="img-code" src="https://api.597.com/web/authCode.api?key=mPerMobile&facilityId=9WMMHOH74VWGSII4KN"></image>-->
            <image class="img-code" :src="imgUrl"></image>
          </view>
        </view>
        <view class="cu-item cu-form-group">
          <view class="title">手机验证码</view>
          <input placeholder="输入手机验证码" name="input" v-model="mobileZym"></input>
          <button class='cu-btn bg-pink shadow' :disabled="sendCodeTitle.indexOf('s')!=-1" @click="getCode">{{ sendCodeTitle }}</button>
        </view>
        <view class="cu-item cu-form-group solid-bottom">
          <view class="title">密码</view>
          <input placeholder="请输入密码" type="password" name="input" v-model="password"></input>
        </view>
      </view>

      <view class="padding flex flex-direction padding-top-xl">
        <button class="cu-btn bg-red margin-tb-sm lg margin-top-xl" @click="formReg">注册并绑定</button>
        <view class="text-pink text-left" @click="$Router.replace({name:'login'})">绑定已有账号</view>
      </view>

    </form>

  </view>
</template>

<script>
// import {apiUrl} from '@/common/service/config.service.js'
import configService from '@/common/service/config.service.js'
import {http} from "@/common/service/service";
import {mapActions} from "vuex"


	export default {
		data() {
			return {
        imgUrl:'',
        mobile:'',
        imgcode:'',
        mobileZym:'',
        facilityId:'',
        sendCodeTitle:'获取验证码',
        password:'',
        chars: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

      }
		},
    onLoad(){
		  this.getImgCode();
    },
		methods: {
      ...mapActions(["registerBind"]),
      //获取图片验证码
      getImgCode(){
        debugger
        //生成随机码
        var facilityId = this.generateMixed(18);
        var url = configService.apiUrl+ '/web/authCode.api?key=mPerMobile&facilityId=' + facilityId;
        // this.setData({
        //   imgUrl: url,
        //   facilityId: facilityId
        // });
        this.imgUrl=url;
        this.facilityId=facilityId;

        //随机码

      },
      //获取图片验证码随机数
      generateMixed(n){
          var res = "";
          for (var i = 0; i < n; i++) {
            var id = Math.ceil(Math.random() * 35);
            res += this.chars[id];
          }
          return res;
      },
      //获取手机验证码
      getCode: function (e) {
        var that = this;
        // var mobile = e.target.dataset.mobile;
        // var imgcode = e.target.dataset.imgcode;
        console.log(e);
        if (!that.mobile || that.mobile.length != 11) {
          uni.showToast({ title: '手机号错误'});
          return;
        }
        if (!that.imgcode || that.imgcode.length != 4) {
          wx.showToast({ title: '验证码错误'});
          return;
        }

        var url ='/web/user.api';
        var data = {
          act: 'authCode',
          mtxtMobile: that.mobile,
          key: 'mPerMobile',
          inputCode: that.imgcode,
          facilityId: that.facilityId
        };
        debugger
        var func = function (res) {
          var data = res.data;
          if (data.status <= 0) {//获取失败
            uni.showToast({ title: data.msg});
            that.getImgCode();
            return;
          }
          uni.showToast({ title: "验证码已发送！"});
          //获取成功 再次获取倒计时
          var phoneTime = 180;
          var inta = setInterval(function () {
            console.log(phoneTime);
            if (phoneTime <= 0) {
              that.sendCodeTitle='再次获取验证码';
              // that.setData({ sendCodeTitle: '再次获取验证码', sendCodeFlag: false });

              clearInterval(inta);
            } else {
              that.sendCodeTitle=phoneTime + 's';
              // that.setData({ sendCodeTitle: phoneTime + 's', sendCodeFlag: true });
            }
            phoneTime--;
          }, 1000);
        }
        // util.isPost(data, url, func);
        http.post(url,data).then(func);
      },
      //提交注册
      formReg: function (e) {
        var that = this;
        // var mobile = e.detail.value.mobile;//手机号码
        // var mobileZym = e.detail.value.mobileZym;//验证码
        // var password = e.detail.value.password;//密码

        if (!that.mobile || that.mobile.length != 11) {
          uni.showToast({ title: '请填写正确的手机号码'});
          return;
        }
        if (that.mobileZym.length <= 0) {
          wx.showToast({ title: '请填写正确的验证码'});
          return;
        }
        if (that.password.length < 6) {
          wx.showToast({ title: '密码不能小于6位数'});
          return;
        }

        var url = '/web/person.api';
        var data = {
          // fromWx: getApp().data.fromWx,
          fromWx: '597597597', //写死固定值'597597597',
          act: 'register_m',
          wxuid: that.$store.getters.unionId||'',
          xcxOpenid: that.$store.getters.openid||'',
          hidThirdLoginType: 'wechat',
          txtMobile: that.mobile,
          txtMobileCode: that.mobileZym,
          txtPwd: that.password,
          appType: 6,
          hidThirdName: that.wxUserInfo&&that.wxUserInfo.nickName ? that.wxUserInfo.nickName : '',
          source: 50,
          cookieTime: 86400
        };
       this.registerBind(data).then(res=>{
         // this.setData({isBindShow:false});
         //获取简历信息
         // getApp().getResumeRow(res.data.status, res.data.SESSIONKEY);//TODO
         debugger
          if(res.data.status>0){
              uni.showToast({ title: '注册成功',success:()=>{
                that.$Router.back(1);
              }});
            // setTimeout(function () {
            //       // wx.switchTab({
            //       //   url: '/page/person/index/index'
            //       // })
            //       // wx.navigateBack();
            //
            //     }
            //     , 1000);
          }else{
            uni.showToast({ title: res.data.msg||'注册失败'});
          }


       });
      }
    }
	}
</script>

<style>
page{background-color: #FFFFFF;}
.wellcome{
  padding-top:100px;
  padding-bottom:100px;
}
.img-code{
  /*width:150rpx;*/
  width:198rpx;
  height:60rpx;
}
</style>
