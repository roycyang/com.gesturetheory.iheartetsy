Ext.define('Etsy.view.HomePanel', {
    extend: 'Ext.Panel',
    alias: 'widget.homePanel',
    requires: ['Etsy.view.SmallTreasuries', 'Ext.field.Search', 'GT.FixedButton'],
    config: {
        title: 'Home',
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
            xtype: 'container',
            layout: 'vbox',
            items: [
            {

                xtype: 'searchfield',
                id: 'homeSearch',
                autoCorrect: false,
                placeHolder: 'Search Etsy',
                listeners: {
                  keyup: function(textfield, e, options){
                    APP.onSearchKeyup(textfield, e, options);
                  }
                }
            },
            {   
                width: 420,
                margin: '0 302px',
                xtype: 'fixedbutton',
                ui: 'plain',
                html: '<div class="browse-categories">Browse Categories</div>',
                listeners: {
                    tap: function(){
                        APP.onNavListTap(null, null, null, {'panel': 'categoriesPanel'});
                    }
                }
            },
            {
                cls: 'grey-box',
                height: 219,
                id: 'homeCategoriesCarousel',
                xtype: 'treasuriesCarousel',
                count: 4,
                innerItemConfig: {
                    xclass: 'Etsy.view.SmallTreasuries'
                },
            },
            {
                width: 420,
                margin: '0 302px',
                xtype: 'fixedbutton',
                ui: 'plain',
                html: '<div class="hottest-treasuries">Hottest Treasuries</div>',
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
