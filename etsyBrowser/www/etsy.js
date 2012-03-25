Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    models: [
        'Listing',
        'Category'
    ],

    stores: [
        'LatestListings',
        'Listings',
        'Categories'
    ],

    views: [
        'AppPanel',
        'HomePanel',
        'BrowserPanel',
        'FullBrowserPanel',
        'HeartPanel',
		'CartPanel',
        'DiscoverPanel',
        'DetailPanel',
        'LargeListingsCarousel',
        'LargeListings',
        'ListingsCarousel',
        'Listings'
    ],

    name: 'Etsy',

    controllers: [
        'Browser'
    ],

    launch: function() {
        Ext.create('Etsy.view.AppPanel', {fullscreen: true});
    }
});
