Ext.define('Etsy.view.MainToolbar', {
    extend: 'Ext.Toolbar',
    alias: 'widget.mainToolbar',
    xtype: 'maintoolbar',

    config: {
        docked: 'top',
        items: [
        {
            xtype: 'button',
            ui: 'plain',
            width: 60,
            height: 47,
            cls: 'left-nav-button',
            listeners: {
                tap: function() {
                    self.getAppPanel().mask({
                        id: 'appPanelMask',
                        zIndex: 100000,
                        listeners: {
                            tap: function() {
                                self.toggleNav();
                            },
                        }
                    })
                    self.toggleNav();
                }
            }
        },
        {
            xtype: 'button',
            ui: 'plain',
            width: 140,
            height: 47,
            cls: 'home-nav-button',
            listeners: {
                tap: function() {
                    APP.loadHomePanel();
                }
            }
        },
        {
            xtype: 'spacer'
        },

        {
            xtype: 'button',
            ui: 'plain',
            width: 60,
            height: 47,
            cls: 'right-nav-button',
            listeners: {
                tap: function() {
                    self.getAppPanel().mask({
                        id: 'appPanelMask',
                        zIndex: 100000,
                        listeners: {
                            tap: function() {
                                self.toggleSearch();
                            }
                        }

                    })
                    self.toggleSearch();
                }
            }
        }]
    }
});