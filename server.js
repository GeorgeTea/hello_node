var http = require('http');
var url = require('url');
function start(route, handle){
	http.createServer(function(request, response){
		var postData = '';
		var pathname = url.parse(request.url).pathname;
		console.log('Request for ' + pathname + ' received.');
		request.addListener('data', function(postDataChunk){
			postData += postDataChunk;
			console.log('Received POST data chunk:' + postDataChunk);
		});
		request.addListener('end', function(){
			route(handle, pathname, response, postData);
		});
	}).listen(8888, '127.0.0.1');
	console.log('send message service running at 8888.');
}
function start(route, handle){
	http.createServer(function(request, response){
		var pathname = url.parse(request.url).pathname;
		console.log('Request for ' + pathname + ' received.');
		route(handle, pathname, request, response);
	}).listen(8888, '127.0.0.1');
	console.log('upload file service running at 8888');
}
exports.start = start;