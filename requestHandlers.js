//var exec = require('child_process').exec;
var querystring = require('querystring');
var fs = require('fs');
var formidable = require('formidable');
function start(request, response){
	console.log('Request handler \'start\' called.');
	var content = 'empty';
	/*exec('find ./', 
		function(error, stdout, stderr){
		response.writeHead(200, {'Content-Type': 'text-plain'});
		response.write(stdout);
		response.end();
	});*/
	var body = '<html>'+
				'<head>'+
				'<meta http-equiv="Content-Type" content="text/html; '+
				'charset=UTF-8" />'+
				'</head>'+
				'<body>'+
				'<form action="/upload" method="post">'+
				'<textarea name="text" rows="20" cols="60"></textarea>'+
				'<input type="submit" value="Submit text" />'+
				'</form>'+
				'<form action="/upload" enctype="multipart/form-data" method="post">'+
				'<input type="file" name="upload"/>'+
				'<input type="submit" value="Upload file" />'+
				'</form>'+
				'</body>'+
				'</html>';
	response.writeHead(200, {'Content-Type': 'text-plain'});
	response.write(body);
	response.end();
}
function upload(response, postData){
	console.log('Request handler \'upload\' called.');
	response.writeHead(200, {'Content-Type': 'text-plain'});
	response.write('You have sent:' + querystring.parse(postData).text);
	response.end();
}
function show(request, response){
	console.log('Request handler \'show\' called.');
	fs.readFile('/Users/george/Downloads/test.jpg', 'binary', function(error, file){
		if(error){
			response.writeHead(500, {'Content-Type': 'text-plain'});
			response.write(error + '\n');
			response.end();
		} else {
			response.writeHead(200, {'Content-Type': 'image/jpg'});
			response.write(file, 'binary');
			response.end();
		}
	});
}
function upload(request, response){
	console.log('Request handler \'upload\' called.');
	var form = new formidable.IncomingForm();
    form.parse(request, function(err, fields, files) {
    	fs.renameSync(files.upload.path, "/Users/george/Downloads/test.jpg");
    	response.writeHead(200, {'content-type': 'text/html'});
    	response.write("received image:<br/>");
    	response.write("<img src='/show' />");
		response.end();
    });
}
exports.start = start;
exports.upload = upload;
exports.show = show;