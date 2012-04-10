Ext.define('Etsy.view.SearchPanel', {
	extend: 'Ext.Container',
	config: {
		layout: 'vbox',
		id: 'searchPanel',
		width: 288,
		height: 748,
		top: 0,
		right: 0,
		items: [{
			xtype: 'toolbar',
			docked: 'top',
			ui: 'none',
			items: [{
				width: '95%',
				xtype: 'searchfield',
				id: 'globalSearch',
				placeHolder: 'Search Etsy'
			}]
		},
		{
			flex: 1,
			xtype: 'formpanel',
			items: [{
				xtype: 'fieldset',
				title: 'Price',
				items: [{
					xtype: 'numberfield',
					placeHolder: 'From'

				},

				{
					xtype: 'numberfield',
	        placeHolder: 'Top'

				}]
			},
			{
				xtype: 'fieldset',
				title: 'Location',
				items: [
				{
					xtype: 'textfield',
	        placeHolder: 'Country, city or zip'

				}
				]
			},
			{
				xtype: 'button',
        text: 'Search'
			}
			]

		}
		],

	},

});
