Ext.define('Etsy.store.Navigation', {
    extend: 'Ext.data.Store',
    requires: [
        'Etsy.model.Navigation'
    ],
    
    config: {
      autoLoad: true,
      autoSync: true,
      model: 'Etsy.model.Navigation',
       storeId: 'Navigation',
       sorters: 'name',
       
       grouper: {
           groupFn: function(record) {
               return record.get('type');
           }
       },
       groupDir: 'ASC',


  
       
       
    }

    
});