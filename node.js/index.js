var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var http = require("http");

var handle = {}
handle["/"] = requestHandlers.root;
handle["/treasuries"] = requestHandlers.treasuries;
handle["/upload"] = requestHandlers.upload;

var DATA = {
	treasuries: ""
};

var timer = 0;

setInterval(function() {
    var timer = timer + 1000;
    compileTreasuries();
},
60 * 60 * 1000);

compileTreasuries();
console.log(DATA);

function compileTreasuries() {
    var options = {
        host: 'openapi.etsy.com',
        port: 80,
        path: '/v2/treasuries?api_key=tia49fh9iqjcrukurpbyqtv5'
    };

    var treasuries = "";
    var ifsRequest = http.get(options,
    function(ifsResponse) {

        ifsResponse.setEncoding("utf8");

        ifsResponse.on("data",
        function(data) {
            treasuries += data;

        });


        ifsResponse.on("end",
        function() {
            getListingDetails(treasuries);


        });



    });


	function getListingDetails(treasuries){
		var parsedTreasuries = JSON.parse(treasuries);
	    var listingIds = [];
	    for (var i = 0; i < parsedTreasuries.results.length; i++) {
	        var listings = parsedTreasuries.results[i].listings;
	        for (var j = 0; j < listings.length; j++) {
	            if(j<4){
					listingIds.push(listings[j].data.listing_id);
				}else if(j > 3 ){
					listings[j] = "";
				}
	        }
	    }

		console.log(listingIds);
	    var options = {
	        host: 'openapi.etsy.com',
	        port: 80,
	        path: '/v2/listings/' + listingIds.join() + '?api_key=tia49fh9iqjcrukurpbyqtv5&includes=Images:1'
	    };

	    var listData = "";
	    var ifsRequest = http.get(options,
	    function(ifsResponse) {

	        ifsResponse.setEncoding("utf8");

	        ifsResponse.on("data",
	        function(data) {
	            listData += data;

	        });


	        ifsResponse.on("end",
	        function() {
	            var parsedListData = JSON.parse(listData);
				console.log('parsedListData.results.length');
				console.log(parsedListData.results.length);
				for(var i = 0; i < parsedListData.results.length; i++){
					var image = parsedListData.results[i].Images[0].url_75x75;
					var listingId = parsedListData.results[i].listing_id;
					//console.log(listingId);
					console.log('i is', i);
					for (var j = 0; j < parsedTreasuries.results.length; j++) {
				        var listings = parsedTreasuries.results[j].listings;
				        for (var k = 0; k < 4; k++) {
				            if(listingId == listings[k].data.listing_id){
								listings[k].data.image_url = image; 
							}
				        }
				    }
				}
				console.log('end of the loop');

				// end of adding the listing images

				DATA.treasuries = JSON.stringify(parsedTreasuries);

				console.log(parsedTreasuries);


	        });



	    });

	}
}



server.start(router.route, handle, DATA);