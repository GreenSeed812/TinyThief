cc.Class({
    extends: cc.Component,

    properties: {
        
        open:{
            default:null,
            type:cc.Node
        },
        
        noopen:{
            default:null,
            type:cc.Node
        }
        
    },

    onLoad: function () {
        
        this.open.scaleX = 0;
        this.open.scaleY = 0;
        this.noopen.scaleX = 0;
        this.noopen.scaleY = 0;
        
    },
    
    getPlayerDistance: function () {

        var playerPos = this.game.player.getCenterPos();
        return playerPos;
    },
    
    init: function (game) {
        this.game = game;
        this.enabled = true;
        this.temp = true;
        this.temp2 = true;
    },
    
    openBox:function(){
        if(this.game.player._key === true){
            
            this.game.player._nextmission = true;
            this.open.scaleX = 0;
            this.open.scaleY = 0;
            this.game.yuganbuff.scaleX = 0;
            this.game.yuganbuff.scaleY = 0;
            this.node.runAction(cc.moveBy(2, 0, 320));
        }
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        
        var p = this.getPlayerDistance();
        var rect = cc.rect(this.node.x - 43,552,this.node.x + 43,730);
        if(!this.game.player._key){
            if(cc.rectContainsPoint(rect, p) && this.temp){
               
                this.noopen.scaleX = 1;
                this.noopen.scaleY = 1;
                this.temp = false;
       
            }
            else if(!cc.rectContainsPoint(rect, p) && !this.temp){
                this.temp = true;
                this.noopen.scaleX = 0;
                this.noopen.scaleY = 0;
               
            }
        }
        
        else if(this.game.player._key){
            if(cc.rectContainsPoint(rect, p) && this.temp){
             
                this.open.scaleX = 1;
                this.open.scaleY = 1;
                this.temp = false;
   
            }
            else if(!cc.rectContainsPoint(rect, p) && !this.temp){
                this.temp = true;
                this.open.scaleX = 0;
                this.open.scaleY = 0;
               
            }
        }
        
        if(this.node.y > 570){
            this.node.removeFromParent();
        }
    },
});
