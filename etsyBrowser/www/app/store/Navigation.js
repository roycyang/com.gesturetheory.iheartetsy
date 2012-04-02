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
           { title: 'Discover <span class="arrow">><span>',  type: 'Navigation', panel: 'homePanel'  },
           { title: '<div class="categories-label">Categories <span class="count">31<span></div>',  type: 'Navigation'  , panel: 'categoriesPanel'},
           { title: 'Treasuries <span class="arrow">><span>',  type: 'Navigation'  , panel: 'treasuriesPanel'},
           { title: '<div class="favorites-label">Favorites <span class="count"></span></div>',  type: 'Navigation'  , panel: 'favoritesPanel'},
           { title: '<div class="cart-label">Cart <span class="count"></span></div>',  type: 'Navigation'  , panel: 'cartPanel'},
           { title: 'Feedback <span class="arrow">><span>',  type: 'Navigation'  , panel: 'feedback'},
           { title: 'Art <span class="arrow">><span>',  type: 'Bookmarked Categories'  , panel: 'bookmarkedCategory', short_name: 'Art', name: 'art'},
           { title: 'Weddings <span class="arrow">><span>',  type: 'Bookmarked Categories', panel: 'bookmarkedCategory', short_name: 'Weddings', name: 'weddings'},
       ]
    }

    
});