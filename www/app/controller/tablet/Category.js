Ext.define('TouchStyle.controller.tablet.Category', {
    extend: 'TouchStyle.controller.Category',

    config: {
        refs: {
            productView: {
                autoCreate: true,
                xtype: 'product',
                selector: 'product'
            }
        }
    },

    init: function() {
		console.log('running the tablet init!');
		window.APP = this; 
        this.callParent();

        this.productsView = Ext.create('TouchStyle.view.ProductsList');
        this.productView = Ext.create('TouchStyle.view.tablet.Product');
    },

    /**
     * @inherit
     */
    getProductsView: function(config) {
		return Ext.create('TouchStyle.view.ProductsList', config);
    },



    /**
     * @inherit
     */
    getProductView: function() {
        return this.productView;
    },

    /**
     * @inherit
     */
    onProductTap: function(view, record) {
		console.log('on productTap!');
        var productView = this.getProductView();

        productView.setData(record.data);

        if (!productView.getParent()) {
            Ext.Viewport.add(productView);
        }

        productView.show();
    }
});
