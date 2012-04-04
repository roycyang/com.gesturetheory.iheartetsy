Ext.define('Etsy.view.CategoryPopupPanel', {
	extend: 'Ext.Panel',
    alias: 'widget.categoryPopupPanel',
	config: {
		zIndex: 1000000000,
		centered: true,
		width: 600,
		height: 651,
		modal: true,
		hideOnMaskTap: true,
		hidden: true,
		layout: 'card',
		items: [{

            xtype: 'toolbar',
            docked: 'top',
            title: 'Categories',
            items: [{
                xtype: 'button',
                ui: 'cancel',
                text: 'Cancel',
                listeners: {
                    tap: function(){
                        APP.getCategoryPopupPanel().hide();
                    }
                }
                }]
            },
            {
			id: 'categoryList',
			xtype: 'list',
			title: 'Categories',
			store: 'Categories',
            itemTpl: '<div class="category-item">{short_name}</div>',
			listeners: {
				itemtap: function(list, index, target, record, e) {
                    APP.getCategoryPopupPanel().hide();
                    APP.loadListings('category', record);
				}
			}
		}],

	},

});
