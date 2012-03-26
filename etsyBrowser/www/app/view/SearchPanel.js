Ext.define('Etsy.view.SearchPanel', {
	extend: 'Ext.Container',
	config: {
		layout: 'fit',
		id: 'searchPanel',
		hidden: true,
		width: 250,
		height: 748,
        top: 0,
        right: 0,
        items: [{
			xtype: 'toolbar',
			docked: 'top',
			ui: 'neutral',
			items: [{
			    width: '93%',
				xtype: 'searchfield',
				id: 'globalSearch',
				placeHolder: 'Search Etsy'
			}]
		},
		{
			xtype: 'formpanel',

                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Price Range',
                            items: [{
                                label: 'From',
                                xtype: 'numberfield',

                            },

                            {
                                label: 'To',
                                xtype: 'numberfield',

                            }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Sort by',
                            items: [
                                {
                                    xtype: 'selectfield',
                                    label: 'Field',
                                    options: [
                                        {text: 'Most Recent',  value: 'first'},
                                        {text: 'Highest Price', value: 'second'},
                                        {text: 'Lowest Price',  value: 'third'}
                                    ]
                                }
                            ]
                        }
                    ]

		}

		],

	},

});
