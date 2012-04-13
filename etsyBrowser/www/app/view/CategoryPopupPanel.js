Ext.define('Etsy.view.CategoryPopupPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.categoryPopupPanel',
    config: {
        zIndex: 1000000000,
        centered: true,
        width: 576,
        height: 651,
        modal: true,
        hideOnMaskTap: true,
        layout: 'card',
        items: [{

            xtype: 'toolbar',
            docked: 'top',
            title: 'Categories',
        },
        {
            id: 'categoryList',
            xtype: 'list',
            title: 'Categories',
            store: 'Categories',
            itemTpl: '<div class="category-item">{short_name}</div>',
            listeners: {
                itemtap: function(list, index, target, record, e) {
                    setTimeout(function() {
                        APP.getCategoryPopupPanel().hide();
                    },
                    500);
                    APP.loadListings('category', record);
                }
            }
        }
        ],
        listeners: {
          erased: function () {
            APP.getCategoryPopupPanel().destroy();
            console.log('destroyed the category popup panel!');
          }
        }

    },

});
