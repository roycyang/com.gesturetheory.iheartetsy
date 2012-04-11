Ext.define('Etsy.model.Navigation', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['title', 'type', 'panel', 'name', 'short_name'],
             proxy: {
                 type: 'localstorage',
                 id  : 'navigation-v1-0-0'
             }
    }
});