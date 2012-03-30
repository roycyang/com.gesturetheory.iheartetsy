Ext.define('Etsy.model.Listing', {
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
	            name: 'rounded_price',
	            convert: function(value, record) {
					try{
					    var price = record.data.price.split(".");
    	                return price[0]; 
					}catch(err){
					    return "";
					}
					
	            }
	        },
			'User',
			'quantity',
			
            {
                name: 'image',
                convert: function(value, record) {    
                    var images = {};        
                    try{
                        images = {
                            thumb: record.data.Images[0]['url_170x135'],
    						large: record.data.Images[0]['url_570xN'],
    						full: record.data.Images[0]['url_fullxfull']
                        };
                        
                    }catch(err)
                          {
                    console.log('error in record', record)
                    }
                    
                    return images;
                }
            },

        ],

        proxy: {
            // type: 'jsonp',
            //url: 'http://openapi.etsy.com/v2/listings/active',
            type: 'ajax',
            url: 'http://50.74.56.194:8888/art',
            
            limitParam: 'limit',
            startParam: 'offset',
            pageParam: false,
            extraParams: {
                api_key: 'tia49fh9iqjcrukurpbyqtv5',
				includes: 'Images:6,User'
            },
            reader: {
                type: 'json',
                rootProperty: 'results'
            }
        }
    },
});