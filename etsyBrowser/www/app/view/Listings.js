Ext.define('Etsy.view.Listings', {
    extend: 'Ext.Component',
    xtype: 'listings',

    config: {
        baseCls: 'products',

        records: null,

        tpl: new Ext.XTemplate(

                    '<tpl for="items">',
                        '{% if (xindex < 13) { %}',
                            '<div class="product" ref="{data.id}"><div class="favorite-stamp"></div><div class="cart-stamp"></div>',
                                '<div class="image-wrapper"><div class="image" style="background-image:url({data.image.thumb});"></div><div class="actions"><div class="add-to-favorites">Add to Favorites</div><div class="add-to-cart">Add to Pinterest</div></div></div>',
                                '<div class="name">{data.title}</div><div class="price">${data.rounded_price}</div>',
                                
                            '</div>',
                        '{% } %}',
                    '</tpl>'
                
        )
    },
    
    
    updateRecords: function(newRecords) {
        // console.log('newRecords is', newRecords);
        this.setData({
            items: newRecords.items,
            landscape: Ext.Viewport.getOrientation() == "landscape"
        });

    }
});
