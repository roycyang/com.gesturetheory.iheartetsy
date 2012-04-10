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
       groupDir: 'ASC',

       data: [
           { title: 'Home',  type: '', panel: 'homePanel'  },
           { title: '<div class="categories-label">Categories</div>',  type: ''  , panel: 'categoriesPanel'},
           { title: 'Treasuries',  type: ''  , panel: 'treasuriesPanel'},
           { title: '<div class="favorites-label">Favorites <span class="count"></span></div>',  type: ''  , panel: 'favoritesPanel'},
           { title: '<div class="cart-label">Cart <span class="count"></span></div>',  type: ''  , panel: 'cartPanel'},
           { title: 'Feedback',  type: ''  , panel: 'feedback'},
           { title: '<div class="sign-out-link">Sign Out</div>',  type: ''  , panel: 'signout'},
           { title: 'Art',  type: 'Bookmarked Categories'  , panel: 'bookmarkedCategory', short_name: 'Art', name: 'art'},
           { title: 'Weddings',  type: 'Bookmarked Categories', panel: 'bookmarkedCategory', short_name: 'Weddings', name: 'weddings'},
       ]
    }

    
});