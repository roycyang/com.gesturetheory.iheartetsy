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

Ext.define('Etsy.view.FullCategoriesPanel', {
    extend: 'Ext.Panel',

    config: {
        id: 'fullCategoriesPanel',
        fullscreen: true,
        layout: 'card',
        zIndex: 1000,
        items: [
            {
                id: 'fullBrowserCarousel',
                xtype: 'largeListingsCarousel',

            },
            {
                top: 2,
                right: 2,
                xtype: 'button',
                id: 'closeFullBrowserButton',
                iconCls: 'delete',
                iconMask: true,
				zIndex: 10000

            }
        ]
    }

});