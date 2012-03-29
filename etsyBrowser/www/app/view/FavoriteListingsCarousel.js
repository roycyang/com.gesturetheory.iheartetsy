Ext.define('Etsy.view.FavoriteListingsCarousel', {
    extend: 'Etsy.view.ListingsCarousel',
        xtype: 'favoriteslistingsCarousel',

        config: {
            innerItemConfig: {
                xclass: 'Etsy.view.FavoriteListings'
            },

        },


        updateStore: function(newStore) {
           
        },

    onActiveItemChange: function(carousel, newItem, oldItem) {
    
    },

    onItemIndexChange: function(me, item, index) {
        var store = this.getStore(),
            count = this.getCount(),
            records, startIndex, endIndex,
            i;

        if (!store) {
            return;
        }

        startIndex = index * count;
        
        
        

        if (count > 1) {
            endIndex = startIndex + count;
        } else {
            endIndex = startIndex;
        }

        records = store.queryBy(function(record, id) {
            i = store.indexOf(record);
            if (i >= startIndex && i <= endIndex) {
                return record;
            }
        }, this);

        item.setRecords(records);
    }
});
