<template>
	<view :class="!displayType?'day':'night'">
		<cu-custom :bgColor="!displayType ? 'bg-gradual-blue':'bg-night'" isBack="true" :backFunction="goBack">
			<block slot="content">{{title}}</block>
		</cu-custom>
		<view class="section" :class="!displayType?'':'night'" style="font-family: 'Kaiti';" :style="getTextStyle" v-for="(item, index) in content" :key="index" @longtap="openSetting">
			{{item}}
		</view>
		<view class="box" v-if="!loadModal" :class="!displayType?'day':'night'">
			<view class="cu-bar btn-group">
				<button class="cu-btn shadow-blur round" :class="!displayType?'bg-blue':'bg-grey'" :disabled="!note.canBefore" @click="prevPage">前一页</button>
				<button class="cu-btn shadow-blur round" :class="!displayType?'bg-blue':'bg-grey'" @click="goBack">目录</button>
				<button class="cu-btn shadow-blur round" :class="!displayType?'bg-blue':'bg-grey'" :disabled="!note.canAfter" @click="nextPage">后一页</button>
			</view>
		</view>
		<view class="cu-modal bottom-modal" :class="showSetting ? 'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white" style="text-align: center;">
					<view class="action text-blue"></view>
					<view class="action text-blue" @tap="hideSetting">关闭</view>
				</view>
				<view>
					<view class="flex">
						<view class="basis-lg margin-xs radius cu-item">
							<view class="cu-form-group bg-cyan light">
								<view class="title">显示模式</view>
								<switch class='orange radius iconfont switch-type' @change="SwitchD" :class="!displayType?'checked':''" :checked="!displayType?true:false"></switch>
							</view>
						</view>
					</view>
					<view class="flex">
						<view class="basis-lg margin-xs radius cu-item">
							<view class="cu-form-group bg-cyan light">
								<view class="title">字体</view>
								<view style="display: flex;">
									<view @tap="setFontSize(-1)" class="bg-green" style="width: 50rpx; height: 50rpx; display: flex;justify-content: center;align-items: center;border-radius: 8rpx;">-</view>
									<view style="border-radius: 8rpx;border: solid 2px #39b54a;margin: 0 10rpx;">
										<input type="number" maxlength="3" :value="fontSize" style="width: 80rpx;color: #39b54a;padding-right: 0;"/>
									</view>
									<view @tap="setFontSize(1)" class="bg-green" style="width: 50rpx; height: 50rpx; display: flex;justify-content: center;align-items: center;border-radius: 8rpx;">+</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-load load-modal" v-if="loadModal">
			<view class="gray-text">加载中...</view>
		</view>
	</view>
</template>

<script>
import service from '../../common/service.js';
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			title: "",
			content: [],
			loadModal: true,
			note: {
				id: 0,
				name: '',
				beforeId: 0,
				beforeTitle: '',
				afterId: 0,
				afterTitle: '',
				canBefore: false,
				canAfter: false
			},
			showSetting: false
		};
	},
	computed: {
		...mapState(['displayType', 'fontSize', 'imei']),
		getTextStyle() {
			return {fontSize: this.fontSize + 'px'};
		}
	},
	onLoad: function(option) {
		this.loadModal = true;
		this.note.id = option.noteId;
		this.note.name = option.title;
		service.requestGet(
			'/note/getSection/' + option.id,
			{},
			successRes => {
				this.note.beforeId = successRes.data.beforeId;
				if (this.note.beforeId != -1) {
					this.note.canBefore = true;
				}
				this.note.beforeTitle = successRes.data.beforeName;
				this.note.afterId = successRes.data.afterId;
				if (this.note.afterId != -1) {
					this.note.canAfter = true;
				}
				this.note.afterTitle = successRes.data.afterName;
				this.title = successRes.data.sectionDetail.title;
				this.content = successRes.data.sectionDetail.content;
				this.loadModal = false;
			},
			failRes => {
				this.loadModal = false;
			}
		);
		service.requestPost(
			'/note/updateRecord', 
			{
				noteId: this.note.id,
				sectionId: option.id,
				imei: this.imei
			},
			successRes => {
				this.loadModal = false;
			},
			failRes => {
				this.loadModal = false;
			}
		);
	},
	methods: {
		...mapMutations(['changeDisplayType', 'changeFontSize']),
		goBack() {
			uni.navigateTo({
				url:"/pages/display/section-list?id=" + this.note.id +"&name=" + this.note.name
			});
		},
		SwitchD(e) {
			this.changeDisplayType(!e.detail.value);
		},
		openSetting() {
			this.showSetting = true;
		},
		hideSetting() {
			this.showSetting = false;
		},
		setFontSize(val) {
			this.changeFontSize(this.fontSize + val);
		},
		prevPage() {
			uni.navigateTo({
				url:"/pages/display/section?id=" + this.note.beforeId +"&noteId=" + this.note.id +"&title=" + this.note.beforeTitle
			});
		},
		nextPage() {
			uni.navigateTo({
				url:"/pages/display/section?id=" + this.note.afterId +"&noteId=" + this.note.id +"&title=" + this.note.afterTitle
			});
		}
	}
}
</script>

<style>
.night {
	background-color: #8799a3;
}
.section {
	margin-bottom: .5rem;
	text-indent: 1.5rem;
}
.section.night {
	color: #333333;
	background-color: #8799a3;
}
.box.night {
	background-color: #333333;
}
.box.day {
	background-color: white;
}
</style>