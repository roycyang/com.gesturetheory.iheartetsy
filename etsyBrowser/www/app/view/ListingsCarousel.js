Ext.define('Etsy.view.ListingsCarousel', {
    extend: 'Ext.carousel.Infinite',
    xtype: 'listingsCarousel',
    requires: ['Etsy.view.Listings'],

    config: {
        directionLock: true,
		direction: 'horizontal',
        innerItemConfig: {
            xclass: 'Etsy.view.Listings'
        },

        count: 'auto',

        offsetLimit: 100,

        store: null,

        animation: {
            duration: 350
        },

        listeners: {
            activeitemchange: 'onActiveItemChange',
            itemindexchange: 'onItemIndexChange'
        }
    },

    initialize: function() {
        //Ext.Viewport.on('orientationchange', this.onOrientationChange, this);

        this.element.on({
            scope: this,
            tap: 'onTap'
        });

        this.element.on({
            scope: this,
            drag : 'onDragItem' 
        });

		//var products = Ext.DomQuery.select('.product');
		
		// var product = this.down('.product');
		//         
		       // products.on({
		       //     scope: this,
		       //     swipe: 'onSwipe'
		       // });

    },

	onDragItem: function(e){
		// console.log('event', e);
		var element = Ext.get(e.target),
            store = this.getStore(),
            id;

		var y_dist = e.deltaY;
		
		var x_dist = e.deltaX;

        if (!element.hasCls('product')) {
            element = Ext.get(e.target).parent('.product');
        }

		if(x_dist < 10){
			if(y_dist < -20 && y_dist > -80){
				$('#' + element.id + ' .image').css("-webkit-transform", "translate3d(0,-80px,0)");
			}
			
			if(y_dist >20 && y_dist < 80){
				$('#' + element.id + ' .image').css("-webkit-transform", "translate3d(0,0px,0)");
			}
		}

		//console.log($('#' + element.id));
		

		//id = Math.abs(element.getAttribute('ref'));
		console.log('the element being swiped is', element);
	},

    onTap: function(e) {
        console.log('on tap!!!');
        var element = Ext.get(e.target),
            store = this.getStore(),
            id;

		// test to see if the target was add to favoirtes or pinterest

		if (element.hasCls('add-to-favorites')){
			element = Ext.get(e.target).parent('.product');
			$('#' + element.id + ' .image').css("-webkit-transform", "translate3d(0,0px,0)");
			navigator.notification.alert('Added to favorites!', alertCallback, [title], [buttonName])

			return false;
		}

		if (element.hasCls('add-to-pinterest')){
			element = Ext.get(e.target).parent('.product');
			$('#' + element.id + ' .image').css("-webkit-transform", "translate3d(0,0px,0)");
			navigator.notification.alert('Added to pinterest!', alertCallback, [title], [buttonName])

			return false;
		}
		
		// if not, then set it to the product and open it up!

        if (!element.hasCls('product')) {
            element = Ext.get(e.target).parent('.product');
        }

		// if there actually is an element, then we tapped on a product
		if(element){
	        id = Math.abs(element.getAttribute('ref'));
	        console.log('id is', id);
	        console.log('store is', store);
	        record = store.getAt(store.findExact('id', id));
	        console.log('record', record);
	        if (record) {
	            this.fireEvent('itemtap', this, record);
	        }
		}

    },

    applyCount: function(count) {
        if (count == "auto") {
            count = 14;
            // if (Ext.Viewport.getOrientation() == "landscape") {
            //                 count = 14;
            //             }
        }

        return count;
    },

    onOrientationChange: function(vewport, orientation) {
        var oldCount = this.getCount(),
            newCount = this.applyCount(this.config.count);

        if (oldCount != newCount) {
            this.setCount(newCount);
            this.refreshItems();
        }
    },

    updateStore: function(newStore) {
        console.log('update the store');
        var me = this;

        if (newStore.isLoading()) {
            me.setMasked({
                xtype: 'loadmask'
            });

            newStore.on('load', function() {
                me.setMasked(false);

                me.updateStore(newStore);
            }, me, {
                single: true
            });
        } else {
            me.reset();
        }
    },

    onActiveItemChange: function(carousel, newItem, oldItem) {
        console.log('***** onActiveItemChange');
        var index = carousel.getActiveIndex(),
            count = this.getCount(),
            offsetLimit = this.getOffsetLimit(),
            store = this.getStore(),
            storeCount = store.getCount();

        if (storeCount - (count * index) < offsetLimit && !store.isLoading()) {            
            store.nextPage();
            console.log('firing store.nextPage()', store.data.length);
            
        }
    },

    onItemIndexChange: function(me, item, index) {
        var store = this.getStore(),
            count = this.getCount(),
            records, startIndex, endIndex,
            i;

        if (!store) {
            return;
        }

        startIndex = index * count;

        if (count > 1) {
            endIndex = startIndex + count;
        } else {
            endIndex = startIndex;
        }

        records = store.queryBy(function(record, id) {
            i = store.indexOf(record);
            if (i >= startIndex && i <= endIndex) {
                return record;
            }
        }, this);

        item.setRecords(records);
    }
});
