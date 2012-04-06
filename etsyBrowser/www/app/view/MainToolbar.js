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
            iconCls: 'list',
            iconMask: true,
            listeners: {
                tap: function(){
                    self.getAppPanel().mask({
            			listeners: {
            				tap: function() {
            					self.toggleNav();
            				}
            			}
            		})
            		self.toggleNav();
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
            iconCls: 'search',
            iconMask: true,
            listeners: {
                tap: function(){
                    self.getAppPanel().mask({
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