/*jslint devel: true, browser: true, indent: 2, nomen: true, sloppy: true */
/*global Ext, ETSY, $, GLOBAL */

Ext.define('Etsy.view.DetailPanel',
{
    extend: 'Ext.Container',
    xtype: 'listing',
    alias: 'widget.detailPanel',
    requires: ['GT.FixedButton'],

    config: {
        id: 'detailPanel',
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
                    width: 490,
                    id: 'top-meta-info',
                    tpl: new Ext.XTemplate(
                    '<div class="description-inner-wrapper <tpl if="state == \'sold_out\'"> sold-flag</tpl> <tpl if="in_cart"> cart-flag</tpl> <tpl if="in_favorites"> favorite-flag</tpl>">',
                    '<div class="name">{title}</div>',
                    '<tpl if="state == \'sold_out\'">',
                    '<div class="sold price">SOLD</div>',
                    '</tpl>',
                    '<tpl if="state == \'active\'">',
                    '<div class="price">${price}</div>',
                    '<div class="quantity">Only {quantity} available</div>',
                    '<div class="cart-confirmation">Added to your cart</div>',
                    '</tpl>',
                    '</div>'
                    )
                },
                {
                    xtype: 'spacer',
                    width: 40
                },
                {
                    top: -3,
                    right: -87,
                    width: 77,
                    height: 100,
                    id: 'detailPanelInfoButton',
                    xtype: 'fixedbutton',
                    listeners: {
                        tap: function(e) {
                            if (Ext.getCmp('detailPanelMoreInfo').isHidden()) {
                                ETSY.trackEvent('actions', 'show info', 'from detail panel');
                                // Ext.getCmp('detailPanelMoreInfo').setShowAnimation({
                                //   type: 'fadeIn',
                                //   duration: 300,
                                //   direction: 'down'
                                // })
                                Ext.getCmp('detailPanelMoreInfo').show();
                                Ext.getCmp('detailPanelInfoButton').setCls('active');
                            } else {
                                Ext.getCmp('detailPanelMoreInfo').hide();
                                ETSY.trackEvent('actions', 'hide info', 'from detail panel');
                                Ext.getCmp('detailPanelInfoButton').setCls('');
                            }
                        }
                    }
                },
                {
                    id: 'detailPanelHeart',
                    xtype: 'fixedbutton',
                    width: 32,
                    listeners: {
                        tap: function(e) {
                            ETSY.trackEvent('actions', 'favoriting', 'from detail panel');
                            var $elem = $('.description-inner-wrapper');
                            ETSY.toggleFavorites(GLOBAL.newData.id, $elem, true);
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
                    xtype: 'fixedbutton',
                    width: 32,
                    listeners: {
                        tap: function() {
                            ETSY.trackEvent('share', 'email');
                            console.log('e is', GLOBAL.newData);
                            try {
                                window.plugins.emailComposer.showEmailComposer('Check out this great Etsy item!', 'I have discovered this great item, ' + GLOBAL.newData.title + ', from the I Heart Etsy iPad app (http://bit.ly/I-Heart-Etsy).  \n\nYou can see it at:\n\n ' + GLOBAL.newData.url, null);
                            } catch(err) {
                                alert('This only works on the iPad');
                            }
                        }
                    }
                },
                {
                    id: 'detailPanelFacebook',
                    xtype: 'fixedbutton',
                    width: 32,
                    listeners: {
                        tap: function() {
                            ETSY.trackEvent('share', 'facebook');
                            ETSY.facebookWallPost();

                        }
                    }
                },

                {
                    id: 'detailPanelTwitter',
                    xtype: 'fixedbutton',
                    width: 32,
                    listeners: {
                        tap: function() {
                            ETSY.trackEvent('share', 'twitter');
                            
                            APP.getAppPanel().setMasked({
                                xtype: 'loadmask',
                                message: 'Loading Twitter',
                                zIndex: 100000000000
                            });
                            
                            setTimeout(function(){
                                window.plugins.twitter.isTwitterAvailable(function(r){
                                    APP.getAppPanel().unmask();
                                    if(r == 1){ // this means twitter is available (iOS 5)
                                        window.plugins.twitter.composeTweet(
                                        function(s) { // success
                                            APP.getAppPanel().setMasked({
                                                xtype: 'loadmask',
                                                message: 'Tweeted!',
                                                zIndex: 100000000000
                                            });
                                            setTimeout(function(){
                                                APP.getAppPanel().unmask();
                                            }, 750);
                                        },
                                        function(e) { // error message (when someone cancels)
                                            APP.getAppPanel().unmask();
                                        },
                                        'Check out this item from the I Heart Etsy iPad app!',
                                        {
                                            imageAttach: GLOBAL.newData.image.thumb,
                                            urlAttach: GLOBAL.newData.url
                                        });
                                    }else{
                                        APP.getAppPanel().unmask();
                                        ETSY.alert('Sorry but Twitter requires iOS 5');
                                    }
                                });
                            }, 100);
                        }
                    }

                }
                ]
                // items
            },
            {
                height: 550,
                id: 'detailPanelMoreInfo',
                hidden: true,
                xtype: 'container',
                layout: 'vbox',
                items: [
                
                {
                  height: 360,
                  xtype: 'container',
                  layout: 'hbox',
                  defaults: {
                      flex: 1
                  },
                  items: [
                  {
                      flex: 1,
                      id: 'meta-info',
                      tpl: new Ext.XTemplate(
                      '<div class="left-wrapper">',
                      '<div class="seller">',
                      '<header class="table-header">',
                      '<div><span>Seller Name</span></div>',
                      '<div><span>Feedback Count</span></div>',
                      '<div><span>Feedback Score</span></div>',
                      '</header>',
                      '<ul class="table-content">',
                      '<li>',
                      '<div>{User.login_name}</div>',
                      '<div>{feedback_count}</div>',
                      '<div>{feedback_score}</div>',
                      '</li>',
                      '</ul>',
                      '</div>',
                      '<div class="shipping">',
                      '<header class="table-header">',
                      '<div><span>Ship to</span></div>',
                      '<div><span>Cost</span></div>',
                      '<div><span>With another item</span></div>',
                      '</header>',
                      '<ul class="table-content">',
                      '<tpl for="ShippingInfo">',
                      '<li>',
                      '<div>{destination_country_name}</div>',
                      '<div>${primary_cost}</div>',
                      '<div>{currency_code}</div>',
                      '</li>',
                      '</tpl>',
                      '</ul>',
                      '</div>',
                      '</div>'
                      ),
                      scrollable: {
                          direction: 'vertical',
                          directionLock: true
                      }
                  },
                  {
                      xtype: 'spacer',
                      width: 20
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
                  }
                  ]
                  // items
                },
                {
                  flex: 1,
                  xtype: 'container',
                  id: 'shopItems'
                }
                
                ]
                
                
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
            defaults: {}
        },
        ],
        listeners: {
            erased: function() {
                setTimeout(function() {
                    APP.getDetailPanel().destroy();
                },
                100);
                //console.log('destroyed the detail panel!');
            }
        }
    },

    initialize: function() {
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
        }
    },

    onTap: function(e) {

        if (Ext.get(e.target).parent('.description-inner-wrapper')) {
            //console.log('should be going to ETSY.toggleCart');
            ETSY.trackEvent('actions', 'add to cart', 'from detail panel');
            ETSY.toggleCart(GLOBAL.newData.id, $('.description-inner-wrapper'), true);
            return false;
        }

        if (Ext.get(e.target).parent('.x-carousel-item')) {
            if (Ext.getCmp('detailPanelMoreInfo').isHidden()) {
                ETSY.trackEvent('actions', 'show info', 'from detail panel');
                Ext.getCmp('detailPanelMoreInfo').show();
                Ext.getCmp('detailPanelInfoButton').setCls('active');
            } else {
                Ext.getCmp('detailPanelMoreInfo').hide();
                ETSY.trackEvent('actions', 'hide info', 'from detail panel');
                Ext.getCmp('detailPanelInfoButton').setCls('');
            }
            return false;
        }

        // tapping on an image
        if (Ext.get(e.target).parent('.x-carousel-indicator')) {
            ETSY.trackEvent('actions', 'go to thumbnail', 'from detail panel');
            var index = parseInt($('.x-carousel-indicator span').index($('#' + e.target.id)), 10);
            //console.log('index is', index);
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



        // test to see if the items are already in the shopping cart or favorites
        var id = newData.id;


        // test sold out state
        // newData.state = "sold_out";
        // set up the carousel


        Ext.Ajax.request({
            url: 'http://openapi.etsy.com/v2/listings/' + newData.id + '?_dc=1336848510210&api_key=tia49fh9iqjcrukurpbyqtv5&includes=Images,User,ShippingInfo,Shop',
            success: function(response){
                var newData = JSON.parse(response.responseText).results[0];
                
                 Ext.Ajax.request({
                    url: 'http://openapi.etsy.com/v2/shops/' + newData.Shop.shop_id + '/listings/active/?_dc=1336848510210&api_key=tia49fh9iqjcrukurpbyqtv5&includes=Images:1,User,ShippingInfo,Shop&limit=7',
                    success: function(response){
                      var shopData = JSON.parse(response.responseText).results;
                      console.log('******shopData DATA', shopData);
                      var html = "<h2>Visit " + newData.Shop.shop_name + "'s Shop ></h2>";

                      for (i = 0; i < shopData.length; i++) {
                        console.log(shopData[i].Images[0]);
                          var image = shopData[i].Images[0].url_75x75;
                          console.log(image);
                          html += '<div class="shop-image" style="background-image: url(' + image + ')"></div>'
                      }
                      Ext.getCmp('shopItems').setHtml(html)
                      
                    }
                });
                
                console.log(newData);
                var carousel = Ext.getCmp('detailPanelCarousel');
                // console.log(data)
                
                newData.parsed_description = newData.description.replace(/\n/g, '<br />');

                
                if (localStorage.cart_listing_ids && localStorage.cart_listing_ids.indexOf(id) != -1) {
                    newData.in_cart = true;
                } else {
                    newData.in_cart = false;
                }
                if (localStorage.favorites_listing_ids && localStorage.favorites_listing_ids.indexOf(id) != -1) {
                    newData.in_favorites = true;
                    Ext.getCmp('detailPanelMainInfo').addCls('favorite-flag');
                } else {
                    newData.in_favorites = false;
                }
                
                // test sold out state
                // newData.state = "sold_out";
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

    }
});
