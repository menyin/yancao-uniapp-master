<template name="home">
  <view class="content">
    <!--    <scroll-view enable-flex="true">-->
    <!--      <view class="animation-fade" :style="[{animationDelay: '0.1s'}]">-->
    <!-- 轮播 -->

    <!--      <view>当前城市：{{region.localCity.name}}，编号：{{region.localCity.id}}</view>-->
    <view class="sticky-box2" :style="[{paddingTop:StatusBar+'px'}]">
      <!--          :style="[{height:(pageScrollTop%187)*100/187+'rpx'}]"-->
      <view class="search-box">
        <uni-nav-bar class=""  backgroundColor="rgba(0,0,0,0)">
          <view class="scan" @click="sanCode" slot="left">
            <uni-icons type="scan" size="18"></uni-icons>
          </view>
          <input class="search-input" v-model="serachParms.keyword" type="text" placeholder="请输入职位/公司"/>
        </uni-nav-bar>
      </view>
      <view class="nav-ctrl-flexbox">
        <view class="nav-ctrl-scroller">
          <view class="page">
            <scroll-search-tag @tabSelect="tagSel"></scroll-search-tag>
          </view>
        </view>
        <view class="nav-editer cu-item justify-center">
          <uni-icons type="compose" size="14" class="compose"></uni-icons>
          <text class="txt">编辑</text>
        </view>

      </view>
      <view class="bg-white solid-bottom padding-sm flex flex-wrap justify-between">
        <view class="condition0">
          <conditions0 @onConditionsSelect="onConditionsTabTap0"></conditions0>
        </view>
        <view class="condition1">
          <conditions1 @onConditionsSelect="onConditionsTabTap1"></conditions1>
        </view>

      </view>
    </view>

    <!--      </view>-->
    <view class="padding-sm main-content">
      <view class="cu-load loading text-pink" v-show="!searchData||!searchData.list||!searchData.list.length"></view>
      <company-card :companys="searchData.list"></company-card>
    </view>
    <view class="cu-load text-pink" :class="!isLoad?'loading':''"></view>

    <!--      <view class="job-list" v-for="(job,index) in jobList">
            <job-cart :jname="job.jname" :jobSalary="job.jobSalary" :jobArea="job.jobArea" :jobWorkYear="job.jobWorkYear"
                      :jobDegree="job.jobDegree" :rewardStr="job.rewardStr" :urgency="job.urgency" :isNewJob="job.isNewJob"
                      :logoUrl="job.logoUrl"
                      :comUser="job.comUser" :cname="job.cname" :updateTime="job.updateTime">
            </job-cart>
          </view>-->

    <!--    </scroll-view>-->
  </view>
</template>

<script>
import { mapActions,mapGetters } from "vuex"
import {us,os} from '@/common/util/work.js'


import uniNavBar from '@/components/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
import uniSegmentedControl
  from '@/components/uni-segmented-control_1.0.4/components/uni-segmented-control/uni-segmented-control.vue'
import uniIcons from '@/components/uni-icons_1.1.4/components/uni-icons/uni-icons.vue'
import scrollHorizontalTab  from '@/components/scroll-horizontal-tab_1.0.0/components/scroll-horizontal-tab/scroll-horizontal-tab.vue';
import searchCondition1 from '@/components/search-condition1/componets/search-condition1/search-condition1.vue'
import companyCard from '@/components/company-card/componets/company-card/company-card.vue'
import scrollSearchTag from '@/components/scroll-search-tag/componets/scroll-search-tag/scroll-search-tag.vue'
import conditions0 from '@/components/conditions0/componets/conditions0/conditions0.vue'
import conditions1 from '@/components/conditions1/componets/conditions1/conditions1.vue'

