Ext.define('Etsy.view.TreasuryPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.treasuryPanel',
    requires: ['GT.FixedButton'],
    config: {
        id: 'treasuryPanel',
        items: [
        {
            xtype: 'toolbar',
            docked: 'top',
            id: 'treasuryToolbar',
            items: [
            {
                xtype: 'fixedbutton',
                width: 105,
                height: 47,
                cls: 'header-back-button',
                ui: 'plain',
                listeners: {
                    tap: function() {
                        self.getAppPanel().getLayout().setAnimation({
                            type: 'slide',
                            duration: 300,
                            direction: 'right'
                        });
                        APP.getAppPanel().setActiveItem(0);
                        setTimeout(function() {
                            APP.getTreasuryPanel().destroy();
                        },
                        500);
                    }
                }
            },
            {
                xtype: 'spacer'
            },

            ]
        },
        {
            id: 'treasuryCarousel',
            xtype: 'listingsCarousel',
            width: 1024,
            count: 15,
            maxItemIndex: 0
        }]
    }

});
