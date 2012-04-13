Ext.define('Etsy.store.Listings', {
    extend: 'Ext.data.Store',
    requires: [
        'Etsy.model.Listing'
    ],

    config: {
        clearOnPageLoad: false,
        model: 'Etsy.model.Listing',
        storeId: 'Listings',
        pageSize: 100,
    }
});