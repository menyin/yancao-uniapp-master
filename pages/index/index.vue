<template>
  <view>
    <home :cur="PageCur" v-if="PageCur=='home'" :key="commponent1Key" ref="home"></home>
    <people v-if="PageCur=='people'" :key="commponent2Key" ref="people"></people>
    <test v-if="PageCur=='test'" :key="commponent3Key" ref="test"></test>


    <!-- 这两个页面没有定义，可以再main.js里进行注入 -->
    <!-- <peoplelis v-if="PageCur=='peoplelis'" :key="commponent3Key"></peoplelis>
    <profile v-if="PageCur=='profile'" :key="commponent4Key"></profile> -->

    <view class="cu-bar tabbar bg-white shadow foot">
      <view :class="PageCur=='home'?'action text-red':'action text-gray'" @click="NavChange" data-cur="home">
        <view :class="PageCur=='home'?'cuIcon-goodsnewfill':'cuIcon-goodsnew'"></view>
        职位
      </view>
      <view :class="PageCur=='peoplelis'?'action text-red':'action text-gray'" @click="NavChange" data-cur="peoplelis">
        <view :class="PageCur=='peoplelis'?'cuIcon-rankfill':'cuIcon-rank'"></view>
        公司
      </view>
      <view :class="PageCur=='test'?'action text-red':'action text-gray'" @click="NavChange" data-cur="test">
        <view :class="PageCur=='test'?'cuIcon-messagefill':'cuIcon-message'"></view>
        消息
      </view>
      <view :class="PageCur=='people'?'action text-red':'action text-gray'" @click="NavChange" data-cur="people">
        <view :class="PageCur=='people'?'cuIcon-peoplefill':'cuIcon-people'"></view>
        我的 
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import {ACCESS_TOKEN} from '@/common/util/constants.js'

export default {
  data() {
    return {
      PageCur: 'home',
      commponent1Key: 0,
      commponent2Key: 0,
      commponent3Key: 0,
      commponent4Key: 0
    }
  },
  onLaunch() {
    console.log('index onLaunch() ===>');
  },
  onLoad: function () {


    console.log('index onload() ===>');


    this.PageCur = 'home'
    ++this.commponent1Key
    ++this.commponent2Key
    ++this.commponent3Key
  },
  watch: {
    //因为TabBar是index自定义实现，所以这边没走路由，所以要另外再这里拦截。
    PageCur: {
      immediate: true,
      handler(newVal, oldVal) {
        debugger
        console.log(newVal);
        console.log(this.$Router);
        // console.log(this.$Route);
        let whiteList =this.$Router.whiteList;
        // let token=uni.getStorageSync(ACCESS_TOKEN);
        let token=uni.getStorageSync('userInfo').token;
        var toPath=this.$Router.CONFIG.routes.filter(u=>u.name==newVal);
        if(!token&&toPath&&whiteList.indexOf(toPath[0].path) == -1){
          console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')

          this.$Router.push({name:'loginWay'});

          return;
        }

      },
    },
  },
  /*下拉刷新*/
  onPullDownRefresh: function () {
    this.$refs[this.PageCur].onPullDownRefresh1('向子组件触发方法');
  },
  /*上拉翻页*/
  onReachBottom: function () {
    console.log('上拉翻页');
  },
  methods: {
    NavChange: function (e) {
      this.PageCur = e.currentTarget.dataset.cur
    }

  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters(['region'])
  }
}
</script>

<style>

</style>
