<template>
  <view class="cu-list menu ">
    <view class="cu-item animation-slide-bottom"  v-for="(job,index) in jobs" :key="index" :data-id="job.id" :style="[{animationDelay: (index+1)*0.07+'s'}]">
    <view class="content padding-tb-sm">
      <navigator url="/pages/user/people" hover-class="navigator-hover">
        <view class="cf ">
          <view class=" text-left text-cut text-lg fl job-name">
           {{job.jname}}<!--大区经理兼销售总监附带总经理叠加职务-->
          </view>
          <view class="job-salary text-red text-right text-cut fr">{{job.jobSalary}}<!--3.3~5.5千--></view>
        </view>
        <view class="text-gray text-sm">
          <text class="cuIcon-location   margin-right-sm" v-if="job.jobArea"><text class="margin-left-xs">{{job.jobArea}}<!--翔安区--></text></text>
          <text class="cuIcon-time   margin-right-sm" v-if="job.jobWorkYear"><text class="margin-left-xs">{{job.jobWorkYear}}年<!--1年--></text></text>
          <text class="cuIcon-evaluate   margin-right-sm"v-if="job.jobDegree"><text class="margin-left-xs">{{job.jobDegree}}<!--大专--></text></text>
        </view>


       <view class="text-gray text-xs padding-right-xl">
         <text class="cuIcon-tag   margin-right-sm" v-for="r in job.rewardStr"><text class="margin-left-xs">{{r}}</text></text>
<!--         <text class="cuIcon-tag   margin-right-sm"><text class="margin-left-xs">双休</text></text>-->
       </view>
      </navigator>
      <navigator url="/pages/test/test" hover-class="navigator-hover">
        <view class="cf">
          <text class="cuIcon-people text-red margin-right-xs"></text><text class="text-sm text-black">{{job.comUser}}<!--项少龙--></text>
          <text class="cuIcon-rank text-red margin-right-xs margin-left-sm"></text><text class="text-sm text-black">{{job.cname}}<!--和平集团名字的有限公司--></text>
          <text class="cuIcon-right fr text-gray text-xs"></text>
        </view>
      </navigator>
      <!--        <view class="job-com">-->
<!--          <image class="job-com-logo round" style="width: 60rpx; height: 60rpx;" src="https://pic.597.com/logo/2021/01/18/21011809471731565.png" mode="aspectFit"></image>-->
<!--          <text class="job-com-hr text-df padding-left-sm">项少龙</text>-->
<!--          <text class="job-com-name text-df padding-left-sm">和平集团名字的有限公1</text>-->
<!--        </view>-->
      </view>
<!--      <view class="action">-->
<!--       <text class="text-red">3千~5千</text>-->
<!--      </view>-->
    </view>



  </view>
<!--	<view class="job_content">

		<view class="section container job_anas job_anas_list">
			<view class="job_info">
				<a href="//m.597.com/job/8cd75c5211848.html" class="link"></a>
				<view class="job_name_wrapper line floatbox">
					<text class="job_name ellipsis left">{{jname}}</text>
					&lt;!&ndash;<text class="job_prop tipi left">全职</text>&ndash;&gt;
					<text class="job_salary ellipsis mcolor right">{{jobSalary}}</text>
				</view>
				<view class="line  floatbox">
					&lt;!&ndash; <text class="job_are fcolor left font14">福鼎市</text><i class="spliter left"></i>
		                 <text class="job_years fcolor left font14">经验不限</text><i class="spliter left"></i>
		                 <text class="job_edu fcolor left font14">初中</text>&ndash;&gt;
					<text class="job_request fcolor left font14 ellipsis">
						<text v-if="jobArea">{{jobArea}}</text>
						<text v-if="jobWorkYear">&nbsp;|&nbsp;{{jobWorkYear}}</text>
						<text v-if="jobDegree">&nbsp;|&nbsp;{{jobDegree}}</text>
					</text>
				</view>
				<view class=" floatbox">
					<text class="left job_fuli">
						<text class="tipj">{{rewardStr.join('  |  ')}}</text>
					</text>
					<text class="job_tips rigLht">
						<text class=" tipi left">
							<text v-if="urgency">急聘</text>
					  &nbsp;<text v-if="isNewJob">新</text>
						</text>
					</text>
				</view>
				<view class="part job_ana">
					<a class="link" href="//m.597.com/com/a708aa4140106.html"></a>
					<view class="struct_left floatbox line">
						<view class="left struct_left_photo">
							<image class="com_logo" :src="logoUrl"/>
						</view>
						<view class="ellipsis_comUser left struct_left_info ellipsis font13 fcolor ">{{comUser}}</view>
						<view class="ellipsis_cname left struct_left_info ellipsis font13">{{updateTime}}</view>
						<view class="right struct_left_btn lbl fcolor font13">
							{{ updateTime}} </view>
					</view>
				</view>
			</view>
		</view>
	</view>-->
</template>

<script>
	export default {
		props: {
		  jobs:Array
      /*
      jobs=[{
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
		  var that=this;
      setTimeout(function () {
        console.log(that.jobs);
      },3000);
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
/*************/
</style>
