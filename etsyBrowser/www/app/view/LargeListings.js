Ext.define('Etsy.view.LargeListings', {
    extend: 'Ext.Component',
    xtype: 'largeListings',

    config: {
        baseCls: 'large-listings',

        records: null,

        tpl: new Ext.XTemplate(

                    '<tpl for="items">',

                            '<div class="large-product" ref="{data.id}">',
                                '<div class="image" style="background-image:url({data.image.full});"></div>',
                                '</div>',
                    '</tpl>'
                
        )
    },

    updateRecords: function(newRecords) {
        this.setData({
            items: newRecords.items,
            landscape: Ext.Viewport.getOrientation() == "landscape"
        });
    }
});
