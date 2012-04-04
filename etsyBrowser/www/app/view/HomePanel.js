Ext.define('Etsy.view.HomePanel', {
    extend: 'Ext.Panel',
    alias: 'widget.homePanel',
    requires: ['Etsy.view.Treasuries'],
    config: {
        title: 'Home',
        iconCls: 'home',
        id: 'homePanel',
        layout: {
            type: 'hbox'
        },
        items: [{

            xtype: 'toolbar',
            docked: 'top',
            title: 'Discover Etsy',
            id: 'homeToolbar',
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
            flex: 1,
            id: 'homePanelLeft',
            xtype: 'container',
            layout: 'vbox',
            items: [
            {
                html: '<h4>Discover New Products</h4>'
            },
            {

                xtype: 'searchfield',
                id: 'homeSearch',
                placeHolder: 'Search Etsy'
            },
            {
                html: '<h4>Browse Categories</h4>'
            },
            {
                cls: 'grey-box',
                height: 230,
                id: 'homeCategoriesCarousel',
                xtype: 'listingsCarousel',
                count: 2,
                innerItemConfig: {
                    xclass: 'Etsy.view.Treasuries',
                }
            },
            {
                html: '<h4>Hottest Treasuries</h4>'
            },
            {
                cls: 'grey-box',
                height: 230,
                id: 'homeTreasuriesCarousel',
                xtype: 'listingsCarousel',
                count: 2,
                innerItemConfig: {
                    xclass: 'Etsy.view.Treasuries'
                },
            },
            ]
        }]
    }

});
