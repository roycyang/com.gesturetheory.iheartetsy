Ext.define('Etsy.controller.Browser', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            navPanel: '#navPanel',
            searchPanel: '#searchPanel',
            navList: '#navList',
            appPanel: '#appPanel',

            // instructions panel
            instructionsPanel: 'instructionsPanel',

            // home panel
            homePanel: 'homePanel',
            homeTreasuriesCarousel: '#homeTreasuriesCarousel',
            homeCategoriesCarousel: '#homeCategoriesCarousel',

            // categories panel
            categoriesPanel: 'categoriesPanel',
            categoriesCarousel: '#categoriesCarousel',
            categoriesToolbar: '#categoriesToolbar',

            // treasuries panel
            treasuriesPanel: 'treasuriesPanel',
            treasuriesCarousel: '#treasuriesCarousel',

            // treasury panel
            treasuryPanel: 'treasuryPanel',
            treasuryCarousel: '#treasuryCarousel',
            treasuryToolbar: '#treasuryToolbar',

            // search panel
            searchResultsPanel: 'searchResultsPanel',
            searchResultsCarousel: '#searchResultsCarousel',
            searchToolbar: '#searchResultsToolbar',

            // favorites panel
            favoritesPanel: 'favoritesPanel',
            favoritesCarousel: '#favoritesCarousel',

            // detail panel
            detailPanel: 'detailPanel',

            // categories popup
            categoryPopupPanel: 'categoryPopupPanel',
            categoryList: '#categoryList'

        },
        control: {
            listingsCarousel: {
                itemtap: 'onListingTap'
            },
            '#navList': {
                itemtap: 'onNavListTap'
            }
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

        // set up persistent panels
        self.mainView.add(Ext.create('Etsy.view.NavPanel'));
        self.mainView.add(Ext.create('Etsy.view.SearchPanel'));
        self.mainView.add(Ext.create('Etsy.view.AppPanel'));


        if (!localStorage.hasSeenInstructions) {
            self.mainView.add(Ext.create('Etsy.view.InstructionsPanel'));
            localStorage.hasSeenInstructions = true;
        }


        // all the stores
        self.listingsStore = Ext.data.StoreManager.lookup('Listings');
        self.resultsListingsStore = Ext.data.StoreManager.lookup('ResultsListings');
        self.treasuriesStore = Ext.data.StoreManager.lookup('Treasuries');
        self.categoriesStore = Ext.data.StoreManager.lookup('Categories');
        self.categoryIndexStore = Ext.data.StoreManager.lookup('CategoriesIndex');
        self.navigationStore = Ext.data.StoreManager.lookup('Navigation');

        if (!localStorage.hasLoaded) {
            self.navigationStore.add(
            {
                name: 'a',
                title: 'Home',
                type: '',
                panel: 'homePanel'
            },
            {
                name: 'b',
                title: '<div class="categories-label">Categories</div>',
                type: '',
                panel: 'categoriesPanel'
            },
            {
                name: 'c',
                title: 'Treasuries',
                type: '',
                panel: 'treasuriesPanel'
            },
            {
                name: 'd',
                title: '<div class="favorites-label">Favorites <span class="count"></span></div>',
                type: '',
                panel: 'favoritesPanel'
            },
            {
                name: 'e',
                title: '<div class="cart-label">Cart <span class="count"></span></div>',
                type: '',
                panel: 'cartPanel'
            },
            {
                name: 'f',
                title: 'Feedback',
                type: '',
                panel: 'feedback'
            },
            {
                name: 'g',
                title: 'App Tour',
                type: '',
                panel: 'instructions'
            },
            {
                name: 'h',
                title: '<div class="sign-out-link">Sign Out of Etsy</div>',
                type: '',
                panel: 'signout'
            },
            {
                name: 'h',
                title: '<div class="sign-out-facebook-link">Sign Out of Facebook</div>',
                type: '',
                panel: 'signout-facebook'
            }
            );
            localStorage.hasLoaded = true;
        }


        // adding the homepage to the getAppPanel		
        self.loadHomePanel();

        ETSY.toggleSignIn();
        ETSY.preloadImages();
        ETSY.toggleFacebookSignin();
    },

    toggleNav: function(position) {
        var self = this;
        if (GLOBAL.expandedNav || position == 'close') {
            self.getAppPanel().unmask();
            $('#appPanel').css('-webkit-transform', 'translate3d(0px,0,0)');
            GLOBAL.expandedNav = false;
            setTimeout(function() {
                self.getNavPanel().hide();
            },
            350);
        } else {
            self.getNavPanel().show();
            self.getAppPanel().setZIndex(10000);
            $('#appPanel').css('-webkit-transform', 'translate3d(288px,0,0)');
            GLOBAL.expandedNav = true;
        }
    },

    toggleSearch: function(position) {
        var self = this;
        if (GLOBAL.expandedNav || position == 'close') {
            self.getAppPanel().unmask();
            $('#appPanel').css('-webkit-transform', 'translate3d(0px,0,0)');
            GLOBAL.expandedNav = false;
            setTimeout(function() {
                self.getSearchPanel().hide();
            },
            350);
        } else {
            self.getSearchPanel().show();
            $('#appPanel').css('-webkit-transform', 'translate3d(-288px,0,0)');
            self.getAppPanel().setZIndex(1000);
            GLOBAL.expandedNav = true;
        }
    },

    onSignOutTap: function() {
        ETSY.alert('You have successfully signed out. Come back soon!', 'Signed Out');
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
            self.toggleSearch('close');
            self.loadSearch(textfield.getValue());
            textfield.setValue('');
        }

    },

    // ================================
    // = Whenever a product is tapped or swiped =
    // ================================
    onListingTap: function(view, record) {
        ETSY.trackPageviews("/detail/" + record.get('id'));



        Ext.create('Etsy.view.DetailPanel');
        self.getAppPanel().add(self.getDetailPanel());
        self.getDetailPanel().setData(record.data);

    },

    onNavListTap: function(view, index, item, record) {
        ETSY.trackPageviews("/nav", true);
        var self = this;
        var panel = record.panel || record.get('panel');
        if (panel == 'feedback') {
            ETSY.trackPageviews("/feedback", true);
            try {
                window.plugins.emailComposer.showEmailComposer('Feedback on I Heart Etsy iPad App v' + GLOBAL.version, null, "iheartetsy@gesturetheory.com");
            } catch(err) {
                ETSY.alert('This only works on the iPad');
            }
            self.selectNavListItem();
        } else if (panel == 'instructions') {
            self.loadInstructions();
            self.selectNavListItem();
        } else if (panel == 'cartPanel') {
            ETSY.trackPageviews("/cart", true);
            if (!GLOBAL.signed_in) {
                ETSY.askForSignIn('This feature requires sign in.  Would you like to sign in?');
                self.selectNavListItem();
                return false;
            }
            try {
                window.plugins.childBrowser.showWebPage("http://www.etsy.com/cart");
            } catch(err) {
                ETSY.alert('This only works on the iPad');
            }

            self.selectNavListItem();
        } else if (panel == 'signout') {
            ETSY.confirm("Are you sure you want to sign out of Etsy?",
            function(buttonId) {

                if (buttonId == 'yes' || buttonId == '1') {
                    ETSY.trackPageviews("/signing_out", true);
                    localStorage.removeItem('accessTokenKey');
                    localStorage.removeItem('accessTokenSecret');
                    localStorage.removeItem('favorites_count');
                    localStorage.removeItem('favorites_listing_ids');
                    localStorage.removeItem('cart_count');
                    localStorage.removeItem('cart_listing_ids');
                    localStorage.removeItem('name');
                    localStorage.removeItem('avatar');
                    ETSY.toggleSignIn();
                    APP.onSignOutTap();
                    APP.loadHomePanel();
                    GLOBAL.second_signin = false;
                    FB.logout();
                }
            },
            'Sign Out');
            self.selectNavListItem();
        } else if (panel == 'signout-facebook') {
            ETSY.confirm("Are you sure you want to sign out of Facebook?",
            function(buttonId) {
                if (buttonId == 'yes' || buttonId == '1') {
                    ETSY.toggleFacebookSignin('signout');
                }
            },
            'Sign Out');
            self.selectNavListItem();
        } else if (panel == "bookmarkedCategory") {
            ETSY.trackPageviews("/bookmarked/" + record.get('name'));
            self.getAppPanel().setActiveItem(self.categoriesPanel);
            self.loadListings('category', record);
            GLOBAL.previousNavItemIndex = index;

        } else if (panel == 'categoriesPanel') {
            self.loadCategories();
            self.selectNavListItem();
        } else {
            if (panel == "favoritesPanel") {
                //console.log('calling load favortes');
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
        this.toggleNav('close');
    },

    selectNavListItem: function() {
        setTimeout(function() {
            if (GLOBAL.previousNavItemIndex == -1) {
                self.getNavList().deselectAll();
            } else if (GLOBAL.previousNavItemIndex) {
                self.getNavList().select(GLOBAL.previousNavItemIndex);
            } else {
                self.getNavList().select(0);
            }
        },
        350);
    },

    loadCategories: function() {
        ETSY.trackPageviews("/categoryPopup", true);
        var self = this;
        self.mainView.add(Ext.create('Etsy.view.CategoryPopupPanel'));
        self.getCategoryList().getStore().load();
    },

    loadHomePanel: function() {
        var count = 0;
        ETSY.trackPageviews("/home");
        GLOBAL.stopEvents = true;
        Ext.Ajax.abortAll();
        GLOBAL.panel = 'home';
        GLOBAL.searchCategory = null;
        Ext.getCmp('globalSearch').setPlaceHolder('Search Etsy');

        var self = this;
        self.getAppPanel().removeAll(true);

        // load homePanel and then destroy all the other panels
        Ext.create('Etsy.view.HomePanel');
        self.getAppPanel().add(self.getHomePanel());
        self.getAppPanel().setActiveItem(self.getHomePanel());
        self.getHomePanel().setMasked({
            xtype: 'loadmask',
            message: 'Loading Home',
        });

        GLOBAL.stopEvents = false;
        self.categoryIndexStore.load(function() {
            count++;
            if (count == 2) {
                self.getHomePanel().unmask();
                if (self.treasuriesStore.getCount() == 0 && !GLOBAL.stopEvents) {
                    ETSY.alert(GLOBAL.offline_message);
                }
            }
        });
        self.getHomeCategoriesCarousel().setStore(self.categoryIndexStore);

        self.treasuriesStore.load(function() {
            count++;
            if (count == 2) {
                if (self.treasuriesStore.getCount() == 0  && !GLOBAL.stopEvents) {
                    ETSY.alert(GLOBAL.offline_message);
                }
                self.getHomePanel().unmask();
            }

        });
        self.getHomeTreasuriesCarousel().setStore(self.treasuriesStore);
    },

    loadInstructions: function() {
        ETSY.trackPageviews("/instructions", true);
        self.mainView.add(Ext.create('Etsy.view.InstructionsPanel', {
            hideOnMaskTap: true
        }));
        Ext.getCmp('instructionCarousel').removeAt(5);
    },

    loadTreasury: function(treasury_id, title) {
        ETSY.trackPageviews("/treasury/" + treasury_id);
        Ext.Ajax.abortAll();
        GLOBAL.stopEvents = true;
        GLOBAL.panel = 'treasury';
        var self = this;

        Ext.create('Etsy.view.TreasuryPanel');
        self.getTreasuryPanel().setMasked({
            xtype: 'loadmask',
            message: 'Loading ' + title
        });

        self.getAppPanel().getLayout().setAnimation({
            type: 'slide',
            duration: 300,
            direction: 'left'
        });

        self.getAppPanel().add(self.getTreasuryPanel());
        self.getAppPanel().setActiveItem(self.getTreasuryPanel());

        var store = self.listingsStore;
        //store.getProxy().setExtraParam('category', record.get('name'));
        delete self.listingsStore.getProxy()._extraParams.tags;
        delete self.listingsStore.getProxy()._extraParams.keywords;
        // resetting the store to use our NODE.JS
        store.getProxy().setUrl(GLOBAL.api + 'treasury?treasury=' + treasury_id);
        self.getTreasuryToolbar().setTitle(title);
        GLOBAL.searchCategory = null;
        Ext.getCmp('globalSearch').setPlaceHolder('Search Etsy');

        GLOBAL.stopEvents = false;
        store.load(function() {
            if (store.getCount() == 0 && !GLOBAL.stopEvents ) {
                ETSY.alert(GLOBAL.offline_message);
            }
            GLOBAL.stopEvents = false;
            APP.getTreasuryPanel().unmask();
        });
        self.getTreasuryCarousel().setStore(store);
    },

    loadSearch: function(keyword, category, minPrice, maxPrice, location) {
        //console.log('in loadSearch with these params', keyword, category, minPrice, maxPrice, location);
        ETSY.trackPageviews("/search/" + keyword);
        Ext.Ajax.abortAll();
        GLOBAL.stopEvents = true;
        GLOBAL.panel = 'searchResults';
        var self = this;

        // this wipes out all the pending events and then resumes
        var store = self.resultsListingsStore;

        Ext.create('Etsy.view.SearchResultsPanel');
        self.getSearchResultsPanel().setMasked({
            xtype: 'loadmask',
            message: 'Loading ' + keyword
        });

        self.getAppPanel().getLayout().setAnimation({
            type: 'slide',
            duration: 300,
            direction: 'left'
        });

        self.getAppPanel().add(self.getSearchResultsPanel());
        self.getAppPanel().setActiveItem(self.getSearchResultsPanel());

        store.getProxy().setUrl('http://openapi.etsy.com/v2/listings/active');
        store.getProxy().setExtraParam('keywords', keyword);

        if (category) {
            store.getProxy().setExtraParam('category', category.name);
            self.getSearchToolbar().setTitle('Search in ' + category.short_name + ' for: ' + keyword);
        } else {
            delete self.listingsStore.getProxy()._extraParams.category;
            self.getSearchToolbar().setTitle('Search Results for: ' + keyword);
        }

        if (minPrice) {
            store.getProxy().setExtraParam('min_price', minPrice);
        } else {
            delete self.listingsStore.getProxy()._extraParams.min_price;
        }

        if (maxPrice) {
            store.getProxy().setExtraParam('max_price', maxPrice);
        } else {
            delete self.listingsStore.getProxy()._extraParams.max_price;
        }

        if (location) {
            store.getProxy().setExtraParam('location', location);
        } else {
            delete self.listingsStore.getProxy()._extraParams.location;
        }

       GLOBAL.stopEvents = false;
        store.load(function(a, b, c, d, e) {
            //console.log(a,b,c,d,e);
            APP.getSearchResultsPanel().unmask();
            setTimeout(function() {
                if (store.getCount() == 0) {
                    Ext.getCmp('noResultsMessage').show();
                    Ext.getCmp('searchResultsCarousel').hide();
                    $('.rightArrow').hide();
                }
            },
            350);

        });
        self.getSearchResultsCarousel().setStore(store);
    },

    loadListings: function(type, record, name, tags) {
        ETSY.trackPageviews("/categories/" + record.get('name'));
        GLOBAL.panel = 'listings';
        GLOBAL.searchCategory = {
            short_name: record.get('short_name'),
            name: record.get('name')
        };
        var self = this;

        // this wipes out all the pending events and then resumes
        self.listingsStore.suspendEvents();
        Ext.Ajax.abortAll();
        GLOBAL.stopEvents = true;
        self.listingsStore.resumeEvents();

        self.getAppPanel().removeAll(true);
        Ext.create('Etsy.view.CategoriesPanel');
        if (type == 'category') {
            self.getCategoriesPanel().setMasked({
                xtype: 'loadmask',
                message: 'Loading ' + record.get('short_name')
            });
        } else {
            self.getCategoriesPanel().setMasked({
                xtype: 'loadmask',
                message: 'Loading ' + record
            });
        }

        self.getAppPanel().add(self.getCategoriesPanel());
        self.getAppPanel().setActiveItem(self.getCategoriesPanel());

        // ==============================================
        // = Clear out the store and reset the carousel =
        // ==============================================
        var store = self.listingsStore;
        store.removeAll(true);
        self.getCategoriesCarousel().reset();

        // remove all params from search
        delete self.listingsStore.getProxy()._extraParams.tags;
        delete self.listingsStore.getProxy()._extraParams.keywords;
        delete self.listingsStore.getProxy()._extraParams.min_price;
        delete self.listingsStore.getProxy()._extraParams.max_price;
        delete self.listingsStore.getProxy()._extraParams.location;
        // resetting the store to use our NODE.JS
        store.getProxy().setUrl(GLOBAL.api + 'categories?categories=' + record.get('name'));
        delete self.listingsStore.getProxy()._extraParams.categories;
        //console.log(GLOBAL.api + 'categories?category=' + record.get('name'));
        self.getCategoriesToolbar().setTitle(record.get('short_name'));
        $('#categoriesToolbar').removeClass('favorites');

        Ext.getCmp('globalSearch').setPlaceHolder('Search ' + record.get('short_name'));
        self.getNavList().select(1);
        GLOBAL.previousNavItemIndex = 1;

        GLOBAL.stopEvents = false;
        // load the store, then set the store, the refresh the carousel
        store.load(function() {
            if (self.listingsStore.getCount() == 0  && !GLOBAL.stopEvents) {
                ETSY.alert(GLOBAL.offline_message);
            }
            GLOBAL.stopEvents = false;
            self.getCategoriesPanel().unmask();
        });
        self.getCategoriesCarousel().setStore(store);

    },

    loadTreasuries: function() {
        ETSY.trackPageviews("/treasuries");
        Ext.Ajax.abortAll();
        GLOBAL.stopEvents = true;
        var self = this;
        self.getAppPanel().removeAll(true);
        Ext.create('Etsy.view.TreasuriesPanel');
        self.getAppPanel().setActiveItem(self.getTreasuriesPanel());
        self.getTreasuriesPanel().setMasked({
            xtype: 'loadmask',
            message: 'Loading Treasuries'
        });
        var store = self.treasuriesStore;
        GLOBAL.stopEvents = false;
        store.load(function() {
            if (store.getCount() == 0 && !GLOBAL.stopEvents) {
                ETSY.alert(GLOBAL.offline_message);
            }
            GLOBAL.stopEvents = false;
            APP.getTreasuriesPanel().unmask();
        });
        self.getTreasuriesCarousel().setStore(store);
    },

    loadFavorites: function() {
        //console.log('in loadFavortes');
        ETSY.trackPageviews("/favorites");
        if (!GLOBAL.signed_in) {
            ETSY.askForSignIn('This feature requires sign in.  Would you like to sign in?');
            return false;
        }

        GLOBAL.panel = 'favorites';
        var self = this;
        // this wipes out all the pending events and then resumes
        Ext.Ajax.abortAll();
//GLOBAL.stopEvents = true;

        self.getAppPanel().removeAll(true);
        Ext.create('Etsy.view.CategoriesPanel');
        self.getAppPanel().setActiveItem(self.getCategoriesPanel());
        $('#categoriesToolbar').addClass('favorites');
        self.getCategoriesToolbar().setTitle('Favorites');
        Ext.getCmp('globalSearch').setPlaceHolder('Search Etsy');
        self.getCategoriesPanel().setMasked({
            xtype: 'loadmask',
            message: 'Loading Favorites'
        });

        //console.log('loading favorites!!!');
        GLOBAL.oauth.get('http://openapi.etsy.com/v2/users/__SELF__/favorites/listings?limit=100',
        function(data) {

            var data = JSON.parse(data.text);
            var listingIds = [];
            for (i = 0; i < data.results.length; i++) {
                listingIds.push(data.results[i].listing_id);
            }
            //console.log('in favorrites listingIds', listingIds, listingIds.length)
            if (listingIds.length == 0) {
                self.getCategoriesCarousel().reset();
                self.getCategoriesPanel().unmask();
                Ext.getCmp('noFavoritesMessage').show();
                Ext.getCmp('categoriesCarousel').hide();
                $('.rightArrow').hide();

                return false;
            }

            GLOBAL.oauth.get('http://openapi.etsy.com/v2/listings/' + listingIds.join() + '?limit=100&includes=Images:6',
            function(data) {
                var data = JSON.parse(data.text);
                // console.log('data.results', data.results);
                var store = self.listingsStore;

                store.setData(data.results);
                self.getCategoriesCarousel().setStore(store);
                self.getCategoriesPanel().unmask();
            });
        });
    }

});