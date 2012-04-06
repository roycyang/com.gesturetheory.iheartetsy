Ext.define('Etsy.view.FavoritesPanel', {
	extend: 'Ext.Panel',
	alias: 'widget.favoritesPanel',

	config: {
		id: 'favoritesPanel',
		layout: 'card',
		items: [
		{
            xtype: 'maintoolbar',
            title: 'Favorites'
        },
        {
			id: 'favoritesCarousel',
			xtype: 'favoriteslistingsCarousel'
		}]
	}

});
