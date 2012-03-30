/*
 * File: app/view/HomePanel.js
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

Ext.define('Etsy.view.HomePanel', {
    extend: 'Ext.Panel',

    config: {
        title: 'Home',
        iconCls: 'home',
        id: 'homePanel',
        layout: {
            type: 'hbox'
        },
        items: [
            {
                flex: 1,
                html: '<div id="fakeHome"></div>'
            },
            {

                xtype: 'toolbar',
                docked: 'top',
                title: 'Discover Etsy',
                id: 'homeToolbar',
                items: [
                {
                    xtype: 'button',
                    ui: 'plain', action: 'showNav',width: 60,
                    iconCls: 'list',
    				iconMask: true,
                },
                {xtype: 'spacer'},
                
                
                
                
                {
                    xtype: 'button',
                                        ui: 'plain', action: 'showSearch',width: 60,
                    iconCls: 'search',
    				iconMask: true,
                },
                ]
            },
            // {
            //  xtype: 'container',
            //  layout: 'hbox',
            //  flex: 1,
            //  defaults: {
            //      cls: 'homepage-button',
            //      flex: 1,
            //  },
            // 
            //  items: [
            //      {
            //          html: 'Categories are Fun'
            //      },
            //      {
            //          html: 'Follow the Heart'
            //      },
            //      {
            //          html: 'Discover'
            //      }
            //  ]
            // },
            {
                id: 'listingsCarousel',
                xtype: 'listingsCarousel',
                flex: 1,
                
                count: 12
                
            }
        ]
    }

});