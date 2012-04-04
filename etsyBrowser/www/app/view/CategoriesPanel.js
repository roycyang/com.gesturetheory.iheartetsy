Ext.define('Etsy.view.CategoriesPanel', {
	extend: 'Ext.Panel',
    alias: 'widget.categoriesPanel',
	config: {
		title: 'Categories',
		iconCls: 'spaces2',
		id: 'categoriesPanel',
		layout: 'card',
		items: [
		{
		    id: 'categoriesToolbar',
            xtype: 'toolbar',
            docked: 'top',
            items: [{
                xtype: 'button',
                ui: 'plain',
                action: 'showNav',
                width: 60,
                iconCls: 'list',
                iconMask: true,
                listeners: {
                    tap: function(){
                        self.getAppPanel().mask({
                			listeners: {
                				tap: function() {
                					self.toggleNav();
                				}
                			}
                		})
                		self.toggleNav();
                    }
                }
            },
            {
                xtype: 'spacer'
            },
            {
                xtype: 'button',
                iconCls: 'list',
                iconMask: true,
                listeners: {
                    tap: function(){
                        APP.loadCategories();
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
                listeners: {
                    tap: function(){
                        self.getAppPanel().mask({
                			listeners: {
                				tap: function() {
                					self.toggleSearch();
                				}
                			}

                		})
                		self.toggleSearch();
                    }
                }
            }]
        },
        {
			id: 'browserCarousel',
			xtype: 'listingsCarousel',
		}]
	}

});
