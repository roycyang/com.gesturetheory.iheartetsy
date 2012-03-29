Ext.define('Etsy.view.SearchPanel', {
	extend: 'Ext.Container',
	config: {
		layout: 'vbox',
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

		},
		{
			flex: 1,
			xtype: 'nestedlist',
			title: 'Categories',
			displayField: 'short_name',
			store: 'Categories',
			listeners: {
				itemtap: function(nestedlist, list, index, target, record, e) {
					// this is the main category
					if (record.childNodes.length == 0) {
						var tags = record.get('name') + ',' + record.parentNode.get('name');
						var category = record.parentNode.parentNode.get('name');
						console.log('LEVEL 3');
						console.log('tags are', tags);
						console.log('category is', category);
						self.loadListings('tags', record.parentNode.parentNode, tags);

					} else if (!record.parentNode.parentNode) {
						console.log('LEVEL 1');
						var category = record.get('name');
						console.log('category is', category)
						self.loadListings('category', record);
					} else {
						var tags = record.get('name');
						var category = record.parentNode.get('name');
						self.loadListings('tags', record.parentNode, tags);
						console.log('LEVEL 2');
						console.log('tags are', tags);
						console.log('category is', category);
					}
					// if(!record.parentNode.parentNode){
					//      self.loadListings('category', record);
					// }else if(!record.parentNode.parentNode)
					//     
					// }
					// console.log(nestedlist, list, index, target, record);
					// console.log('record is', record);
					// self.loadListings('category', record);
				}
			}
		}

		],

	},

});
