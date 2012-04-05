function locChanged(loc) {
	console.log('THE LOCATION CHANGED!' + loc);
	// The supplied oauth_callback_url for this session is being loaded
	if (loc.indexOf("http://www.etsy.com/?") >= 0) {
		console.log('inside completeAuthorization');
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
	oauth.setAccessToken([parsedParams.oauth_token, GLOBAL.params.oauth_token_secret]);
	
	verifier = parsedParams.oauth_verifier;

    console.log('trying to complete the authorization!!!!!');
	// Exchange request token for access token
	var url = 'http://openapi.etsy.com/v2/oauth/access_token?oauth_verifier=' + verifier;
	console.log('URL IS\n\n\n' + url)
	oauth.get(url, function(data) {
		console.log('data is ********' + data);
		window.accessParams = accessParams = {};
		var qvars_tmp = data.text.split('&');
		for (var i = 0; i < qvars_tmp.length; i++) {
			var y = qvars_tmp[i].split('=');
			accessParams[y[0]] = decodeURIComponent(y[1]);
		}
		console.log(accessParams.oauth_token);
		console.log(accessParams.oauth_token_secret);
		console.log('\n\n\n\n\n');

		
		

		// Save access token/key in localStorage
		localStorage['accessTokenKey'] = accessParams.oauth_token;
		localStorage['accessTokenSecret'] = accessParams.oauth_token_secret;

		Cordova.exec("ChildBrowserCommand.close");
		oauth.setAccessToken([accessParams.oauth_token, accessParams.oauth_token_secret]);
		oauth.get('http://openapi.etsy.com/v2/users/__SELF__?includes=Profile', function(data) {
			console.log('inside the oauth');
			window.info = JSON.parse(data.text);
			if (info.results[0].Profile.first_name) {
				name = info.results[0].Profile.first_name + " " + info.results[0].Profile.last_name;
			} else {
				name = info.results[0].login_name;
			}
			localStorage.setItem('name', name);

			// 
			// console.log(info);
			// Ext.getCmp('cartToolbar').setTitle(name + '\'s Cart')
			// Ext.getCmp('heartToolbar').setTitle(name + '\'s Favorites')
			ETSY.toggleSignIn();
		},
		function(data) {

		});
		
		window.plugins.childBrowser.close();
	},
	function(data) {

	});
}



// function initUserCustomization() {
// 	var oauth;
// 	var options = {
// 		consumerKey: 'tia49fh9iqjcrukurpbyqtv5',
// 		consumerSecret: '2dvoqadnxo',
// 		accessTokenKey: GLOBAL.accessTokenKey,
// 		accessTokenSecret: GLOBAL.accessTokenSecret
// 	};
// 
// 	var name = "";
// 
// 	oauth = OAuth(options);
// 	oauth.get('http://openapi.etsy.com/v2/users/__SELF__?includes=Profile', function(data) {
// 		window.info = JSON.parse(data.text);
// 		if (info.results[0].Profile.first_name) {
// 			name = info.results[0].Profile.first_name + " " + info.results[0].Profile.last_name;
// 		} else {
// 			name = info.results[0].login_name;
// 		}
// 		console.log(info);
// 		Ext.getCmp('cartToolbar').setTitle(name + '\'s Cart')
// 		Ext.getCmp('heartToolbar').setTitle(name + '\'s Favorites')
// 	},
// 	function(data) {
// 
// 	});
// 
// 	Ext.getCmp('favoritesPanelLoginButton').hide();
// 	Ext.getCmp('favoritesPanelSignOutButton').show();
// 
// 	Ext.getCmp('cartPanelSignInButton').hide();
// 	Ext.getCmp('cartPanelSignOutButton').show();
// }



// function initCart() {
//  var oauth;
//  var options = {
//      consumerKey: 'tia49fh9iqjcrukurpbyqtv5',
//      consumerSecret: '2dvoqadnxo',
//      accessTokenKey: GLOBAL.accessTokenKey,
//      accessTokenSecret: GLOBAL.accessTokenSecret
//  };
// 
//  oauth = OAuth(options);
//  oauth.get('http://openapi.etsy.com/v2/users/__SELF__/carts?includes=Listings', 
//      function(data) {
//          var info = JSON.parse(data.text);
//          var results = info.results;
//          console.log('info is', info);
//          var cart = "Cart items:<br/></br>";
//          for (i = 0; i < results.length; i++) {
//              var listings = results[i].Listings;
//              for(j = 0; j < listings.length; j++){
//                  var item = listings[j];
//                  if(item.title){
//                      cart = cart + item.title + "<br/>";
//                  }
//                  
//              }
//          }
//          Ext.getCmp('cartContent').setHtml(cart);
//      },
//      function(data) {
//          
//      }
//  );
// }
// 
// function initFavorites() {
//  var oauth;
//  var options = {
//      consumerKey: 'tia49fh9iqjcrukurpbyqtv5',
//      consumerSecret: '2dvoqadnxo',
//      accessTokenKey: GLOBAL.accessTokenKey,
//      accessTokenSecret: GLOBAL.accessTokenSecret
//  };
// 
//  oauth = OAuth(options);
//  oauth.get('http://openapi.etsy.com/v2/users/__SELF__/favorites/listings', 
//      function(data) {
//          var info = JSON.parse(data.text);
//          var results = info.results;
//          console.log('favorite items are', info);
//          // var cart = "Favorite items:<br/></br>";
//          //            for (i = 0; i < results.length; i++) {
//          //                var listings = results[i].Listings;
//          //                for(j = 0; j < listings.length; j++){
//          //                    var item = listings[j];
//          //                    if(item.title){
//          //                        cart = cart + item.title + "<br/>";
//          //                    }
//          //                    
//          //                }
//          //            }
//          //            Ext.getCmp('cartContent').setHtml(cart);
//      },
//      function(data) {
//          
//      }
//  );
// }
