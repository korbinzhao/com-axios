'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (params) {
	var api = params.api,
	    data = params.data,
	    method = params.method,
	    apiMap = params.apiMap,
	    baseURL = params.baseURL,
	    timeout = params.timeout,
	    _params$isCancelReque = params.isCancelRequest,
	    isCancelRequest = _params$isCancelReque === undefined ? false : _params$isCancelReque;
	/**
  * pending: 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
  * removePending函数: 在每一次请求前 和 请求响应后 都会遍历一下 pending, 如果是同一次请求，就会取消掉，相同的上一次请求
  */

	var CancelToken = _axios2.default.CancelToken; // 使用 cancel token 取消请求
	window.axios_pending = window.axios_pending ? window.axios_pending : [];
	var pending = window.axios_pending;

	var removePending = function removePending(config) {
		pending.forEach(function (ite, index) {
			var cur_reqId = config.url + '&' + config.method;
			if (ite.reqId && ite.reqId === cur_reqId) {
				//当当前请求在数组中存在时执行函数体
				ite.candelFunc && ite.candelFunc(); //执行取消操作
				pending.splice(index, 1); //把这条记录从数组中移除
			}
		});
	};

	data = data ? data : {};
	method = method ? method : 'get';
	timeout = timeout || 30000;

	baseURL = baseURL || '/';

	var service = _axios2.default.create({
		// `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
		baseURL: baseURL,
		timeout: timeout
	});

	var methodMap = ['post', 'put', 'delete'];
	var lowerMethod = method.toLowerCase();
	var options = {
		method: lowerMethod,
		url: apiMap && apiMap[api] || api
	};

	methodMap.includes(lowerMethod) ? options.data = data : options.params = data;

	//添加请求拦截器
	service.interceptors.request.use(function (config) {
		config.headers['xsrf-token'] = window._csrf;
		config.headers['X-Requested-With'] = 'XMLHttpRequest';
		removePending(config); // 在一个ajax发送前执行一下取消操作
		config.cancelToken = new CancelToken(function executor(candelFunc) {
			// 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
			if (isCancelRequest) {
				pending.push({ reqId: config.url + '&' + config.method, candelFunc: candelFunc });
			}
		});
		return config;
	}, function (error) {
		return Promise.reject(error);
	});

	//添加响应拦截器
	service.interceptors.response.use(function (response) {
		removePending(response.config); //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
		return response;
	}, function (error) {
		// console.log('err' + error);
		return Promise.reject(error);
	});

	return new Promise(function (resolve, reject) {
		service(options).then(function (res) {
			resolve(res.data);
		}).catch(function (err) {
			reject(err);
		});
	});
};