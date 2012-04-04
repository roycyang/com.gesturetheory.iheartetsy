Ext.define('Etsy.view.TreasuriesPanel', {
	extend: 'Ext.Panel',
	alias: 'widget.treasuriesPanel',
	    
	requires: ['Etsy.view.Treasuries'],

	config: {
		title: 'Treasuries',
		id: 'treasuriesPanel',
		layout: 'card',
		items: [
	    {
            id: 'treasuriesCarousel',
            xtype: 'listingsCarousel',
            count: 6,
            innerItemConfig: {
                xclass: 'Etsy.view.Treasuries'
            }

        },
        
		// {
		//            id: 'treasuryItems',
		//            xtype: 'dataview',
		//            store: 'Treasuries',
		// 
		//            itemTpl: [
		// 
		//             '<div class="treasury-item">',
		// 
		// '<div class="image-wrapper image-1"><div class="image" style="background-image: url({image_1})"></div></div>',
		// '<div class="image-wrapper image-2"><div class="image" style="background-image: url({image_2})"></div></div>',
		// '<div class="image-wrapper image-3"><div class="image" style="background-image: url({image_3})"></div></div>',
		// '<div class="image-wrapper image-4"><div class="image" style="background-image: url({image_4})"></div></div>',
		// 
		// '<div class="title">{title}</div>',                                 
		// '<div class="user"><span>By</span> {user_name}</div>',
		// '</div>',
		// 
		// 
		//             
		//            
		//               ]
		//        }

		]
	}

});
