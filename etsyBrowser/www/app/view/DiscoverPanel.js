/*
 * File: app/view/BrowserPanel.js
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

Ext.define('Etsy.view.DiscoverPanel', {
    extend: 'Ext.Panel',

    config: {
        title: 'Discover',
        iconCls: 'search_black',
        id: 'discoverPanel',
        layout: 'card',
        items: [
        
            {
                xtype: 'toolbar',
                docked: 'top',
                id: 'discoverToolbar',
                title: 'Discover',
                items: [
                {xtype: 'spacer'},
                {
                    xtype: 'searchfield',
                    id: 'discoverPanelSearch',
                    placeHolder: 'Search Etsy'
                }]
            },
			{
				xtype: 'container',
				layout: 'vbox',
				defaults:{
					cls: 'homepage-button',
				},
				items: [{
					html: 'Pick a color!'
				},
				{
                    html: 'Search by Keyword'
                },
				{
                    html: 'Find a Shop'
                }
				]
			}
            

            
        ]
    }

});