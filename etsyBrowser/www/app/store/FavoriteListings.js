Ext.define('Etsy.store.FavoriteListings', {
    extend: 'Ext.data.Store',
    requires: [
        'Etsy.model.Listing'
    ],

    config: {
        clearOnPageLoad: false,
        model: 'Etsy.model.Listing',
        storeId: 'FavoriteListings',
        pageSize: 100,
    }
});