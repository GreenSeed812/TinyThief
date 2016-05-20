var Player = require('Player');

cc.Class({
    extends: cc.Component,

    properties: {
        
        player:{
            default:null,
            type:Player
        },
        
        open:{
            default:null,
            type:cc.Node
        },
        
        noopen:{
            default:null,
            type:cc.Node
        },
        
    },

    // use this for initialization
    onLoad: function () {
        
        this.open.scaleX = 0;
        this.open.scaleY = 0;
        this.noopen.scaleX = 0;
        this.noopen.scaleY = 0;
        
    },
    
    getPlayerDistance: function () {
   
        var playerPos = this.player.getCenterPos();
        return playerPos;
    },
    
    init: function (game) {
        this.game = game;
        this.enabled = true;
        this.temp = true;
        this.temp2 = true;
        this.canopen = false;
    },
    
    openDoor:function(){
        
        if(this.player._key === true){
            
            this.game.weidoor.scaleX = 1;
            this.game.weidoor.scaleY = 1;
            
            this.game.keybuff.scaleX = 0;
            this.game.keybuff.scaleY = 0;
            
            this.node.removeFromParent();
            this.game.doorkey = true;
            
        }
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
 
        var p = this.getPlayerDistance();
        var rect = cc.Rect.fromMinMax(cc.p(this.node.x + 25,this.node.y - 10),cc.p(this.node.x + 100,this.node.y + 170));
        
        if(this.player._key === true){
            this.canopen = true;
        }
        if(!this.canopen){
            
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
        else if(this.canopen){
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
    },
});
