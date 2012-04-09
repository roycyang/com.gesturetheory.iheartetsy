Ext.define('Etsy.view.TreasuriesCarousel', {
    extend: 'Etsy.view.ListingsCarousel',
    xtype: 'treasuriesCarousel',
    requires: ['Etsy.view.Treasuries'],
    config: {
        width: 950,
        innerItemConfig: {
            xclass: 'Etsy.view.Treasuries'
        }
    },

    updateStore: function(newStore) {
        // console.log('update the store', newStore);
        var me = this;

        if (newStore.isLoading()) {
            // me.setMasked({
            //      xtype: 'loadmask',
            //      message: 'Loading Treasuries...'
            //  });
            
            // this is when the store updates, we can update the max index.
            // newStore.on('refresh', function() {
            //                 // console.log('\n\n\n\n\n\n\nNewStore', newStore.data.length);
            //                 var storeCount = newStore.data.length;
            //                 var max = parseInt(storeCount/me.getCount());
            //                 setTimeout(function(){
            //                     me.setMaxItemIndex(max-1);
            //                 }, 1000);
            //                 
            //                 if(storeCount == 100){
            //                     newStore.getProxy().setUrl('http://openapi.etsy.com/v2/listings/active');
            //                     //newStore.getProxy().setType('jsonp');
            //                     
            //                     // type: 'jsonp',
            //                     //             url: 'http://openapi.etsy.com/v2/listings/active.js',
            //                 }
            // 
            //             });

            // this is when the store loads for the first time
            newStore.on('load', function() {
                //console.log('\n\n\n\n\n\nin the newstore.load');
                // me.setMasked(false);
                
                if (APP.getTreasuriesPanel()) {
                    APP.getTreasuriesPanel().unmask();
                }
                
                if (APP.getHomePanel()) {
                    APP.getHomePanel().unmask();
                }
                if(newStore.data.length == 0){
                  ETSY.alert('There is a problem connecting, please try again later');
                }

                me.updateStore(newStore);
            }, me, {
                single: true
            });
        } else {
            me.reset();
            
        }
    },
});
