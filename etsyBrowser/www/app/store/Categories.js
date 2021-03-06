Ext.define('Etsy.store.Categories', {
    extend: 'Ext.data.TreeStore',
    requires: ['Etsy.model.Category'],

    config :{
        model: 'Etsy.model.Category',
        storeId: 'Categories',
        defaultRootProperty: 'results',
        root: {
            expanded: true
        }
    }
});