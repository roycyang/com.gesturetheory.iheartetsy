Ext.define('Etsy.view.CategoriesPanel', {
	extend: 'Ext.Panel',
    alias: 'widget.categoriesPanel',
	config: {
		title: 'Categories',
		id: 'categoriesPanel',
		layout: 'card',
		items: [
        {
            xtype: 'maintoolbar',
            title: 'Categories',
			id: 'categoriesToolbar'
        },
        {
			id: 'browserCarousel',
			xtype: 'listingsCarousel',
		}]
	}

});
