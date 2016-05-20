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
       
        var playerPos = this.player.getCenterPos();
        return playerPos;
    },
    
    init: function (game) {
        
        this.game = game;
        this.enabled = true;
        this.temp = true;
        
    },
    
    pickup:function(){
        
        this.game.newlight.canput = true;
        this.game.banshoubuff.scaleX = 1;
        this.game.banshoubuff.scaleY = 1;
        this.node.removeFromParent();
        
    },
    
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        
        var p = this.getPlayerDistance();
        var rect = this.node.getBoundingBox();
     
        if(cc.rectContainsPoint(rect, p) && this.temp){
  
            this.temp = false;
            this.pick.scaleX = 1;
            this.pick.scaleY = 1;
         
        }
        else if(!cc.rectContainsPoint(rect, p) && !this.temp){
            this.temp = true;
            this.pick.scaleX = 0;
            this.pick.scaleY = 0;
        }
        
       
    },
});
