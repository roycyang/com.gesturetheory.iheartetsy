Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    models: [
    'Listing',
    'Category',
    'Navigation',
    'Treasury',
    'CategoriesIndex',
    ],

    stores: [
    'Listings',
    'ResultsListings',
    'Categories',
    'Navigation',
    'Treasuries',
    'CategoriesIndex',
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
    'SearchResultsPanel',
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

            onTap: function() {
                console.log('on tap!!!! override');
            }
        });

    },
    
    eventPublishers: {
        touchGesture: {
            moveThrottle: 3
        }
    },
});
