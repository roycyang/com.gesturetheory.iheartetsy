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

        }
		]
	}

});
