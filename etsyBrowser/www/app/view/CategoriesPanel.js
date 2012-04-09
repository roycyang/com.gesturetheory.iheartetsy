Ext.define('Etsy.view.CategoriesPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.categoriesPanel',
    config: {
        title: 'Categories',
        id: 'categoriesPanel',
        layout: 'hbox',
        items: [
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
            top: 320,
            height: 51,
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
            top: 320,
            height: 51,
            listeners: {
              tap: function(){

                self.getBrowserCarousel().next();
              }
            }
        }]
    }

});
