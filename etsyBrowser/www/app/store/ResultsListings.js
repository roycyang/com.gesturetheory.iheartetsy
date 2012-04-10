Ext.define('Etsy.store.ResultsListings', {
    extend: 'Ext.data.Store',
    requires: [
        'Etsy.model.Listing'
    ],

    config: {
        clearOnPageLoad: false,
        model: 'Etsy.model.Listing',
        storeId: 'ResultsListings',
        pageSize: 100,
    },

});