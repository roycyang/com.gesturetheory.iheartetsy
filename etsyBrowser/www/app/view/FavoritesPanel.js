Ext.define('Etsy.view.FavoritesPanel', {
    extend: 'Ext.Panel',

    config: {
        id: 'favoritesPanel',
        layout: 'card',
        items: [

        {
            xtype: 'toolbar',
            docked: 'top',
            id: 'favoritesToolbar',
            title: GLOBAL.name + '\'s Favorites',
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
            //                    {
            {
                xtype: 'button',
                action: 'refreshFavorites',
                iconCls: 'refresh',
                width: 60,
                ui: 'plain',
                iconMask: true,
                listeners: {
                    tap: function() {
                        self.loadFavorites();
                    }
                }
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
            id: 'favoritesCarousel',
            xtype: 'favoriteslistingsCarousel'
        }
        ]
    }

});