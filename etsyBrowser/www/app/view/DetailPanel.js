Ext.define('Etsy.view.DetailPanel', {
	extend: 'Ext.Container',
	xtype: 'listing',
	id: 'detailPanel',

	requires: ['Ext.Img'],

	config: {
		cls: 'product-view',
		zIndex: 1000000000,
		centered: true,
		width: 679,
		height: 641,
		modal: true,
		hideOnMaskTap: true,
		scrollable: false,
		layout: {
			type: 'vbox'
		},

		items: [// {
		//            xtype: 'toolbar',
		//            docked: 'top',
		//            ui: 'none',
		//            hieght: 74,
		//            // id: 'browserToolbar',
		//            // title: 'Categories',
		//            defaults: {
		//                ui: 'plain'
		//            },
		//            items: [{
		//                id: 'detailPanelHeart',
		//                xtype: 'button',
		//                listeners: {
		//                    tap: function(e){
		//                         if($('#detailPanelHeart').hasClass('active')){
		//                             Ext.getCmp('detailPanelHeart').setCls('');
		//                             ETSY.removeFromFavorites(GLOBAL.newData.id);
		//                         }else{
		//                             Ext.getCmp('detailPanelHeart').setCls('active');
		//                             ETSY.addToFavorites(GLOBAL.newData.id);
		//                         }
		//                    }
		//                }
		//            },
		//            {
		//                id: 'detailPanelCart',
		//                xtype: 'button',
		//                listeners: {
		//                    tap: function(){
		//                        if($('#detailPanelCart').hasClass('active')){
		//                             Ext.getCmp('detailPanelCart').setCls('');
		//                             ETSY.removeFromCart(GLOBAL.newData.id);
		//                         }else{
		//                             Ext.getCmp('detailPanelCart').setCls('active');
		//                             ETSY.addToCart(GLOBAL.newData.id);
		//                         }
		//                    }
		//                }
		//            },
		//            {
		//                id: 'detailPanelEmail',
		//                xtype: 'button',
		//                listeners: {
		//                    tap: function(){
		//                         console.log('e is', GLOBAL.newData);
		//                        try {
		//                            window.plugins.emailComposer.showEmailComposer('Check out this great Etsy item!', 'I have discovered this great item from the I Heart Etsy iPad app.  \n\nYou can see it at:\n\n ' + GLOBAL.newData.url, null);
		//                        } catch(err) {
		//                            alert('This only works on the iPad');
		//                        }
		//                    }
		//                }
		//            },
		//            {
		//                id: 'detailPanelFacebook',
		//                xtype: 'button',
		//                listeners: {
		//                    tap: function(){
		//                        ETSY.alert('Wire up the facebook!');
		//                    }
		//                }
		// 
		// 
		//            },
		//            {
		//                id: 'detailPanelTwitter',
		//                xtype: 'button',
		//                listeners: {
		//                    tap: function(){
		//                        try{
		//                             window.plugins.twitter.composeTweet(
		//                                     function(s){ console.log('success')}, 
		//                                     function(e){  }, 
		//                                     'Check out this item from the I Heart Etsy iPad app:',
		//                                     {
		//                                         imageAttach: GLOBAL.newData.image.thumb,
		//                                         urlAttach: GLOBAL.newData.url, 
		// 
		//                                     }); 
		//                        }catch(err){
		//                            ETSY.alert('This only works in iPad');
		//                        }
		//                        
		//                    }
		//                }
		// 
		// 
		//            },
		//            ]
		//        },
		{
		    id: 'detailPanelInfo',
		    height: 79,
		    items: [
		    {

			    id: 'top-meta-info',
			    tpl: new Ext.XTemplate(
    			    '<div class="description-inner-wrapper">',
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
			}
			]
		},
		{

			xtype: 'carousel',
			flex: 1,
			id: 'detailPanelCarousel',
			defaults: {
                // height: 640,
                // width: 694,
			}
		},
		{
		    xtype: 'container',

			top: 5,
			right: 0,
			height: 630,
			width: 370,
			floating: true,
			layout: 'vbox',
			
            id: 'info-main-wrapper',
			
			cls: 'description',
			items: [{

			    id: 'meta-info',
			    tpl: new Ext.XTemplate(
    			    '<div class="description-inner-wrapper">',
    			        '<div class="name">{title}</div>', 
                        '<tpl if="state == \'sold_out\'">',
                            '<div class="sold price">SOLD</div>',
                        '</tpl>',
                        '<tpl if="state == \'active\'">',
                            '<div class="price">${price}</div>',
                        '</tpl>',
        			    '<div class="quantity">Only {quantity} available</div>', 
        			    '<div class="seller">ANOTHER API CALL FOR USER INFORMATION</div>',
        			    '<div class="shipping">ANOTHER API CALL FOR SHIPPING INFORMATION</div>',
                    '</div>'
    			)
			},
			{
			    flex: 1,
			    id: 'scrollingDescription',
			    tpl: new Ext.XTemplate(
    			    '<div class="description-inner-wrapper">',
                     '<div class="text">{description}</div>',
                    '</div>'
    			),
				scrollable: {
    				direction: 'vertical',
    				directionLock: true
    			}
			}]

			
		}],

		// showAnimation: {
		//     type: 'fadeIn',
		//     duration: 250,
		//     easing: 'ease-out'
		// },
		// 
		// hideAnimation: {
		//     type: 'fadeOut',
		//     duration: 250,
		//     easing: 'ease-in'
		// }
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
		//  this.element.on({
		//     scope: this,
		//     tap: 'onTap'
		// });

        Ext.getCmp('info-main-wrapper').element.on({
            scope: this,
            drag: 'onDragItem'
        });
		
		
		Ext.getCmp('info-main-wrapper').element.on({
			scope: this,
			tap: 'onTap'
		});
		
		Ext.getCmp('detailPanelCarousel').element.on({
			scope: this,
			tap: 'onTap'
		});
		
		

	},
	
	onDragItem: function(e){
		// console.log('event', e);
		var element = Ext.get(e.target);
		
		var y_dist = e.deltaY;
		
		var x_dist = e.deltaX;

        if (!element.hasCls('description')) {
            element = Ext.get(e.target).parent('.description');
        }
        
        if(element && !Ext.getCmp('detailPanelCarousel').isDragging && $('#scrollingDescription .x-scroll-indicator-y').css('opacity') == '0'){
			console.log('should be dragging');
			if(x_dist < -10){
			    console.log('swipe open');
				$('#info-main-wrapper').css('-webkit-transform', 'translate3d(0px,0,0)');
				GLOBAL.isInfoDisplayed = true;
			}

			if(x_dist >10){
				$('#info-main-wrapper').css('-webkit-transform', 'translate3d(323px,0,0)');
				GLOBAL.isInfoDisplayed = false;
			}
        }

		

		//console.log($('#' + element.id));
		

		//id = Math.abs(element.getAttribute('ref'));
		// console.log('the element being swiped is', element);
	},
	

	onTap: function(e) {
		// tapping on an image
		if(Ext.get(e.target).parent('.x-carousel-indicator')){
			var index = parseInt($('.x-carousel-indicator span').index($('#' + e.target.id)), 10);
			console.log('index is', index);
			setTimeout(function(){
				Ext.getCmp('detailPanelCarousel').setActiveItem(index);	
			}, 100);
			
			return false;
		}else{
			if(GLOBAL.isInfoDisplayed){ 
	    	    $('#info-main-wrapper').css('-webkit-transform', 'translate3d(323px,0,0)');
		        GLOBAL.isInfoDisplayed = false;
	        }else{
				$('#info-main-wrapper').css('-webkit-transform', 'translate3d(0px,0,0)');
	            GLOBAL.isInfoDisplayed = true;
	        }
		}
	
	},

	updateData: function(newData) {
	    GLOBAL.newData = newData;
	    console.log('newData is', newData);
		var image = this.down('image');
		// 
		// image.element.dom.style.backgroundSize = "30%";
		// image.element.dom.style.backgroundImage = 'url(resources/images/loading.gif)';
		// image.setSrc('');	
		// image.setSrc(newData.image.large);
		var carousel = Ext.getCmp('detailPanelCarousel');
		carousel.removeAll();
		console.log('newData.Images', newData.Images);
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
		// if(images.length == 1){
		// 	carousel.disable();
		// }
		carousel.add(imageArray);
		carousel.setActiveItem(0);
		
		setTimeout(function(){
		    $('.x-carousel-indicator span').each(function(index){
    		  $(this).css('background-image', 'url(' + thumbnailsArray[index] + ')');  
    		});
		}, 100)


		Ext.getCmp('scrollingDescription').setData(newData);
        Ext.getCmp('meta-info').setData(newData);
        Ext.getCmp('top-meta-info').setData(newData);
	}
});
