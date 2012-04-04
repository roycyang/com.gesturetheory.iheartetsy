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
        items: [
        {
            xtype: 'maintoolbar',
            title: 'Home'
        },
        {
            flex: 1,
            id: 'homePanelLeft',
            xtype: 'container',
            layout: 'vbox',
            items: [
            {

                xtype: 'searchfield',
                id: 'homeSearch',
                placeHolder: 'Search Etsy'
            },
            {   
                xtype: 'button',
                ui: 'plain',
                html: '<div class="browse-categories"></div>',
                listeners: {
                    tap: function(){
                        APP.onNavListTap(null, null, null, {'panel': 'categoriesPanel'});
                    }
                }
            },
            {
                cls: 'grey-box',
                height: 230,
                id: 'homeCategoriesCarousel',
                xtype: 'treasuriesCarousel',
                count: 4,
                innerItemConfig: {
                    xclass: 'Etsy.view.SmallTreasuries'
                },
            },
            {
                xtype: 'button',
                ui: 'plain',
                html: '<div class="hottest-treasuries"></div>',
                listeners: {
                    tap: function(){
                        APP.onNavListTap(null, null, null, {'panel': 'treasuriesPanel'});
                    }
                }
            },
            {
                cls: 'grey-box',
                height: 230,
                id: 'homeTreasuriesCarousel',
                xtype: 'treasuriesCarousel',
                count: 4,
                innerItemConfig: {
                    xclass: 'Etsy.view.SmallTreasuries'
                },
            },
            ]
        }]
    }

});
