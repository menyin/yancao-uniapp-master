<template>
  <view class="cu-list menu menu-avatar">
    <view class="cu-item animation-slide-bottom "  v-for="(company,index) in companys" :key="index" :data-id="company.id" :style="[{animationDelay: (index+1)*0.07+'s'}]">
<!--        <view class="cu-avatar radius lg" :style="'background-image:url('+job.logoUrl||'https://pic.597.com/logo/2021/01/18/21011809471731565.png'+');'">-->
        <view class="cu-avatar radius lg" >
          <image class="company-logo" mode="scaleToFill" :src="company.logoUrl||'//cdn.597.com/img/job/newjob/default_logo.png'"></image>
        </view>
        <view class="content">
          <view class="text-black text-cut">{{company.cname}}<!--厦门市才盛人才服务有限公司--></view>
          <view class="text-gray text-sm flex">
             <view class="text-gray text-sm text-cut">
               <text class="cuIcon-info   margin-right-sm" v-if="company.comType"><text class="margin-left-xs">{{company.comType}}<!--民营、私营公司--></text></text>
               <text class="cuIcon-friend   margin-right-sm" v-if="company.comWorkers"><text class="margin-left-xs">{{company.comWorkers}}<!--50~200人--></text></text>
               <text class="cuIcon-apps   margin-right-sm"v-if="company.comIndustry"><text class="margin-left-xs">{{company.comIndustry}}<!--娱乐休闲/电子商务--></text></text>
            </view>
			 </view>
        </view>
        <view class="jobs text-sm text-cut"><text class="text-pink padding-right-sm">{{jname}}<!--储备干部（客服）--></text><text class="text-gray">等{{company.jobNum}}个岗位</text></view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    companys:Array
    /*
    companys=[{
    cname: "泉州市公猴电子商务有限公司"
    comIndustry: "互联网/电子商务,贸易/进出口,服饰/纺织/皮革"
    comType: "民营、私营公司"
    comUser: "人事行政"
    comWorkers: "50～200人"
    createTime: "01-10"
    cusername: "ghsm567"
    geodist: 100
    jname: "商品经理"
    jobArea: "鲤城区"
    jobAreaId: "350502"
    jobDegree: "50"
    jobNum: 11
    jobSalary: "6千-1.2万"
    jobSalaryMax: "12000"
    jobSalaryMax1: "0"
    jobSalaryMin: "6000"
    jobSalaryMin1: "0"
    jobSalaryType: "0"
    jobWorkYear: "2"
    logoUrl: "//pic.597.com/logo/2020/12/09/20120905211455559.jpg"
    modTime: "1616591133"
    onDay: 0
    rewardStr: (2) ["包住", "单休"]
    type: ""
    updateTime: "10:13"
    urgency: "0"
    _cid: "2213b7791041"
    _createTime: "01-10"
    _jid: "28bef13584056"
    _jobDegree: "大专"
    _jobWorkYear: "2年"
    _rewardID: [""]
    }]
    */

  },
  created(){
  },
  data() {
    return {

    };
  }

}
</script>

<style>
.fcolor {
  color: #A6A6A6;
}
.job_content{width: 100%;	background-color: #fff;}
.job_anas {
  padding: 0 20px;
}

.job_anas .job_info {
  position: relative;
  padding-top: 17px;
  padding-bottom: 0;
}
.job_anas .line {
  padding: 5px 0;
  line-height: 20px;
}
.job_anas .job_name {
  font-size: 19px;
  font-weight: normal;
  color: #1D1D1D;
  line-height: 19px;
  max-width: calc(100% - 100px);
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.job_anas .job_salary {
  font-size: 18px;
  max-width: 100px;
}

.job_request {
  max-width: 212px;
}
.floatbox:after {
  content: '';
  display: block;
  clear: both;
}
.job_anas .job_fuli {
  max-width: calc(100% - 84px);
  overflow: hidden;
  height: 30px;
  margin-left:-6px;
}

.left {
  float: left;
}
.tipj {
  display: inline-block;
  background: #F5F5F6;
  padding: 1px 4px;
  color: #6E6E6E;
  font-style: normal;
  border-radius: 3px;
  margin: 4px 0;
  margin-left: 4px;
  font-size: 13px;
}
.index_jobs .job_info .job_tips {
  margin: 4px 0;
}

.right {
  float: right;
}
.tipi {
  background: #FFEEEE;
  padding: 1px 4px;
  color: #F4243D;
  font-style: normal;
  border-radius: 3px;
  margin-left: 4px;
  font-size: 14px;
}
.job_anas .job_info > .job_ana {
  position: relative;
}
.section .part.job_ana {
  border-bottom: none;
}

.job_anas .part {
  padding: 6px 0;
}
.job_anas .job_info > .job_ana > a.link {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.job_anas .line {
  padding: 5px 0;
  line-height: 20px;
}
index_jobs .job_anas .job_ana .struct_left_photo {
  width: 24px;
  height: 24px;
}

.job_anas .struct_left_photo {
  border-radius: 50%;
  overflow: hidden;
}
.index_jobs .job_anas .job_ana .struct_left_info {
  height: 24px;
  line-height: 24px;
}
.ellipsis_comUser {
  max-width: 46px;
}

.struct_left_info {
  padding-left: 10px;
}
.ellipsis_cname {
  max-width: calc(100% - 160px);
}
.index_jobs .job_anas .job_ana .struct_left_btn {
  height: 24px;
  line-height: 24px;
}
.job_anas .struct_left_photo .com_logo {
  text-align: center;
  line-height: 33px;
  vertical-align: middle;
}

.job_anas .struct_left_photo {
  width: 24px!important;
  height: 24px!important;
  border-radius: 50%;
  overflow: hidden;
}
.struct_left_photo .com_logo {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

/*************/
.job-name{
  width: 490rpx;
}
.job-salary{
  width: 160rpx;
}
.job-com{
  line-height: 60rpx;
  vertical-align: middle;
}
.job-com-logo,.job-com-hr,.job-com-name{
  vertical-align: middle;
}

.cu-list .cu-avatar{
  background-color: #FFFFFF;
}
.cu-list .cu-avatar .company-logo{
  width: 96rpx;
  height: 96rpx;
}
.cu-item .content{
  width: calc(100% - 96rpx - 64rpx)!important;
}
.cu-list.menu-avatar>.cu-item{
  height: 180rpx!important;
  justify-content: flex-start!important;
  align-items: flex-start!important;
  /*flex-direction: row;*/
  /*flex-wrap: wrap;*/
}
.cu-list.menu-avatar>.cu-item .cu-avatar{
  /*left:0!important;*/
}
.cu-list.menu-avatar>.cu-item .cu-avatar,
.cu-list.menu-avatar>.cu-item .content{
  /*position: relative;*/
  margin-top:20rpx!important;
}
.cu-list.menu-avatar>.cu-item .jobs{
  position: relative;
  top:128rpx;
}
/*************/
</style>
