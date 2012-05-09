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
        'description',
        {
            name: 'parsed_description',
            convert: function(value, record) {
                return record.data.description.replace(/\n/g, '<br />');
            }
        },
        'listing_id',
        'Images',
        'title',
        'url',
        'price',
        'state',
        'in_cart',
        'in_favorites',
        'category_path',
        {
            name: 'rounded_price',
            convert: function(value, record) {
                try {
                    var price = record.data.price.split(".");
                    return price[0];
                } catch(err) {
                    return "";
                }
            }
        },
        'User',
        {
            name: 'feedback_score',
            convert: function(value, record) {
                var score = record.data.User.feedback_info.score;
                if (score < 1 || score === null) {
                    return 'No score.';
                } else {
                    return score;
                }
            }
        },
        {
            name: 'feedback_count',
            convert: function(value, record) {
                var count = record.data.User.feedback_info.count;
                if (count < 1 || count === null) {
                    return 'No feedback.';
                } else {
                    return count;
                }
            }
        },
        'ShippingInfo',
        'quantity',
        {
            name: 'image',
            convert: function(value, record) {
                var images = {};
                try {
                    images = {
                        thumb: record.data.Images[0]['url_170x135'],
                        large: record.data.Images[0]['url_570xN'],
                        full: record.data.Images[0]['url_fullxfull']
                    };

                } catch(err) {
                    //console.log('error in record', record)
                    }

                return images;
            }
        },
        ],
        proxy: {
            type: 'ajax',
            url: GLOBAL.api + 'categories',
            limitParam: 'limit',
            startParam: 'offset',
            pageParam: false,
            extraParams: {
                api_key: 'tia49fh9iqjcrukurpbyqtv5',
                includes: 'Images:6,User,ShippingInfo',
                limit: '100'
            },
            reader: {
                type: 'json',
                totalProperty: 'count',
                rootProperty: 'results'
            }
        }
    },
});
