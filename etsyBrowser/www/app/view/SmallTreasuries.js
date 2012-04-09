Ext.define('Etsy.view.SmallTreasuries', {
    extend: 'Ext.Component',
    xtype: 'treasuries',

    config: {
        baseCls: 'treasury-item-wrapper',
        records: null,

        tpl: new Ext.XTemplate(

            '<tpl for="items">',
                '{% if (xindex < 7) { %}',
                    '<div class="treasury-item small-treasury-item" rel="{data.id}">',  
                        '<div class="title">{data.title}</div>',                    
                        '<div class="image-wrapper image-1"><div class="image" style="background-image: url({data.image_1})"></div></div>',
                        '<div class="image-wrapper image-2"><div class="image" style="background-image: url({data.image_2})"></div></div>',
                        '<div class="image-wrapper image-3"><div class="image" style="background-image: url({data.image_3})"></div></div>',
                        '<div class="image-wrapper image-4"><div class="image" style="background-image: url({data.image_4})"></div></div>',
                    '</div>',
                '{% } %}',
            '</tpl>'

        )
    },
    
    
    updateRecords: function(newRecords) {
        // console.log('newRecords is', newRecords);
        // console.log('newRecords.items', newRecords.items);
        this.setData({
            items: newRecords.items,
        });

    }
});
