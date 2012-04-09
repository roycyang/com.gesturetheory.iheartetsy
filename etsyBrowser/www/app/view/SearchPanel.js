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
				title: 'Price Range',
				items: [{
					label: 'From',
					xtype: 'numberfield',

				},

				{
					label: 'To',
					xtype: 'numberfield',

				}]
			},
			{
				xtype: 'fieldset',
				title: 'Sort by',
				items: [{
					xtype: 'selectfield',
					label: 'Field',
					options: [{
						text: 'Most Recent',
						value: 'first'
					},
					{
						text: 'Highest Price',
						value: 'second'
					},
					{
						text: 'Lowest Price',
						value: 'third'
					}]
				}]
			}]

		}
		],

	},

});
