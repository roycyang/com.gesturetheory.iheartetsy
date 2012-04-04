Ext.define('Etsy.view.CategoriesPanel', {
	extend: 'Ext.Panel',
    alias: 'widget.categoriesPanel',
	config: {
		title: 'Categories',
		iconCls: 'spaces2',
		id: 'categoriesPanel',
		layout: 'card',
		items: [{
			id: 'browserCarousel',
			xtype: 'listingsCarousel',
		}]
	}

});
