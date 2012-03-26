Ext.define('Etsy.view.BrowserPanel', {
    extend: 'Ext.Panel',

    config: {
        title: 'Categories',
        iconCls: 'spaces2',
        id: 'browserPanel',
        layout: 'card',
        items: [
        {
		    xtype: 'toolbar',
			top: 0,
			left: 0,
			width: 1024,
			docked: 'top',
			id: 'browserSearchPanel',
			items: [{
             width: 686,
             xtype: 'searchfield',
             id: 'browserPanelSearch',
             placeHolder: 'Search'
            },
            {
                xtype: 'button',
                id: 'browserSearchCancelButton',
                ui: 'plain',
                iconCls: 'delete',
                iconMask: true,

            }]


		},
            {
                xtype: 'toolbar',
                docked: 'top',
                id: 'browserToolbar',
                title: 'Categories',
                items: [{
                    xtype: 'button',
                    action: 'showNav',
                    iconCls: 'list',
    				iconMask: true,
                },
                    {
                        xtype: 'button',
                        ui: 'back',
                        text: 'Back',
                        id: 'browserBackButton',
                        hidden: true
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id: 'browserFullCarouselButton',
							iconCls: 'expand',
							iconMask: true,
							hidden: true
                    },
                    // {
                    //     xtype: 'button',
                    //     iconCls: 'search',
                    //     id: 'browserSearchButton',
                    //     iconMask: true
                    // },
					{
	                    xtype: 'searchfield',
	                    id: 'categoriesSearch',
	                    placeHolder: 'Search Etsy'
	                }
                ]
            },
            
            {

            xtype: 'dataview',
            id: 'categoryList',
            cls: 'products',
            store: 'Categories',
                itemTpl: [
                '<div class="product category"><div class="category-name">{short_name}</div></div>'
                ]
            },
            {
                id: 'tester',
                xtype: 'listingsCarousel',
                flex: 2
            }
        ]
    }

});