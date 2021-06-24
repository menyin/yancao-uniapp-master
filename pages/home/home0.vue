<template name="home">
  <view class="content">
    <scroll-view enable-flex="true">
      <!-- 轮播 -->
      <swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
              duration="500" :style="[{animation: 'show 0.2s 1'}]">
        <swiper-item class="banner" v-for="(item,index) in homeAdList" :key="index">
          <image :src="item._pic" mode="scaleToFill"></image>
        </swiper-item>
      </swiper>

      <view>当前城市：{{region.localCity.name}}，编号：{{region.localCity.id}}</view>

      <form @submit="formSubmit" @reset="formReset">
        <view class="search-box">
          <uni-nav-bar class="search-nav" fixed="true" backgroundColor="rgba(0,0,0,0)">
            <view class="scan" @click="sanCode" slot="left">
              <uni-icons type="scan" size="22"></uni-icons>
            </view>
            <input class="search-input" v-model="serachParms.keyword" type="text" placeholder="请输入职位/公司"/>
          </uni-nav-bar>
        </view>
        <view class="nav-ctrl-flexbox">
          <view class="nav-ctrl-scroller">
            <view class="page">
              <scroll-horizontal-tab :tabBars="tabBars" @onTabTap="onTabTap"></scroll-horizontal-tab>
            </view>
          </view>
          <button class="nav-editer" type="default">
            <uni-icons type="compose" size="22" class="compose"></uni-icons>
            <text class="txt">编辑</text>
          </button>
        </view>
        <view class="conditions">
          <view class="conditions-flexbox">
            <view class="page condition-item0">
              <scroll-horizontal-tab class="conditionTabBars" :tabBars="conditionTabBars0"
                                     @onTabTap="onConditionsTabTap0"></scroll-horizontal-tab>
            </view>
            <view class="page condition-item1">
              <search-condition1></search-condition1>
              <!-- <scroll-horizontal-tab class="conditionTabBars" :tabBars="conditionTabBars1" @onTabTap="onConditionsTabTap1"></scroll-horizontal-tab> -->
            </view>
          </view>
        </view>

      </form>


      <view class="job-list" v-for="(job,index) in jobList">
        <job-cart :jname="job.jname" :jobSalary="job.jobSalary" :jobArea="job.jobArea" :jobWorkYear="job.jobWorkYear"
                  :jobDegree="job.jobDegree" :rewardStr="job.rewardStr" :urgency="job.urgency" :isNewJob="job.isNewJob"
                  :logoUrl="job.logoUrl"
                  :comUser="job.comUser" :cname="job.cname" :updateTime="job.updateTime">
        </job-cart>
      </view>
      <view class="job-list" v-for="(job,index) in jobList">
        <job-cart :jname="job.jname" :jobSalary="job.jobSalary" :jobArea="job.jobArea" :jobWorkYear="job.jobWorkYear"
                  :jobDegree="job.jobDegree" :rewardStr="job.rewardStr" :urgency="job.urgency" :isNewJob="job.isNewJob"
                  :logoUrl="job.logoUrl"
                  :comUser="job.comUser" :cname="job.cname" :updateTime="job.updateTime">
        </job-cart>
      </view>
      <view class="job-list" v-for="(job,index) in jobList">
        <job-cart :jname="job.jname" :jobSalary="job.jobSalary" :jobArea="job.jobArea" :jobWorkYear="job.jobWorkYear"
                  :jobDegree="job.jobDegree" :rewardStr="job.rewardStr" :urgency="job.urgency" :isNewJob="job.isNewJob"
                  :logoUrl="job.logoUrl"
                  :comUser="job.comUser" :cname="job.cname" :updateTime="job.updateTime">
        </job-cart>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { mapActions,mapGetters } from "vuex"
import {us,os} from '@/common/util/work.js'
import { http } from '@/common/service/service.js'


import uniNavBar from '@/components/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
import uniSegmentedControl
  from '@/components/uni-segmented-control_1.0.4/components/uni-segmented-control/uni-segmented-control.vue'
import uniIcons from '@/components/uni-icons_1.1.4/components/uni-icons/uni-icons.vue'
import scrollHorizontalTab
  from '@/components/scroll-horizontal-tab_1.0.0/components/scroll-horizontal-tab/scroll-horizontal-tab.vue'
import jobCard from '@/components/job-card/componets/job-card/job-card.vue'

import searchCondition1 from '@/components/search-condition1/componets/search-condition1/search-condition1.vue'

