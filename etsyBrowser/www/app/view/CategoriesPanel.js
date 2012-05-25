Ext.define('Etsy.view.CategoriesPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.categoriesPanel',
    requires: ['GT.FixedButton'],
    config: {
        title: 'Categories',
        layout: 'vbox',
        items: [
        {
            xtype: 'maintoolbar',
            title: 'Categories'
        },
        {
            xtype: 'fixedbutton',
            cls: 'leftArrow',
            width: 46,
            left: 0,
            hidden: true,
            top: 0,
            height: 701,
            ui: 'plain',
            listeners: {
              tap: function(me){
                if(!GLOBAL.inCarouselAction){
                  GLOBAL.inCarouselAction = true;
                   me.parent.query('listingsCarousel')[0].previous();
                  setTimeout(function(){
                    GLOBAL.inCarouselAction = false;
                  }, 350)
                }

                
              }
            }
        },
        {
            xtype: 'fixedbutton',
            cls: 'rightArrow',
            right: 0,
            ui: 'plain',
            width: 49,
            top: 0,
            height: 701,
            listeners: {
              tap: function(me){
                if(!GLOBAL.inCarouselAction){
                  GLOBAL.inCarouselAction = true;
                  me.parent.query('listingsCarousel')[0].next();
                  setTimeout(function(){
                    GLOBAL.inCarouselAction = false;
                  }, 350)
                }
              }
            }
        },
        {
            flex: 1,
            xtype: 'listingsCarousel',
            truncate: true,
            isInfinite: true
        },
        {
            flex: 1,
            hidden: true,
            id: 'noFavoritesMessage',
            html: '<h1>Let\'s add some favorites!</h1><p class="desc">Swipe the thumbnail of an item down to favorite it.</p><div class="no-favorites-messaging"></div>'
        }
        ]
    },
    initialize: function(){
      console.log('INITIALIZE');
      var self = this;
      
      this.element.on({
           scope: this,
           tap: 'onTap'
       });
       
       console.log( self.query('maintoolbar'));
       if(GLOBAL.panel == "listings" && APP.navigationStore.findExact('name', GLOBAL.searchCategory.name) != -1){
         self.query('maintoolbar')[0].element.down('.x-title').addCls('bookmarked');
       }
    },
    
    onTap: function (e) {
      var element = Ext.get(e.target);
      // tapped on homepage category item
      if (element.parent('.x-title')) {
        
        var element = element.parent('.x-title');
        if(element.hasCls('bookmarked')){
          var index = APP.navigationStore.findExact('name', GLOBAL.searchCategory.name);
          APP.navigationStore.removeAt(index);
          element.removeCls('bookmarked');
        }else{
          // add the category to bookmark

          var item = { 
            title: GLOBAL.searchCategory.short_name,  
            type: 'Bookmarked Categories', 
            panel: 'bookmarkedCategory', 
            short_name: GLOBAL.searchCategory.short_name, 
            name: GLOBAL.searchCategory.name
          };
          

          APP.navigationStore.add(item);
          element.addCls('bookmarked');
        }
        
        
        //console.log('sweet!');
        return false;
      }
    }

});
