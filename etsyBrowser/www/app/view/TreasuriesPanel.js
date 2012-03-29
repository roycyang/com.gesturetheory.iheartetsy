/*
 * File: app/view/CategoriesPanel.js
 *
 * This file was generated by Sencha Designer version 2.0.0.
 * http://www.sencha.com/products/designer/
 *
 * This file requires use of the Sencha Touch 2.0.x library, under independent license.
 * License of Sencha Designer does not include license for Sencha Touch 2.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Etsy.view.TreasuriesPanel', {
	extend: 'Ext.Panel',

	config: {
		title: 'Treasuries',
		id: 'treasuriesPanel',
		layout: 'card',
		items: [
		{
			xtype: 'toolbar',
			docked: 'top',
			title: 'Hottest Treasuries',
			items: [{
				xtype: 'button',
				action: 'showNav',
				iconCls: 'list',
				iconMask: true,
			},
			{
				xtype: 'spacer'
			},
			{
				xtype: 'button',
				action: 'showSearch',
				iconCls: 'search',
				iconMask: true,
			},
			]
		},
		{
            id: 'treasuriesCarousel',
            xtype: 'listingsCarousel',
            count: 6,
            innerItemConfig: {
                xclass: 'Etsy.view.Treasuries'
            }

        },
        
		// {
		//            id: 'treasuryItems',
		//            xtype: 'dataview',
		//            store: 'Treasuries',
		// 
		//            itemTpl: [
		// 
		//             '<div class="treasury-item">',
		// 
		// '<div class="image-wrapper image-1"><div class="image" style="background-image: url({image_1})"></div></div>',
		// '<div class="image-wrapper image-2"><div class="image" style="background-image: url({image_2})"></div></div>',
		// '<div class="image-wrapper image-3"><div class="image" style="background-image: url({image_3})"></div></div>',
		// '<div class="image-wrapper image-4"><div class="image" style="background-image: url({image_4})"></div></div>',
		// 
		// '<div class="title">{title}</div>',                                 
		// '<div class="user"><span>By</span> {user_name}</div>',
		// '</div>',
		// 
		// 
		//             
		//            
		//               ]
		//        }

		]
	}

});
