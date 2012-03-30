Ext.define('Etsy.view.SettingsPanel', {
	extend: 'Ext.Panel',

	config: {
		title: 'Settings',
		id: 'settingsPanel',
		layout: 'card',
		items: [

		{
			xtype: 'toolbar',
			docked: 'top',
			title: 'Settings',
			items: [{
				xtype: 'button',
				action: 'showNav',
				iconCls: 'list',
				iconMask: true,
			},
			{
				xtype: 'spacer'
			},

			]
		},
		{
			xtype: 'container',
			layout: 'vbox',
			defaults: {
				cls: '',
			},
			items: [{
				id: '',
				html: 'Here is where all the settings would go!'
			}]
		}

		]
	}

});
