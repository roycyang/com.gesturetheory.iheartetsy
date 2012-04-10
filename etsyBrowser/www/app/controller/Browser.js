Ext.define('Etsy.controller.Browser', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      navPanel: '#navPanel',
      searchPanel: '#searchPanel',
      navList: '#navList',
      appPanel: '#appPanel',
      
            
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
      detailPanel: '#detailPanel',
      
      // categories popup
      categoryPopupPanel: 'categoryPopupPanel'

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

  launch: function () {
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
    self.mainView.add(Ext.create('Etsy.view.CategoryPopupPanel'));
    self.detailPanel = Ext.create('Etsy.view.DetailPanel');

    // all the stores
    self.listingsStore = Ext.data.StoreManager.lookup('Listings');
    self.resultsListingsStore = Ext.data.StoreManager.lookup('ResultsListings');
    self.treasuriesStore = Ext.data.StoreManager.lookup('Treasuries');
    self.categoriesStore = Ext.data.StoreManager.lookup('Categories');
    self.categoryIndexStore = Ext.data.StoreManager.lookup('CategoriesIndex');

    // adding the homepage to the getAppPanel		
    self.loadHomePanel();

    ETSY.toggleSignIn();
  },

  toggleNav: function (position) {
    var self = this;
    if (GLOBAL.expandedNav || position == 'close') {
      self.getAppPanel().unmask();
      $('#appPanel').css('-webkit-transform', 'translate3d(0px,0,0)');
      GLOBAL.expandedNav = false;
      setTimeout(function(){
        self.getNavPanel().hide();
      }, 350);
    } else {
      self.getNavPanel().show();
      self.getAppPanel().setZIndex(10000);
      $('#appPanel').css('-webkit-transform', 'translate3d(288px,0,0)');
      GLOBAL.expandedNav = true;
    }
  },

  toggleSearch: function (position) {
    var self = this;
    if (GLOBAL.expandedNav || position == 'close') {
      self.getAppPanel().unmask();
      $('#appPanel').css('-webkit-transform', 'translate3d(0px,0,0)');
      GLOBAL.expandedNav = false;
      setTimeout(function(){
        self.getSearchPanel().hide();
      }, 350);
    } else {
      self.getSearchPanel().show();
      $('#appPanel').css('-webkit-transform', 'translate3d(-288px,0,0)');
      self.getAppPanel().setZIndex(1000);
      GLOBAL.expandedNav = true;
    }
  },

  onSignOutTap: function () {
    ETSY.alert('You have successfully signed out. Come back soon!');
  },

  // ==========
  // = Search =
  // ==========
  onSearchKeyup: function (textfield, e, options) {
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
  onListingTap: function (view, record) {
    console.log('**on onListingTap!');

    this.detailPanel.setData(record.data);

    if (!this.detailPanel.getParent()) {
      Ext.Viewport.add(this.detailPanel);
    }

    this.detailPanel.show();
  },

  onNavListTap: function (view, index, item, record) {
    var self = this;
    var panel = record.panel || record.get('panel');
    if (panel == 'feedback') {
      try {
        window.plugins.emailComposer.showEmailComposer('Feedback on I Heart Etsy iPad App v' + GLOBAL.version, null, "iheartetsy@gtcrafted.com");
      } catch (err) {
        ETSY.alert('This only works on the iPad');
      }
      self.selectNavListItem();
    } else if (panel == 'cartPanel') {
      if (!GLOBAL.signed_in) {
        ETSY.askForSignIn('This feature requires sign in.  Would you like to sign in?');

        return false;
      }
      try {
        window.plugins.childBrowser.showWebPage("http://www.etsy.com/cart");
      } catch (err) {
        ETSY.alert('This only works on the iPad');
      }

      self.selectNavListItem();
    } else if (panel == 'signout') {
      ETSY.confirm("Are you sure you want to sign out?", function (buttonId) {

        if (buttonId == 'yes' || buttonId == '1') {
          localStorage.removeItem('accessTokenKey');
          localStorage.removeItem('accessTokenSecret');
          ETSY.toggleSignIn();
          APP.onSignOutTap();
          APP.loadHomePanel();
          GLOBAL.second_signin = false;
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
    this.toggleNav('close');
  },

  selectNavListItem: function () {
    setTimeout(function () {
      if (GLOBAL.previousNavItemIndex == -1) {
        self.getNavList().deselectAll();
      } else if (GLOBAL.previousNavItemIndex) {
        self.getNavList().select(GLOBAL.previousNavItemIndex);
      } else {
        self.getNavList().select(0);
      }
    }, 350);
  },

  loadCategories: function () {
    var self = this;
    self.getCategoryPopupPanel().show();
  },

  loadHomePanel: function () {
    GLOBAL.panel = 'home';
    var self = this;
    self.getAppPanel().removeAll(true);

    // load homePanel and then destroy all the other panels
    Ext.create('Etsy.view.HomePanel');
    self.treasuriesStore.load();
    self.categoryIndexStore.load();
    self.getHomeTreasuriesCarousel().setStore(self.treasuriesStore);
    self.getHomeCategoriesCarousel().setStore(self.categoryIndexStore);
    self.getAppPanel().add(self.getHomePanel());
    self.getAppPanel().setActiveItem(self.getHomePanel());
    self.getHomePanel().setMasked({
      xtype: 'loadmask',
      message: 'Loading Home',
    });
  },

  loadTreasury: function (treasury_id, title) {
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
    store.getProxy().setUrl('http://50.74.56.194:8888/treasury?treasury=' + treasury_id);
    self.getTreasuryToolbar().setTitle(title);
    GLOBAL.searchCategory = null;
    Ext.getCmp('globalSearch').setPlaceHolder('Search Etsy');

    store.load();

    //empty the store before adding the new one
    var treasuryCarouselStore = self.getTreasuryCarousel().getStore();
    if (treasuryCarouselStore) {
      console.log('updating the store in loadlist');
      // if there is already a store, then it needs to be updated, not set
      self.getTreasuryCarousel().updateStore(store);
    } else {
      console.log('add the store in loadlist');
      self.getTreasuryCarousel().setStore(store);
    }

    self.getAppPanel().setActiveItem(self.categoriesPanel);
    self.getTreasuryCarousel().reset();
    self.getTreasuryCarousel().setActiveItem(0);
  },

  loadSearch: function (keyword, category) {
    GLOBAL.panel = 'searchResults';
    var self = this;

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

    var store = self.resultsListingsStore;
    store.removeAll(true);
    if(category){
      store.getProxy().setUrl('http://openapi.etsy.com/v2/listings/active');
      store.getProxy().setExtraParam('keywords', keyword);
      store.getProxy().setExtraParam('category', category.name);
      self.getSearchToolbar().setTitle('Search in ' + category.short_name + ' for: ' + keyword);
    }else{
      store.getProxy().setUrl('http://openapi.etsy.com/v2/listings/active');
      store.getProxy().setExtraParam('keywords', keyword);
      delete self.listingsStore.getProxy()._extraParams.category;
      self.getSearchToolbar().setTitle('Search Results for: ' + keyword);
    }

    store.load();

    self.getSearchResultsCarousel().setStore(store);

    self.getSearchResultsCarousel().reset();
    self.getSearchResultsCarousel().setActiveItem(0);
  },
  
  loadListings: function (type, record, name, tags) {
    GLOBAL.panel = 'listings';

    var self = this;
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
    
    
    switch (type) {
    case 'category':
      delete self.listingsStore.getProxy()._extraParams.tags;
      delete self.listingsStore.getProxy()._extraParams.keywords;
      // resetting the store to use our NODE.JS
      store.getProxy().setUrl('http://50.74.56.194:8888/categories?category=' + record.get('name'));
      console.log('http://50.74.56.194:8888/categories?category=' + record.get('name'));
      self.getCategoriesToolbar().setTitle(record.get('short_name'));
      
      GLOBAL.searchCategory = {
        short_name: record.get('short_name'),
        name: record.get('name')
      };
      
      Ext.getCmp('globalSearch').setPlaceHolder('Search ' + record.get('short_name'));
      self.getNavList().select(1);
      GLOBAL.previousNavItemIndex = 1;
      break;
    // case 'tags':
    //   delete self.listingsStore.getProxy()._extraParams.keywords;
    //   store.getProxy().setExtraParam('tags', tags);
    //   store.getProxy().setExtraParam('category', record.get('name'));
    //   store.getProxy().setUrl('http://50.74.56.194:8888/categories');
    //   self.getNavList().select(1);
    //   GLOBAL.previousNavItemIndex = 1;
    //   // resetting the store to use our NODE.JS
    //   // store.getProxy().setUrl('http://50.74.56.194:8888/art');
    //   console.log('record is', record);
    //   self.getCategoriesToolbar().setTitle(name);
    //   Ext.getCmp('globalSearch').setPlaceHolder('Search ' + name);
    //   break;
    case 'keyword':
      self.getNavList().deselectAll();
      delete self.listingsStore.getProxy()._extraParams.tags;
      delete self.listingsStore.getProxy()._extraParams.category;
      store.getProxy().setUrl('http://openapi.etsy.com/v2/listings/active');
      store.getProxy().setExtraParam('keywords', record);
      self.getCategoriesToolbar().setTitle('Search Results for: ' + record);
      GLOBAL.previousNavItemIndex = -1;
      break;
    }



    // //empty the store before adding the new one
    // var categoriesCarouselStore = self.getCategoriesCarousel().getStore();
    // if (categoriesCarouselStore) {
    //   // self.getCategoriesCarousel().reset();
    //   console.log('updating the store in loadlist');
    //   // if there is already a store, then it needs to be updated, not set
    //   self.getCategoriesCarousel().updateStore(store);
    // } else {
    //   console.log('add the store in loadlist');
    //   self.getCategoriesCarousel().setStore(store);
    // }
    
    // load the store, then set the store, the refresh the carousel
    store.load();
    self.getCategoriesCarousel().setStore(store);
    self.getCategoriesCarousel().reset();
    self.getCategoriesCarousel().setActiveItem(0);
    self.getCategoriesCarousel().reset();
  },

  loadTreasuries: function () {
    var self = this;
    self.getAppPanel().removeAll(true);
    Ext.create('Etsy.view.TreasuriesPanel');
    self.getAppPanel().setActiveItem(self.getTreasuriesPanel());
    self.getTreasuriesPanel().setMasked({
      xtype: 'loadmask',
      message: 'Loading Treasuries'
    });
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

  loadFavorites: function () {
    if (!GLOBAL.signed_in) {
      ETSY.askForSignIn('This feature requires sign in.  Would you like to sign in?');
      return false;
    }
    GLOBAL.panel = 'favorites';
    var self = this;
    self.getAppPanel().removeAll(true);
    Ext.create('Etsy.view.CategoriesPanel');
    self.getAppPanel().setActiveItem(self.getCategoriesPanel());
    self.getCategoriesToolbar().setTitle('Favorites');
    self.getCategoriesPanel().setMasked({
      xtype: 'loadmask',
      message: 'Loading Favorites'
    });

    GLOBAL.oauth.get('http://openapi.etsy.com/v2/users/__SELF__/favorites/listings?limit=100', function (data) {

      var data = JSON.parse(data.text);
      var listingIds = [];
      for (i = 0; i < data.results.length; i++) {
        listingIds.push(data.results[i].listing_id);
      }
      if(listingIds.length == 0){
        self.getCategoriesCarousel().reset();
        self.getCategoriesPanel().unmask();
        return false;
      }

      GLOBAL.oauth.get('http://openapi.etsy.com/v2/listings/' + listingIds.join() + '?limit=100&includes=Images:6', function (data) {
        var data = JSON.parse(data.text);
        var store = self.listingsStore;
        // removes the items in the store and doesn't fire any events
        store.removeAll(true);
        store.add(data.results);
        Ext.getCmp('globalSearch').setPlaceHolder('Search Etsy');
        self.getCategoriesCarousel().setStore(store);
        self.getCategoriesCarousel().reset()

        self.getCategoriesCarousel().setActiveItem(0);
        self.getCategoriesPanel().unmask();
      });
    });
  }

});