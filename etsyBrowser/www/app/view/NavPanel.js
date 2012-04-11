Ext.define('Etsy.view.NavPanel', {
	extend: 'Ext.Container',
	config: {
		layout: {
			type: 'vbox',
		},
		id: 'navPanel',
		width: 288,
		height: 748,
		hidden: true,
		top: 0,
		left: 0,

		items: [
			{
				id: 'userInformation',
				hidden: true,
				height: 93,
			},
			{
			  xtype: 'button',
			  ui: 'none',
        height: 93,
				id: 'signUpButton',
        html: '<div class="promo-user-info"><img src="http://www.etsy.com/images/avatars/default_avatar_75px.png"><span class="sign-in">Sign In</span> <span class="desc">You can favorite and add items to your cart by signing in</span></div>',
				listeners: {
					tap: function(){
					  console.log('tapped signup');
						ETSY.initAuthorization();
					}
				}
			},
		{
			xtype: 'list',
			flex: 1,
			id: 'navList',

			itemTpl: '<div class="contact">{title}</div>',
			store: 'Navigation',
      grouped: true,
			listeners: {
				initialize: function() {
          try{
            this.select(0);
          }catch(err){
            
          }

				}
			}
		}],

	},

});
