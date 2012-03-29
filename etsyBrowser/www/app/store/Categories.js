Ext.define('Etsy.store.Categories', {
    extend: 'Ext.data.TreeStore',
    requires: ['Etsy.model.Category'],

    config :{
        model: 'Etsy.model.Category',
        autoLoad: true,
        storeId: 'Categories',
        defaultRootProperty: 'items',
        root: {
            expanded: true
        }
    }
});