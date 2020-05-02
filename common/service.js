const SERVER_URL_DEFAULT = 'http://reader.yyt.ln.cn/s';
// const SERVER_URL_DEFAULT = 'http://localhost:8080';

/**
 * 发送网络GET请求.
 * @param {Object} url 请求路径
 * @param {Object} success 请求成功时的回调函数
 * @param {Object} fail 请求失败时的回调函数
 */
const requestGet = function(url, data, success, fail) {
	uni.request({
		url: SERVER_URL_DEFAULT + url,
		method: 'GET',
		header: {
			'Content-Type': 'application/json'
		},
		data: data,
		success: success,
		fail: fail
	});
}

/**
 * 发送网络Post请求
 * @param {Object} url 请求地址
 * @param {Object} data 发送数据
 * @param {Object} success 请求成功时的回调函数
 * @param {Object} fail 请求失败时的回调函数
 */
const requestPost = function(url, data, success, fail, failFilter = true) {
	uni.request({
		url: SERVER_URL_DEFAULT + url,
		method: 'POST',
		header: {
			'Content-Type': 'application/json'
		},
		data: data,
		success: success,
		fail: fail
	});
}

export default {
	requestGet,
	requestPost
}