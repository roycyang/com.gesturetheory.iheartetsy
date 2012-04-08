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
    var that = this;

    this.element.on({
      scope     : this,
      tap       : 'onTap',
      drag      : 'onDragItem',
      dragstart : 'trackProduct',
      dragend   : 'resetElement'
    });

    // Ext.Viewport.on('orientationchange', this.onOrientationChange, this);
    // this.getStore().on({
    //   scope: this,
    //   addRecords: function () {
    //     console.log('********* ADDED RECORDS');
    //   },
    // 
    // })
    // var products = Ext.DomQuery.select('.product');
    // var product = this.down('.product');
    // 
    // products.on({
    //   scope: this,
    //   swipe: 'onSwipe'
    // });
  },

  /**
   * Track which element is currently being dragged.
   * @param {Object} event Event object
   */
  trackProduct: function (event) {
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
  resetElement: function (event, animate) {
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
        setTimeout(function () {
          $element.removeClass(type);
        }, timer);
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
  onDragItem: function (event) {
    var $element  = $(event.target),
      store       = this.getStore(),
      yDist       = event.deltaY,
      xDist       = event.deltaX,
      id;

    // Set the correct element if the target is a child of .product
    if (!$element.hasClass('product')) {
      $element = $element.parents('.product');
    }

    id = $element.attr('ref');

    if ($element && !this.isDragging && this.productDragging === $element.attr('ref')) {
      // Move the element with the drag coords.
      $element.css('-webkit-transform', 'translate3d(0, ' + yDist + 'px, 0)');

      // Once the element is raised enough:
      // 1. Trigger a dragend to reset.
      // 2. Add item to favorites list.
      if (yDist < -30) {
        this.element.fireEvent('dragend', event, 'bounce');
        ETSY.addToFavorites(id, function () {
          $element.addClass('favorite-flag');
        });
      }

      // If the element is lowered:
      // 1. Trigger a dragend.
      // 2. Remove from favorites.
      if (yDist > 30) {
        this.element.fireEvent('dragend', event, 'quick');
        ETSY.removeFromFavorites(id, function () {
          $element.removeClass('favorite-flag');
        });
      }
    }
  },

  onTap: function (e) {
    console.log('on tap!!!');
    var element = Ext.get(e.target),
      store = this.getStore(),
      title,
      id;

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

    if (element.hasCls('favorite-stamp')) {

      var element = Ext.get(e.target).parent('.product'),
        id        = Math.abs(element.getAttribute('ref'));

      if ($('#' + element.id).hasClass('cart-flag')) {
        ETSY.removeFromCart(id);
        if (GLOBAL.signed_in) {
          $('#' + element.id).removeClass('cart-flag');
        }

      } else {
        ETSY.addToCart(id);
        if (GLOBAL.signed_in) {
          $('#' + element.id).addClass('cart-flag');
        }
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
      }, me, {
        single: true
      });
    } else {
      me.reset();

    }
  },

  onActiveItemChange: function (carousel, newItem, oldItem) {
    if (GLOBAL.panel != 'treasury') {
      var index     = carousel.getActiveIndex(),
        count       = this.getCount(),
        offsetLimit = this.getOffsetLimit(),
        store       = this.getStore(),
        storeCount  = store.getCount();

      if (storeCount - (count * index) < offsetLimit && !store.isLoading()) {
        store.nextPage();
      }

      var startIndex = (index) * (count) + 1,
        endIndex     = startIndex + (count - 1),
        max          = parseInt(storeCount / (count));

      this.setMaxItemIndex(max - 1);
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