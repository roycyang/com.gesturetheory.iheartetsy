Ext.define('Etsy.store.CategoriesIndex', {
    extend: 'Ext.data.Store',
    requires: [
        'Etsy.model.Treasury'
    ],

    config: {
        clearOnPageLoad: false,
        model: 'Etsy.model.CategoriesIndex',
        storeId: 'CategoriesIndex',
    },
    

});