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
		    // adding this to my cart!
			console.log(data);
			if (msg) {
				ETSY.alert(msg);
			}
		},
		function(data) {
		});



	},

	alert: function(msg) {
		try {
			navigator.notification.alert(msg);
		} catch(err) {
			alert(msg);
		}
	}
}

function locChanged(loc) {
	// The supplied oauth_callback_url for this session is being loaded
	if (loc.indexOf("http://www.etsy.com/?") >= 0) {
		completeAuthorization(loc);
	}
}

function completeAuthorization(loc) {
	var index, verifier = '';
	var params = loc.substr(loc.indexOf('?') + 1);
	var parsedParams = $.deparam(params);
	// console.log('params are', parsedParams);
	var oauth;
	var options = {
		consumerKey: 'tia49fh9iqjcrukurpbyqtv5',
		consumerSecret: '2dvoqadnxo',
		accessTokenKey: parsedParams.oauth_token,
		accessTokenSecret: GLOBAL.params.oauth_token_secret
	};

	oauth = OAuth(options);
	verifier = parsedParams.oauth_verifier;

    console.log('trying to complete the authorization!!!!!');
	// Exchange request token for access token
	var url = 'http://openapi.etsy.com/v2/oauth/access_token?oauth_verifier=' + verifier;
	console.log('URL IS\n\n\n' + url)
	oauth.get(url, function(data) {
		console.log('data is ********' + data);
		var accessParams = {};
		var qvars_tmp = data.text.split('&');
		for (var i = 0; i < qvars_tmp.length; i++) {
			var y = qvars_tmp[i].split('=');
			accessParams[y[0]] = decodeURIComponent(y[1]);
		}
		console.log('AppLaudLog: ' + accessParams.oauth_token + ' : ' + accessParams.oauth_token_secret);
		// $('#oauthStatus').html('<span style="color:green;">Success!</span>');
		// $('#stage-auth').hide();
		// $('#stage-data').show();
		oauth.setAccessToken([accessParams.oauth_token, accessParams.oauth_token_secret]);

		// Save access token/key in localStorage
		var accessData = {};
		accessData.accessTokenKey = accessParams.oauth_token;
		accessData.accessTokenSecret = accessParams.oauth_token_secret;
		localStorage.setItem('tokens', JSON.stringify(accessData));

		Cordova.exec("ChildBrowserCommand.close");

		initUserCustomization();
		// window.plugins.childBrowser.close();
	},
	function(data) {
		$('#oauthStatus').html('<span style="color:red;">Error during authorization</span>');
	});
}



function initUserCustomization() {
	var oauth;
	var options = {
		consumerKey: 'tia49fh9iqjcrukurpbyqtv5',
		consumerSecret: '2dvoqadnxo',
		accessTokenKey: GLOBAL.accessTokenKey,
		accessTokenSecret: GLOBAL.accessTokenSecret
	};

	var name = "";

	oauth = OAuth(options);
	oauth.get('http://openapi.etsy.com/v2/users/__SELF__?includes=Profile', function(data) {
		window.info = JSON.parse(data.text);
		if (info.results[0].Profile.first_name) {
			name = info.results[0].Profile.first_name + " " + info.results[0].Profile.last_name;
		} else {
			name = info.results[0].login_name;
		}
		console.log(info);
		Ext.getCmp('cartToolbar').setTitle(name + '\'s Cart')
		Ext.getCmp('heartToolbar').setTitle(name + '\'s Favorites')
	},
	function(data) {

	});

	Ext.getCmp('favoritesPanelLoginButton').hide();
	Ext.getCmp('favoritesPanelSignOutButton').show();

	Ext.getCmp('cartPanelSignInButton').hide();
	Ext.getCmp('cartPanelSignOutButton').show();
}



function initCart() {
 var oauth;
 var options = {
     consumerKey: 'tia49fh9iqjcrukurpbyqtv5',
     consumerSecret: '2dvoqadnxo',
     accessTokenKey: GLOBAL.accessTokenKey,
     accessTokenSecret: GLOBAL.accessTokenSecret
 };

 oauth = OAuth(options);
 oauth.get('http://openapi.etsy.com/v2/users/__SELF__/carts?includes=Listings', 
     function(data) {
         var info = JSON.parse(data.text);
         var results = info.results;
         console.log('info is', info);
         var cart = "Cart items:<br/></br>";
         for (i = 0; i < results.length; i++) {
             var listings = results[i].Listings;
             for(j = 0; j < listings.length; j++){
                 var item = listings[j];
                 if(item.title){
                     cart = cart + item.title + "<br/>";
                 }
                 
             }
         }
         Ext.getCmp('cartContent').setHtml(cart);
     },
     function(data) {
         
     }
 );
}

function initFavorites() {
 var oauth;
 var options = {
     consumerKey: 'tia49fh9iqjcrukurpbyqtv5',
     consumerSecret: '2dvoqadnxo',
     accessTokenKey: GLOBAL.accessTokenKey,
     accessTokenSecret: GLOBAL.accessTokenSecret
 };

 oauth = OAuth(options);
 oauth.get('http://openapi.etsy.com/v2/users/__SELF__/favorites/listings', 
     function(data) {
         var info = JSON.parse(data.text);
         var results = info.results;
         console.log('favorite items are', info);
         // var cart = "Favorite items:<br/></br>";
         //            for (i = 0; i < results.length; i++) {
         //                var listings = results[i].Listings;
         //                for(j = 0; j < listings.length; j++){
         //                    var item = listings[j];
         //                    if(item.title){
         //                        cart = cart + item.title + "<br/>";
         //                    }
         //                    
         //                }
         //            }
         //            Ext.getCmp('cartContent').setHtml(cart);
     },
     function(data) {
         
     }
 );
}
