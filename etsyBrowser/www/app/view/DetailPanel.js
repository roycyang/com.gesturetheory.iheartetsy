/*jslint devel: true, browser: true, indent: 2, nomen: true, sloppy: true */
/*global Ext, ETSY, $, GLOBAL */

Ext.define('Etsy.view.DetailPanel',
  {
    extend: 'Ext.Container',
    xtype: 'listing',
    id: 'detailPanel',

    requires: ['Ext.Img'],

    config: {
      cls: 'product-view',
      zIndex: 1000000000,
      centered: true,
      width: 794,
      height: 651,
      modal: true,
      hideOnMaskTap: true,
      scrollable: false,
      layout: {
        type: 'vbox'
      },

      items: [
        {
          top: 0,
          left: 0,
          zIndex: 1000,
          id: 'detailPanelInfo',
          layout: 'vbox',
          padding: '0 0 20px 0',
          defaults: {
            flex: 1
          },
          items: [
            {
              id: 'detailPanelMainInfo',
              height: 90,
              width: 768,
              layout: 'hbox',
              defaults: {
                flex: 1,
                ui: 'plain'
              },
              items: [
                {
                  width: 500,
                  id: 'top-meta-info',
                  tpl: new Ext.XTemplate(
                    '<div class="description-inner-wrapper <tpl if="in_cart"> cart-flag</tpl> <tpl if="in_favorites"> favorite-flag</tpl>">',
                    '<div class="name">{title}</div>',
                    '<tpl if="state == \'sold_out\'">',
                    '<div class="sold price">SOLD</div>',
                    '</tpl>',
                    '<tpl if="state == \'active\'">',
                    '<div class="price">${price}</div>',
                    '</tpl>',
                    '<div class="quantity">Only {quantity} available</div>',
                    '</div>'
                  )
                },
                {
                  xtype: 'spacer',
                  width: 81
                },
                {
                  top: 18,
                  right: -87,
                  width: 77,
                  height: 51,
                  id: 'detailPanelInfoButton',
                  xtype: 'button',
                  listeners: {
                    tap: function (e) {
                      if (Ext.getCmp('detailPanelMoreInfo').isHidden()) {
                        ETSY.trackEvent('actions', 'show info', 'from detail panel');
                        // Ext.getCmp('detailPanelMoreInfo').setShowAnimation({
                        //   type: 'fadeIn',
                        //   duration: 300,
                        //   direction: 'down'
                        // })
                        Ext.getCmp('detailPanelMoreInfo').show();
                      } else {
                        Ext.getCmp('detailPanelMoreInfo').hide();
                        ETSY.trackEvent('actions', 'hide info', 'from detail panel');
                      }
                    }
                  }
                },
                {
                  id: 'detailPanelHeart',
                  xtype: 'button',
                  width: 32,
                  listeners: {
                    tap: function (e) {
                      ETSY.trackEvent('actions', 'favoriting', 'from detail panel');
                      var $elem = $('.description-inner-wrapper');
                      if (!$elem.hasClass('favoriting')) {
                        $elem.addClass('favoriting');
                        ETSY.toggleFavorites(GLOBAL.newData.id, $elem, true);
                      }
                    }
                  }
                },
                {
                  xtype: 'spacer',
                  width: 1,
                  id: 'detailPanelSpacer'
                },
                {
                  id: 'detailPanelEmail',
                  xtype: 'button',
                  width: 32,
                  listeners: {
                    tap: function () {
                      ETSY.trackEvent('share', 'email');
                      console.log('e is', GLOBAL.newData);
                      try {
                        window.plugins.emailComposer.showEmailComposer('Check out this great Etsy item!', 'I have discovered this great item from the I Heart Etsy iPad app.  \n\nYou can see it at:\n\n ' + GLOBAL.newData.url, null);
                      } catch (err) {
                        alert('This only works on the iPad');
                      }
                    }
                  }
                },
                {
                  id: 'detailPanelFacebook',
                  xtype: 'button',
                  width: 32,
                  listeners: {
                    tap: function () {
                      ETSY.trackEvent('share', 'facebook');
                      ETSY.facebookWallPost();
                    }
                  }
                },

                // {
                //     id: 'detailPanelTwitter',
                //     xtype: 'button',
                //     listeners: {
                //         tap: function() {
                //           // ETSY.trackEvent('share', 'twitter');
                // 
                //           
                //             window.plugins.twitter.isTwitterSetup(function(r){
                //                 console.log("twitter configured? " + r);
                //             });
                //             // window.plugins.twitter.isTwitterAvailable(function(r){
                //             //     console.log("twitter available? " + r);
                //             // });
                //             
                //              // window.plugins.twitter.composeTweet(
                //              // function(s) {
                //              //     console.log('success')
                //              // },
                //              // function(e) {
                //              //   console.log("tweet failure: " + e);
                //              // },
                //              // 'Check out this item from the I Heart Etsy iPad app!',
                //              // {
                //              //     imageAttach: GLOBAL.newData.image.thumb,
                //              //     urlAttach: GLOBAL.newData.url,
                //              // 
                //              // });
                //                                       
                //             // window.plugins.twitter.isTwitterAvailable(function(r){
                //             //                              console.log("twitter available? " + r);
                //             //                                 // if(r == 1){
                //             //                                 //                                    window.plugins.twitter.composeTweet(
                //             //                                 //                                    function(s) {
                //             //                                 //                                        console.log('success')
                //             //                                 //                                    },
                //             //                                 //                                    function(e) {
                //             //                                 //                                      console.log("tweet failure: " + e);
                //             //                                 //                                    },
                //             //                                 //                                    'Check out this item from the I Heart Etsy iPad app!',
                //             //                                 //                                    {
                //             //                                 //                                        imageAttach: GLOBAL.newData.image.thumb,
                //             //                                 //                                        urlAttach: GLOBAL.newData.url,
                //             //                                 // 
                //             //                                 //                                    });
                //             //                                 //                    
                //             //                                 //                                  }else{
                //             //                                 //                                    ETSY.alert('Sorry but this only works with iOS 5');
                //             //                                 //                                  }
                //             //                             });
                // 
                //         }
                //     }
                // 
                // }
                ]
            },
            {
                height: 300,
                id: 'detailPanelMoreInfo',
                hidden: true,
                xtype: 'container',
                layout: 'hbox',
                defaults: {
                  flex: 1
                },
                 items: [{
                    flex: 1,
                     id: 'meta-info',
                     tpl: new Ext.XTemplate(
                         '<div class="left-wrapper">',
                             '<div class="seller">login {User.login_name} feedback count: {User.feedback_info.count} feedback score: {User.feedback_info.score}</div>',
                             '<div class="shipping">',
                               '<tpl for="ShippingInfo">',
                                 '{destination_country_name}<br/>',
                                 '{primary_cost}<br/>',
                                 '{currency_code}<br/>',
                               '</tpl>',
                             '</div>',
                          '</div>'
                     )
                 },
                 {
                     flex: 1,
                     id: 'scrollingDescription',
                     tpl: new Ext.XTemplate(
                         '<div class="right-wrapper">',

                                 '<div class="text">{parsed_description}</div>',
                                '</div>'

                     ),
                   scrollable: {
                       direction: 'vertical',
                       directionLock: true
                     }
                 }]
            },

            ]
        },
        {

            xtype: 'carousel',
            bottom: 0,
            left: 0,
            height: 552,
            width: 768,
            id: 'detailPanelCarousel',
            defaults: {
                }
        },

        ],
    },

    initialize: function() {
        // var image = this.down('image');
        //
        // image.on({
        //     scope: this,
        //     load: function() {
        //         image.element.dom.style.backgroundSize = "contain";
        //     }
        // });
        this.element.on({
            scope: this,
            tap: 'onTap',
            touchstart: 'onTouchStart',
            touchmove: 'onTouchMove',
            touchend: 'onTouchEnd',
        });
    },

    onTouchEnd: function(e) {
        $('.description-inner-wrapper').removeClass('cart-pressed-flag');
    },

    onTouchMove: function(e) {
        $('.description-inner-wrapper').removeClass('cart-pressed-flag');
    },

    onTouchStart: function(e) {
        var element = Ext.get(e.target);
        if (element.hasCls('price')) {
            $('.description-inner-wrapper').addClass('cart-pressed-flag');
            return false;
        }
    },

    onTap: function(e) {
        if (Ext.get(e.target).parent('.description-inner-wrapper')) {
            console.log('should be going to ETSY.toggleCart');
            ETSY.trackEvent('actions', 'add to cart', 'from detail panel');
            ETSY.toggleCart(GLOBAL.newData.id, $('.description-inner-wrapper'), true);
            return false;
        }

        // tapping on an image
        if (Ext.get(e.target).parent('.x-carousel-indicator')) {
            ETSY.trackEvent('actions', 'go to thumbnail', 'from detail panel');
            var index = parseInt($('.x-carousel-indicator span').index($('#' + e.target.id)), 10);
            console.log('index is', index);
            setTimeout(function() {
                Ext.getCmp('detailPanelCarousel').setActiveItem(index);
            },
            100);

            return false;
        } else {
            if (GLOBAL.isInfoDisplayed) {
                $('#info-main-wrapper').css('-webkit-transform', 'translate3d(323px,0,0)');
                GLOBAL.isInfoDisplayed = false;
            } else {
                $('#info-main-wrapper').css('-webkit-transform', 'translate3d(0px,0,0)');
                GLOBAL.isInfoDisplayed = true;
            }
        }
    },

    updateData: function(newData) {
        GLOBAL.newData = newData;

        var carousel = Ext.getCmp('detailPanelCarousel');
        carousel.removeAll();

        // test to see if the items are already in the shopping cart or favorites
        var id = newData.id;
        if (localStorage.cart_listing_ids && localStorage.cart_listing_ids.indexOf(id) != -1) {
            newData.in_cart = true;
        }else{
            newData.in_cart = false;
        }
        if (localStorage.favorites_listing_ids && localStorage.favorites_listing_ids.indexOf(id) != -1) {
            newData.in_favorites = true;
        }else{
            newData.in_favorites = false;
        }

        // set up the carousel
        var images = newData.Images;
        var imageArray = [];
        var thumbnailsArray = [];
        for (i = 0; i < images.length; i++) {
            var image = images[i].url_570xN;
            imageArray.push({
                xtype: 'container',
                cls: 'detail-panel-image',
                html: '<div class="image" style="background-image: url(' + image + ')"></div>'
            });
            thumbnailsArray.push(images[i].url_75x75);
        }

        // if there is only one item, remove the indicator
        if (images.length == 1) {
            carousel.setIndicator(false);
        } else {
            carousel.setIndicator(true);
        }
        carousel.add(imageArray);
        carousel.setActiveItem(0);

        setTimeout(function() {
            $('.x-carousel-indicator span').each(function(index) {
                $(this).css('background-image', 'url(' + thumbnailsArray[index] + ')');
            });
        },
        100)


        Ext.getCmp('scrollingDescription').setData(newData);
        Ext.getCmp('meta-info').setData(newData);
        Ext.getCmp('top-meta-info').setData(newData);
    }
});
