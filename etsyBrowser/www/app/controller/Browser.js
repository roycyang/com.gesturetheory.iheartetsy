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
			browserToolbar: '#browserToolbar',
			fullBrowserCarousel: '#fullBrowserCarousel',
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
			
            // '#browserFullCarouselButton': {
            //  tap: 'onBrowserFullCarouselButtonTap'
            // },
			'#closeFullBrowserButton': {
				tap: 'onCloseFullBrowserButtonTap'
			},

			'#favoritesPanelLoginButton': {
				tap: 'onLoginTap'
			},
			'#cartPanelSignInButton': {
				tap: 'onLoginTap'
			},
			'#cartPanelSignOutButton': {
				tap: 'onSignOutTap'
			}
		},
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
			$('#appPanel').css('-webkit-transform', 'translate3d(250px,0,0)');

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
			$('#appPanel').css('-webkit-transform', 'translate3d(-250px,0,0)');
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

	launch: function() {
		window.self = this;

		self.homePanel = Ext.create('Etsy.view.HomePanel');
		self.categoriesPanel = Ext.create('Etsy.view.CategoriesPanel');
		self.treasuriesPanel = Ext.create('Etsy.view.TreasuriesPanel');
		self.favoritesPanel = Ext.create('Etsy.view.FavoritesPanel');
		self.cartPanel = Ext.create('Etsy.view.CartPanel');
		self.settingsPanel = Ext.create('Etsy.view.SettingsPanel');

		// not main views
		self.fullCategoriesPanel = Ext.create('Etsy.view.FullCategoriesPanel');
		self.detailPanel = Ext.create('Etsy.view.DetailPanel');

		// Latest Listings Store for HOME PANEL
		self.latestListingsStore = Ext.data.StoreManager.lookup('LatestListings');
		self.latestListingsStore.load();
		this.getListingsCarousel().setStore(this.latestListingsStore);

		// Listings Store for BROWSER PANEL
		self.listingsStore = Ext.data.StoreManager.lookup('Listings');

		// adding the homepage to the getAppPanel
		self.getAppPanel().add([self.homePanel, self.categoriesPanel, self.treasuriesPanel, self.favoritesPanel, self.settingsPanel]);
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
			self.showListings('keyword', textfield.getValue());
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
	
	onListingSwipe: function(view, item, index, e){
		alert('swipe');
		console.log('e is', e);
	},

	// ================================
	// = Whenever a category is tapped =
	// ================================
	onCategoryListTap: function(view, index, item, record) {
		this.showListings('category', record);

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
			this.showListings('category', record);
			GLOBAL.previousNavItemIndex = index;
		} else {
			this.getAppPanel().setActiveItem(this[record.get('panel')]);
			GLOBAL.previousNavItemIndex = index;
		}

		this.toggleNav();
	},

	showListings: function(type, record) {
        // Ext.getCmp('browserFullCarouselButton').show();
        // Ext.getCmp('browserBackButton').show();
		var self = this;
		var store = self.listingsStore;
		switch (type) {
		case 'category':
			store.getProxy().setExtraParam('category', record.get('name'));
			self.getBrowserToolbar().setTitle(record.get('short_name'));
			Ext.getCmp('globalSearch').setPlaceHolder('Search ' + record.get('short_name'));
			break;
		case 'keyword':
			store.getProxy().setExtraParam('keywords', record);
			self.getBrowserToolbar().setTitle('Search results for: ' + record);
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

		self.getCategoriesPanel().getLayout().setAnimation({
			type: 'slide',
			duration: 300,
			direction: 'left'
		});

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
    //  self.getBrowserToolbar().setTitle('Categories');
    //  Ext.getCmp('categoriesSearch').setPlaceHolder('Search Etsy');
    //  self.getCategoriesPanel().setActiveItem(0);
    // },

	onBrowserSearchButtonTap: function() {
		Ext.getCmp('browserSearchPanel').setStyle('-webkit-transform:translate3d(0,0px,0)');
	},

	onBrowserSearchCancelButtonTap: function() {
		Ext.getCmp('browserSearchPanel').setStyle('-webkit-transform:translate3d(0,-50px,0)');
	},

    // onBrowserFullCarouselButtonTap: function() {
    //  var self = this;
    //  //empty the store before adding the new one
    //  var browserCarouselStore = self.getFullBrowserCarousel().getStore();
    //  if (browserCarouselStore) {
    //      // if there is already a store, then it needs to be updated, not set
    //      self.getFullBrowserCarousel().updateStore(self.listingsStore);
    //  } else {
    //      self.getFullBrowserCarousel().setStore(self.listingsStore);
    //  }
    //  self.fullCategoriesPanel.show();
    // },

	onCloseFullBrowserButtonTap: function() {
		var self = this;
		self.fullCategoriesPanel.hide();
	}

});
