<template>
	<view class="cu-list menu sm-border">
		<view class="cu-item arrow" v-for="item in noteArray" :key="item.id" @click="gotoDetail(item)" :class="!displayType?'':'night'">
			<view class="content">
				<text class="cuIcon-circlefill text-grey"></text>
				<text class="text-grey">{{item.name}}</text>
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
			noteArray: []
		};
	},
	computed:{
		...mapState(['displayType'])
	},
	mounted:function(){
		service.requestGet(
			'/note/localList',
			{},
			successRes => {
				this.noteArray = successRes.data;
			},
			failRes => {
				console.log(failRes);
			}
		);
	},
	methods: {
		gotoDetail(item) {
			uni.navigateTo({
				url:"/pages/display/section-list?id=" + item.id +"&name=" + item.name
			})
		}
	}
}
</script>

<style>
</style>
