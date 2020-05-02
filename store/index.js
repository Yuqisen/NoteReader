import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

var imei = null;
// #ifdef APP-PLUS
plus.device.getInfo({
  success: function(e) {
    imei = e.uuid;
  },
  fail: function(e) {
    imei = 'UNKONW_ANDROID';
  }
});
// #endif

const store = new Vuex.Store({
	state: {
		displayType: Boolean(uni.getStorageSync('displayType') | false),
		fontSize: Number(uni.getStorageSync('fontSize') | 20),
		imei: imei
	},
	mutations: {
		changeDisplayType(state, displayType) {
			uni.setStorageSync('displayType', displayType);
			state.displayType = displayType;
		},
		changeFontSize(state, fontSize) {
			uni.setStorageSync('fontSize', fontSize);
			state.fontSize = fontSize;
		}
	}
});

export default store;