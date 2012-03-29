$.get('http://openapi.etsy.com/v2/taxonomy/categories?api_key=tia49fh9iqjcrukurpbyqtv5', function(data) {
	console.log(data);

	var items = [];
	var results = data.results;
	console.log(results);
	for (var i = 0; i < results.length; i++) {
	    var category = results[i].name;
		var name = results[i].name;
		var short_name = results[i].short_name;
		var item = {
			name: name,
			short_name: short_name,
			items: []
		};
		
		console.log(category);
        // if(category == "everything_else"){
		    $.ajax({
    			url: 'http://openapi.etsy.com/v2/taxonomy/categories/' + category + '?api_key=tia49fh9iqjcrukurpbyqtv5',
    			success: function(data) {
    				var results = data.results;
    				for (j = 0; j < results.length; j++) {
    					try {

    						var name = results[j].name;
    						var short_name = results[j].short_name;

    						item.items[j] = {
    							name: name,
    							short_name: short_name,
    							items: []
    						}
                            console.log(category + '/' + name);
    						$.ajax({
    							url: 'http://openapi.etsy.com/v2/taxonomy/categories/' + category + '/' + name + '?api_key=tia49fh9iqjcrukurpbyqtv5',
    							success: function(data) {
    								var results = data.results
    								try {
                                        if(results.length == 0){
                                            delete item.items[j].items;
                                            item.items[j].leaf = true;
                                        }else{
                                            for (k = 0; k < results.length; k++) {
        									    var name = results[k].name;
                        						var short_name = results[k].short_name;

        										item.items[j].items[k] = {
        											name: name,
        											short_name: short_name,
        											leaf: true
        										}
        									}
                                        }
    									
    								} catch(err) {

    								}
    							},
    							async: false
    						});
    					}catch(err){
    					    console.log(err);
    					}
    				}
    			},
    			async: false
    		});
        // }
		

		items.push(item);
	}
	window.items = items;
	console.log('all items are', items);
	console.log(JSON.stringify(items));
});
