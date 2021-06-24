<script>
import Vue from 'vue'
import appUpdate from 'common/util/appUpdate.js'

export default {
  onLaunch: function (tempBase) {
    // #ifdef MP-WEIXIN
    this.$store.commit('SET_TEMPBASE', tempBase);//存储来源场景
    // #endif

    uni.getSystemInfo({
      success: function (e) {

        // #ifdef APP-PLUS
        // 检测升级
        appUpdate()
        // #endif
        // #ifndef MP
        Vue.prototype.StatusBar = e.statusBarHeight;
        if (e.platform == 'android') {
          Vue.prototype.CustomBar = e.statusBarHeight + 50;
        } else {
          Vue.prototype.CustomBar = e.statusBarHeight + 45;
        }
        ;
        // #endif
        // #ifdef MP-WEIXIN
        Vue.prototype.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        Vue.prototype.Custom = custom;
        Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
        // #endif

        // #ifdef MP-ALIPAY
        Vue.prototype.StatusBar = e.statusBarHeight;
        Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
        // #endif

        // #ifdef APP-PLUS
        //Vue.prototype.$api.listenTranMsg()
        // 		var info = plus.push.getClientInfo();

        // 		/* 5+  push 消息推送 ps:使用:H5+的方式监听，实现推送*/
        // 		plus.push.addEventListener("click", function(msg) {
        // 			console.log("click:" + JSON.stringify(msg));
        // 			console.log(msg.payload);
        // 			console.log(JSON.stringify(msg));
        // 			//这里可以写跳转业务代码
        // 		}, false);
        // 		// 监听在线消息事件
        // 		plus.push.addEventListener("receive", function(msg) {
        // 			// plus.ui.alert(2);
        // 			//这里可以写跳转业务代码
        // 			console.log("recevice:" + JSON.stringify(msg))
        // 		}, false);
        // #endif

        //Vue.prototype.$api.initLogin()

      }
    })

    Vue.prototype.ColorList = [
        {
      title: '嫣红',
      name: 'red',
      color: '#e54d42'
    },
      {
        title: '桔橙',
        name: 'orange',
        color: '#f37b1d'
      },
      {
        title: '明黄',
        name: 'yellow',
        color: '#fbbd08'
      },
      {
        title: '橄榄',
        name: 'olive',
        color: '#8dc63f'
      },
      {
        title: '森绿',
        name: 'green',
        color: '#39b54a'
      },
      {
        title: '天青',
        name: 'cyan',
        color: '#1cbbb4'
      },
      {
        title: '海蓝',
        name: 'blue',
        color: '#0081ff'
      },
      {
        title: '姹紫',
        name: 'purple',
        color: '#6739b6'
      },
      {
        title: '木槿',
        name: 'mauve',
        color: '#9c26b0'
      },
      {
        title: '桃粉',
        name: 'pink',
        color: '#e03997'
      },
      {
        title: '棕褐',
        name: 'brown',
        color: '#a5673f'
      },
      {
        title: '玄灰',
        name: 'grey',
        color: '#8799a3'
      },
      {
        title: '草灰',
        name: 'gray',
        color: '#aaaaaa'
      },
      {
        title: '墨黑',
        name: 'black',
        color: '#333333'
      },
      {
        title: '雅白',
        name: 'white',
        color: '#ffffff'
      },
    ]

    // this.getUnionID(); //获取用户UnionID
    this.$store.dispatch('getUnionID').then(resp=>{
      console.log(resp);
    });
    //微信场景传递区域参数，由此变更区域
    var cityId = tempBase.cityId;//城市id
    var cityName = tempBase.cityName;//城市id
    var localCity = cityId && cityName ? {'id': cityId, 'name': cityName} : null;
    /* this.$store.dispatch('changeRegion', localCity).then(function (res) {
      if (res.status != 2) {//本地缓存的区域和新定位区域不一致才提示
        uni.showToast({title: res.msg});
      }
    }, function (res) {
      uni.showToast({title: res.msg});
    }); */


  },
  //获取用户UnionID

  onShow: function (tempBase) {
    console.log('App Show')
  },

  onHide: function () {
    console.log('App Hide')
  },
  onTabItemTap(){
    console.log(456789);
  },
  methods: {

  }


}
</script>

<style>
@import "plugin/colorui/main.css";
@import "plugin/colorui/icon.css";
@import "plugin/colorui/animation.css";

.nav-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0px 40 upx 0px;
  justify-content: space-between;
}

.nav-li {
  padding: 30 upx;
  border-radius: 12 upx;
  width: 45%;
  margin: 0 2.5% 40 upx;
  background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358352-assets/web-upload/cc3b1807-c684-4b83-8f80-80e5b8a6b975.png);
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 1;
}

.nav-li::after {
  content: "";
  position: absolute;
  z-index: -1;
  background-color: inherit;
  width: 100%;
  height: 100%;
  left: 0;
  bottom: -10%;
  border-radius: 10 upx;
  opacity: 0.2;
  transform: scale(0.9, 0.9);
}

.nav-li.cur {
  color: #fff;
  background: rgb(94, 185, 94);
  box-shadow: 4 upx 4 upx 6 upx rgba(94, 185, 94, 0.4);
}

.nav-title {
  font-size: 32 upx;
  font-weight: 300;
}

.nav-title::first-letter {
  font-size: 40 upx;
  margin-right: 4 upx;
}

.nav-name {
  font-size: 28 upx;
  text-transform: Capitalize;
  margin-top: 20 upx;
  position: relative;
}

.nav-name::before {
  content: "";
  position: absolute;
  display: block;
  width: 40 upx;
  height: 6 upx;
  background: #fff;
  bottom: 0;
  right: 0;
  opacity: 0.5;
}

.nav-name::after {
  content: "";
  position: absolute;
  display: block;
  width: 100 upx;
  height: 1px;
  background: #fff;
  bottom: 0;
  right: 40 upx;
  opacity: 0.3;
}

.nav-name::first-letter {
  font-weight: bold;
  font-size: 36 upx;
  margin-right: 1px;
}

.nav-li text {
  position: absolute;
  right: 30 upx;
  top: 30 upx;
  font-size: 52 upx;
  width: 60 upx;
  height: 60 upx;
  text-align: center;
  line-height: 60 upx;
}

.text-light {
  font-weight: 300;
}

@keyframes show {
  0% {
    transform: translateY(-50px);
  }

  60% {
    transform: translateY(40 upx);
  }

  100% {
    transform: translateY(0px);
  }
}

@-webkit-keyframes show {
  0% {
    transform: translateY(-50px);
  }

  60% {
    transform: translateY(40 upx);
  }

  100% {
    transform: translateY(0px);
  }
}
</style>
