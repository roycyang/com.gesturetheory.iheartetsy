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
           { title: 'Discover',  type: '', panel: 'homePanel'  },
           { title: 'Categories',  type: ''  , panel: 'browserPanel'},
           // { title: 'Treasuries',  type: ''  , panel: 'discoverPanel'},
           { title: 'Favorites',  type: ''  , panel: 'heartPanel'},
           { title: 'Cart',  type: ''  , panel: 'cartPanel'},
           { title: 'Settings',  type: ''  , panel: 'settingsPanel'},
           { title: 'Feedback',  type: ''  , panel: 'feedback'},
           { title: 'Art',  type: 'Bookmarked Categories'  , panel: 'bookmarkedCategory', short_name: 'Art', name: 'art'},
           { title: 'Weddings',  type: 'Bookmarked Categories', panel: 'bookmarkedCategory', short_name: 'Weddings', name: 'weddings'},
       ]
    }

    
});