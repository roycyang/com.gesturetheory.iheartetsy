ETSY = {
	addToFavorites: function(id, msg) {
		console.log('id is ' + id);
		var url = 'http://openapi.etsy.com/v2/users/__SELF__/favorites/listings/' + id;
		oauth.post(url, {}, function(data) {
		    
			console.log(data);
			ETSY.updateFavoritesInfo();
			if (msg) {
				ETSY.alert(msg);
			}
		},
		function(data) {
			// ETSY.alert('Sorry but there is a problem connecting with Etsy. Please try again later!');
		});
		

	},
	
	removeFromFavorites: function(id, msg) {
		console.log('id is ' + id);
		var url = 'http://openapi.etsy.com/v2/users/__SELF__/favorites/listings/' + id + '?method=DELETE';
		oauth.post(url, {}, function(data) {
			ETSY.updateFavoritesInfo();
			if (msg) {
				ETSY.alert(msg);
			}
		},
		function(data) {
            // ETSY.alert('Sorry but there is a problem connecting with Etsy. Please try again later!');
		});

	},
	
	updateFavoritesInfo: function(offset){
		var offset = offset || 0;
		if(offset){
			var url = 'http://openapi.etsy.com/v2/users/__SELF__/favorites/listings?limit=100&offset=' + offset;
		}else{
			var url = 'http://openapi.etsy.com/v2/users/__SELF__/favorites/listings?limit=100';
		}
		
		oauth.get(url, function(data) {
			var data = JSON.parse(data.text);
			
			var listingIds = [];
			for(i = 0; i < data.results.length; i++){
				listingIds.push(data.results[i].listing_id);
			}
			
			if(offset){
				localStorage['favorites_listing_ids'] = localStorage['favorites_listing_ids'] + listingIds.join();
			}else{
				localStorage['favorites_listing_ids'] = listingIds.join();
			}
			
			if(data.count > (100 + offset)){
				ETSY.updateFavoritesInfo(100 + offset);
			}
			
			localStorage['favorites_count'] = data.count;
            // console.log("localStorage['favorites_listing_ids']", localStorage['favorites_listing_ids']);
            // console.log("localStorage['favorites_count']", localStorage['favorites_count']);
			
			// update the left rail
			$('.favorites-label span').html(data.count);
			

		},
		function(data) {
			ETSY.alert('Sorry but there is a problem connecting with Etsy. Please try again later!');
		});
	},

	addToCart: function(id, msg) {
		console.log('id is ' + id);
		var url = 'http://openapi.etsy.com/v2/users/__SELF__/carts';
		oauth.post(url, {
			'listing_id': id
		},
		function(data) {
			ETSY.updateCartInfo();
		    // adding this to my cart!
			console.log(data);
			if (msg) {
				ETSY.alert(msg);
			}
		},
		function(data) {
            // ETSY.alert('Sorry but there is a problem connecting with Etsy. Please try again later!');
		});
	},
	
	removeFromCart: function(id, msg) {
		console.log('id is ' + id);
		var url = 'http://openapi.etsy.com/v2/users/__SELF__/carts?method=DELETE';

		oauth.post(url, {
			'listing_id': id
		},
		function(data) {
			ETSY.updateCartInfo();
		    // adding this to my cart!
			console.log(data);
			if (msg) {
				ETSY.alert(msg);
			}
		},
		function(data) {
            // ETSY.alert('Sorry but there is a problem connecting with Etsy. Please try again later!');
		});
	},
	
	updateCartInfo: function(){
		var url = 'http://openapi.etsy.com/v2/users/__SELF__/carts';
		
		oauth.get(url, 
		function(data) {
		    // adding this to my cart!
            // console.log(JSON.parse(data.text));
			var data = JSON.parse(data.text);
			var listingIds = [];
			for(i = 0; i < data.results.length; i++){
				for (j = 0; j < data.results[i].listings.length; j++){
					listingIds.push(data.results[i].listings[j].listing_id);
				}
			}			
			localStorage['cart_listing_ids'] = listingIds.join();
			localStorage['cart_count'] = data.count;
            // console.log("localStorage['cart_listing_ids']", localStorage['cart_listing_ids']);
            // console.log("localStorage['cart_count']", localStorage['cart_count']);
			
			// update the left rail
			$('.cart-label span').html(data.count);
		},
		function(data) {
			ETSY.alert('Sorry but there is a problem connecting with Etsy. Please try again later!');
		});
		
	},

	alert: function(msg) {
		try {
			navigator.notification.alert(msg);
		} catch(err) {
			alert(msg);
		}
	},
	
	confirm: function(msg, callback) {
		try {
			navigator.notification.confirm(msg, callback);
		}
		catch(err) {
			var msg = Ext.Msg.confirm('Confirm', msg, callback);
			msg.setZIndex(100000000);
		}
	},
}