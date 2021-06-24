<template>
	<view>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-red cur':''" v-for="(item,index) in tabBars" :key="index"
				@tap="tabSelect" :data-item="item" :data-index="index" :data-id="item.id">
				{{item.name}}
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
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
				]

			}
		},
		methods: {
			tabSelect(e) {
				debugger;
				var offsetLeft = e.currentTarget.offsetLeft;
				this.TabCur = e.currentTarget.dataset.index;
				// this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * offsetLeft / (this.TabCur + 1);
				this.$emit('tabSelected', e.currentTarget.dataset.item);
			}
		}
	}
</script>


<style>
</style>
