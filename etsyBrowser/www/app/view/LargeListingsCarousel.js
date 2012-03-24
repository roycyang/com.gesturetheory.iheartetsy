Ext.define('Etsy.view.LargeListingsCarousel', {
    extend: 'Etsy.view.ListingsCarousel',
    xtype: 'largeListingsCarousel',
    requires: ['Etsy.view.LargeListings'],

    config: {
        direction: 'horizontal',
        innerItemConfig: {
            xclass: 'Etsy.view.LargeListings'
        },

        count: 1,

        offsetLimit: 100,

        store: null,

        animation: {
            duration: 350
        },

        listeners: {
            activeitemchange: 'onActiveItemChange',
            itemindexchange: 'onItemIndexChange'
        }
    },

 
});
