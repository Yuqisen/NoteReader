import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		displayType: Boolean(uni.getStorageSync('displayType') | false),
		fontSize: Number(uni.getStorageSync('fontSize') | 20)
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