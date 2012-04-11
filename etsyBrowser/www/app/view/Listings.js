Ext.define('Etsy.view.Listings', {
    extend: 'Ext.Component',
    xtype: 'listings',

    config: {
        baseCls: 'products',

        records: null,

        tpl: new Ext.XTemplate(
          '<tpl for="items">',
              '{% if (xindex < 17) { %}',
                // '{data.category_path}<br/>',
                  '<div class="product <tpl if="data.state == \'sold_out\'"> sold-flag</tpl> <tpl if="data.in_cart"> cart-flag</tpl> <tpl if="data.in_favorites"> favorite-flag</tpl>" ref="{data.id}"><div class="favorite-stamp"></div><div class="cart-stamp"></div>',
                      '<div class="image" style="background-image:url({data.image.thumb});"></div>',
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
      var items = newRecords.items;
    
      // test to see if the items are already in the shopping cart or favorites
      for(i = 0; i < items.length; i++){
        var id = items[i].get('id');
        if(localStorage.cart_listing_ids && localStorage.cart_listing_ids.indexOf(id) != -1){
          items[i].set('in_cart', true);
        }
        if(localStorage.favorites_listing_ids && localStorage.favorites_listing_ids.indexOf(id) != -1){
          items[i].set('in_favorites', true);
        }
      }

      this.setData({
        items: newRecords.items,
        landscape: Ext.Viewport.getOrientation() == "landscape"
      });


        

    }
});
