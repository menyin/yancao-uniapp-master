<template>
	<view class="">
    <text class="cu-item padding-sm" :class="index==TabCur?'text-black cur':'text-grey'" v-for="(item,index) in tabBars" :key="index" @tap="tabSelect" :data-item="item" :data-index="index" :data-id="item.id">
      {{item.name}}
    </text>
	</view>
</template>

<script>
export default {
  data() {
    return {
      TabCur: 0,
      scrollLeft: 0,
      tabBars:[{
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
</style>
