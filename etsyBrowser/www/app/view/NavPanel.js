Ext.define('Etsy.view.NavPanel', {
	extend: 'Ext.Container',
	config: {
		layout: {
			type: 'vbox',
		},
		id: 'navPanel',
		width: 288,
		height: 748,
		top: 0,
		left: 0,

		items: [
			{
				id: 'userInformation',
				hidden: true,
			},
			{
				id: 'signUpButton',
				xtype: 'button',
				ui: 'plain',
				listeners: {
					tap: function(){
						ETSY.initAuthorization();
					}
				}
			},
		{
			xtype: 'list',
			flex: 1,
			id: 'navList',

			itemTpl: '<div class="contact">{title}</div>',
			store: 'Navigation',
			grouped: true,
			listeners: {
				initialize: function() {
					this.select(0);
				}
			}
		}],

	},

});