export default {
  name: 'home',
  props: {
    cur: String,
  },
  components: {
    uniNavBar,
    uniSegmentedControl,
    uniIcons,
    scrollHorizontalTab,
    jobCard,
    searchCondition1
  },
  watch: {
    cur: {
      immediate: true,
      handler() {
        // debugger;
        console.log('watch', this.cur)
        this.initMenu()
        this.changeRegion()

        if (!this.value) {
          this.value = JSON.stringify(this.tabBars[0]);
        }
      },
    },
  },
  mounted(){//因为TabBar是自定义的，所以采用挂载时事件来触发初始化操作
    console.log('mounted--mounted--mounted');
  },


  data() {
    return {
      //搜索目标接口
      searchUrl: '/web/job/search/',
      //搜索参数
      serachParms: {
        // SESSIONKEY:'',//在推荐情况下会有SESSIONKEY
        area: '',
        condition: '',
        keyword: '',
        txtAddress: '',
        selUpdateStep: '',
        Degree: '',
        selGender: '',
        ComProperty: '',
        ComSize: '',
        joinType: '',
        callingId: '',
        minSalary: '',
        maxSalary: '',
        Reward: '',
        workYear: '',
        order: '',
        distance: '',
        comLatitude: '',
        comLongitude: '',
        pp: '',
        page: '',
        jobClassId: '',
        auth: ''
      },
      //搜索结果职位列表
      jobList: [{
        cname: "雪花贸易（雪花+喜力啤酒）",
        comIndustry: "酒店/旅游,餐饮业,生活服务",
        comType: "其他",
        comUser: "hr",
        comWorkers: "50～200人",
        createTime: "12-26",
        cusername: "597xhmy597",
        geodist: 100,
        jname: "销售代表（宁德）",
        jobArea: "鼓楼区",
        jobAreaId: "350102",
        jobDegree: "60",
        jobNum: 27,
        jobSalary: "6千-1万",
        jobSalaryMax: "10000",
        jobSalaryMax1: "0",
        jobSalaryMin: "6000",
        jobSalaryMin1: "0",
        jobSalaryType: "0",
        jobWorkYear: "1",
        logoUrl: "//cdn.597.com/img/job/newjob/default_logo.png",
        modTime: "1608952887",
        onDay: 0,
        rewardStr: ["五险", "住房公积金", "单休"],
        type: "",
        updateTime: "09:43",
        urgency: "0",
        _cid: "3aae0b6030079",
        _createTime: "12-26",
        _jid: "1f92545173914",
        _jobDegree: "本科",
        _jobWorkYear: "1年",
        _rewardID: [""]
      }],
      jobsData: {
        //和响应数据格式一致
      },
      //搜索结果职位列表的页码，多页就有多个
      pages: [],
      value: '',
      tabBars: [{
        name: '网站架构设计师',
        id: '1'
      },
        {
          name: '网站维护工程师',
          id: '2'
        },
        {
          name: '网页设计/制作/美工',
          id: '3'
        },
        {
          name: '特效设计师',
          id: '4'
        },
        {
          name: '互联网软件开发工程师',
          id: '5'
        },
        {
          name: '前端工程师',
          id: '6'
        }
      ],
      conditionTabBars0: [{
        name: '推荐',
        id: '1'
      },
        {
          name: '附近',
          id: '2'
        },
        {
          name: '最新',
          id: '3'
        }
      ],
      conditionTabBars1: [{
        name: '区域',
        id: '4'
      },
        {
          name: '月薪',
          id: '5'
        },
        {
          name: '筛选',
          id: '6'
        }
      ],

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
  onLaunch(e) {
    debugger;
  },
  onLoad(e) {
    debugger;

  },
  methods: {
    ...mapActions([ "changeRegion"]),//changeRegion是初始化区域并初始化相关数据
    openUniDrawerArea() {
      this.$refs.uniDrawerArea.open();
    },
    onPullDownRefresh1: function (e) {//居然不能用onPullDownRefresh这个名称，否则无法触发，估计与内部名称重读
      console.log(e);
      console.log('eeeeeeeeee');
    },
    onTabTap(item) {
      console.log('item: ' + JSON.stringify(item));
      this.value = JSON.stringify(item);
    },
    onConditionsTabTap0(item) {
      console.log('item: ' + JSON.stringify(item));
      // 【推荐】=/web/job.api
      // 【附近】=/web/job/search/？order=
      // 【最新】=/web/job/search/？order=6
      if (item.id == 1) {//推荐
        this.searchUrl = '/web/job.api';
        this.serachParms.order = '';
      } else if (item.id == 2) {//附近
        this.searchUrl = 'web/job/search/';
        this.serachParms.order = '';
      } else {//最新
        this.searchUrl = 'web/job/search/';
        this.serachParms.order = 6;
      }
      this.searchJobs();
    },
    searchJobs(isApend) {//根据搜索职位

      http.get(this.searchUrl, {params: this.serachParms}).then(res => { //cny_note：在web端会出现跨域问题，只需后端处理下就可以了。
        // 响应数据格式：
        // {
        //  count: "2000",foundCount: "194292",
        //  list: (10) [{…}, {…}, {…}, {…}],
        //  page: "1",pages: 200,status: 1,
        // }

        if (res.data.status > 0) {
          if (!isApend) {
            that.jobsData = res.data;
          } else {
            that.jobsData.rows = that.jobsData.rows.concat(res.data.rows);//是否是追加
          }
        } else {
          uni.showToast(res.data.msg);
        }
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

.nav-box {
  /*display: flex;*/
  /*flex-direction: row;*/
  /*flex-flow: nowrap;*/
  /*justify-content: flex-start;*/
  /*border:1px solid #4cd964;*/
  /*align-items: center;*/

}

.nav-item {
  display: inline-block;
  color: #000000;
  height: 36px;
  padding: 0 10px;
  border-right: 1px solid #4cd964;
}

.nav-ctrl {
  /* width: 900rpx; */
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

.search-nav .uni-navbar__content{
  border:none!important;
}
.search-nav {
  background: none;
  position: fixed;
  top: 18px;
  left: 0;
}

.search-nav .scan {
  width: 40px;
  text-align: center;
}

.search-input {
  padding: 0 10px;
  margin-left: -20px;
  background-color: #fff;
  width: 440 rpx;
  line-height: 34px;
  height: 34px;
  text-align: center;
  border-radius: 6px;
  background-color: #fff;
  color: #8799A3;
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
