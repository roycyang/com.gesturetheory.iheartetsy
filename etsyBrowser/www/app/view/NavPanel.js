Ext.define('Etsy.view.NavPanel', {
	extend: 'Ext.Container',
	config: {
		layout: 'fit',
		id: 'navPanel',
		width: 250,
		height: 748,
        top: 0,
        hidden: true,
                left: 0,
		items: [{
			xtype: 'toolbar',
			docked: 'top',
			ui: 'neutral',
			title: 'I Heart Etsy'
		},
		{
			xtype: 'list',
			flex: 1,
			id: 'navList',

			itemTpl: '<div class="contact">{title}</div>',
			store: 'Navigation',
			grouped: true,
			listeners: {
    		    initialize: function(){
                    this.select(0);
    		    }
    		}

		}],

	},

});