export default {
  name: 'home',
  props: {
    cur: String,
  },
  components: {
    conditions0,
    conditions1,
    scrollSearchTag,
    uniNavBar,
    uniSegmentedControl,
    uniIcons,
    scrollHorizontalTab,
    companyCard,
    searchCondition1
  },
  onLaunch(e) {
  },
  onLoad(){
    console.log('onShow')
    this.initMenu();
    this.changeRegion();
    this.searchJobs();
  },
  onPullDownRefresh(){
    //下拉刷新
    this.searchJobs();
  },
  onReachBottom(){
    //上拉翻页
    this.isLoad=false;
    this.searchJobs(true).then(res=>{
      this.isLoad=true;
    });
  },
  onTabItemTap(){

  },
  onPageScroll(e){
    this.pageScrollTop=e.scrollTop;
  },
  data() {
    return {
      StatusBar:this.StatusBar,
      pageScrollTop:0,
      isLoad:true,
      //搜索目标接口
      searchUrl: '/web/job/search/',
      method: 'get',
      //搜索参数
      serachParms: {
        act:'search',//	字符型	Y	search
        pp:undefined,//	整型	N	20
        page:undefined,//	整型	N	1
        q:undefined,//	字符型	N		公司名称
        order:undefined,//	整型	N	3	排序:2最新3推荐
        area:undefined,//	整型	N	1	默认全国
        comIndustryId:undefined,//	字符型	N		行业id，用逗号隔开
        comType:undefined,//	字符型	N		性质id，用逗号隔开
        comWorkers:undefined,//	字符型	N		规模id，用逗号隔开
        auth:undefined,//	字符型	N		认证id，用逗号隔开
        financing:undefined,//	字符型	N		融资id，用逗号隔开
        distance:undefined,//	整型	N		附近公司距离
        comLatitude:undefined,//	字符型	N		附近公司经度
        comLongitude:undefined,//	字符型	N		附近公司纬度
        famous:undefined//	整型	N	1	知名企业，认证的一种（尽量不加auth认证条件）
      },
      //搜索结果职位列表
      comList: [
        // {
        //   cid: "6c4f102920906",
        //   cname: "特力通",
        //   comIndustry: "通信(设备/运营/增值服务),计算机软件,计算机服务(系统/数据/维护)",
        //   comType: "股份制企业",
        //   comWorkers: "500～1000人",
        //   csName: "特力通",
        //   jname: "前端工程师",
        //   jobNum: 1,
        //   logoUrl: "//pic.597.com/logo/2020/09/25/20092503533998714.gif"
        // }
        ],
      searchData: {},//和响应数据格式一致 列表数据详见comList
      //搜索结果职位列表的页码，多页就有多个
      pages: [],
      middleApps: [{
        icon: 'line2_icon1.png',
        title: '审批',
        'text': '个人审批'
      },
        {
          icon: 'line2_icon2.png',
          title: '审批稿',
          'text': '审批草稿箱'
        },
      ],
      usList: us.data,
      osList: os.data,
      websock: '',
      heartCheck: null,
      lockReconnect: false,
      msgCount: 0,
      dot: {
        mailHome: false
      }
    }
  },

  methods: {
    ...mapActions([ "changeRegion"]),//changeRegion是初始化区域并初始化相关数据
    openUniDrawerArea() {
      this.$refs.uniDrawerArea.open();
    },
    onPullDownRefresh: function (e) {
      console.log(e);
      console.log('eeeeeeeeee');
    },
    // onTabTap(item) {
    //   console.log('item: ' + JSON.stringify(item));
    //   this.value = JSON.stringify(item);
    // },
    tagSel(item) {
      console.log('item: ' + JSON.stringify(item));
      // 【推荐】=/web/job.api
      // 【附近】=/web/job/search/？order=
      // 【最新】=/web/job/search/？order=6
      if (item.id == 1) {//推荐
        // this.searchUrl = '/web/job.api';
        this.searchUrl = '/web/recommendJob.api';
        this.serachParms.order = '';
        this.serachParms.act = 'recommendJob';
      } else if (item.id == 2) {//附近
        this.serachParms.act = '';
        this.searchUrl = 'web/job/search/';
        this.serachParms.order = '';
      } else {//最新
        this.serachParms.act = '';
        this.searchUrl = 'web/job/search/';
        this.serachParms.order = 6;
      }
      this.searchJobs();
    },
    onConditionsTabTap0(item) {
      console.log('item: ' + JSON.stringify(item));
      // 【推荐】order=3
      // 【附近】order不传
      // 【最新】order=2
      if (item.id == 1) {//推荐
        this.serachParms.order = 3;

      } else if (item.id == 2) {//附近
        this.serachParms.order = undefined;

      } else {//最新
        this.serachParms.order = 2;
      }
      this.searchJobs();
    },
    searchJobs(isApend) {//根据搜索职位
      var ps=this.serachParms;
      ps.page=isApend?ps.page+1:1;
      var that=this;
      return new Promise((resolve, reject) => {
        that.$http[that.method](that.searchUrl, that.method=='get'?{params: that.serachParms}: that.serachParms).then(res => { //cny_note：在web端会出现跨域问题，只需后端处理下就可以了。
          // 响应数据格式：
          // {
          // count: "2000"
          // foundCount: "85200"
          // list: (4) [{…}, {…}, {…}, {…}]
          // page: 1
          // pages: 200
          // status: 1
          // }
          resolve(res);
          if (res.data.status > 0) {
            if (!isApend) {
              console.log('mmmmmm==='+JSON.stringify(that.searchData))
              that.searchData=  res.data;
              if(!that.searchData.list){
                that.searchData.list=   res.data.rows; //赋值，因为接口不同响应数据格式不同，有时候是rows有时候是list
              }
            } else {
              res.data.list = [... that.searchData.list,...(res.data.list||res.data.rows)];//追加
              that.searchData=res.data;
            }

          } else {
            uni.showToast(res.data.msg);
            console.log(898989)
            console.log(res)
          }
        });
      });
    },
    onConditionsTabTap1(item) {
      debugger;
      console.log('item: ' + JSON.stringify(item));
      if (item.id == 4) {//地区
        this.openUniDrawerArea();
      }
    },
    sanCode: function () {
      debugger;
      uni.scanCode({
        success: function (res) {
          debugger;
          uni.showToast({
            title: '扫码功能'
          });
          console.log('条码类型：' + res.scanType);
          console.log('条码内容：' + res.result);
        }
      });
    },
    initMenu() {
      console.log("-----------home------------")
      // this.initWebSocket();
      // this.loadCount(0);
    },



    goPage(page) {
      if (!page) {
        return false;
      }
      if (page === 'annotationList') {
        this.msgCount = 0
      }
      this.dot[page] = false
      this.$router.push({
        name: page
      })
    },
    initWebSocket: function () {
      // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
      var userId = this.$store.getters.userid;
      var url = this.$config.apiUrl.replace("https://", "wss://").replace("http://", "ws://") + "/websocket/" + userId;
      console.log('websocket url>>' + url);
      this.websock = new WebSocket(url);
      this.websock.onopen = this.websocketOnopen;
      this.websock.onerror = this.websocketOnerror;
      this.websock.onmessage = this.websocketOnmessage;
      this.websock.onclose = this.websocketOnclose;
    },
    websocketOnopen: function () {
      console.log("WebSocket连接成功");
      //心跳检测重置
      //this.heartCheck.reset().start();
    },
    websocketOnerror: function () {
      console.log("WebSocket连接发生错误");
      this.reconnect();
    },
    websocketOnmessage: function (e) {
      console.log("-----接收消息-------", e.data);
      var data = eval("(" + e.data + ")"); //解析对象
      debugger;
      if (data.cmd == "topic") {
        //系统通知
        this.loadCount('1')
      } else if (data.cmd == "user") {
        //用户消息
        this.loadCount('2')
      } else if (data.cmd == 'email') {
        this.loadEmailCount()
      }

      //心跳检测重置
      //this.heartCheck.reset().start();
    },
    websocketOnclose: function (e) {
      console.log("connection closed (" + e.code + ")");
      this.reconnect();
    },
    websocketSend(text) { // 数据发送
      try {
        this.websock.send(text);
      } catch (err) {
        console.log("send failed (" + err.code + ")");
      }
    },
    reconnect() {
      var that = this;
      if (that.lockReconnect) return;
      that.lockReconnect = true;
      //没连接上会一直重连，设置延迟避免请求过多
      setTimeout(function () {
        console.info("尝试重连...");
        that.initWebSocket();
        that.lockReconnect = false;
      }, 5000);
    },
    loadCount(flag) {
      console.log("loadCount::flag", flag)
      let url = '/sys/annountCement/listByUser';
      this.$http.get(url).then(res => {
        console.log("res::", res)
        if (res.data.success) {
          let msg1Count = res.data.result.anntMsgTotal;
          let msg2Count = res.data.result.sysMsgTotal;
          this.msgCount = msg1Count + msg2Count
          console.log("this.msgCount", this.msgCount)
        }
      })
    },
    loadEmailCount() {
      this.dot.mailHome = true
    },
    getTtemDotInfo(item) {
      if (item.page === 'annotationList' && this.msgCount > 0) {
        return this.msgCount
      }
      return '';
    }
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters(['region','homeAdList'])
  }
}
</script>

