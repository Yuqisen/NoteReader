import Vue from 'vue'
import App from './App'
import store from './store'

import noteList from './pages/display/note-list.vue';
Vue.component('note-list', noteList);

import search from './pages/search/search.vue';
Vue.component('search', search);

import cuCustom from './colorui/components/cu-custom.vue';
Vue.component('cu-custom',cuCustom);

Vue.config.productionTip = false
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
