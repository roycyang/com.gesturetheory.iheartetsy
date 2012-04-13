Ext.define('Etsy.model.Treasury', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
        'id',
        'title',
        'user_name',
        'user_avatar_id',
        'listings',
        'counts',
        'comment_count',


        {
            name: 'image_1',
            convert: function(value, record) {

                return record.data.listings[2].data.image_url
            }
        },
        {
            name: 'image_2',
            convert: function(value, record) {
                return record.data.listings[1].data.image_url
            }
        },
        {
            name: 'image_3',
            convert: function(value, record) {
                
                return record.data.listings[0].data.image_url
            }
        }
        ],

        proxy: {
            type: 'ajax',
            url: GLOBAL.api + 'treasuries',
            timeout: 10000,
            reader: {
                type: 'json',
                rootProperty: 'results'
            },
            listeners: {
              exception: function(proxy, response, operation){
                console.log(proxy, response, operation);
              }
            }
        }
    },
});