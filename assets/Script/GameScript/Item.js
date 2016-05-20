var Player = require('Player');

cc.Class({
    extends: cc.Component,

    properties: {
        
        player:{
          default:null,
          type:Player
        },
        
        pick:{
            default:null,
            type:cc.Node
        },
        
    },

    // use this for initialization
    onLoad: function () {
        this.pick.scaleX = 0;
        this.pick.scaleY = 0;
    },
    
    getPlayerDistance: function () {
  
        var playerPos = this.game.player.getCenterPos();
        return playerPos;
    },
    
    init: function (game,pos) {
        
        this.game = game;
        this.enabled = true;
        this.player = game.player;
        this.node.setPosition(pos);
        this.temp = true;
    },
    
    pickUp: function(){
      
      if(this.game.keybuff){
          
          this.game.keybuff.scaleX = 1;
          this.game.keybuff.scaleY = 1;
          
      }
      if(this.game.yuganbuff){
          
          this.game.yuganbuff.scaleX = 1;
          this.game.yuganbuff.scaleY = 1;
          this.game.weikey.scaleX = 0;
          this.game.weikey.scaleY = 0;
          
      }

      this.node.removeFromParent();
      this.player._key = true;
     
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        var p = this.getPlayerDistance();
        var self = this;
        if(cc.rectContainsPoint(this.node.getBoundingBox(), p) && this.temp){
            
            this.temp = false;
            this.pick.scaleX = 1;
            this.pick.scaleY = 1;
         
        }
        else if(!cc.rectContainsPoint(this.node.getBoundingBox(), p) && !this.temp){
            this.temp = true;
            this.pick.scaleX = 0;
            this.pick.scaleY = 0;
        }
        
        
    },
});
