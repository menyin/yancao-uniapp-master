<template>
	<view>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<text class="cu-tag light bg-gray radius" :class="index==TabCur?'text-red cur':'text-grey'" v-for="(item,index) in tabBars" :key="index" @tap="tabSelect" :data-item="item" :data-index="index" :data-id="item.id">
				{{item.name}}
<!--        <text color="cuIcon-triangledownfill">&nbsp;</text>-->
			</text>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
        tabBars:  [{
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
      ]
			}
		},
		methods: {
      tabSelect(e) {
				debugger;
				var offsetLeft=e.currentTarget.offsetLeft;
				this.TabCur = e.currentTarget.dataset.index;
				// this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * offsetLeft/(this.TabCur+1);
        this.$emit('onConditionsSelect',e.currentTarget.dataset.item);

      }
		}
	}
</script>

<style>
.text-red.cur{
  color: #F4243E!important;
}
</style>
