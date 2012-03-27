ETSY = {
	addToFavorites: function(id, msg) {
		console.log('id is ' + id);
		var url = 'http://openapi.etsy.com/v2/users/__SELF__/favorites/listings/' + id;
		oauth.post(url, function(data) {
			console.log(data);
			if (msg) {
				ETSY.alert(msg);
			}
		},
		function(data) {

		});

		// temporary
		if (msg) {
			ETSY.alert(msg);
		}

	},

	addToCart: function(id, msg) {
		console.log('id is ' + id);
		var url = 'http://openapi.etsy.com/v2/users/__SELF__/carts';

		oauth.post(url, {
			'listing_id': id
		},
		function(data) {
			console.log(data);
			if (msg) {
				ETSY.alert(msg);
			}
		},
		function(data) {
		});

		// temporary
		if (msg) {
			ETSY.alert(msg);
		}

	},

	alert: function(msg) {
		try {
			navigator.notification.alert(msg);
		} catch(err) {
			alert(msg);
		}
	}
}
