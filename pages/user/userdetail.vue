<template>
	<view>
		<scroll-view scroll-y class="page ">
      <cu-custom bgColor="bg-white"  :isBack="true" >
        <block slot="backText">返回</block>
        <block slot="content">设置</block>
<!--        <view slot="right"  @tap="rightClick">编辑</view>-->
      </cu-custom>

			<!-- list列表 -->
        <view class="cu-list menu ">
          <view class="cu-item animation-slide-bottom" :style="[{animationDelay: '0.1s'}]">
            <view class="content">
              <text class="text-grey">账号与安全</text>
            </view>
            <view class="action">
              <text class="cuIcon-right text-gray"></text>
            </view>
          </view>
        </view>
        <view class="cu-list menu">

          <view class="cu-item animation-slide-bottom" :style="[{animationDelay: '0.2s'}]">
            <view class="content">
              <text class="text-grey">消息提醒</text>
            </view>
            <view class="action">
              <text class="cuIcon-right text-gray"></text>
            </view>
          </view>
          <view class="cu-item animation-slide-bottom" :style="[{animationDelay: '0.3s'}]">
            <view class="content">
              <text class="text-grey">打招呼设置</text>
            </view>
            <view class="action">
              <text class="cuIcon-right text-gray"></text>
            </view>
          </view>
        </view>

        <view class="cu-list menu">
          <view class="cu-item animation-slide-bottom" :style="[{animationDelay: '0.4s'}]">
            <view class="content">
              <text class="text-grey">关于我们</text>
            </view>
            <view class="action">
              <text class="cuIcon-right text-gray"></text>
            </view>
          </view>
          <view class="cu-item animation-slide-bottom" :style="[{animationDelay: '0.5s'}]">
            <view class="content">
              <text class="text-grey">清除缓存</text>
            </view>
            <view class="action">
              <text class="cuIcon-right text-gray"></text>
            </view>
          </view>
          <view class="cu-item animation-slide-bottom" :style="[{animationDelay: '0.5s'}]">
            <view class="content">
              <text class="text-grey">给597评价</text>
            </view>
            <view class="action">
              <text class="cuIcon-right text-gray"></text>
            </view>
          </view>

        </view>
        <view class="cu-list menu">
          <view class="cu-item animation-slide-bottom" :style="[{animationDelay: '0.5s'}]">
            <view class="content">
              <text class="text-grey">意见反馈</text>
            </view>
            <view class="action">
              <text class="cuIcon-right text-gray"></text>
            </view>
          </view>
          <view class="cu-item animation-slide-bottom" :style="[{animationDelay: '0.5s'}]">
            <view class="content">
              <text class="text-grey">检查更新</text>
            </view>
            <view class="action">
              <text class="cuIcon-right text-gray"></text>
            </view>
          </view>
        </view>
        <view class="cu-list menu" @click="logout">
          <view class="cu-item animation-slide-bottom" :style="[{animationDelay: '0.5s'}]">
            <view class="content text-center">
              <text class="text-grey">退出登录</text>
            </view>
          </view>
        </view>


			


		</scroll-view>
	</view>
</template>

<script>
	import api from '@/api/api.js'
  import uniNavBar from '@/components/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
	export default {
    components: {
      uniNavBar
    },
		data() {
			return {
				 personalMsg:{
					avatar:'',
					realname:'',
					username:'',
					sex:1,
					birthday:new Date(),
					orgCode:'',
					workNo:'',
					status:1,
					phone:'',
					telephone:'',
					email:'',
					post:'',
					departIds:'',
					identity:'',
				},
				userUrl:'/sys/user/queryById',
				positionUrl:'/sys/position/list',
				departUrl:'/sys/user/userDepartList'
			};
		},
		onLoad() {
			this.loadinfo()
		},
		methods: {
      logout(){
		  var that=this;
        uni.showModal({
          content:'确定退出吗？',
		  // confirmColor:
          success(res) {
            uni.navigateTo({url:'/pages/login/login'});

            debugger;
            // if (res.confirm) {
            //   api.logout().then(res=>{
            //     uni.clearStorageSync();
            //     uni.navigateTo({url:'/pages/login/login'});
            //   });
            // }
          }
        })
      },
			getSubStringText(text,len){
				if(!text || text.length==0){
					return ''
				}
				if(text.length<len){
					return text;
				}
				return text.substr(0,len)+"..."
			},
			rightClick(){
				this.$Router.push({name:'useredit', params:this.personalMsg})
				/* uni.navigateTo({
				    url: '/pages/user/useredit?item='+item
				}); */
			},
			loadinfo(){
				this.$http.get(this.userUrl,{params:{id:this.$store.getters.userid}}).then(res=> {
					console.log("用户",res)
					if (res.data.success) {
						let result = res.data.result
						if(result.avatar&&result.avatar.length >0)
						this.personalMsg.avatar = api.getFileAccessHttpUrl(result.avatar)
						this.personalMsg.realname = result.realname
						this.personalMsg.username= result.username
						this.personalMsg.post = result.post
						this.personalMsg.sex = result.sex===1?'男':'女'
						this.personalMsg.birthday = result.birthday== null?'无':result.birthday
						this.personalMsg.departIds= result.departIds
						this.personalMsg.workNo= result.workNo
						this.personalMsg.phone= result.phone
						this.personalMsg.telephone= result.telephone== null?'无':result.telephone
						this.personalMsg.email= result.email
						this.personalMsg.post= result.post
						this.personalMsg.identity= result.identity=== 1?'普通成员':'上级'
						this.personalMsg.status= result.status === 1?'正常':'冻结'
						this.personalMsg.orgCode= result.orgCode
					}
				}).catch(e=>{
					console.log("请求错误",e)
				})
				
				this.$http.get(this.departUrl,{params:{userId:this.$store.getters.userid}}).then(res=> {
					if (res.success) {
						for (let item of res.result){
							this.personalMsg.orgCode = item.title
							this.personalMsg.departIds = item.title
						}
					}
				}).catch(e=>{
					console.log("请求错误",e)
				})
				
				this.$http.get(this.positionUrl).then(res=> {
					if (res.success) {
						let postArr = res.result.records
						for (let item of postArr ){
							if (this.personalMsg.post == item.code){
								this.personalMsg.post = item.name
							}
						}
					}
				}).catch(e=>{
					console.log("请求错误",e)
				})
			},
		}
	}
</script>

<style>
	.page {
		height: 100Vh;
		width: 100vw;
	}

	.page.show {
		overflow: hidden;
	}

	.switch-sex::after {
		content: "\e716";
	}

	.switch-sex::before {
		content: "\e7a9";
	}

	.switch-music::after {
		content: "\e66a";
	}

	.switch-music::before {
		content: "\e6db";
	}

  .cu-list{
    margin-top:4px;
  }
</style>
