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
    if(DATA.treasuries){
        response.write(DATA.treasuries);
    }  
    response.end();
}

function treasury(response, DATA, request) {
  var url = request.url;
  treasury = url.split('=')[1];
  parsedtreasury = treasury.split('&')[0];
  response.writeHead(200, {"Content-Type": "application/json"});
  // response.write(callback + '(' + DATA.art + ')');
  console.log('parsedtreasury is\n\n\n\n\n\n\n\n\n\n\n' + parsedtreasury);
  if(DATA[parsedtreasury]){
   response.write(DATA[parsedtreasury]);     
  }

  
  response.end();
}

function categoriesIndex(response, DATA, request) {
  response.writeHead(200, {"Content-Type": "application/json"});
  if(DATA.categoriesIndex){
   response.write(DATA.categoriesIndex);     
  }  
  response.end();
}

function categories (response, DATA, request) {
    var url = request.url;
  category = url.split('=')[1];
  parsedcategory = category.split('&')[0];
  response.writeHead(200, {"Content-Type": "application/json"});
  // response.write(callback + '(' + DATA.art + ')');
  console.log('parsedcategory is' + parsedcategory);
  if(DATA[parsedcategory]){
   response.write(DATA[parsedcategory]);     
  }

  
  response.end();
}



exports.root = root;
exports.treasuries = treasuries;
exports.treasury = treasury;
exports.categories = categories;
exports.categoriesIndex = categoriesIndex;