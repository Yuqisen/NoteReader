<template>
	<view>
		<view class="cu-bar search" :class="!displayType ? 'bg-white':'bg-grey'">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input v-model="searchKey" :adjust-position="false" type="text" placeholder="搜索小说名称、作者等" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn round" :class="!displayType ? 'bg-blue shadow-blur':'bg-black shadow-warp'" @click="searchNote">搜索</button>
			</view>
		</view>
		<view class="cu-list menu-avatar" style="margin-top: 30rpx;">
			<view class="cu-item" :class="[modalName=='move-box-'+ index?'move-cur':'', !displayType?'':'night']" v-for="(item, index) in noteArray" :key="item.id"
			 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
				<view class="content" style="left: 20rpx;">
					<view class="text-grey">{{item.name}}</view>
					<view class="text-gray text-sm">作者： {{item.author}}</view>
					<view class="text-gray text-sm">最新章节： {{item.lastSection}}</view>
				</view>
				<view class="action" style="width: 150rpx;">
					<view class="text-grey text-xs">{{item.lastUpdateTime}}</view>
				</view>
				<view class="move">
					<strong></strong><view :class="!displayType?'bg-green':'bg-black'" @tap="downloadSection(item)">更新目录</view>
				</view>
			</view>
		</view>
		<view class="cu-load load-modal" v-if="loadModal">
			<view class="gray-text">查询中...</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import service from '../../common/service.js';
export default {
	data() {
		return {
			loadModal: false,
			searchKey: '',
			listTouchStart: 0,
			listTouchDirection: null,
			modalName: null,
			noteArray: []
		};
	},
	computed:{
		...mapState(['displayType'])
	},
	methods: {
		// ListTouch触摸开始
		ListTouchStart(e) {
			this.listTouchStart = e.touches[0].pageX
		},

		// ListTouch计算方向
		ListTouchMove(e) {
			this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
		},

		// ListTouch计算滚动
		ListTouchEnd(e) {
			if (this.listTouchDirection == 'left') {
				this.modalName = e.currentTarget.dataset.target
			} else {
				this.modalName = null
			}
			this.listTouchDirection = null
		},
		searchNote() {
			if (this.searchKey === '') {
				return;
			}
			this.loadModal = true;
			service.requestPost(
				'/note/list', 
				{name: this.searchKey},
				successRes => {
					this.noteArray = successRes.data;
					this.loadModal = false;
				},
				failRes => {
					this.loadModal = false;
				}
			);
		},
		downloadSection(item) {
			this.loadModal = true;
			service.requestPost(
				'/note/downloadSection', 
				item,
				successRes => {
					// this.noteArray = successRes.data;
					this.loadModal = false;
				},
				failRes => {
					this.loadModal = false;
				}
			);
		}
	}
}
</script>

<style>
</style>
