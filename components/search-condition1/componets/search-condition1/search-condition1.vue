<template>
	<view class="search-condition1-content">
		<view class="search-condition1">
			<text class="search-condition1-item" @click="tabClick" data-id="area">区域<uni-icons type="arrowdown" size="22"></uni-icons></text>
			<text class="search-condition1-item" @click="tabClick" data-id="salary">月薪<uni-icons type="arrowdown" size="22"></uni-icons></text>
			<text class="search-condition1-item" @click="tabClick" data-id="other">其它<uni-icons type="arrowdown" size="22"></uni-icons></text>
		</view>

		<uni-drawer mode="right" width="375" ref="uniDrawer_area" :visible="true">
			<button type="default" @click="closeUniDrawer" data-id="area">关闭</button>
			<view class="area-box">
				<view class="area-box-left">
					<view :class="(areaType=='area'?'active ':'')+'quyu area-box-left-item'" @click="areaType='area'">区域</view>
					<view :class="(areaType=='distance'?'active ':'')+'juli area-box-left-item'" @click="areaType='distance'">距离</view>
				</view>
				<view class="area-box-right">
					<view v-if="areaType=='area'" class="quyu area-box-right-items">
						<view class="area-item area-box-right-item" v-for="(item,index) in [{id:1,name:'区域'},{id:2,name:'距离'}]">{{item.name}}</view>
					</view>
					<view v-if="areaType=='distance'" class="juli area-box-right-items">
						<view class="curr-addr">
							<view @click="editAddr">
								<uni-icons type="map-pin-ellipse" size="22"></uni-icons><text class="addr">福建省厦门是湖里区安岭二路宝远大厦3楼</text><text
								 class="edit-addr-btn">修改</text>
							</view>
						</view>
						<view>
							<view :class="(currentDistId==item.id?' active':'')+'distance-item area-box-right-item'" v-for="(item,index) in distances"
							 @click="currentDistId=item.id">{{item.name}}</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="false">
				<page-head :title="title"></page-head>
				<view class="uni-padding-wrap">
					<view class="uni-title">
						当前地址：厦门市湖里区宝远大厦 {{area}}==={{qu}}===={{dist}}
					</view>
				</view>

				<picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
					<picker-view-column>
						<view @change="bindChange1" class="item" v-for="(item,index) in areas" :key="index">{{item}}年</view>
					</picker-view-column>
					<picker-view-column v-show="value[0]==0">
						<view class="item" v-for="(item,index) in qus" :key="index">{{item}}</view>
					</picker-view-column>
					<picker-view-column v-show="value[0]==1">
						<view class="item" v-for="(item,index) in dists" :key="index">{{item}}</view>
					</picker-view-column>
				</picker-view>
			</view>
		</uni-drawer>
		<uni-drawer mode="right" width="375" ref="uniDrawer_salary" :visible="true">
			<button type="default" @click="closeUniDrawer" data-id="area">关闭</button>
			<view>
				月薪
			</view>
		</uni-drawer>
		<uni-drawer mode="right" width="375" ref="uniDrawer_other" :visible="true">
			<button type="default" @click="closeUniDrawer" data-id="area">关闭</button>
			<view>
				其它
			</view>
		</uni-drawer>
	</view>

</template>

<script>
	import uniDrawer from '@/components/uni-drawer/components/uni-drawer/uni-drawer.vue'
	import uniIcons from '@/components/uni-icons_1.1.4/components/uni-icons/uni-icons.vue'
	export default {
		components: {
			uniIcons,
			uniDrawer
		},
		props: {
			areas: {
				type: Array,
				default: [{
					id: '11',
					name: '思明区'
				}, {
					id: '22',
					name: '湖里区'
				}, {
					id: '33',
					name: '集美区'
				}, {
					id: '44',
					name: '翔安区'
				}]
			},
			currentDistId: {
				type: String,
				default: ''
			},
			distances: {
				type: Array,
				default: [{
					id: '111',
					name: '500米'
				}, {
					id: '222',
					name: '1公里'
				}, {
					id: '333',
					name: '2公里'
				}, {
					id: '444',
					name: '3公里'
				}]
			}
		},

		data() {

			return {
				areaType: 'area',
				title: 'picker-view',
				// areas: ['区域', '距离'],
				area: '',
				qus: ['思明区', '湖里区', '集美区', '翔安区'],
				qu: '',
				dists: ['500米', '1公里', '2公里', '3公里'],
				dist: '',
				value: [0, 0, 0],
				/**
				 * 解决动态设置indicator-style不生效的问题
				 */
				visible: true,
				// indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
				indicatorStyle: `height: 50px;`
			}
		},
		methods: {
			bindChange(e) { //picker-view 只能通过:value的值和e.detail.value进行列对比来判断那一列发生了改变
				const val = e.detail.value
				console.log('value=' + this.value + ' ***** e.value=' + val)
				this.value = val;
				if (val[0] != this.value[0]) {
					//
				}
				this.area = this.areas[val[0]];
				this.qu = this.qus[val[1]];
				this.dist = this.dists[val[2]];
			},
			packstart(e) {

			},

			tabClick(e) {
				this.$refs['uniDrawer_' + e.currentTarget.dataset.id].open();
			},
			closeUniDrawer(e) {
				this.$refs['uniDrawer_' + e.currentTarget.dataset.id].close();
			}
		}

	}
</script>

<style>
	picker-view {
		width: 100%;
		height: 600rpx;
		margin-top: 20rpx;
	}

	.item {
		line-height: 100rpx;
		text-align: center;
	}


	.search-condition1 {
		display: flex;
		flex-direction: row;
		justify-content: center;
		justify-items: center;
		border-bottom: 1px solid #dddddd;
		height: 44px;
		line-height: 44px;
	}

	.search-condition1-item {
		display: inline-block;
		width: 33%;
		text-align: center;
	}

	/*地区选择器 begin*/
	.area-box {
		color: #222;
		height: 100%;
		display: flex;
		flex-direction: row;
		flex-flow: nowrap;
		justify-content: space-between;
	}

	.area-box-left {
		width: 40%;
		height: 100%;
		border-right: 1px solid #ddd;
	}

	.area-box-right {
		width: 60%;
		height: 100%;
	}

	.area-box-left-item,
	.area-box-right-item {
		text-align: left;
		line-height: 30px;
		height: 30px;
		font-size: 16px;
		padding-left: 10px;
	}

	.area-box-left-item.active {
		color: red;
	}

	.curr-addr {
		padding: 10px;
	}

	.map-pin-ellipse,
	.edit-addr-btn {
		color: red;
	}

	.addr {
		padding: 0 10px;
	}

	.distance-item.active {
		color: red;
	}

	/*地区选择器 end*/
</style>
