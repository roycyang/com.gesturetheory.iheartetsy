Ext.define('Etsy.view.InstructionsPanel', {
    extend: 'Ext.Container',
    alias: 'widget.instructionsPanel',
        requires: ['GT.FixedButton'],
    config: {
        id: 'instructionPanel',
        zIndex: 1000000000,
        width: 583,
        height: 655,
        top: 80,
        left: 220,
        modal: true,
        hideOnMaskTap: false,
        scrollable: false,
        layout: {
            type: 'fit'
        },
      

        items: [

        {
            xtype: 'carousel',
            width: 559,
            height: 635,
            id: 'instructionCarousel',
            margin: '0 12px',
            items: [
              {
                html: "<div class='instruction-panel' style='background-image: url(resources/images/instructions/slide_1.png)'></div>"
              },
              {
                html: "<div class='instruction-panel' style='background-image: url(resources/images/instructions/slide_2.png)'></div>"
              },
              {
                html: "<div class='instruction-panel' style='background-image: url(resources/images/instructions/slide_3.png)'></div>"
              },
              {
                html: "<div class='instruction-panel' style='background-image: url(resources/images/instructions/slide_4.png)'></div>"
              },
              {
                xtype: 'container',
                id: 'panel5',
                cls: 'instruction-panel',
                items: [{
                  height: 177,
                  width: 177,
                  top: 255,
                  left: 50,
                  id: 'instr-sign-up-button',
                  xtype: 'fixedbutton',
                  ui: 'plain',
                  listeners: {
                    tap: function(){
                      APP.getInstructionsPanel().destroy();
                      ETSY.initAuthorization();
                    }
                  }
                },
                {
                  height: 177,
                   width: 177,
                   top: 255,
                   right: 50,
                  id: 'instr-app-button',
                  xtype: 'fixedbutton',
                  ui: 'plain',
                  listeners: {
                    tap: function(){
                      APP.getInstructionsPanel().destroy();
                    }
                  }
                }
                ]
              }
            ]
        },

        ],
        listeners: {
          erased: function(){
            APP.getInstructionsPanel().destroy();
          }
        }
    },

    // initialize: function() {
    // 
    //     this.element.on({
    //         scope: this,
    //         tap: 'onTap',
    //         touchstart: 'onTouchStart',
    //         touchmove: 'onTouchMove',
    //         touchend: 'onTouchEnd',
    //     });
    // },
    // 
    // onTouchEnd: function(e) {
    //     $('.description-inner-wrapper').removeClass('cart-pressed-flag');
    // },
    // 
    // onTouchMove: function(e) {
    //     $('.description-inner-wrapper').removeClass('cart-pressed-flag');
    // },
    // 
    // onTouchStart: function(e) {
    //     if (Ext.get(e.target).parent('.description-inner-wrapper')) {
    //         $('.description-inner-wrapper').addClass('cart-pressed-flag');
    //         return false;
    //     }
    // },
    // 
    // onTap: function(e) {
    //   if (Ext.get(e.target).parent('.description-inner-wrapper')) {
    //     console.log('should be going to ETSY.toggleCart');
    //       ETSY.toggleCart(GLOBAL.newData.id, $('.description-inner-wrapper'), true);
    //       return false;
    //   }
    // 
    //   // tapping on an image
    //   if (Ext.get(e.target).parent('.x-carousel-indicator')) {
    //       var index = parseInt($('.x-carousel-indicator span').index($('#' + e.target.id)), 10);
    //       console.log('index is', index);
    //       setTimeout(function() {
    //           Ext.getCmp('detailPanelCarousel').setActiveItem(index);
    //       },
    //       100);
    // 
    //       return false;
    //   } else {
    //       if (GLOBAL.isInfoDisplayed) {
    //           $('#info-main-wrapper').css('-webkit-transform', 'translate3d(323px,0,0)');
    //           GLOBAL.isInfoDisplayed = false;
    //       } else {
    //           $('#info-main-wrapper').css('-webkit-transform', 'translate3d(0px,0,0)');
    //           GLOBAL.isInfoDisplayed = true;
    //       }
    //   }
    // },
    // 
    // updateData: function(newData) {
    //     GLOBAL.newData = newData;
    // 
    //     var carousel = Ext.getCmp('detailPanelCarousel');
    //     carousel.removeAll();
    // 
    //     // test to see if the items are already in the shopping cart or favorites
    //     var id = newData.id;
    //     if (localStorage.cart_listing_ids && localStorage.cart_listing_ids.indexOf(id) != -1) {
    //         newData.in_cart = true;
    //     }
    //     if (localStorage.favorites_listing_ids && localStorage.favorites_listing_ids.indexOf(id) != -1) {
    //         newData.in_favorites = true;
    //     }
    // 
    //     // set up the carousel
    //     var images = newData.Images;
    //     var imageArray = [];
    //     var thumbnailsArray = [];
    //     for (i = 0; i < images.length; i++) {
    //         var image = images[i].url_570xN;
    //         imageArray.push({
    //             xtype: 'container',
    //             cls: 'detail-panel-image',
    //             html: '<div class="image" style="background-image: url(' + image + ')"></div>'
    //         });
    //         thumbnailsArray.push(images[i].url_75x75);
    //     }
    //     
    //     // if there is only one item, remove the indicator
    //     if(images.length == 1){
    //       carousel.setIndicator(false);
    //     }else{
    //       carousel.setIndicator(true);
    //     }
    //     carousel.add(imageArray);
    //     carousel.setActiveItem(0);
    // 
    //     setTimeout(function() {
    //         $('.x-carousel-indicator span').each(function(index) {
    //             $(this).css('background-image', 'url(' + thumbnailsArray[index] + ')');
    //         });
    //     },
    //     100)
    // 
    // 
    //     // Ext.getCmp('scrollingDescription').setData(newData);
    //     //         Ext.getCmp('meta-info').setData(newData);
    //     Ext.getCmp('top-meta-info').setData(newData);
    // }
});
