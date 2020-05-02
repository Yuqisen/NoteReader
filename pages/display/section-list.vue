<template>
	<view>
		<cu-custom :bgColor="!displayType ? 'bg-gradual-blue':'bg-night'" isBack="true" :backFunction="goBack">
			<block slot="content">{{title}}</block>
		</cu-custom>
		<view class="cu-list menu sm-border">
			<view class="cu-item arrow" v-for="item in sectionArray" :key="item.id" @click="gotoDetail(item)" :class="!displayType?'':'night'">
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">{{item.name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import service from '../../common/service.js';
export default {
	data() {
		return {
			title: "",
			sectionArray: [],
			pageIndex: 0,
			noteId: 0,
			loadMoreText: "加载中...",
			showLoadMore: false
		};
	},
	computed:{
		...mapState(['displayType'])
	},
	onLoad: function(option) {
		this.title = option.name;
		this.noteId = option.id;
		this.loadData();
	},
	onReachBottom() {
		this.showLoadMore = true;
		setTimeout(() => {
			this.pageIndex = this.pageIndex + 1;
			this.loadData();
			this.showLoadMore = false;
		}, 300);
	},
	onPullDownRefresh() {
		this.pageIndex = 0;
		this.loadData();
		uni.stopPullDownRefresh();
	},
	methods: {
		gotoDetail(item) {
			uni.navigateTo({
				url:"/pages/display/section?id=" + item.id +"&noteId=" + this.noteId +"&title=" + this.title
			});
		},
		goBack() {
			uni.navigateTo({
				url:"/pages/index/index"
			});
		},
		loadData() {
			service.requestGet(
				'/note/localSection/' + this.noteId + '/' + this.pageIndex,
				{},
				successRes => {
					if (this.pageIndex === 0) {
						this.sectionArray = successRes.data;
					} else {
						if (successRes.data.length > 0) {
							for (const item of successRes.data) {
								this.sectionArray.push(item);
							}
						} else {
							this.showLoadMore = true;
							this.loadMoreText = "没有更多数据了!";
						}
					}
				},
				failRes => {
					console.log(failRes);
				}
			);
		}
	}
}
</script>

<style>
</style>
