Ext.define('Etsy.store.Categories', {
    extend: 'Ext.data.TreeStore',
    requires: ['Etsy.model.Category'],

    config :{
        model: 'Etsy.model.Category',
        autoLoad: true,
        root: {
            expanded: true
        }
    }
});