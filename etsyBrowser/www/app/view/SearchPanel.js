Ext.define('Etsy.view.SearchPanel', {
	extend: 'Ext.Container',
    requires: ['Ext.form.Panel', 'Ext.form.FieldSet','Ext.field.Number','Ext.field.Search'],
	config: {
		layout: 'vbox',
		id: 'searchPanel',
		hidden: true,
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
		  html: '<h4>Advanced Filters</h4>'
		},
		{
			flex: 1,
			xtype: 'formpanel',
			cls: 'x-toolbar',
			scrollable: false,

			items: [{
				xtype: 'fieldset',
				title: 'Price',
				defaults: {
  			  width: 262
  			},
				items: [{
					xtype: 'numberfield',
					placeHolder: 'From',
					id: 'minPriceField',

				},

				{
					xtype: 'numberfield',
	        placeHolder: 'To',
	        id: 'maxPriceField',

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
				  id: 'locationField',
					xtype: 'textfield',
	        placeHolder: 'Country, city or zip'

				}
				]
			},
      {
        xtype: 'button',
        width: 248,
        height: 50,
        ui: 'none',
        id: 'searchButton',
        listeners: {
          tap: function (textfield, e, options) {
            var keyword = Ext.getCmp('globalSearch').getValue();
              minPrice  = Ext.getCmp('minPriceField').getValue();
              maxPrice  = Ext.getCmp('maxPriceField').getValue();
            
            if (!keyword) {
              ETSY.alert('Please enter a keyword', 'Error');
              return false;
            }
            if (minPrice > maxPrice) {
              ETSY.alert('The minimum price cannot be larger than the maximum price', 'Error');
              return false;
            }

            self.toggleSearch('close');
            
            if (GLOBAL.searchCategory) {
              self.loadSearch(keyword, GLOBAL.searchCategory, minPrice, maxPrice, Ext.getCmp('locationField').getValue());
            } else {
              self.loadSearch(keyword, null, minPrice, maxPrice, Ext.getCmp('locationField').getValue());
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
