Ext.define('Etsy.view.NavPanel', {
	extend: 'Ext.Container',
	config: {
		layout: {
			type: 'card',
			animation: {
				type: 'slide',
				duration: 300,
				direction: 'left'
			},
		},
		id: 'navPanel',
		width: 288,
		height: 748,
        top: 0,
        hidden: true,
        left: 0,

		items: [
		{
			xtype: 'list',
			flex: 1,
			id: 'navList',

			itemTpl: '<div class="contact">{title}</div>',
			store: 'Navigation',
			grouped: true,
			listeners: {
    		    initialize: function(){
                    this.select(0);
    		    }
    		}

		},
		// {
		//             id: 'categoriesNestedList',
		// 			xtype: 'nestedlist',
		// 			title: 'Categories',
		//             displayField: 'short_name',
		// 			store: 'Categories',
		// 			updateTitleText: false,
		// 			listeners: {
		// 				initialize: function(nestedList){
		//                     var toolbar = this.getToolbar();
		// 					toolbar.add({
		// 			            id: 'backToNav',
		// 						ui: 'back',
		// 			            xtype: 'button', 
		//                         // left: 0,
		//                         // top: -50,
		//                         // right: 0,
		// 			            text: 'Back',
		// 			            listeners: {
		// 			                tap: function(){
		// 								self.getNavPanel().getLayout().setAnimation({
		// 									type: 'slide',
		// 									duration: 300,
		// 									direction: 'right'
		// 								});
		// 								self.getNavPanel().setActiveItem(0);	             
		// 								}
		// 			            }
		// 		            });
		//     		    },
		// 				leafitemtap: function(){
		// 							self.toggleNav();
		// 				},
		// 				itemtap: function(nestedlist, list, index, target, record, e) {
		// 					Ext.getCmp('backToNav').hide();
		//                     // setTimeout(function(){
		//                     //     Ext.getCmp($('#categoryNestedListPopup .x-button-back').attr('id')).setTop(8)
		//                     //                             $('#categoryNestedListPopup .x-button-back').css('width', '288px !important');
		//                     // })
		// 
		// 				   
		// 					// this is a child child node
		// 					if (record.childNodes.length == 0) {
		// 						var tags = record.get('name') + ',' + record.parentNode.get('name');
		// 						var category = record.parentNode.parentNode.get('name');
		// 						console.log('LEVEL 3');
		// 						console.log('tags are', tags);
		// 						console.log('category is', category);
		// 						
		//                         self.loadListings('tags', record.parentNode.parentNode, record.get('short_name'), tags);
		// 
		//                     // this is the main cateogry
		// 					} else if (!record.parentNode.parentNode) {
		// 					    if(Ext.getCmp('goToButton')){
		// 					        Ext.getCmp('goToButton').setText('Go to ' + record.get('short_name'));
		// 					        GLOBAL.goToButton = ['category', record, null, null];
		// 					    }else{
		// 					        setTimeout(function(){
		//                                 var toolbar = nestedlist.getToolbar();
		// 
		//                                 toolbar.setTitle('');
		// 
		//                                 // toolbar.setPadding('50px 0.2em 0px');
		//                                 // toolbar.setHeight(100);
		//     					        toolbar.add({
		//     					            id: 'goToButton',
		//                                     // width: 300,
		//     					            xtype: 'button', 
		//                                     // left: 0,
		//                                     // top: -50,
		//                                     // right: 0,
		//     					            text: 'Go to ' + record.get('short_name'),
		//     					            listeners: {
		//     					                tap: function(){
		//         					                    console.log('tapping the go to button');
		//                                                 self.loadListings(GLOBAL.goToButton[0], GLOBAL.goToButton[1], GLOBAL.goToButton[2], GLOBAL.goToButton[4]);
		//         					            }
		//     					            }
		// 					            });
		// 					            GLOBAL.goToButton = ['category', record, null, null];
		//     					    }, 0);
		// 					    }
		// 					} else {
		// 						var tags = record.get('name');
		// 						var category = record.parentNode.get('name');
		// 					    Ext.getCmp('goToButton').setText('Go to ' + record.get('short_name'));
		//                         GLOBAL.goToButton = ['tags', record.parentNode, record.get('short_name'), tags];
		// 
		// 						console.log('LEVEL 2');
		// 						console.log('tags are', tags);
		// 						console.log('category is', category);
		// 					}
		// 
		// 				}
		// 			}
		//     }
		],

	},

});
