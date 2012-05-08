Ext.define('Etsy.view.MainToolbar', {
    extend: 'Ext.Toolbar',
    alias: 'widget.mainToolbar',
    xtype: 'maintoolbar',
    requires: ['GT.FixedButton'],

    config: {
        docked: 'top',
        items: [
        {
          xtype: 'fixedbutton',
          ui: 'plain',
          width: 74,
          height: 47,
          cls: 'left-nav-button',
          listeners: {
            tap: function () {
              self.getAppPanel().mask({
                id: 'appPanelMask',
                zIndex: 100000,
                listeners: {
                  tap: function () {
                    self.toggleNav();
                  },
                }
              })
              self.toggleNav();
            }
          }
        },
        {
          xtype: 'fixedbutton',
          ui: 'plain',
          width: 140,
          height: 47,
          cls: 'home-nav-button',
          listeners: {
            tap: function () {
              APP.loadHomePanel();
              APP.getNavList().select(0);
            }
          }
        },
        {
          xtype: 'spacer'
        },
        {
          xtype: 'fixedbutton',
          ui: 'plain',
          width: 74,
          height: 47,
          cls: 'right-nav-button',
          listeners: {
            tap: function () {
              self.getAppPanel().mask({
                id: 'appPanelMask',
                zIndex: 100000,
                listeners: {
                  tap: function () {
                    self.toggleSearch();
                  }
                }
              });
              self.toggleSearch();
            }
          }
        }
      ] // items
    } // config
});