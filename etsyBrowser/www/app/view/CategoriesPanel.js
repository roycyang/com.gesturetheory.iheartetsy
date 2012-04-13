Ext.define('Etsy.view.CategoriesPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.categoriesPanel',
    config: {
        title: 'Categories',
        id: 'categoriesPanel',
        layout: 'vbox',
        items: [
        {
          hidden: true,
            xtype: 'searchfield',
            id: 'searchSearch',
            placeHolder: 'Search Etsy'
        },
        {
            xtype: 'maintoolbar',
            title: 'Categories',
            id: 'categoriesToolbar'
        },
        {
            xtype: 'button',
            cls: 'leftArrow',
            width: 46,
            left: 0,
            hidden: true,
            top: 0,
            height: 701,
            ui: 'plain',
            listeners: {
              tap: function(){
                if(!GLOBAL.inCarouselAction){
                  GLOBAL.inCarouselAction = true;
                  self.getCategoriesCarousel().previous();
                  setTimeout(function(){
                    GLOBAL.inCarouselAction = false;
                  }, 350)
                }

                
              }
            }
        },
        {
            xtype: 'button',
            cls: 'rightArrow',
            right: 0,
            ui: 'plain',
            width: 49,
            top: 0,
            height: 701,
            listeners: {
              tap: function(){
                if(!GLOBAL.inCarouselAction){
                  GLOBAL.inCarouselAction = true;
                  self.getCategoriesCarousel().next();
                  setTimeout(function(){
                    GLOBAL.inCarouselAction = false;
                  }, 350)
                }
              }
            }
        },
        {
            flex: 1,
            id: 'categoriesCarousel',
            xtype: 'listingsCarousel',
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
      this.element.on({
           scope: this,
           tap: 'onTap',
           // touchstart: 'onTouchStart',
           // touchmove: 'onTouchMove',
           // touchend: 'onTouchEnd',
       });
       
       if(GLOBAL.panel == "listings" && APP.navigationStore.findExact('name', GLOBAL.searchCategory.name) != -1){
         Ext.getCmp('categoriesToolbar').element.down('.x-title').addCls('bookmarked');
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
        
        
        console.log('sweet!');
        return false;
      }
    }

});
