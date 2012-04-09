Ext.define('Etsy.view.TreasuriesPanel', {
	extend: 'Ext.Panel',
	alias: 'widget.treasuriesPanel',
	    
	requires: ['Etsy.view.TreasuriesCarousel'],

	config: {
		title: 'Hottest Treasuries',
		id: 'treasuriesPanel',
		layout: 'card',
		items: [
		{
            xtype: 'maintoolbar',
            title: 'Treasuries'
        },
	    {
            id: 'treasuriesCarousel',
            xtype: 'treasuriesCarousel',
            count: 6
        }
		]
	}

});
