Ext.define('Etsy.view.Listings', {
    extend: 'Ext.Component',
    xtype: 'listings',

    config: {
        baseCls: 'products',

        records: null,

        tpl: new Ext.XTemplate(
            '<tpl if="landscape">',
                '<div class="row landscape">',
                    '<tpl for="items">',
                        '{% if (xindex < 6) { %}',
                            '<div class="product" ref="{data.id}">',
                                '<div class="image" style="background-image:url({data.image.thumb});"></div>',
                                '<div class="name">{data.title}</div><div class="price">${data.price} <span class="usd">USD</span></div>',
                                
                            '</div>',
                        '{% } %}',
                    '</tpl>',
                '</div>',

                '<div class="row landscape">',
                    '<tpl for="items">',
                        '{% if (xindex > 5 && xindex < 11) { %}',
                            '<div class="product" ref="{data.id}">',
                                '<div class="image" style="background-image:url({data.image.thumb});"></div>',
                                '<div class="name">{data.title}</div><div class="price">${data.price} <span class="usd">USD</span></div>',
                                
                            '</div>',
                        '{% } %}',
                    '</tpl>',
                '</div>',

                '<div class="row landscape">',
                    '<tpl for="items">',
                        '{% if (xindex > 10) { %}',
                            '<div class="product" ref="{data.id}">',
                                '<div class="image" style="background-image:url({data.image.thumb});"></div>',
                                '<div class="name">{data.title}</div><div class="price">${data.price} <span class="usd">USD</span></div>',
                                
                            '</div>',
                        '{% } %}',
                    '</tpl>',
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
