Ext.define('Etsy.view.Listings', {
    extend: 'Ext.Component',
    xtype: 'listings',

    config: {
        baseCls: 'products',

        records: null,

        tpl: new Ext.XTemplate(
          '<tpl for="items">',
              '{% if (xindex < 17) { %}',
                  '<div class="product" ref="{data.id}"><div class="favorite-stamp"></div><div class="cart-stamp"></div>',
                      '<div class="image-wrapper"><div class="image" style="background-image:url({data.image.thumb});"></div></div>',
                      '<div class="name">{data.title}</div>',
  		                '<tpl if="data.state == \'sold_out\'">',
                          '<div class="sold price">SOLD</div>',
                      '</tpl>',
                      '<tpl if="data.state == \'active\'">',
                          '<div class="price">${data.rounded_price}</div>',
                      '</tpl>',
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
