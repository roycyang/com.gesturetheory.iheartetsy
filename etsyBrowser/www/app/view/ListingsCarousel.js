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
        count: 12,
        offsetLimit: 100,
        store: null,
        width: 950,
        animation: {
            duration: 350
        },
        listeners: {
            activeitemchange: 'onActiveItemChange',
            itemindexchange: 'onItemIndexChange'
        }
    },

    initialize: function () {
        //Ext.Viewport.on('orientationchange', this.onOrientationChange, this);
        this.element.on({
            scope: this,
            tap: 'onTap'
        });

        this.element.on({
            scope: this,
            drag: 'onDragEtsyItem'
        });

        this.element.on({
            scope: this,
            dragend: 'onDragEtsyItemEnd'
        });
        
        this.element.on({
            scope: this,
            touchstart: 'onTouchEtsyItemStart'
        });
        
        this.element.on({
            scope: this,
            touchend: 'onTouchEtsyItemEnd'
        });

        // this.getStore().on({
        //     scope: this,
        //     addRecords: function(){
        //         console.log('********* ADDED RECORDS');
        //     },
        //
        // })
        //var products = Ext.DomQuery.select('.product');
        // var product = this.down('.product');
        //
        // products.on({
        //     scope: this,
        //     swipe: 'onSwipe'
        // });
    },



    onDragEtsyItemEnd: function (e) {
        var element = Ext.get(e.target),
            store = this.getStore(),
            id;

        var y_dist = e.deltaY;


        if (!element.hasCls('product')) {
            element = Ext.get(e.target).parent('.product');
        }

        if (element && !this.isDragging) {
            // if(x_dist < 10){
            //     			
            //     		}
            // if (element.hasCls('add-to-favorites')){
            //  element = Ext.get(e.target).parent('.product');
            //  
            //  $('#' + element.id + ' .image').css("-webkit-transform", "translate3d(0,0px,0)");
            //             id = Math.abs(element.getAttribute('ref'));
            //             
            //  if($('#' + element.id).hasClass('favorite-flag')){
            // 
            //  }else{
            // 
            //  }
            //       
            //  return false;
            // }
            var id = Math.abs(element.getAttribute('ref'));
            var $element = $('#' + element.id);


            $element.css({
                '-webkit-transform': 'translate3d(0, 0, 0)'
            });
        }
    },
    onTouchEtsyItemStart: function (e) {
        // console.log('touch event', e);
        var element = Ext.get(e.target);
        
        if (element.hasCls('favorite-stamp')) {
            element = Ext.get(e.target).parent('.product');
            $('#' + element.id).addClass('cart-pressed-flag');
        }
        
    },
    
    onTouchEtsyItemEnd: function (e) {
      $('.product').removeClass('cart-pressed-flag');
        
    },
    
    onDragEtsyItem: function (e) {
      $('.product').removeClass('cart-pressed-flag');
        // console.log('event', e);
        var element = Ext.get(e.target),
            store = this.getStore(),
            id;
        var y_dist = e.deltaY;

        var x_dist = e.deltaX;

        if (!element.hasCls('product')) {
            element = Ext.get(e.target).parent('.product');
        }

        if (element && !this.isDragging) {
            var id = Math.abs(element.getAttribute('ref'));
            var $element = $('#' + element.id);

            // if (y_dist < -1) {
            //     $element.css({
            //         '-webkit-transform': 'translate3d(0, ' + y_dist + 'px, 0)'
            //     });
            // }

            if(y_dist < -10){
                if(!$element.hasClass('favorite-flag') && !$element.hasClass('processing-favorite') ){
                    $element.addClass('processing-favorite');
                    ETSY.addToFavorites(id,$element);
                }
            }
            
            if(y_dist >10){
                if($element.hasClass('favorite-flag') && !$element.hasClass('processing-favorite')){
                  $element.addClass('processing-favorite');
                    ETSY.removeFromFavorites(id$element);
                }
             
            }
        }




        //console.log($('#' + element.id));
        //id = Math.abs(element.getAttribute('ref'));
        // console.log('the element being swiped is', element);
    },

    onTap: function (e) {
        console.log('on tap!!!');
        var element = Ext.get(e.target),
            store = this.getStore(),
            title, id;

        // test to see if the target was add to favoirtes or pinterest
        // if (element.hasCls('add-to-favorites')){
        //  element = Ext.get(e.target).parent('.product');
        //
        //  $('#' + element.id + ' .image').css("-webkit-transform", "translate3d(0,0px,0)");
        //             id = Math.abs(element.getAttribute('ref'));
        //
        //  if($('#' + element.id).hasClass('favorite-flag')){
        //      ETSY.removeFromFavorites(id);
        //              $('#' + element.id).removeClass('favorite-flag');
        //  }else{
        //      ETSY.addToFavorites(id);
        //              $('#' + element.id).addClass('favorite-flag');
        //  }
        //
        //  return false;
        // }
        //
        if (Ext.get(e.target).parent('.treasury-item')) {
            element = Ext.get(e.target).parent('.treasury-item');
            title = $('#' + element.id + ' .title').html();
            id = element.getAttribute('rel');
            APP.loadTreasury(id, title);

            // // console.log('id is', id);
            //             // console.log('store is', store);
            //             console.log('id is', id);
            //             record = store.getAt(store.findExact('internalId', id));
            //             console.log('record', record);
            //
            //             self.getAppPanel().setActiveItem(self.categoriesPanel);
            //             self.loadListings('treasury', record);
            //             setTimeout(function(){
            //                 self.getNavList().select(2);
            //             }, 350);
            return false;
        }


        // if we tapped on the favorite-stamp touch area (add to cart)
        if (element.hasCls('favorite-stamp')) {

            var element = Ext.get(e.target).parent('.product');
            var id = Math.abs(element.getAttribute('ref'));
            console.log('element.id', element.id);
            console.log("$('# " + element.id + "').hasClass('cart-flag')", $('#' + element.id).hasClass('cart-flag'));
            if ($('#' + element.id).hasClass('cart-flag')) {
                ETSY.removeFromCart(id, $('#' + element.id));
            } else {
                ETSY.addToCart(id, $('#' + element.id));
            }
            return false;
        }

        // if not, then set it to the product and open it up!
        if (!element.hasCls('product')) {
            element = Ext.get(e.target).parent('.product');
        }

        // if there actually is an element, then we tapped on a product
        if (element) {
            id = Math.abs(element.getAttribute('ref'));
            // console.log('id is', id);
            // console.log('store is', store);
            record = store.getAt(store.findExact('id', id));
            // console.log('record', record);
            if (record) {
                this.fireEvent('itemtap', this, record);
            }
        }

    },

    // applyCount: function(count) {
    //     if (count == "auto") {
    //         count = 14;
    //         // if (Ext.Viewport.getOrientation() == "landscape") {
    //         //                 count = 14;
    //         //             }
    //     }
    //
    //     return count;
    // },
    //
    // onOrientationChange: function(vewport, orientation) {
    //     var oldCount = this.getCount(),
    //         newCount = this.applyCount(this.config.count);
    //
    //     if (oldCount != newCount) {
    //         this.setCount(newCount);
    //         this.refreshItems();
    //     }
    // },
    updateStore: function (newStore) {
        // console.log('update the store', newStore);
        var me = this;

        if (newStore.isLoading()) {

            if (GLOBAL.panel != 'treasury') {
                // this is when the store updates, we can update the max index.
                newStore.on('refresh', function () {
                    // console.log('\n\n\n\n\n\n\nNewStore', newStore.data.length);
                    var storeCount = newStore.data.length;
                    var max = parseInt(storeCount / me.getCount());
                    setTimeout(function () {
                        me.setMaxItemIndex(max - 1);
                    }, 1000);

                    if (storeCount == 100) {
                        newStore.getProxy().setUrl('http://openapi.etsy.com/v2/listings/active');
                        //newStore.getProxy().setType('jsonp');
                        // type: 'jsonp',
                        //             url: 'http://openapi.etsy.com/v2/listings/active.js',
                    }

                });
            }



            // this is when the store loads for the first time
            newStore.on('load', function () {

                if (APP.getCategoriesPanel()) {
                    APP.getCategoriesPanel().unmask();
                }
                if (APP.getTreasuriesPanel()) {
                    APP.getTreasuriesPanel().unmask();
                }
                if (APP.getTreasuryPanel()) {
                    APP.getTreasuryPanel().unmask();
                }
                me.updateStore(newStore);
                if(newStore.data.length == 0){
                  ETSY.alert('There is a problem connecting, please try again later');
                }
            }, me, {
                single: true
            });
        } else {
            me.reset();

        }
    },

    onActiveItemChange: function (carousel, newItem, oldItem) {
        if (GLOBAL.panel != 'treasury') {
            //console.log('***** onActiveItemChange');
            var index = carousel.getActiveIndex(),
                count = this.getCount(),
                offsetLimit = this.getOffsetLimit(),
                store = this.getStore(),
                storeCount = store.getCount();

            if (storeCount - (count * index) < offsetLimit && !store.isLoading()) {
                store.nextPage();
                //console.log('firing store.nextPage()', store.data.length);
            }

            var startIndex = (index) * (count) + 1;
            var endIndex = startIndex + (count - 1);


            //console.log('***Panel #' + index);
            //console.log(startIndex + '-' + endIndex)
            // settings the max index
            var max = parseInt(storeCount / (count));
            // console.log('storeCount is', storeCount);
            // console.log('max', max);
            this.setMaxItemIndex(max - 1);
            //Ext.getCmp('homeToolbar').setTitle('Discover (' + startIndex + '-' + endIndex + ')... Page ' + (index + 1) + ' of ' + (max));
            //
            // console.log('start index is', startIndex);
            // console.log('count is', count);
        }
    },

    onItemIndexChange: function (me, item, index) {
        var store = this.getStore(),
            count = this.getCount(),
            records, startIndex, endIndex, i;

        if (!store) {
            return;
        }

        startIndex = index * count;




        if (count > 1) {
            endIndex = startIndex + count;
        } else {
            endIndex = startIndex;
        }

        records = store.queryBy(function (record, id) {
            i = store.indexOf(record);
            if (i >= startIndex && i <= endIndex) {
                return record;
            }
        }, this);

        item.setRecords(records);
    }
});