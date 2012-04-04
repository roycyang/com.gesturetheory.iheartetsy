Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    models: [
        'Listing',
        'Category',
        'Navigation',
		'Treasury'
    ],

    stores: [
        'Listings',
        'Categories',
        'Navigation',
		'Treasuries',
    ],

    views: [
		// core panels
        'SearchPanel',
        'NavPanel',
        'AppPanel',

		// other panels
        'HomePanel',
        'CategoriesPanel',
        'TreasuriesPanel',
        'FavoritesPanel',
        'DetailPanel',
        'CategoryPopupPanel',
        'ListingsCarousel',
        'Listings',
        'FavoriteListingsCarousel',
        'FavoriteListings'
    ],

    name: 'Etsy',

    controllers: [
        'Browser'
    ],

    launch: function() {
		Ext.define('Ext.overrides.carousel.Indicator', {    
			override: 'Ext.carousel.Indicator',
		    
		    onTap: function(){
		        console.log('on tap!!!! override');
		    }
		});

    }
});
