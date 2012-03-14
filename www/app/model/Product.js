Ext.define('TouchStyle.model.Product', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
			{
	            name: 'id',
	            convert: function(value, record) {
	                return record.data.listing_id;
	            }
	        },
            'listing_id',
            'Images',
            'description',
            'title',
            'url',
			'price',
            {
                name: 'image',
                convert: function(value, record) {            
                    return {
						thumb: record.data.Images[0]['url_170x135'],
						large: record.data.Images[0]['url_570xN']
					}
                }
            },

        ],

        proxy: {
            type: 'jsonp',
            //url: 'http://openapi.etsy.com/v2/shops/:urlId/listings/active.js',
            limitParam: 'limit',
            startParam: 'offset',
            pageParam: false,
            extraParams: {
                api_key: 'j5utcraygkcgn2vg6rfln8xh',
				includes: 'Images:1'
            },
            reader: {
                type: 'json',
                rootProperty: 'results'
            }
        }
    },

    toUrl: function() {
        return this.parentNode.get('urlId') + '/'+ this.get('id');
    }
});
