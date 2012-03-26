Ext.define('Etsy.view.NavPanel', {
	extend: 'Ext.Container',
	config: {
		layout: 'fit',
		id: 'navPanel',
		width: 250,
		height: 748,
        top: 0,
                left: 0,
		items: [{
			xtype: 'toolbar',
			docked: 'top',
			ui: 'neutral',
			items: [{
			    width: '93%',
				xtype: 'searchfield',
				id: 'browserPanelSearch',
				placeHolder: 'Search Etsy'
			}]
		},
		{
			xtype: 'list',
			flex: 1,
			id: 'navList',

			itemTpl: '<div class="contact">{title}</div>',
			store: 'Navigation',
			grouped: true,

		}]
	},

});
