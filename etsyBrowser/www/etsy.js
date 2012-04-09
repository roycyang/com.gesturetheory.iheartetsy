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
        'MainToolbar',

		// other panels
        'HomePanel',
        'CategoriesPanel',
        'TreasuriesPanel',
		    'TreasuryPanel',
        'FavoritesPanel',
        'DetailPanel',
        'CategoryPopupPanel',
        'ListingsCarousel',
        'Listings',
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
