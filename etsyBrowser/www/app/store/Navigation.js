Ext.define('Etsy.store.Navigation', {
    extend: 'Ext.data.Store',
    requires: [
        'Etsy.model.Navigation'
    ],
    
    config: {
        model: 'Etsy.model.Navigation',
       storeId: 'Navigation',
       sorters: 'lastName',

       grouper: {
           groupFn: function(record) {
               return record.get('type');
           }
       },
       groupDir: 'DESC',

       data: [
           { title: 'Home',  type: 'Navigation', panel: 'homePanel'  },
           { title: '<div class="categories-label">Categories</div>',  type: 'Navigation'  , panel: 'categoriesPanel'},
           { title: 'Treasuries',  type: 'Navigation'  , panel: 'treasuriesPanel'},
           { title: '<div class="favorites-label">Favorites <span class="count"></span></div>',  type: 'Navigation'  , panel: 'favoritesPanel'},
           { title: '<div class="cart-label">Cart <span class="count"></span></div>',  type: 'Navigation'  , panel: 'cartPanel'},
           { title: 'Feedback',  type: 'Navigation'  , panel: 'feedback'},
           { title: '<div class="sign-out-link">Sign Out</div>',  type: 'Navigation'  , panel: 'signout'},
           // { title: 'Art',  type: 'Bookmarked Categories'  , panel: 'bookmarkedCategory', short_name: 'Art', name: 'art'},
           // { title: 'Weddings',  type: 'Bookmarked Categories', panel: 'bookmarkedCategory', short_name: 'Weddings', name: 'weddings'},
       ]
    }

    
});