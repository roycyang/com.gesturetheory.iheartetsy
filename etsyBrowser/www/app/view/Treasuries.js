Ext.define('Etsy.view.Treasuries', {
    extend: 'Ext.Component',
    xtype: 'listings',

    config: {
        baseCls: 'treasury-item-wrapper',

        records: null,

        tpl: new Ext.XTemplate(

            '<tpl for="items">',
                '{% if (xindex < 7) { %}',
                    '<div class="treasury-item">',
                                                
                        '<div class="image-wrapper image-1"><div class="image" style="background-image: url({data.image_1})"></div></div>',
                        '<div class="image-wrapper image-2"><div class="image" style="background-image: url({data.image_2})"></div></div>',
                        '<div class="image-wrapper image-3"><div class="image" style="background-image: url({data.image_3})"></div></div>',
                        '<div class="image-wrapper image-4"><div class="image" style="background-image: url({data.image_4})"></div></div>',
                        
                        '<div class="title">{data.title}</div>',                                 
                        '<div class="user"><span>By</span> {data.user_name}</div>',
                    '</div>',
                '{% } %}',
            '</tpl>'

        )
    },
    
    
    updateRecords: function(newRecords) {
        console.log('newRecords is', newRecords);
        console.log('newRecords.items', newRecords.items);
        this.setData({
            items: newRecords.items,
        });

    }
});
