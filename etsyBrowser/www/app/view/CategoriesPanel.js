Ext.define('Etsy.view.CategoriesPanel', {
	extend: 'Ext.Panel',

	config: {
		title: 'Categories',
		iconCls: 'spaces2',
		id: 'categoriesPanel',
		layout: 'card',
		items: [

		{
			xtype: 'toolbar',
			docked: 'top',
			id: 'categoriesToolbar',
			title: 'Categories',
			items: [{
				xtype: 'button',
				ui: 'plain',
				action: 'showNav',
				width: 60,
				iconCls: 'list',
				iconMask: true,
			},

			{
				xtype: 'spacer'
			},

			{
				xtype: 'button',
				ui: 'plain',
				action: 'showSearch',
				width: 60,
				iconCls: 'search',
				iconMask: true,
			},
			]
		},
		{
			id: 'browserCarousel',
			xtype: 'listingsCarousel',
		}]
	}

});
