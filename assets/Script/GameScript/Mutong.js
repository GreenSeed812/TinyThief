var Player = require('Player');

cc.Class({
    extends: cc.Component,

    properties: {
        
        player:{
          default:null,
          type:Player
        },
        
        hudong:{
            default:null,
            type:cc.Node
        },
        
    },

    // use this for initialization
    onLoad: function () {
        
        this.hudong.scaleX = 0;
        this.hudong.scaleY = 0;
 
    },
    
    getPlayerDistance: function () {
       
        var playerPos = this.game.player.getCenterPos();
        return playerPos;
    },
    
    init: function (game,pos) {
        this.game = game;
        this.enabled = true;
        this.node.setPosition(pos);
        this.temp = true;
        this.temp2 = true;
    },
    
    InAndOut:function(){
      
        this.game.player.node.x = this.node.x;  
        
        if(this.game.player.node.zIndex == -1 ){
                        
            this.game.player.node.zIndex = 3;
            this.game.player.canMove = true;            
            
        }
        else if(this.game.player.node.zIndex == 3)
        {
                        
            this.game.player.node.zIndex = -1
            this.game.player._stop = true;            
            this.game.player.canMove = false;
        }  
         
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        var p = this.getPlayerDistance();
        
        if(cc.rectContainsPoint(this.node.getBoundingBox(), p) && this.temp){
     
            this.hudong.scaleX = 1;
            this.hudong.scaleY = 1;
            this.temp = false; 
        }
        else if(!cc.rectContainsPoint(this.node.getBoundingBox(), p) && !this.temp){
            this.temp = true;
            this.hudong.scaleX = 0;
            this.hudong.scaleY = 0;
            
        }      
    },
});