<style>

.sticky-box1{
  position: sticky;
  position:-webkit-sticky;
  top:-50px;
  z-index: 99999;
}
.sticky-box2{
  position: sticky;
  position:-webkit-sticky;
  top:0;
  z-index: 99999;
  background-color: #FFFFFF;
}


.line2-icon {
  width: 60px;
  height: 60px;
}

.content {
  /* padding-bottom: 50px; */
}

.screen-swiper {
  /*min-height: 417.8 rpx;*/
}

.nav-ctrl-flexbox {
  background-color: #fff;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
}

.nav-ctrl-scroller {
  width: calc(100% - 70px);
  /* border:1px solid #39B54A; */
  /* border-radius: 4px; */
}


.nav-item {
  display: inline-block;
  color: #000000;
  height: 36px;
  padding: 0 10px;
  border-right: 1px solid #4cd964;
}



.nav-ctrl .segmented-control__item {
  /* border-top:none; */
  /* border-bottom:none; */

}

.nav-editer {
  height: 34px;
  width: 68px;
  line-height: 34px;
  text-align: center;
  vertical-align: middle;
  padding: 0 4px;
  font-size: 12px;
  vertical-align: middle;
  /*color:#000;*/
  background-color: #fff !important;
  border-top: none;
  border-right: none;
  border-top: none;
  border-radius: 0;

}

