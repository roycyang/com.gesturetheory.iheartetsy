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
           // { title: 'Art',  type: 'Bookmarked Categories'  , panel: 'discoverPanel'},
           // { title: 'Wedding',  type: 'Bookmarked Categories'  , panel: 'discoverPanel'},
       ]
    }

    
});