Ext.define('TouchStyle.view.Products', {
    extend: 'Ext.Component',
    xtype: 'products',

    config: {
        baseCls: 'products',

        records: null,

        tpl: new Ext.XTemplate(
            '<tpl if="landscape">',
                '<div class="row landscape">',
                    '<tpl for="items">',
                        '{% if (xindex < 5) { %}',
                            '<div class="product" ref="{data.id}">',
                                '<div class="image" style="background-image:url({data.image.thumb});"></div>',
                                '<div class="name">{data.title}</div><div class="price">${data.price} <span class="usd">USD</span></div>',
                                
                            '</div>',
                        '{% } %}',
                    '</tpl>',
                '</div>',

                '<div class="row landscape">',
                    '<tpl for="items">',
                        '{% if (xindex > 4) { %}',
                            '<div class="product" ref="{data.id}">',
                                '<div class="image" style="background-image:url({data.image.thumb});"></div>',
                                '<div class="name">{data.title}</div><div class="price">${data.price} <span class="usd">USD</span></div>',
                                
                            '</div>',
                        '{% } %}',
                    '</tpl>',
                '</div>',
            '</tpl>',

            '<tpl if="!landscape">',
                '<div class="row portrait">',
                    '<tpl for="items">',
                        '{% if (xindex < 4) { %}',
                            '<div class="product" ref="{data.id}">',
                                '<div class="image" style="background-image:url({data.image.thumb});"></div>',
                                '<div class="name">{data.title}</div><div class="price">${data.price} <span class="usd">USD</span></div>',
                                
                            '</div>',
                        '{% } %}',
                    '</tpl>',
                '</div>',

                '<div class="row portrait">',
                    '<tpl for="items">',
                        '{% if (xindex > 3 && xindex < 7) { %}',
                            '<div class="product" ref="{data.id}">',
                                '<div class="image" style="background-image:url({data.image.thumb});"></div>',
                                '<div class="name">{data.title}</div><div class="price">${data.price} <span class="usd">USD</span></div>',
                                
                            '</div>',
                        '{% } %}',
                    '</tpl>',
                '</div>',

                '<div class="row portrait">',
                    '<tpl for="items">',
                        '{% if (xindex > 6) { %}',
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
		console.log('newRecords is', newRecords);
        this.setData({
            items: newRecords.items,
            landscape: Ext.Viewport.getOrientation() == "landscape"
        });
    }
});
