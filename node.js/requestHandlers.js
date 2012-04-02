function root(response, DATA) {
	console.log(response);
	var body = '<html>'+
	    '<head>'+
	    '<meta http-equiv="Content-Type" '+
	    'content="text/html; charset=UTF-8" />'+
	    '<title>Etsy API</title></head>'+
	    '<body>'+
	    '<p>Here are some of the APIs that can be called</p>' +
		'<ul>'+
			'<li><a href="/treasuries">/treasuries</a></li>' +
		'<ul>'+
	    '</body>'+
	    '</html>';
	
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(body);
		response.end();
}

function treasuries(response, DATA) {
  console.log("Request handler 'start' was called.");

    response.writeHead(200, {"Content-Type": "application/json"});
	
    response.write(DATA.treasuries);
    response.end();
}

function upload(response) {
  //response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello Upload");
  response.end();
}

function art (response, DATA) {
  
  response.writeHead(200, {"Content-Type": "application/json"});
  response.write(DATA.art);
  
  response.end();
}

exports.root = root;
exports.treasuries = treasuries;
exports.upload = upload;
exports.art = art;