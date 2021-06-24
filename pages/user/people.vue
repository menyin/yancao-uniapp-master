<template>
	<view>
		<scroll-view scroll-y class="page">
			  <!-- 头部logo-->
		  <view class="UCenter-bg" @click="remove">
		    <image :src="resumeRow.attachment" round class="photo png animation-slide-bottom margin-bottom-sm" mode=" aspectFill" :style="[{animationDelay: '0.1s'}]"></image>
		    <view class="text-sm animation-slide-bottom" :style="[{animationDelay: '0.1s'}]">
          有缘千里来相会,来597直聘找我吧！
		    </view>
		    <image src="/static/wave.gif" mode="scaleToFill" class="gif-wave"></image>
		  </view>

		  <view class="padding flex text-center text-grey bg-white shadow-warp">
		    <view class="flex flex-sub flex-direction solid-right animation-slide-bottom" :style="[{animationDelay: '0.1s'}]">

<!--		      <view class="text-xl text-orange">{{personalList.username}}</view>
			    <view class="margin-top-sm"><text class="cuIcon-people padding-right-sm"></text> 张三丰</view>-->
          <view class="text-xl text-black">{{resumeRow.baseData.name}} <!--张三丰--></view>
          <view class="margin-top-sm">{{resumeRow.baseData._jobState}}  <!--离职-随时到岗--></view>
		    </view>
		    
		    <view class="flex flex-sub flex-direction animation-slide-bottom" :style="[{animationDelay: '0.2s'}]">
		      <view class="text-xl ">简历完成</view>
		      <view class="margin-top-sm text-green">{{resumeRow.resumePrecent}} <!--90%--></view>
		    </view>
		  </view>


      <view class="cu-list grid no-border col-4" :style="[{animationDelay: '0.3s'}]">
        <view class="cu-item animation-slide-bottom">
          <view class="text-gray">
            {{ userStatists.visitJobCount }}
          </view>
          <text class="text-grey">浏览</text>
        </view>
      <view class="cu-item animation-slide-bottom">
        <view class="text-gray">
          {{ userStatists.collectCount }}

        </view>
        <text class="text-grey">收藏</text>
        </view>
      <view class="cu-item animation-slide-bottom">
        <view class="text-gray">
          {{ userStatists.chatCount }}

        </view>
        <text class="text-grey">沟通</text>
        </view>
      <view class="cu-item animation-slide-bottom">
        <view class="text-gray">
          {{ userStatists.joinCount }}

        </view>
        <text class="text-grey">已投简历</text>
        </view>
      <view class="cu-item animation-slide-bottom">
        <view class="text-gray">
          {{ userStatists.visitCount }}

        </view>
        <text class="text-grey">看过我</text>
        </view>
      <view class="cu-item animation-slide-bottom">
        <view class="text-gray">
          {{ userStatists.comCollectCount }}

        </view>
        <text class="text-grey">被收藏</text>
        </view>
      <view class="cu-item animation-slide-bottom">
        <view class="text-gray">
          {{ userStatists.downloadCount }}

        </view>
        <text class="text-grey">被下载</text>
        </view>
        <view class="cu-item animation-slide-bottom">
          <view class="text-gray">
            {{ userStatists.inviteCount }}

          </view>
          <text class="text-grey">面试</text>
        </view>
      </view>
		  <!-- 列表list-->
		  <view class="cu-list menu  margin-top-xl margin-bottom-xl shadow-lg padding-right-sm padding-left-sm">
		    <view class="cu-item arrow animation-slide-bottom" :style="[{animationDelay: '0.4s'}]">
		      <view class="content" >
		        <text class="cuIcon-friendfamous text-yellow"></text>
		        <text class="text-grey">隐私设置</text>
		      </view>
          <view class="action">
           <text class="text-gray">简历保密</text>
          </view>
		    </view>
		    <view class="cu-item arrow animation-slide-bottom" :style="[{animationDelay: '0.5s'}]">
		      <view class="content">
		        <text class="cuIcon-refresh text-red"></text>
		        <text class="text-grey">刷新简历</text>
		      </view>
		    </view>
        <view class="cu-item arrow animation-slide-bottom" :style="[{animationDelay: '0.6s'}]">
		      <view class="content">
		        <text class="cuIcon-favor text-red"></text>
		        <text class="text-grey">关注的公司</text>
		      </view>
		    </view>
		    <view class="cu-item arrow animation-slide-bottom" :style="[{animationDelay: '0.7s'}]">
				<navigator class="content" url="/pages/user/userdetail" hover-class="none">
				    <text class="cuIcon-settings text-cyan"></text>
					<text class="text-grey">设置</text>
				</navigator>
		    </view>
