Ext.define('Etsy.store.Treasuries', {
    extend: 'Ext.data.Store',
    requires: [
        'Etsy.model.Treasury'
    ],

    config: {
		autoLoad: true,
        clearOnPageLoad: false,
        model: 'Etsy.model.Treasury',
        storeId: 'Treasuries'
    }
});