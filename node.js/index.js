var DATA = {
    treasuries: '{}',
};

var GLOBAL = {
    cacheInMinutes: 1000
};

// ======================
// = Initialize NODE.JS =
// ======================
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var http = require("http");

var handle = {}
handle["/"] = requestHandlers.root;
handle["/treasuries"] = requestHandlers.treasuries;
handle["/treasury"] = requestHandlers.treasury;
handle["/categories"] = requestHandlers.categories

// =============================================================================================
// = Equivalent of a CRON job in PHP.  We just run the updater according to the cacheInMinutes =
// =============================================================================================
 init();

setInterval(function() {
    init();
},
GLOBAL.cacheInMinutes * 60 * 1000);

server.start(router.route, handle, DATA);

// ===========================================
// = Init function that loads all the caches =
// ===========================================
function init() {
    var categories = ["accessories", "art", "bags_and_purses", "bath_and_beauty", "books_and_zines", "candles", "ceramics_and_pottery", "children", "clothing", "crochet", "dolls_and_miniatures", "everything_else", "furniture", "geekery", "glass", "holidays", "housewares", "jewelry", "knitting", "music", "needlecraft", "paper_goods", "patterns", "pets", "plants_and_edibles", "quilts", "supplies", "toys", "vintage", "weddings", "woodworking"];

    compileTreasuries(0);
    compileTreasuries(25);
    compileTreasuries(50);
    compileTreasuries(75);
    for (i = 0; i < categories.length; i++) {
        compileCategories(categories[i]);
    }
}

// =================================
// = Setting up the Treasury Cache =
// =================================
function compileTreasuries(offset) {
    var options = {
        host: 'openapi.etsy.com',
        port: 80,
        path: '/v2/treasuries?api_key=tia49fh9iqjcrukurpbyqtv5&offset=' + offset
    };

    var treasuries = "";
    var request = http.get(options,
    function(response) {
        response.setEncoding("utf8");
        response.on("data",
        function(data) {
            treasuries += data;

        });

        response.on("end",
        function() {
            getListingDetails(treasuries);
            getTreasuryListings(treasuries);
        });
    });

    function getTreasuryListings(treasuries) {
        var parsedTreasuries = JSON.parse(treasuries);
        for (var i = 0; i < parsedTreasuries.results.length; i++) {
            getSingleTreasury(parsedTreasuries.results[i])
        }
    }

	function getSingleTreasury(parsedTreasury){
		var treasury_id = parsedTreasury.id;
		console.log('treasury_id ' + treasury_id);
        var listingIds = [];
        var listings = parsedTreasury.listings;
        for (var j = 0; j < listings.length; j++) {
        	listingIds.push(listings[j].data.listing_id);
        }
        // after getting a list of treasuries ids;
        var options = {
            host: 'openapi.etsy.com',
            port: 80,
            path: '/v2/listings/' + listingIds.join() + '?api_key=tia49fh9iqjcrukurpbyqtv5&includes=Images:6'
        };
        var listData = "";
        var request = http.get(options,
        	function(response) {
                response.setEncoding("utf8");
                response.on("data",
                function(data) {
                    listData += data;

                });

                response.on('end',
                function() {
                    DATA[treasury_id] = listData;
					console.log('\n\n\n\n\n\nADDED TREASURY ' + treasury_id);
                });
            }
		);
	}

    function getListingDetails(treasuries) {
        var parsedTreasuries = JSON.parse(treasuries);
        var listingIds = [];
        for (var i = 0; i < parsedTreasuries.results.length; i++) {
            var listings = parsedTreasuries.results[i].listings;
            for (var j = 0; j < listings.length; j++) {
                if (j < 4) {
                    listingIds.push(listings[j].data.listing_id);
                } else if (j > 3) {
                    listings[j] = "";
                }
            }
        }

        // console.log(listingIds);
        var options = {
            host: 'openapi.etsy.com',
            port: 80,
            path: '/v2/listings/' + listingIds.join() + '?api_key=tia49fh9iqjcrukurpbyqtv5&includes=Images:1'
        };

        var listData = "";
        var request = http.get(options,
        function(response) {

            response.setEncoding("utf8");

            response.on("data",
            function(data) {
                listData += data;

            });


            response.on("end",
            function() {
                var parsedListData = JSON.parse(listData);
                // console.log('parsedListData.results.length');
                // console.log(parsedListData.results.length);

                for (var i = 0; i < parsedListData.results.length; i++) {
                    try {
                        var image = parsedListData.results[i].Images[0].url_170x135;
                        var listingId = parsedListData.results[i].listing_id;
                        //console.log(listingId);
                        // console.log('i is', i);
                        for (var j = 0; j < parsedTreasuries.results.length; j++) {
                            var listings = parsedTreasuries.results[j].listings;
                            for (var k = 0; k < 4; k++) {
                                if (listingId == listings[k].data.listing_id) {
                                    listings[k].data.image_url = image;
                                }
                            }
                        }
                    } catch(err) {
                        // console.log('error in ', i)
                    }

                }
                // console.log('end of the loop');

                // end of adding the listing images
                //DATA.treasuries = JSON.stringify(parsedTreasuries);
                var parsedDataTreasuries = JSON.parse(DATA.treasuries);

                if (!parsedDataTreasuries.results) {
                    DATA.treasuries = JSON.stringify(parsedTreasuries);
                } else if (parsedDataTreasuries.results.length == 100) {
                    DATA.treasuries = JSON.stringify(parsedTreasuries);
                } else {
                    for (i = 0; i < parsedTreasuries.results.length; i++) {
                        parsedDataTreasuries.results.push(parsedTreasuries.results[i]);
                    }
                    DATA.treasuries = JSON.stringify(parsedDataTreasuries);
                }


            });



        });

    }
}

function compileCategories(category) {
    var options,
    categoryData,
    request;

    categoryData = '';


    options = {
        host: 'openapi.etsy.com',
        port: 80,
        path: '/v2/listings/active?api_key=tia49fh9iqjcrukurpbyqtv5&category=' + category + '&includes=Images:6&limit=100'
    };

    http.get(options,
    function(response) {
        response.setEncoding("utf8");

        response.on('data',
        function(data) {
            categoryData += data;
        });

        response.on('end',
        function() {
            DATA[category] = categoryData;
        });
    });
};