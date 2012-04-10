Ext.define('Etsy.view.SearchResultsPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.searchResultsPanel',
    config: {
        id: 'searchResultsPanel',
        items: [
        {
            xtype: 'toolbar',
            docked: 'top',
            id: 'searchResultsToolbar',
            items: [
            {
                xtype: 'button',
                cls: 'back-button',
                ui: 'back',
                text: 'back',
                listeners: {
                    tap: function() {
                        self.getAppPanel().getLayout().setAnimation({
                            type: 'slide',
                            duration: 300,
                            direction: 'right'
                        });
                        APP.getAppPanel().setActiveItem(0);
                        setTimeout(function() {
                            APP.getSearchResultsPanel().destroy();
                        },
                        500);
                    }
                }
            },
            {
                xtype: 'spacer'
            },

            ]
        },
        {
            id: 'searchResultsCarousel',
            xtype: 'listingsCarousel',
            width: 1024,
            count: 12
        },
        {
            xtype: 'button',
            cls: 'leftArrow',
            width: 46,
            left: 0,
            hidden: true,
            top: 0,
            height: 701,
            ui: 'plain',
            listeners: {
              tap: function(){
                self.getSearchResultsCarousel().previous();
                
              }
            }
        },
        {
            xtype: 'button',
            cls: 'rightArrow',
            right: 0,
            ui: 'plain',
            width: 49,
            top: 0,
            height: 701,
            listeners: {
              tap: function(){

                self.getSearchResultsCarousel().next();
              }
            }
        },
        ]
    }

});
