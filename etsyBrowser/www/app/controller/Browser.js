Ext.define('Etsy.controller.Browser', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			navPanel: '#navPanel',
			searchPanel: '#searchPanel',
			//searchResultsPanel: '#searchResultsPanel',
			navList: '#navList',
			appPanel: '#appPanel',
			homePanel: '#homePanel',
			categoriesPanel: '#categoriesPanel',
			browserCarousel: '#browserCarousel',
			categoriesToolbar: '#categoriesToolbar',
            treasuriesCarousel: '#treasuriesCarousel',
			favoritesCarousel: '#favoritesCarousel',
			detailPanel: '#detailPanel',
			listingsCarousel: 'listingsCarousel',
			categoryList: '#categoryList',
			showNav: 'button[action=showNav]',
			showSearch: 'button[action=showSearch]',
			

		},
		control: {
			showNav: {
				tap: 'onShowNavTap',
			},
			showSearch: {
				tap: 'onShowSearchTap',
			},
			listingsCarousel: {
				itemtap: 'onListingTap',
				itemswipe: 'onListingSwipe'
			},
			categoryList: {
				itemtap: 'onCategoryListTap'
			},
			'#navList': {
				itemtap: 'onNavListTap'
			},

			// '#browserBackButton': {
			//  tap: 'onBrowserBackButtonTap'
			// },
			// ================
			// = Search Keyup =
			// ================
			"#globalSearch": {
				keyup: 'onSearchKeyup',
			},
			"#homePanelSearch": {
				keyup: 'onSearchKeyup',
			},


		},
	},
	
	launch: function() {
		window.self = this;

		self.homePanel = Ext.create('Etsy.view.HomePanel');
        self.categoriesPanel = Ext.create('Etsy.view.CategoriesPanel');
        self.treasuriesPanel = Ext.create('Etsy.view.TreasuriesPanel');
        self.favoritesPanel = Ext.create('Etsy.view.FavoritesPanel');

        // not main views
        self.detailPanel = Ext.create('Etsy.view.DetailPanel');
        
        // Latest Listings Store for HOME PANEL
        self.latestListingsStore = Ext.data.StoreManager.lookup('LatestListings');
        self.latestListingsStore.load();
        this.getListingsCarousel().setStore(this.latestListingsStore);
        // 
        // Listings Store for BROWSER PANEL
        self.listingsStore = Ext.data.StoreManager.lookup('Listings');
        
        // Listings Store for FAVORITES PANEL
        self.favoriteListingsStore = Ext.data.StoreManager.lookup('FavoriteListings');
        self.getFavoritesCarousel().setStore(self.favoriteListingsStore);
                
        // Listings Store for FAVORITES PANEL
        self.treasuriesStore = Ext.data.StoreManager.lookup('Treasuries');
        self.getTreasuriesCarousel().setStore(self.treasuriesStore);
        
        self.categoriesStore = Ext.data.StoreManager.lookup('Categories');
        
        // adding the homepage to the getAppPanel
		self.getAppPanel().add([self.homePanel, self.categoriesPanel, self.treasuriesPanel, self.favoritesPanel]);

		// jump to treasuries for easy debugging
		//self.getAppPanel().setActiveItem(self.treasuriesPanel);
		
		//self.getAppPanel().add(self.homePanel);
	},
	

	onShowNavTap: function() {
		console.log('test');
		//	    Cordova.exec(null, null, "ShareKitPlugin", "shareToFacebook", ['test', 'http://google.com'] );
		var self = this;
		self.getAppPanel().mask({

			listeners: {
				tap: function() {

					self.toggleNav();

				}
			}

		})
		this.toggleNav();

	},

	onShowSearchTap: function() {
		var self = this;
		self.getAppPanel().mask({

			listeners: {
				tap: function() {

					self.toggleSearch();

				}
			}

		})
		this.toggleSearch();

	},

	toggleNav: function() {
		var self = this;
		if (GLOBAL.expandedNav) {
			self.getAppPanel().unmask();
			$('#appPanel').css('-webkit-transform', 'translate3d(0px,0,0)');
			GLOBAL.expandedNav = false;
		} else {
			self.getNavPanel().show();
			$('#appPanel').css('-webkit-transform', 'translate3d(288px,0,0)');

			GLOBAL.expandedNav = true;
		}
	},

	toggleSearch: function() {
		var self = this;
		if (GLOBAL.expandedNav) {
			self.getAppPanel().setZIndex(1000);
			self.getAppPanel().unmask();
			$('#appPanel').css('-webkit-transform', 'translate3d(0px,0,0)');
			GLOBAL.expandedNav = false;
		} else {
			self.getSearchPanel().show();
			$('#appPanel').css('-webkit-transform', 'translate3d(-288px,0,0)');
			setTimeout(function() {
				var zIndex = self.getAppPanel().setZIndex(5);
			},
			350)
			GLOBAL.expandedNav = true;
		}
	},

	onSignOutTap: function() {
		var mask = Ext.Viewport.add({
			masked: {
				xtype: 'loadmask',
				message: 'Sign out successful!',
				zIndex: 10000,
			}
		});
		setTimeout(function() {
			mask.hide();
		},
		1000)
	},

	onLoginTap: function() {
		var mask = Ext.Viewport.add({
			masked: {
				xtype: 'loadmask',
				message: 'Authorizing app...',
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
			callbackUrl: 'http://www.etsy.com'
		};

		oauth = OAuth(options);
		oauth.get('http://openapi.etsy.com/v2/oauth/request_token?scope=cart_rw favorites_rw', function(data) {
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

	
	// ==========
	// = Search =
	// ==========
	onSearchKeyup: function(textfield, e, options) {
		/**
		 * Called when the search field has a keyup event.
		 *
		 * This will filter the store based on the fields content.
		 */

		var self = this;
		console.log('textfield search term is: ', textfield.getValue());
		if (e.event.keyCode == 13) {
			self.getAppPanel().setActiveItem(self.categoriesPanel);
			self.categoriesPanel.setActiveItem(1);
			self.toggleSearch();
			self.loadListings('keyword', textfield.getValue());
		}

	},

	// ================================
	// = Whenever a product is tapped or swiped =
	// ================================
	onListingTap: function(view, record) {
		console.log('**on onListingTap!');

		this.detailPanel.setData(record.data);

		if (!this.detailPanel.getParent()) {
			Ext.Viewport.add(this.detailPanel);
		}

		this.detailPanel.show();
	},

	onListingSwipe: function(view, item, index, e) {
		alert('swipe');
		console.log('e is', e);
	},

	// ================================
	// = Whenever a category is tapped =
	// ================================
	onCategoryListTap: function(view, index, item, record) {
		this.loadListings('category', record);

	},

	onNavListTap: function(view, index, item, record) {
		var self = this;
		console.log(view, index, item, record);
		console.log(record.get('panel'));
		var panel = record.get('panel');
		if (panel == 'feedback') {
			try {
				window.plugins.emailComposer.showEmailComposer('Feedback on I Heart Etsy iPad App v' + GLOBAL.version, null, "iheartetsy@gtcrafted.com");
			} catch(err) {
				alert('This only works on the iPad');
			}
			setTimeout(function() {
				if (GLOBAL.previousNavItemIndex) {
					self.getNavList().select(GLOBAL.previousNavItemIndex);
				} else {
					self.getNavList().select(0);
				}
			},
			350);

		} else if (panel == "bookmarkedCategory") {
			console.log('record is', record.get('short_name'));
			this.getAppPanel().setActiveItem(self.categoriesPanel);
			this.loadListings('category', record);
			GLOBAL.previousNavItemIndex = index;
		} else if (panel == 'cartPanel') {
		    try {
			    window.plugins.childBrowser.showWebPage("http://www.etsy.com/cart");
			} catch(err) {
				alert('This only works on the iPad');
			}
			
			setTimeout(function() {
				if (GLOBAL.previousNavItemIndex) {
					self.getNavList().select(GLOBAL.previousNavItemIndex);
				} else {
					self.getNavList().select(0);
				}
			},
			350);
		} else {
			if (panel == 'categoriesPanel') {
				self.categoriesPanel.setActiveItem(0);
			}
			if (panel == "favoritesPanel") {
				self.loadFavorites();
			}
			if (panel == "treasuriesPanel") {
				self.loadTreasuries();
			}
			this.getAppPanel().setActiveItem(this[record.get('panel')]);
			GLOBAL.previousNavItemIndex = index;
		}

		this.toggleNav();
	},
	
	loadTreasuries: function(){
	    var store = self.treasuriesStore;
	    store.load();
	    //empty the store before adding the new one
		var treasuriesCarouselStore = self.getTreasuriesCarousel().getStore();
		if (treasuriesCarouselStore) {
			// if there is already a store, then it needs to be updated, not set
			self.getTreasuriesCarousel().updateStore(store);
		} else {
			self.getTreasuriesCarousel().setStore(store);
		}
	},

	loadFavorites: function() {
		var self = this;
		self.favoritesPanel.setMasked({
			xtype: 'loadmask'
		});

		oauth.get('http://openapi.etsy.com/v2/users/__SELF__/favorites/listings?limit=100', function(data) {

			var data = JSON.parse(data.text);
			var listingIds = [];
			for (i = 0; i < data.results.length; i++) {
				listingIds.push(data.results[i].listing_id);
			}
			console.log('listings ids are', listingIds.length);
			oauth.get('http://openapi.etsy.com/v2/listings/' + listingIds.join() + '?limit=100&includes=Images:6', function(data) {
				var data = JSON.parse(data.text);
				var store = self.favoriteListingsStore;
				self.favoriteListingsStore.removeAll();
				store.add(data.results);
				Ext.getCmp('globalSearch').setPlaceHolder('Search Etsy');
			    self.getFavoritesCarousel().reset()
			    
			    
			    
			    var storeCount = store.data.length;
                var max = parseInt(storeCount/12 - 1);
                var remainder = storeCount % 12;
                console.log('the store count is', storeCount);
                console.log('max is', max);

                console.log('remainder', remainder);
                if(remainder > 0){
                    max++;
                }
                console.log('max is', max);
                setTimeout(function(){
                    self.getFavoritesCarousel().setMaxItemIndex(max);
                }, 1000);
			    
			    self.getFavoritesCarousel().setActiveItem(0);
				self.favoritesPanel.unmask();

			});
		});
	},

	loadListings: function(type, record, name, tags) {
		// Ext.getCmp('browserFullCarouselButton').show();
		// Ext.getCmp('browserBackButton').show();
		var self = this;
		var store = self.listingsStore;
		switch (type) {
		case 'category':
			store.getProxy().setExtraParam('category', record.get('name'));
			delete self.listingsStore.getProxy()._extraParams.tags;
			delete self.listingsStore.getProxy()._extraParams.keywords;
			// resetting the store to use our NODE.JS
            store.getProxy().setUrl('http://50.74.56.194:8888/art');

			self.getCategoriesToolbar().setTitle(record.get('short_name'));
			Ext.getCmp('globalSearch').setPlaceHolder('Search ' + record.get('short_name'));
			break;
		case 'tags':
            delete self.listingsStore.getProxy()._extraParams.keywords;
		    store.getProxy().setExtraParam('tags', tags);
		    store.getProxy().setExtraParam('category', record.get('name'));
            store.getProxy().setUrl('http://50.74.56.194:8888/art');

    		// resetting the store to use our NODE.JS
            // store.getProxy().setUrl('http://50.74.56.194:8888/art');
            console.log('record is', record);
    		self.getCategoriesToolbar().setTitle(name);
    		Ext.getCmp('globalSearch').setPlaceHolder('Search ' + name);
		    break;
		case 'keyword':
		    delete self.listingsStore.getProxy()._extraParams.tags;
		    delete self.listingsStore.getProxy()._extraParams.category;
            store.getProxy().setUrl('http://openapi.etsy.com/v2/listings/active');
			store.getProxy().setExtraParam('keywords', record);
			self.getCategoriesToolbar().setTitle('Search Results for: ' + record);
			break;
		}
		store.load();

		//empty the store before adding the new one
		var browserCarouselStore = self.getBrowserCarousel().getStore();
		if (browserCarouselStore) {
			// if there is already a store, then it needs to be updated, not set
			self.getBrowserCarousel().updateStore(store);
		} else {
			self.getBrowserCarousel().setStore(store);
		}

        self.getAppPanel().setActiveItem(self.categoriesPanel);
		self.categoriesPanel.getLayout().setAnimation({
			type: 'slide',
			duration: 300,
			direction: 'left'
		});
        self.getListingsCarousel().setActiveItem(0);
        
        self.getListingsCarousel().reset();
        self.getListingsCarousel().setActiveItem(0);
		self.getCategoriesPanel().setActiveItem(self.getBrowserCarousel());
		

	},

	// =========================
	// = Browser Panel Actions =
	// =========================
	// onBrowserBackButtonTap: function() {
	//  this.getCategoriesPanel().getLayout().setAnimation({
	//      type: 'slide',
	//      duration: 300,
	//      direction: 'right'
	//  });
	//  Ext.getCmp('browserFullCarouselButton').hide();
	//  Ext.getCmp('browserBackButton').hide();
	//  self.getCategoriesToolbar().setTitle('Categories');
	//  Ext.getCmp('categoriesSearch').setPlaceHolder('Search Etsy');
	//  self.getCategoriesPanel().setActiveItem(0);
	// },
	onBrowserSearchButtonTap: function() {
		Ext.getCmp('browserSearchPanel').setStyle('-webkit-transform:translate3d(0,0px,0)');
	},

	onBrowserSearchCancelButtonTap: function() {
		Ext.getCmp('browserSearchPanel').setStyle('-webkit-transform:translate3d(0,-50px,0)');
	},


});
