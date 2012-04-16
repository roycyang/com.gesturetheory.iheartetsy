var ETSY = {
    preloadImages: function() {
        var images = [
        "Favorites-no-items-2x.png",
        "GeneralApp-active-title-bar-1x.png",
        "GeneralApp-active-title-bar-2x.png",
        "GeneralApp-background-1x.png",
        "GeneralApp-background-2x.png",
        "GeneralApp-white-title-bar-1x.png",
        "GeneralApp-white-title-bar-2x.png",
        "HeaderBar-back-button-active-1x.png",
        "HeaderBar-back-button-active-2x.png",
        "HeaderBar-back-button-link-1x.png",
        "HeaderBar-back-button-link-2x.png",
        "HeaderBar-background-texture-1x.png",
        "HeaderBar-background-texture-2x.png",
        "HeaderBar-bookmark-ribbon-off-1x.png",
        "HeaderBar-bookmark-ribbon-off-2x.png",
        "HeaderBar-bookmark-ribbon-on-1x.png",
        "HeaderBar-bookmark-ribbon-on-2x.png",
        "HeaderBar-left-menu-button-active-1x.png",
        "HeaderBar-left-menu-button-active-2x.png",
        "HeaderBar-left-menu-button-link-1x.png",
        "HeaderBar-left-menu-button-link-2x.png",
        "HeaderBar-logo-1x.png",
        "HeaderBar-logo-2x.png",
        "HeaderBar-logo-active-1x.png",
        "HeaderBar-logo-active-2x.png",
        "HeaderBar-right-menu-button-active-1x.png",
        "HeaderBar-right-menu-button-active-2x.png",
        "HeaderBar-right-menu-button-link-1x.png",
        "HeaderBar-right-menu-button-link-2x.png",
        "LeftNav-top-background-1x.png",
        "LeftNav-top-background-2x.png",
        "Product-container-1x.png",
        "Product-container-2x.png",
        "Product-heart-stamp-1x.png",
        "Product-sold-1x.png",
        "Product-sold-2x.png",
        "ProductDetail-background-1x.png",
        "ProductDetail-background-2x.png",
        "ProductDetail-cart-button-active-1x.png",
        "ProductDetail-cart-button-active-2x.png",
        "ProductDetail-cart-button-link-1x.png",
        "ProductDetail-cart-button-link-2x.png",
        "ProductDetail-close-tab-active-1x.png",
        "ProductDetail-close-tab-active-2x.png",
        "ProductDetail-close-tab-link-1x.png",
        "ProductDetail-close-tab-link-2x.png",
        "ProductDetail-email-button-sprite-1x.png",
        "ProductDetail-email-button-sprite-2x.png",
        "ProductDetail-facebook-button-sprite-1x.png",
        "ProductDetail-facebook-button-sprite-2x.png",
        "ProductDetail-favorite-button-sprite-1x.png",
        "ProductDetail-favorite-button-sprite-2x.png",
        "ProductDetail-favorite-stamp-1x.png",
        "ProductDetail-favorite-stamp-2x.png",
        "ProductDetail-info-tab-active-1x.png",
        "ProductDetail-info-tab-active-2x.png",
        "ProductDetail-info-tab-link-1x.png",
        "ProductDetail-info-tab-link-2x.png",
        "ProductDetail-long-divider-1x.png",
        "ProductDetail-long-divider-2x.png",
        "ProductDetail-seller-divider-1x.png",
        "ProductDetail-seller-divider-2x.png",
        "ProductDetail-slide-indicator-1x.png",
        "ProductDetail-slide-indicator-2x.png",
        "ProductDetail-staple-1x.png",
        "ProductDetail-staple-2x.png",
        "ProductDetail-title-bar-shadow-1x.png",
        "ProductDetail-title-bar-shadow-2x.png",
        "ProductDetail-twitter-button-sprite-1x.png",
        "ProductDetail-twitter-button-sprite-2x.png",
        "ProductDetail-vertical-divider-1x.png",
        "ProductDetail-vertical-divider-2x.png",
        "ProductListing-favorite-stamp-1x.png",
        "ProductListing-favorite-stamp-2x.png",
        "ProductListing-incart-icon-1x.png",
        "ProductListing-incart-icon-2x.png",
        "Results-no-items-2x.png",
        "RightMenu-search-button-active-1x.png",
        "RightMenu-search-button-active-2x.png",
        "RightMenu-search-button-link-1x.png",
        "RightMenu-search-button-link-2x.png",
        "SplashScreen-background-1x.png",
        "SplashScreen-background-2x.png",
        "SplashScreen-credit-1x.png.png",
        "SplashScreen-credit-2x.png",
        "Treasuries-button-1x.png",
        "Treasuries-button-2x.png",
        "Treasuries-published-icon-1x.png",
        "Treasuries-published-icon-2x.png",
        "cart_stamp_x2.png",
        "default_avatar_75px.png",
        "heart_stamp_x2.png",
        "home_panel_background.png",
        "left_arrow_off.png",
        "left_arrow_on.png",
        "right_arrow_off.png",
        "right_arrow_on.png",
        "search-button-1x.png",
        "search-button-2x.png",
        "waiting-for-internet.png"
        ]
        // start preloading
        for (i = 0; i <= images.length; i++)
        {
            // create object
            var imageObj = new Image();
            if(images[i]){
              imageObj.src = "resources/images/v1-0-0/" + images[i];
            }

        }
    },
    
    askForFacebookSignin: function(msg){
      ETSY.confirm(msg,
      function(buttonId) {

          if (buttonId == 'yes' || buttonId == '1') {
            FB.login(function(){
              ETSY.toggleFacebookSignin('connected');
              ETSY.facebookWallPost();
            }, {scope: 'email'});
          }
      },
      'Facebook');
    },

    facebookWallPost: function() {
      console.log('in facebook wall post');
      console.log('localStorage.facebook_status', localStorage.facebook_status);
      if(!localStorage.facebook_status){
        // Prompt the user and return false if the user is not signed in.
        ETSY.askForFacebookSignin('To post this to your wall, you will need to sign into Facebook. Would you like to sign in?');
      }else{
        try {
            var params = {
                method: 'feed',
                name: GLOBAL.newData.title,
                link: GLOBAL.newData.url,
                picture: GLOBAL.newData.image.large,
                caption: 'I Heart Etsy App',
                description: 'Check out this item I found on the I Heart Etsy App'
            };
            console.log(params);
            FB.ui(params);
        } catch(err) {
            ETSY.alert('This is only available on the iPad!');
        }
      }
    },

    toggleFacebookSignin: function(status){
      if(status == "connected"){
        localStorage.facebook_status = "connected";
         $('.sign-out-facebook-link').parents('.x-list-item').show();
      }else{
        localStorage.removeItem('facebook_status');
        $('.sign-out-facebook-link').parents('.x-list-item').hide();
        FB.logout();
      }
    },
    trackPageviews: function(url, dontRecord) {
        if (!dontRecord) {
            GLOBAL.google_last_url = url;
        }
        // console.log('\n\n\n\n\n\ntracked URL is: ' + url + '\n\n\n\n\n');
        try {
            GLOBAL.googleAnalytics.trackPageview(url);
        } catch(err) {
            //console.log('error is: ' + err);
        }
    },

    trackEvent: function(category, action, title, value) {
        // console.log('\n\n\n\n\n\ntracked event is: ' + category + ', ' + action + ', ' + title + '\n\n\n\n\n');
        try {
            value = value || 1;
            title = title || "";
            GLOBAL.googleAnalytics.trackEvent(category, action, title, value);
            //googleAnalytics.trackEvent("Videos","Play","Take On Me: Literal Video Version",1);
        } catch(err) {
            //console.log('error is: ' + err);
        }

    },

    // toggleFacebookSignIn: function(){
    //   console.log("localStorage['cdv_fb_session'] is " + localStorage.getItem('cdv_fb_session'));
    //   if(localStorage['cdv_fb_session']){
    //     $('.sign-out-facebook-link').parents('.x-list-item').show();
    //   }else{
    //     $('.sign-out-facebook-link').parents('.x-list-item').hide();
    //   }
    // },
    toggleSignIn: function(signed_in) {
        if (localStorage['accessTokenKey'] || signed_in) {
            $('body').addClass('signed-in-flag');
            if (!GLOBAL.oauth) {
                GLOBAL.oauth;
            }
            options = {
                consumerKey: 'tia49fh9iqjcrukurpbyqtv5',
                consumerSecret: '2dvoqadnxo',
                accessTokenKey: localStorage['accessTokenKey'],
                accessTokenSecret: localStorage['accessTokenSecret']
            };
            GLOBAL.oauth = OAuth(options);
            GLOBAL.signed_in = true;

            Ext.getCmp('userInformation').setHtml('<div class="user-info"><img src="' + localStorage.avatar + '" />' + localStorage.name + '</div>');
            Ext.getCmp('userInformation').show();
            Ext.getCmp('signUpButton').hide();
            //Ext.getCmp('signUpButton').hide();
            $('.sign-out-link').parents('.x-list-item').show();
            ETSY.updateCartInfo();
            ETSY.updateFavoritesInfo();
        } else {
            $('body').removeClass('signed-in-flag');
            GLOBAL.signed_in = false;
            Ext.getCmp('userInformation').hide();
            Ext.getCmp('signUpButton').show();
            $('.sign-out-link').parents('.x-list-item').hide();
            //Ext.getCmp('signUpButton').show();
        }
    },

    initAuthorization: function() {
        ETSY.trackPageviews("/signing_in", true);
        var mask = Ext.Viewport.add({
            masked: {
                xtype: 'loadmask',
                message: 'Linking App',
                zIndex: 10000,
            }
        });
        mask.show();
        console.log('\n\n\n\n\n\n\n\n\n\nin login tap');
        var oauth;
        var localStoreKey = "heart";
        var options = {
            consumerKey: 'tia49fh9iqjcrukurpbyqtv5',
            consumerSecret: '2dvoqadnxo',
            callbackUrl: 'https://www.etsy.com/cart'
        };

        oauth = OAuth(options);
        oauth.get('http://openapi.etsy.com/v2/oauth/request_token?scope=cart_rw favorites_rw',
        function(data) {
            setTimeout(function() {
                GLOBAL.params = $.deparam(data.text);
                window.plugins.childBrowser.showWebPage(GLOBAL.params.login_url, {
                    showLocationBar: false
                });
                mask.hide();
            },
            1000);
        },
        function(data) {
            alert('Error : No Authorization');
            console.log(data.text);
            //$('#oauthStatus').html('<span style="color:red;">Error during authorization</span>');
        });

    },

    askForSignIn: function(msg) {
        ETSY.confirm(msg,
        function(buttonId) {

            if (buttonId == 'yes' || buttonId == '1') {
                ETSY.initAuthorization();
            }
        },
        'Sign In');
    },

    /**
	 * Add and item to the favorites list.
	 * @param {String|Number} id An items ID number
	 * @param {Function} [callback] Callback
	 * @returns True or False if signed in.
	 * @type Boolean
	 */
    toggleFavorites: function(id, element, detailPanel) {
        var url;

        // Prompt the user and return false if the user is not signed in.
        if (!GLOBAL.signed_in) {
            ETSY.askForSignIn('You are trying to favorite this item, would you like to sign in?');
            APP.selectNavListItem();
            return false;
        }

        // If the id is missing or blank, log a warning.
        if (!id || id === '') {
            console.log('addToFavorites(): ID cannot be blank.');
            return false;
        }

        // Convert the ID to a number.
        if (typeof id === 'string') {
            id = parseInt(id, 10);
        }

        if (element.hasClass('favorite-flag')) {
            url = 'http://openapi.etsy.com/v2/users/__SELF__/favorites/listings/' + id + '?method=DELETE';
            localStorage.favorites_listing_ids = localStorage.favorites_listing_ids.replace(id, 'DELETED');
        } else {
            url = 'http://openapi.etsy.com/v2/users/__SELF__/favorites/listings/' + id;
            localStorage.favorites_listing_ids = localStorage.favorites_listing_ids + ',' + id;
        }

        GLOBAL.oauth.post(url, {},
        function(data) {
            ETSY.updateFavoritesInfo();
        },
        function(data) {
            //        ETSY.alert('Sorry but there is a problem connecting with Etsy. Please try again later!');
        });
        
        if (element.hasClass('favorite-flag')) {
            ETSY.trackEvent('actions', 'unfavoriting');
            $(element).removeClass('favorite-flag');

            if (detailPanel) {
                $(element).closest('#detailPanelMainInfo').removeClass('favorite-flag');
                $('.product[ref=' + id + ']').removeClass('favorite-flag');
            }
        } else {
            ETSY.trackEvent('actions', 'favoriting');
            console.log('element', $(element).closest('#detailPanelMainInfo'));
            $(element).addClass('favorite-flag');
            if (detailPanel) {
                $(element).closest('#detailPanelMainInfo').addClass('favorite-flag');
                $('.product[ref=' + id + ']').addClass('favorite-flag');
            }
        }

        if (detailPanel) {
          element.removeClass('favoriting');
        }else{
          // wait until the animation is over before we remove the favoriting flag
          setTimeout(function() {
              element.removeClass('favoriting');
          },
          1000);
        }


        return true;
    },

    updateFavoritesInfo: function(offset) {
        if (!GLOBAL.signed_in) {
            return false;
        }
        var offset = offset || 0;
        if (offset) {
            var url = 'http://openapi.etsy.com/v2/users/__SELF__/favorites/listings?limit=100&offset=' + offset;
        } else {
            var url = 'http://openapi.etsy.com/v2/users/__SELF__/favorites/listings?limit=100';
        }

        GLOBAL.oauth.get(url,
        function(data) {
            if(!data.text){
 //             ETSY.alert('There was an error reading from Etsy');
              return false;
            }
            var data = JSON.parse(data.text);

            var listingIds = [];
            for (i = 0; i < data.results.length; i++) {
                listingIds.push(data.results[i].listing_id);
            }

            if (offset) {
                localStorage['favorites_listing_ids'] = localStorage['favorites_listing_ids'] + listingIds.join();
            } else {
                localStorage['favorites_listing_ids'] = listingIds.join();
            }

            if (data.count > (100 + offset)) {
                ETSY.updateFavoritesInfo(100 + offset);
            }

            localStorage['favorites_count'] = data.count;
            // console.log("localStorage['favorites_listing_ids']", localStorage['favorites_listing_ids']);
            // console.log("localStorage['favorites_count']", localStorage['favorites_count']);
            // update the left rail
            $('.favorites-label span').html(data.count);


        },
        function(data) {
            // ETSY.alert('Sorry but there is a problem connecting with Etsy. Please try again later!');
            });

    },

    toggleCart: function(id, element, detailPanel) {
        // if the item is sold, we cannot add it to the cart
        if (element.hasClass('sold-flag')) {
            return false;
        }

        // if the user is not signed in, they will be prompted to sign in
        if (!GLOBAL.signed_in) {
            ETSY.askForSignIn('You are trying to add an item to your cart, would you like to sign in?');
            return false;
        }

        // test to see if the item is in the cart or not
        if (element.hasClass('cart-flag')) {
            var url = 'http://openapi.etsy.com/v2/users/__SELF__/carts?method=DELETE';
            localStorage.cart_listing_ids = localStorage.cart_listing_ids.replace(id, 'DELETED');
        } else {
            var url = 'http://openapi.etsy.com/v2/users/__SELF__/carts';
            localStorage.cart_listing_ids = localStorage.cart_listing_ids + ',' + id;
        }

        GLOBAL.oauth.post(url, {
            'listing_id': id
        },
        function(data) {
            // after add success
            ETSY.updateCartInfo();
        },
        function(data) {
            // ETSY.alert('Sorry but there is a problem connecting with Etsy. Please try again later!');
        });
        
        if (element.hasClass('cart-flag')) {
             ETSY.trackEvent('actions', 'remove from cart');
             element.removeClass('cart-flag');
             if (detailPanel) {
                 $('.product[ref=' + id + ']').removeClass('cart-flag');
             }
         } else {
             ETSY.trackEvent('actions', 'add to cart');
             element.addClass('cart-flag');
             if (detailPanel) {
                 $('.product[ref=' + id + ']').addClass('cart-flag');
             }
         }
    },

    updateCartInfo: function() {
        if (!GLOBAL.signed_in) {
            ETSY.askForSignIn();
            return false;
        }
        var url = 'http://openapi.etsy.com/v2/users/__SELF__/carts';

        GLOBAL.oauth.get(url,
        function(data) {
            // adding this to my cart!
            // console.log(JSON.parse(data.text));
            if(!data.text){
//              ETSY.alert('There was an error reading from Etsy');
              return false;
            }
            var data = JSON.parse(data.text);
            var listingIds = [];
            for (i = 0; i < data.results.length; i++) {
                for (j = 0; j < data.results[i].listings.length; j++) {
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
            // ETSY.alert('Sorry but there is a problem connecting with Etsy. Please try again later!');
            });

    },

    alert: function(msg, title) {
        try {
            navigator.notification.alert(msg, title);
        } catch(err) {
            var msg = Ext.Msg.alert(title, msg);
            msg.setZIndex(10000);
        }
    },

    confirm: function(msg, callback, title) {
        try {
            navigator.notification.confirm(msg, callback, title);
        }
        catch(err) {
            var msg = Ext.Msg.confirm(title, msg, callback);
            msg.setZIndex(10000);
        }
    },
}