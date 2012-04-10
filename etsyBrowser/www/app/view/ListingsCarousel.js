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
    width: 1024,
    animation: {
      duration: 350
    },
    listeners: {
      activeitemchange: 'onActiveItemChange',
      itemindexchange: 'onItemIndexChange'
    }
  },

  initialize: function () {
    var self = this;

    this.element.on({
      scope     : this,
      tap       : 'onTap',
      drag      : 'onDragItem',
      dragstart : 'trackProduct',
      dragend   : 'resetElement',
      touchstart: 'onTouchEtsyItemStart',
      touchend  : 'onTouchEtsyItemEnd'
    });
  },
  
  onTouchEtsyItemStart: function (e) {
    // console.log('touch event', e);
    var element = Ext.get(e.target);   
    if (element.hasCls('favorite-stamp')) {
        element = Ext.get(e.target).parent('.product');
       $('#' + element.id).addClass('cart-pressed-flag');
       return false;
    }
    
    
    if(element = Ext.get(e.target).parent('.treasury-item')){
      var parent = Ext.get(e.target).parent('.treasury-item')
      $('#' + parent.id).addClass('pressed');
    }

  },

  onTouchEtsyItemEnd: function (e) {
	  $('.product').removeClass('cart-pressed-flag');   
    $('.treasury-item').removeClass('pressed');   
  },

  /**
   * Track which element is currently being dragged.
   * @param {Object} event Event object
   */
  trackProduct: function (event) {
    $('.treasury-item').removeClass('pressed');   
    $('.product').removeClass('cart-pressed-flag');   
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
          $element.css({
            '-webkit-transform': 'translate3d(0, 0, 0)'
          });
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
    if(!GLOBAL.signed_in){
      return false;
    }
    var $element  = $(event.target),
      store       = this.getStore(),
      yDist       = event.deltaY,
      xDist       = event.deltaX,
      id;

    
    // remove the press state
    $('.product').removeClass('cart-pressed-flag');
    
    // Set the correct element if the target is a child of .product
    if (!$element.hasClass('product')) {
      $element = $element.parents('.product');
    }

    id = $element.attr('ref');

    if (yDist > 0 && !$element.hasClass('favoriting') && $element && !this.isDragging && this.productDragging === $element.attr('ref')) {
      // Move the element with the drag coords.
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
        if(!$element.hasClass('favoriting')){
          $element.addClass('favoriting');
          this.element.fireEvent('dragend', event, 'bounce');
          ETSY.toggleFavorites(id, $element);
        }


      }
    }
  },

  onTap: function (e) {
    console.log('on tap!!!');
    var element = Ext.get(e.target),
      store = this.getStore(),
      title,
      id;
    
    // tapped on homepage category item
    if (Ext.get(e.target).parent('.category-index-item')) {
      element = Ext.get(e.target).parent('.category-index-item');
      title = $('#' + element.id + ' .title').html();
      id = element.getAttribute('rel');
      record = store.getAt(store.findExact('id', id));
      console.log('record is', record);
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
        id        = Math.abs(element.getAttribute('ref')),
        $element = $('#' + element.id);

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

  updateStore: function (newStore) {
    console.log('update the store', newStore);
    var me = this;

    if (newStore.isLoading()) {
      if (GLOBAL.panel != 'treasury' && GLOBAL.panel != 'favorites') {
        // this is when the store updates, we can update the max index.
        newStore.on('refresh', function () {
          // console.log('\n\n\n\n\n\n\nNewStore', newStore.data.length);
          var storeCount = newStore.data.length;
          var max = parseInt(storeCount / me.getCount());
          setTimeout(function () {
            me.setMaxItemIndex(max - 1);
          }, 100);
          
          
          if(me.getActiveIndex() < max){
            $('.rightArrow').show();
          }else{
            $('.rightArrow').hide();
          }
          
          if (storeCount == 100) {
            newStore.getProxy().setUrl('http://openapi.etsy.com/v2/listings/active');
          }
          
        });
      }

      // this is when the store loads for the first time
      newStore.on('load', function () {
        console.log('in store load');
        var storeCount = newStore.data.length;
        var max = parseInt(storeCount / me.getCount());
        setTimeout(function () {
          me.setMaxItemIndex(max - 1);
        }, 100);
        
        
        if(me.getActiveIndex() < max){
          $('.rightArrow').show();
        }else{
          $('.rightArrow').hide();
        }
        
        
        
        if (APP.getCategoriesPanel()) {
          APP.getCategoriesPanel().unmask();
        }
        if (APP.getTreasuriesPanel()) {
          APP.getTreasuriesPanel().unmask();
        }
        if (APP.getTreasuryPanel()) {
          APP.getTreasuryPanel().unmask();
        }
        
        if (APP.getSearchResultsPanel()) {
          APP.getSearchResultsPanel().unmask();
        }

        me.updateStore(newStore);
      }, me, {
        single: true
      });
    } else {
      console.log('store is not laoding');
      me.reset();
      
      var storeCount = newStore.data.length;
      var max = parseInt(storeCount / me.getCount());
      setTimeout(function () {
        me.setMaxItemIndex(max - 1);
      }, 100);
      
      
      if(me.getActiveIndex() < max){
        $('.rightArrow').show();
      }else{
        $('.rightArrow').hide();
      }

    }
  },

  onActiveItemChange: function (carousel, newItem, oldItem) {
    try{
      if (GLOBAL.panel != 'treasury') {
        var index     = carousel.getActiveIndex(),
          count       = this.getCount(),
          offsetLimit = this.getOffsetLimit(),
          store       = this.getStore(),
          storeCount  = store.getCount();

        if (storeCount - (count * index) < offsetLimit && !store.isLoading()) {
          store.nextPage();
        }

        console.log('storeCount is', storeCount);
        console.log('count is', count);
        var startIndex = (index) * (count) + 1,
          endIndex     = startIndex + (count - 1),
          max          = parseInt((storeCount-1) / (count));

        // favorites panel needs to show exact amount of items, hence fuzzy math
        if(GLOBAL.panel != 'favorites' && GLOBAL.panel != 'home'){
          this.setMaxItemIndex(max - 1);  
        }else{
          this.setMaxItemIndex(max);
        }

        console.log('index', storeCount, index, max);
        if(index == 0){
          $('.leftArrow').hide();
        }else{
          $('.leftArrow').show();
        }

        if(index == (max-1) || storeCount < 13){
          $('.rightArrow').hide();
        }else{
          $('.rightArrow').show();
        }

      }
    }catch(err){
      console.log('error', err);
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