<!--			<view class="cu-item arrow animation-slide-bottom" :style="[{animationDelay: '0.7s'}]">-->
<!--				<navigator class="content" url="/pages/user/userexit" hover-class="none">-->
<!--				    <text class="cuIcon-exit text-cyan"></text>-->
<!--					<text class="text-grey">退出</text>-->
<!--				</navigator>-->
<!--			</view>-->
		  </view>
		<navigator url="tell:13960392011" style="margin-top:-18px;" ><view class="text-pink text-center"><text class="padding-right-sm">客服电话</text>400-8108-597</view></navigator>
		<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	import api from '@/api/api'
  import {mapActions} from "vuex"

  export default {
		name: "people",
		data() {
			return {
        resumeRow:null,
        personalList:{
				  avatar:'',
				  realname:'',
				  username:'',
				  post:''
				},
        userStatists: {
            "inviteCount": "999",//被面试邀请数量
            "visitCount": "999",//被浏览数量
            "joinCount": "999",//投递数量
            "collectCount": "999",//收藏数量
            "comCollectCount": "999",//被收藏数量
            "visitJobCount": "999",//浏览职位数量
            "chatCount": "999",//聊天数量
            "downloadCount": "999"//被下载数量
        },
        positionUrl:'/sys/position/list',
        departUrl:'/sys/user/userDepartList',
        userStatistsUrl:'/web/mi.api?act=getApplyManage',//token统一添加
        userUrl:'',//token统一添加
        userId:'',
        id:''
			};
		},
		onShow(){
		  this.load();
      var that=this;
		  this.getResumeRow().then(resumeRow=>{
        that.resumeRow=resumeRow;
      });
    },
    onTabItemTap(){
		  console.log(987654);
    },
		methods: {
      ...mapActions(["getResumeRow"]),
			remove(){
				 uni.removeStorageSync('Access-Token')
			},
			load(){
			  debugger
				this.$http.post(this.userStatistsUrl).then(res=>{
          // {
          //   "status": 1,
          //     "data": {
          //       "inviteCount": "9",//被面试邀请数量
          //       "visitCount": "193",//被浏览数量
          //       "joinCount": "22",//投递数量
          //       "collectCount": "2",//收藏数量
          //       "comCollectCount": "1",//被收藏数量
          //       "visitJobCount": "314",//浏览职位数量
          //       "chatCount": "3",//聊天数量
          //       "downloadCount": "1"//被下载数量
          //    }
          // }
          debugger
					 if (res.data.status>0) {
						this.userStatists =res.data.data;
           }
				}).catch(err => {
					console.log(err);
				});
				// this.$http.get(this.userUrl).then(res=>{
        //   // {
        //   //   "status": 1,
        //   //     "data": {
        //   //       "inviteCount": "9",//被面试邀请数量
        //   //       "visitCount": "193",//被浏览数量
        //   //       "joinCount": "22",//投递数量
        //   //       "collectCount": "2",//收藏数量
        //   //       "comCollectCount": "1",//被收藏数量
        //   //       "visitJobCount": "314",//浏览职位数量
        //   //       "chatCount": "3",//聊天数量
        //   //       "downloadCount": "1"//被下载数量
        //   //    }
        //   // }
				// 	 if (res.data.status>0) {
				// 		let perArr = res.data.result
				//         let avatar=(perArr.avatar && perArr.avatar.length > 0)? api.getFileAccessHttpUrl(perArr.avatar):'/static/avatar_boy.png'
				// 		this.personalList.avatar =avatar
				// 		this.personalList.realname = perArr.realname
				// 		this.personalList.username = perArr.username
				// 		this.personalList.post = perArr.post
				// 		this.personalList.depart = perArr.departIds
				// 	}
				// }).catch(err => {
				// 	console.log(err);
				// });
				
			}		
		}
	}
</script>

<style>
.UCenter-bg {
  /*background-image: url(/static/index.jpg);*/
  background-color:rgba(255, 77, 77,0.2);
  background-size: cover;
  height: 300rpx;
  display: flex;
  justify-content: center;
  padding-top: 40rpx;
  overflow: hidden;
  position: relative;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-weight: 300;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}

.UCenter-bg text {
  opacity: 0.8;
}

.UCenter-bg image {
  width: 160rpx;
  height: 160rpx;
}

.UCenter-bg .gif-wave{
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 99;
  mix-blend-mode: screen;  
  height: 100rpx;   
}

map,.mapBox{
  left: 0;
  z-index: 99;
  mix-blend-mode: screen;  
  height: 100rpx;   
}

map,.mapBox{
  width: 750rpx;
  height: 300rpx;
}
.photo{
  width: 160rpx;
  height: 160rpx;
}
</style>
