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
handle["/categoriesIndex"] = requestHandlers.categoriesIndex

// =============================================================================================
// = Equivalent of a CRON job in PHP.  We just run the updater according to the cacheInMinutes =
// =============================================================================================
 init();

setInterval(function() {
    init();
},
GLOBAL.cacheInMinutes * 60 * 1000);

GLOBAL.categoriesIndex = {
    results: []
}

server.start(router.route, handle, DATA);

// ===========================================
// = Init function that loads all the caches =
// ===========================================
function init() {
    var categories = [{"category_name":"accessories","short_name":"Accessories"},{"category_name":"art","short_name":"Art"},{"category_name":"bags_and_purses","short_name":"Bags and Purses"},{"category_name":"bath_and_beauty","short_name":"Bath and Beauty"},{"category_name":"books_and_zines","short_name":"Books and Zines"},{"category_name":"candles","short_name":"Candles"},{"category_name":"ceramics_and_pottery","short_name":"Ceramics and Pottery"},{"category_name":"children","short_name":"Children"},{"category_name":"clothing","short_name":"Clothing"},{"category_name":"crochet","short_name":"Crochet"},{"category_name":"dolls_and_miniatures","short_name":"Dolls and Miniatures"},{"category_name":"everything_else","short_name":"Everything Else"},{"category_name":"furniture","short_name":"Furniture"},{"category_name":"geekery","short_name":"Geekery"},{"category_name":"glass","short_name":"Glass"},{"category_name":"holidays","short_name":"Holidays"},{"category_name":"housewares","short_name":"Housewares"},{"category_name":"jewelry","short_name":"Jewelry"},{"category_name":"knitting","short_name":"Knitting"},{"category_name":"music","short_name":"Music"},{"category_name":"needlecraft","short_name":"Needlecraft"},{"category_name":"paper_goods","short_name":"Paper Goods"},{"category_name":"patterns","short_name":"Patterns"},{"category_name":"pets","short_name":"Pets"},{"category_name":"plants_and_edibles","short_name":"Plants and Edibles"},{"category_name":"quilts","short_name":"Quilts"},{"category_name":"supplies","short_name":"Supplies"},{"category_name":"toys","short_name":"Toys"},{"category_name":"vintage","short_name":"Vintage"},{"category_name":"weddings","short_name":"Weddings"},{"category_name":"woodworking","short_name":"Woodworking"}];
    compileTreasuries(0);
    compileTreasuries(25);
    compileTreasuries(50);
    compileTreasuries(75);
    
    for (i = 0; i < categories.length; i++) {
        compileCategories(categories[i]);
        compileCategorySnapshots(categories[i]);
    }
}

function compileCategorySnapshots(category) {
    var options,
    categoryData,
    parsedCategoryData;
    
    categoryData = '';
    options = {
        host: 'openapi.etsy.com',
        port: 80,
        path: '/v2/listings/active?api_key=tia49fh9iqjcrukurpbyqtv5&category=' + category.category_name + '&includes=Images:1&limit=4'
    };
    
    http.get(options,
    function(response) {
        response.setEncoding("utf8");

        response.on('data',
        function(data) {
            categoryData += data;
        });

        response.on('end',
        function(data) {
            
            parsedCategoryData = JSON.parse(categoryData);
            var categoryInfo = {
                title: category.category_name,
                id: category.category_name,
                short_name: category.short_name,
                category_index: true,
                listings: parsedCategoryData.results
            };
            
            GLOBAL.categoriesIndex.results.push(categoryInfo);
            console.log('GLOBAL.categoriesIndex.results.length: ' + GLOBAL.categoriesIndex.results.length);
            if(GLOBAL.categoriesIndex.results.length == 31){
                DATA['categoriesIndex'] = JSON.stringify(GLOBAL.categoriesIndex);
                GLOBAL.categoriesIndex.results = [];
            }
        });
    });

    





    
};


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
        path: '/v2/listings/active?api_key=tia49fh9iqjcrukurpbyqtv5&category=' + category.category_name + '&includes=Images:6&limit=100'
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
            DATA[category.category_name] = categoryData;
        });
    });
};