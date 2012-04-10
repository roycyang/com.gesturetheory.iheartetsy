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
				width: 262,
				xtype: 'searchfield',
				id: 'globalSearch',
				placeHolder: 'Search Etsy',
				listeners: {
				  keyup: function (textfield, e, options) {
            if (e.event.keyCode == 13) {
              APP.toggleSearch('close');
              if(GLOBAL.searchCategory){
                APP.loadSearch(textfield.getValue(), GLOBAL.searchCategory);
              }else{
                APP.loadSearch(textfield.getValue());
              }
              textfield.setValue('');
            }
          }
				}
			}]
		},
		{
		  html: '<h4>Advanced Search</h4>'
		},
		{
			flex: 1,
			xtype: 'formpanel',
			cls: 'x-toolbar',

			items: [{
				xtype: 'fieldset',
				title: 'Price',
				defaults: {
  			  width: 262
  			},
				items: [{
					xtype: 'numberfield',
					placeHolder: 'From'

				},

				{
					xtype: 'numberfield',
	        placeHolder: 'To'

				}]
			},
			{
				xtype: 'fieldset',
				title: 'Location',
				defaults: {
  			  width: 262
  			},
				items: [
				{
					xtype: 'textfield',
	        placeHolder: 'Country, city or zip'

				}
				]
			},
			{
			  width: '100%',
				xtype: 'button',
				ui: 'none',
				id: 'searchButton',
        listeners: {
          tap: function(textfield, e, options){

            var keyword = Ext.getCmp('globalSearch').getValue();
            
            if(!keyword){
              ETSY.alert('Please enter a keyword');
              return false;
            }
            self.toggleSearch('close');
            if(GLOBAL.searchCategory){
              self.loadSearch(keyword, GLOBAL.searchCategory);
            }else{
              self.loadSearch(keyword);
            }

            Ext.getCmp('globalSearch').setValue('');
          }
        }
			}
			]
		}
		],

	},

});
