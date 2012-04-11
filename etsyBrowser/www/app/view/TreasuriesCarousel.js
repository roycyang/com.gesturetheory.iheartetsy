Ext.define('Etsy.view.TreasuriesCarousel', {
    extend: 'Etsy.view.ListingsCarousel',
    xtype: 'treasuriesCarousel',
    requires: ['Etsy.view.Treasuries'],
    config: {
        width: 950,
        innerItemConfig: {
            xclass: 'Etsy.view.Treasuries'
        }
    }
});