.nav-editer::after {
  /*background-color:#fff;*/
  border-right: none;
  border-top: none;
  border-radius: 0;
}

.nav-editer .compose,
.nav-editer .txt {
  vertical-align: middle;
}

.search-box .uni-navbar__content{
  border-bottom:none!important;
}
.search-nav {
  background: none;
  position: fixed;
  top: 18px;
  left: 0;
}

.search-box .scan {
  width: 40px;
  line-height: 56rpx;
  text-align: center;
}

.search-input {
  padding: 0 10px;
  margin-left: -20px;
  background-color: #fff;
  width: 480 rpx;
  line-height: 50rpx;
  height: 50rpx;
  text-align: center;
  border-radius: 4px;
  background-color: #f3f1f1;
  color: #8799A3;
}
.condition0{
  /*width: 40rpx+ (40rpx + 56rpx)*3;*/
  line-height: 48rpx;
}
.condition1{
  width: calc(100% - 288rpx - 8rpx);/*40rpx+ (40rpx + 56rpx)*3     其中8rpx为微调*/
}
.conditions-flexbox {
  background-color: #FFFFFF;
  display: flex;
  justify-content: center;
  justify-items: center;
}

.condition-item0 {
  width: 140px;
  /* display: inline-block; */
  /* vertical-align: middle; */
}

.condition-item0 .uni-tab-item {
  width: 44px !important;
}

.condition-item0 .uni-tab-item-title {
  width: 44px !important;
}

.condition-item1 {
  width: calc(100% - 140px);
  /* margin-left:10px; */
  /* display: inline-block; */
  /* vertical-align: middle; */
  /* height: 56px; */
}

.condition-item1 .uni-tab-item-title {
  padding: 0 4px;
}

.condition-item1 .uni-tab-item {
  padding: 0 10px;
}

.condition-item1 .uni-tab-item:after {
  content: '';
  display: inline;
  font-family: uniicons;
  text-decoration: none;
  text-align: center;
}

.conditionTabBars .scroll-h {
  height: 44px;
}

.conditionTabBars .uni-tab-item {
}

.conditionTabBars .uni-tab-item-title {
  font-size: 14px;
  line-height: 44px;
  height: 44px;

}

.conditionTabBars .uni-tab-item-title.uni-tab-item-title-active {
  border-bottom: none;
}

.job_content {
  margin-bottom: 20px;
}
</style>
