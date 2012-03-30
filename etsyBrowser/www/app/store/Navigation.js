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
           { title: 'Discover',  type: 'Navigation', panel: 'homePanel'  },
           { title: 'Categories',  type: 'Navigation'  , panel: 'categoriesPanel'},
           { title: 'Treasuries',  type: 'Navigation'  , panel: 'treasuriesPanel'},
           { title: 'Favorites',  type: 'Navigation'  , panel: 'favoritesPanel'},
           { title: 'Cart',  type: 'Navigation'  , panel: 'cartPanel'},
           { title: 'Feedback',  type: 'Navigation'  , panel: 'feedback'},
           { title: 'Art',  type: 'Bookmarked Categories'  , panel: 'bookmarkedCategory', short_name: 'Art', name: 'art'},
           { title: 'Weddings',  type: 'Bookmarked Categories', panel: 'bookmarkedCategory', short_name: 'Weddings', name: 'weddings'},
       ]
    }

    
});