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
    if (element.hasCls('favorite-stamp') && GLOBAL.signed_in) {
        element = Ext.get(e.target).parent('.product');
       $('#' + element.id).addClass('cart-pressed-flag');
       return false;
    }
    
    if(element = Ext.get(e.target).parent('.treasury-item')){
      var parent = Ext.get(e.target).parent('.treasury-item')
      $('#' + parent.id).addClass('pressed');
      return false;
    }
    
    element = Ext.get(e.target).parent('.product');
    
    if(element){
      $('#' + element.id).addClass('product-pressed-flag');
    }

  },

  onTouchEtsyItemEnd: function (e) {
	  $('.product').removeClass('cart-pressed-flag'); 
	  $('.product').removeClass('product-pressed-flag');   
    $('.treasury-item').removeClass('pressed');   
  },

  /**
   * Track which element is currently being dragged.
   * @param {Object} event Event object
   */
  trackProduct: function (event) {
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
          ETSY.trackEvent('actions', 'favoriting', 'from index panel');
          ETSY.toggleFavorites(id, $element);
        }


      }
    }
  },

  onTap: function (e) {

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
        id        = Math.abs(element.getAttribute('ref')),
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

  updateStore: function (newStore) {
    // console.log('called updateStore');
    var self = this;

    
    if (newStore.isLoading()) {
      if (GLOBAL.panel == 'listings' || GLOBAL.panel == 'searchResults') {
        // this is when the store updates, we can update the max index.
        window.newStore = newStore;
        newStore.on('refresh', function () {
          var storeCount = newStore.getCount();
            self.adjustAfterLoading(self, newStore);          
            newStore.getProxy().setUrl('http://openapi.etsy.com/v2/listings/active');
            //console.log('\n\n\n\n\nnew store proxy', newStore.getProxy());
            if(GLOBAL.panel == 'listings'){
              newStore.getProxy().setExtraParam('category', GLOBAL.searchCategory.name);
            }
            
        });
      }
      
      // this is when the store loads for the first time
      newStore.on('load', function () {
        // console.log('in store load');
        self.adjustAfterLoading(self, newStore);
        self.updateStore(newStore);
      }, self, {
        single: true
      });
      
    } else {
      //console.log('NOT in newStore.isLoading()');
      self.reset();
      self.adjustAfterLoading(self, newStore);
    }
  },
  
  adjustAfterLoading: function(me, newStore){
    var storeCount = newStore.data.length;
    var max  = parseInt((storeCount-1) / (me.getCount()));

    // favorites panel needs to show exact amount of items, hence fuzzy math
    if(GLOBAL.panel != 'favorites' && GLOBAL.panel != 'home'){
      max = max - 1;
    }

    me.setMaxItemIndex(max);
    if(me.getActiveIndex() < max){
      $('.rightArrow').show();
    }else{
      $('.rightArrow').hide();
    }

    if(me.getActiveIndex() == 0){
      $('.leftArrow').hide();
    }else{
      $('.leftArrow').show();
    }    
  },

  onActiveItemChange: function (carousel, newItem, oldItem) {
    // tests to see if we should try to load in another set of items from the Etsy API
    // and then calls adjustAfterLoading which makes sure we adjust the arrows and the max items
    //console.log('called onActiveItemChange');

    var index     = carousel.getActiveIndex(),
      count       = this.getCount(),
      offsetLimit = this.getOffsetLimit(),
      store       = this.getStore(),
      storeCount  = store.getCount();
      
      if(index > 1){
        ETSY.trackPageviews(GLOBAL.google_last_url + "/" + index, true); 
      }

      //console.log('storeCount', storeCount);
      //console.log('count', count)
      //console.log('offsetLimit', offsetLimit);
      
    if (GLOBAL.panel != 'treasury' && GLOBAL.panel != 'favorites') {
      if (storeCount - (count * index) < offsetLimit && !store.isLoading()) {
        //console.log('calling store.nextPage');
        store.nextPage();
      }
    }

    carousel.adjustAfterLoading(carousel, store);

    
  },

  onItemIndexChange: function (me, item, index) {
    try{
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
    }catch(err){
      
    }

  }
  
});