<template>
	<view>
		<cu-custom :bgColor="!displayType ? 'bg-gradual-blue':'bg-night'">
			<block slot="content">{{getHeaderText}}</block>
		</cu-custom>
		<view class="content">
			<note-list v-if="PageCur === 'basics'"></note-list>
			<search v-if="PageCur === 'search'"></search>
			<view class="cu-bar tabbar shadow foot" :class="!displayType ? 'bg-white' : 'bg-night'">
				<view class="action" @click="NavChange" data-cur="basics">
					<view class='cuIcon-cu-image'>
						<image :src="'/static/tabbar/basics' + [PageCur=='basics'?'_cur':''] + '.png'"></image>
					</view>
					<view :class="PageCur=='basics'?'text-blue':'text-gray'">最近阅读</view>
				</view>
				<view class="action" @click="NavChange" data-cur="search">
					<view class='cuIcon-cu-image'>
						<image :src="'/static/tabbar/component' + [PageCur == 'search'?'_cur':''] + '.png'"></image>
					</view>
					<view :class="PageCur=='search'?'text-blue':'text-gray'">小说查找</view>
				</view>
				<view class="action" @click="NavChange" data-cur="plugin">
					<view class='cuIcon-cu-image'>
						<image :src="'/static/tabbar/plugin' + [PageCur == 'plugin'?'_cur':''] + '.png'"></image>
					</view>
					<view :class="PageCur=='plugin'?'text-blue':'text-gray'">个人设定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			PageCur: 'basics'
		}
	},
	computed:{
		...mapState(['displayType']),
		getHeaderText() {
			if (this.PageCur === 'basics') {
				return '最近阅读';
			} else if (this.PageCur === 'search') {
				return '小说查找';
			} else {
				return '个人设定';
			}
		}
	},
	methods: {
		NavChange: function(e) {
			this.PageCur = e.currentTarget.dataset.cur
		}
	}
}
</script>

<style>
</style>
