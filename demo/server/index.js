var express = require('express');

var url=require('url');

var app = express();

// 处理跨域问题
var allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type,xsrf-token');
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
};

app.use(allowCrossDomain);

app.get('/', function(req, res) {
	res.send('hello world');
});

app.post('/', function(req, res) {
	res.send('Got a POST request');
});

app.all('/secret', function(req, res, next) {
	res.send('secret');
	console.log('在/secret路径下，无论是什么请求，都加载中间件');
});

var server = app.listen(9000, function() {
	/*监听端口*/
	var host = server.address().address;
	var port = server.address().port;
	console.log('example app listening at http://%s:%s', host, port); /*控制台输出*/
});
