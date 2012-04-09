Ext.define('Etsy.view.CategoriesPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.categoriesPanel',
    config: {
        title: 'Categories',
        id: 'categoriesPanel',
        layout: 'vbox',
        items: [
        {
          hidden: true,
            xtype: 'searchfield',
            id: 'searchSearch',
            placeHolder: 'Search Etsy'
        },
        {
            xtype: 'maintoolbar',
            title: 'Categories',
            id: 'categoriesToolbar'
        },
        {
            xtype: 'button',
            id: 'leftArrow',
            width: 46,
            left: 0,
            hidden: true,
            top: 0,
            height: 701,
            ui: 'plain',
            listeners: {
              tap: function(){
                self.getBrowserCarousel().previous();
                
              }
            }
        },
        {
            flex: 1,
            id: 'browserCarousel',
            xtype: 'listingsCarousel',
        },
        {
            xtype: 'button',
            id: 'rightArrow',
            right: 0,
            ui: 'plain',
            width: 49,
            top: 0,
            height: 701,
            listeners: {
              tap: function(){

                self.getBrowserCarousel().next();
              }
            }
        }]
    }

});
