Ext.define('Etsy.controller.Browser', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			navPanel: '#navPanel',
			searchPanel: '#searchPanel',
			//searchResultsPanel: '#searchResultsPanel',
			navList: '#navList',
			appPanel: '#appPanel',
			mainToolbar: '#mainToolbar',
            //panels
			homePanel: 'homePanel',
			treasuriesPanel: 'treasuriesPanel',
			favoritesPanel: 'favoritesPanel',
			homeTreasuriesCarousel: '#homeTreasuriesCarousel',
			homeCategoriesCarousel: '#homeCategoriesCarousel',
			categoryPopupPanel: 'categoryPopupPanel',
			categoriesPanel: '#categoriesPanel',
			browserCarousel: '#browserCarousel',
			categoriesToolbar: '#categoriesToolbar',
            treasuriesCarousel: '#treasuriesCarousel',
			favoritesCarousel: '#favoritesCarousel',
			detailPanel: '#detailPanel',
			categoryList: '#categoryList',
			showNav: 'button[action=showNav]',
			showSearch: 'button[action=showSearch]',
			categoryNestedList: '#categoryNestedList',
			
		},
		control: {
			listingsCarousel: {
				itemtap: 'onListingTap'
			},
			'#navList': {
				itemtap: 'onNavListTap'
			},

			"#globalSearch": {
				keyup: 'onSearchKeyup',
			},
			
			"#homeSearch": {
				keyup: 'onSearchKeyup',
			},


		},
	},
	
	launch: function() {
		window.self = this;
		window.APP = this;	
		var self = this;
        
        self.mainView = Ext.create('Ext.Panel', {
            fullscreen: true,
            height: 748,
            width: 1024
        });
        
        self.mainView.add(Ext.create('Etsy.view.AppPanel'));
        self.mainView.add(Ext.create('Etsy.view.NavPanel'));
        self.mainView.add(Ext.create('Etsy.view.SearchPanel'));
        self.mainView.add(Ext.create('Etsy.view.CategoryPopupPanel'));
        			
		// initialize the counts
        ETSY.updateCartInfo();
        ETSY.updateFavoritesInfo();
		
        self.categoriesPanel = Ext.create('Etsy.view.CategoriesPanel');
        self.detailPanel = Ext.create('Etsy.view.DetailPanel');
        
        // all the stores
        self.listingsStore = Ext.data.StoreManager.lookup('Listings');
        self.favoriteListingsStore = Ext.data.StoreManager.lookup('FavoriteListings');
        self.treasuriesStore = Ext.data.StoreManager.lookup('Treasuries');
        self.categoriesStore = Ext.data.StoreManager.lookup('Categories');

        // adding the homepage to the getAppPanel		
		self.loadHomePanel();
	},
		
	toggleNav: function(position) {
		var self = this;
		if (GLOBAL.expandedNav || position == 'close') {
			self.getAppPanel().unmask();
			$('#appPanel').css('-webkit-transform', 'translate3d(0px,0,0)');
			GLOBAL.expandedNav = false;
		} else {
			self.getNavPanel().show();
			$('#appPanel').css('-webkit-transform', 'translate3d(288px,0,0)');

			GLOBAL.expandedNav = true;
		}
	},

	toggleSearch: function(position) {
		var self = this;
		if (GLOBAL.expandedNav || position == 'close') {
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
			self.toggleSearch('close');
			self.loadListings('keyword', textfield.getValue());
			self.getNavList().deselectAll();
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

	onNavListTap: function(view, index, item, record) {
		var self = this;
		var panel = record.get('panel');
		if (panel == 'feedback') {
			try {
				window.plugins.emailComposer.showEmailComposer('Feedback on I Heart Etsy iPad App v' + GLOBAL.version, null, "iheartetsy@gtcrafted.com");
			} catch(err) {
				alert('This only works on the iPad');
			}
            self.selectNavListItem();   
		} else if (panel == 'cartPanel') {
		    try {
			    window.plugins.childBrowser.showWebPage("http://www.etsy.com/cart");
			} catch(err) {
				alert('This only works on the iPad');
			}
			
            self.selectNavListItem();
        } else if (panel == 'signout') {
    	    ETSY.confirm("Are you sure you want to sign out?", function(buttonId) {

    			if (buttonId == 'yes' || buttonId == '1') {
                    console.log('sign them out!')
    			} else {

    			}
    		});
			
            self.selectNavListItem();
		} else if (panel == "bookmarkedCategory") {
			self.getAppPanel().setActiveItem(self.categoriesPanel);
			self.loadListings('category', record);
			GLOBAL.previousNavItemIndex = index;

		} else if (panel == 'categoriesPanel') {
            self.loadCategories();
            self.selectNavListItem();
		} else {            
			if (panel == "favoritesPanel") {
				self.loadFavorites();
			}
			if (panel == "treasuriesPanel") {
				self.loadTreasuries();
			}
			if (panel == "homePanel") {
				self.loadHomePanel();
			}
			GLOBAL.previousNavItemIndex = index;
		}
		this.toggleNav('closed');
	},
	
	selectNavListItem: function(){
	    setTimeout(function() {
		    if (GLOBAL.previousNavItemIndex == -1) {
		        self.getNavList().deselectAll();
		    }else if (GLOBAL.previousNavItemIndex) {
				self.getNavList().select(GLOBAL.previousNavItemIndex);
			} else {
				self.getNavList().select(0);
			}
		},
		350);
	},

    loadCategories: function(){
        var self = this;
        self.getCategoryPopupPanel().show();
    },
    
	loadHomePanel: function(){
	    var self = this;
        self.getAppPanel().removeAll(true);
	    // load homePanel and then destroy all the other panels
	    Ext.create('Etsy.view.HomePanel');
	    self.getHomeTreasuriesCarousel().setStore(self.treasuriesStore);
        self.getHomeCategoriesCarousel().setStore(self.treasuriesStore);    
	    self.getAppPanel().add(self.getHomePanel());
	    self.getAppPanel().setActiveItem(self.getHomePanel());
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

			self.getMainToolbar().setTitle(record.get('short_name'));
			Ext.getCmp('globalSearch').setPlaceHolder('Search ' + record.get('short_name'));
			self.getNavList().select(1);
			GLOBAL.previousNavItemIndex = 1;
			break;
		case 'tags':
            delete self.listingsStore.getProxy()._extraParams.keywords;
		    store.getProxy().setExtraParam('tags', tags);
		    store.getProxy().setExtraParam('category', record.get('name'));
            store.getProxy().setUrl('http://50.74.56.194:8888/art');
            self.getNavList().select(1);
            GLOBAL.previousNavItemIndex = 1;
    		// resetting the store to use our NODE.JS
            // store.getProxy().setUrl('http://50.74.56.194:8888/art');
            console.log('record is', record);
    		self.getMainToolbar().setTitle(name);
    		Ext.getCmp('globalSearch').setPlaceHolder('Search ' + name);
		    break;
		case 'keyword':
		    self.getNavList().deselectAll();
		    delete self.listingsStore.getProxy()._extraParams.tags;
		    delete self.listingsStore.getProxy()._extraParams.category;
            store.getProxy().setUrl('http://openapi.etsy.com/v2/listings/active');
			store.getProxy().setExtraParam('keywords', record);
			self.getMainToolbar().setTitle('Search Results for: ' + record);
			GLOBAL.previousNavItemIndex = -1;
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
        self.getBrowserCarousel().reset();
        self.getBrowserCarousel().setActiveItem(0);
	},

	loadTreasuries: function(){
	    var self = this;
	    self.getAppPanel().removeAll(true);
        Ext.create('Etsy.view.TreasuriesPanel');
        self.getAppPanel().setActiveItem(self.getTreasuriesPanel());
	    self.getMainToolbar().setTitle('Hottest Treasuries');
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
        self.getAppPanel().removeAll(true);
        Ext.create('Etsy.view.FavoritesPanel');    
		self.getAppPanel().setActiveItem(self.getFavoritesPanel());
	    self.getMainToolbar().setTitle('Favorites');
		self.getFavoritesPanel().setMasked({
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
				self.getFavoritesCarousel().setStore(store);
			    self.getFavoritesCarousel().reset()
			    
			    
			    
			    var storeCount = store.data.length;
                var max = parseInt(storeCount/12 - 1);
                var remainder = storeCount % 12;
                // console.log('the store count is', storeCount);
                // console.log('max is', max);
                // 
                // console.log('remainder', remainder);
                if(remainder > 0){
                    max++;
                }
                console.log('max is', max);
                setTimeout(function(){
                    self.getFavoritesCarousel().setMaxItemIndex(max);
                }, 1000);
			    
			    self.getFavoritesCarousel().setActiveItem(0);
				self.getFavoritesPanel().unmask();
			});
		});
	}

});
