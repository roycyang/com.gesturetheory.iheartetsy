// 
//  FixedButton.js
//  GT.FixedButton
//   
//  Created by Roy Yang on 2012-04-21.
//  Extended from Sencha Ext.Button
//  For latest and greatest, go to https://github.com/roycyang/Sencha-Touch-Extensions

Ext.define('GT.FixedButton', {
    extend: 'Ext.Button',
    xtype: 'fixedbutton',

    // removed the tap event and rolling our own logic
    initialize: function() {
        this.callParent();

        this.element.on({
            scope      : this,
            touchstart : 'onPress',
            touchend   : 'onRelease',
            touchmove  : 'onMove',
            tap        : 'onTap'
        });
    },

    // @private
    onPress: function(e) {
        var element = this.element,
            pressedCls = this.getPressedCls();

        if (!this.getDisabled()) {
            this.isPressed = true;
            // console.log('e.target', e);
            // adding a pressed flag
            if(!e.target.children.length){
                this.pressedTarget = e.target.parentElement.id;
            }else{
                this.pressedTarget = e.target.id;
            }
            
            // console.log('onPress ' + this.pressTarget);

            if (this.hasOwnProperty('releasedTimeout')) {
                clearTimeout(this.releasedTimeout);
                delete this.releasedTimeout;
            }

            element.addCls(pressedCls);
            
        }
    },


    // @private
    // when user moves, test to see if touch even is still the target
    onMove: function(e, element) {
        if (!this.isPressed) {
          return;
        }
        
        var currentPressedTarget;
        var elem = Ext.get(element);
        console.log('element', elem);
        
        // clicked on the label or icon instead of the button
        if(elem.parent('.x-button')){
            console.log('inside!');
            currentPressedTarget = elem.parent('.x-button').id;
        }else if(elem.hasCls('x-button')){
            currentPressedTarget = elem.id;
        }
        
        console.log('currentPressedTarget ', currentPressedTarget);
        
        // console.log('onMove ' + currentPressedTarget);
        // console.log('')
        if(currentPressedTarget != this.pressedTarget){
            this.element.removeCls(this.getPressedCls());
        }else{
            this.element.addCls(this.getPressedCls());
            
        }
    },
    
    // @private
    onRelease: function(e, element) {
        this.fireAction('release', [this, e, element], 'doRelease');
    },

    // @private
    doRelease: function(me, e, element) {
        var currentPressedTarget;
        var elem = Ext.get(element);
        
        // clicked on the label or icon instead of the button
        if(elem.parent('.x-button')){
            console.log('inside!');
            currentPressedTarget = elem.parent('.x-button').id;
        }else if(elem.hasCls('x-button')){
            currentPressedTarget = elem.id;
        }
        
        console.log('doRelease ' + currentPressedTarget);
        
        if (!me.isPressed) {
            return;
        }

        me.isPressed = false;

        if (me.hasOwnProperty('pressedTimeout')) {
            clearTimeout(me.pressedTimeout);
            delete me.pressedTimeout;
        }

        me.releasedTimeout = setTimeout(function() {
            if (me && me.element) {
                me.element.removeCls(me.getPressedCls());
                if(currentPressedTarget == me.pressedTarget){
                  me.fireAction('tap', [me, e], 'doTap');
                }

            }
            
            // remove the pressedTarget flag
            me.pressedTarget = null;
        }, 10);
    },
    
    // @private
    // disable the existing onTap function from Ext.Button
    onTap: function(e) {
        return false;
    },
    


});
