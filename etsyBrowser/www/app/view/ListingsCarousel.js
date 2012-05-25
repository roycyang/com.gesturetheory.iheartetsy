/*jslint devel: true, browser: true, indent: 2, nomen: true */
/*global Ext, $, ETSY, APP */

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
        isInfinite: true,
        truncate: false,
        count: 12,
        offsetLimit: 100,
        store: null,
        width: 1024,
        animation: {
            duration: 350
        },
        listeners: {
            activeitemchange: 'onActiveItemChange',
            itemindexchange: 'onItemIndexChange'
        }
    },



    updateStore: function(newStore) {
        var self = this;

        // on refresh, fire the adjust after loading
        newStore.on('refresh',
        function() {
            console.log('calling store on refresh');
            self.adjustAfterLoading(self, newStore);
        });

        if (newStore.isLoading()) {
            // this is when the store loads for the first time
            newStore.on('load',
            function() {
                console.log('in updateStore and load fired');
                self.updateStore(newStore);
            },
            self, {
                single: true
            });
        } else {
            console.log('in updateStore and the newStore is FINISHED loading');
            self.reset();
        }
    },

    adjustAfterLoading: function(me) {

        var newStore = me.getStore();
        var storeCount = newStore.data.length;
        var storeTotalCount = newStore.getTotalCount();
        var max = parseInt((storeCount - 1) / (me.getCount()));


        var finalMax = parseInt((storeTotalCount - 1) / (me.getCount()));

        // some panels should only show full panels of items, they are truncate: true
        if (me.getTruncate()) {
            max = max - 1;
            finalMax = finalMax - 1;
        }

        try {
            me.setMaxItemIndex(max);
        } catch(e) {
            console.log('damn error');
        }

        // shows or hides the left and right arrows
        if (me.parent) {
            var rightArrow = me.parent.element.down('.rightArrow');
            if (rightArrow) {
                if (me.getActiveIndex() < max) {
                    rightArrow.show();
                    rightArrow.removeCls('loading');
                    Ext.getCmp(rightArrow.id).enable();
                } else if (max != finalMax) {
                    rightArrow.show();
                    rightArrow.addCls('loading');
                    Ext.getCmp(rightArrow.id).disable();
                } else {
                    rightArrow.hide()
                }
            }

            var leftArrow = me.parent.element.down('.leftArrow');
            if (leftArrow) {
                if (me.getActiveIndex() == 0) {
                    leftArrow.hide();
                } else {
                    leftArrow.show();
                }
            }
        }

    },

    onActiveItemChange: function(carousel, newItem, oldItem) {
        // tests to see if we should try to load in another set of items from the Etsy API
        // and then calls adjustAfterLoading which makes sure we adjust the arrows and the max items
        // console.log('called onActiveItemChange, GLOBAL.listing_store_key', GLOBAL.listing_store_key);
        try {
            var index = carousel.getActiveIndex(),
            count = this.getCount(),
            offsetLimit = this.getOffsetLimit(),
            store = this.getStore(),
            storeCount = store.getCount();

            if (index > 0) {
                ETSY.trackPageviews(GLOBAL.google_root_url + "/" + (index + 1));
            }

            if (carousel.getIsInfinite()) {
                if (storeCount - (count * index) < offsetLimit && !store.isLoading()) {
                    // console.log('calling store.nextPage');
                    store.nextPage();
                }
            }

            carousel.adjustAfterLoading(carousel, store);
        } catch(err) {
            console.log('***** ERROR *****', err);
        }



    },

    onItemIndexChange: function(me, item, index) {
        var store = this.getStore(),
        count = this.getCount(),
        records,
        startIndex,
        endIndex,
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
        },
        this);

        // console.log('setting records', records);
        item.setRecords(records);
    },

    initialize: function() {
        var self = this;

        this.element.on({
            scope: this,
            tap: 'onTap',
            drag: 'onDragItem',
            dragstart: 'trackProduct',
            dragend: 'resetElement',
            touchstart: 'onTouchEtsyItemStart',
            touchend: 'onTouchEtsyItemEnd'
        });
    },

    onTouchEtsyItemStart: function(e) {
        // console.log('touch event', e);
        var element = Ext.get(e.target);
        if (element.hasCls('favorite-stamp') && GLOBAL.signed_in) {
            element = Ext.get(e.target).parent('.product');
            $('#' + element.id).addClass('cart-pressed-flag');
            return false;
        }

        if (element = Ext.get(e.target).parent('.treasury-item')) {
            var parent = Ext.get(e.target).parent('.treasury-item')
            $('#' + parent.id).addClass('pressed');
            return false;
        }

        element = Ext.get(e.target).parent('.product');

        if (element) {
            $('#' + element.id).addClass('product-pressed-flag');
        }

    },

    onTouchEtsyItemEnd: function(e) {
        $('.product').removeClass('cart-pressed-flag');
        $('.product').removeClass('product-pressed-flag');
        $('.treasury-item').removeClass('pressed');
    },

    /**
     * Track which element is currently being dragged.
     * @param {Object} event Event object
     */
    trackProduct: function(event) {
        $('.product').removeClass('cart-pressed-flag');
        $('.product').removeClass('product-pressed-flag');
        $('.treasury-item').removeClass('pressed');

        var $element = $(event.target);

        if (!$element.hasClass('product')) {
            $element = $element.parents('.product');
        }

        this.productDragging = $element.attr('ref');
    },

    /**
     * Reset an element back to its original position.
     * @param {Object} event Event object
     * @param {String} [animate] Pass the animation type.
     */
    resetElement: function(event, animate) {
        var $element = $(event.target),
        timer,
        type;

        if (!$element.hasClass('product')) {
            $element = $element.parents('.product');
        }

        if ($element && !this.isDragging) {
            if (typeof animate === 'string') {
                switch (animate) {
                case 'bounce':
                    timer = 1000;
                    type = 'product-bounce';
                    break;

                case 'quick':
                    timer = 500;
                    type = 'quick-bounce';
                    break;

                default:
                    throw new Error('resetElement(): Unknown animation type.');
                }

                $element.attr('style', '').addClass(type);

                // Remove the animation class once the animation is complete.
                setTimeout(function() {
                    $element.removeClass(type);
                    $element.css({
                        '-webkit-transform': 'translate3d(0, 0, 0)'
                    });
                },
                timer);
            } else {
                $element.css({
                    '-webkit-transform': 'translate3d(0, 0, 0)'
                });
            }
        }
    },

    /**
     * Handle drag events for products.
     * @param {Object} event Event object
     */
    onDragItem: function(event) {
        if (!GLOBAL.signed_in) {
            return false;
        }
        var $element = $(event.target),
        store = this.getStore(),
        yDist = event.deltaY,
        xDist = event.deltaX,
        id;

        // Set the correct element if the target is a child of .product
        if (!$element.hasClass('product')) {
            $element = $element.parents('.product');
        }

        id = $element.attr('ref');

        if (yDist > 0 && !$element.hasClass('favoriting') && $element && !this.isDragging && this.productDragging === $element.attr('ref')) {
            // Move the element with the drag coords.
            // console.log(yDist);
            $element.css('-webkit-transform', 'translate3d(0, ' + yDist + 'px, 0)');

            // Once the element is raised enough:
            // 1. Trigger a dragend to reset.
            // 2. Add item to favorites list.
            // if (yDist < -30) {
            //   this.element.fireEvent('dragend', event, 'bounce');
            //   ETSY.addToFavorites(id, $element);
            // }
            // If the element is lowered:
            // 1. Trigger a dragend.
            // 2. Remove from favorites.
            if (yDist > 30) {
                if (!$element.hasClass('favoriting')) {
                    $element.addClass('favoriting');
                    this.element.fireEvent('dragend', event, 'bounce');
                    ETSY.trackEvent('actions', 'favoriting', 'from index panel');
                    ETSY.toggleFavorites(id, $element);
                }


            }
        }
    },

    onTap: function(e) {

        var element = Ext.get(e.target),
        store = this.getStore(),
        title,
        id;

        // tapped on homepage category item
        if (element.parent('.category-index-item')) {
            element = element.parent('.category-index-item');
            title = $('#' + element.id + ' .title').html();
            id = element.getAttribute('rel');
            record = store.getAt(store.findExact('id', id));
            APP.loadListings('category', record);
            return false;
        }

        // tapped on a treasury item
        if (Ext.get(e.target).parent('.treasury-item')) {
            element = Ext.get(e.target).parent('.treasury-item');
            title = $('#' + element.id + ' .title').html();
            id = element.getAttribute('rel');
            APP.loadTreasury(id, title);
            return false;
        }

        // signed in and tapped on the favorite stamp (price area)
        if (element.hasCls('favorite-stamp') && GLOBAL.signed_in) {
            var element = Ext.get(e.target).parent('.product'),
            id = Math.abs(element.getAttribute('ref')),
            $element = $('#' + element.id);
            ETSY.trackEvent('actions', 'add to cart', 'from index panel');
            ETSY.toggleCart(id, $element);
            return false;
        }

        // if not, then set it to the product and open it up!
        if (!element.hasCls('product')) {
            element = Ext.get(e.target).parent('.product');

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
        }

    },

});