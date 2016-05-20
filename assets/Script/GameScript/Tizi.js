var Player = require('Player');

cc.Class({
    extends: cc.Component,

    properties: {
        
        player:{
          default:null,
          type:Player
        },
        
        up:{
            default:null,
            type:cc.Node
        },
        
        down:{
            default:null,
            type:cc.Node
        },
   
    },

    // use this for initialization
    onLoad: function () {
        
        this.up.scaleX = 0;
        this.up.scaleY = 0;
        this.down.scaleX = 0;
        this.down.scaleY = 0;
 
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
    
    uptizi: function(){
      
      this.game.player._stop = true;
      this.game.player.node.x = this.node.x;
      this.game.player.anim.play('patizi');
      this.game.player.node.runAction(cc.moveBy(1, 0, this.node.getBoundingBox().height));
        
    },
    
    downtizi: function(){
      
      this.game.player._stop = true;
      this.game.player.node.x = this.node.x;
      this.game.player.anim.play('patizi');
      this.game.player.node.runAction(cc.moveBy(1, 0, -this.node.getBoundingBox().height));
        
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        
        var p = this.getPlayerDistance();
        var rect = this.node.getBoundingBox();
        var Urect = cc.Rect.fromMinMax(cc.p(this.node.x - 32,this.node.y),cc.p(this.node.x + 32,this.node.y + 160));
        var Drect = cc.Rect.fromMinMax(cc.p(this.node.x - 32,rect.yMax),cc.p(this.node.x + 32,rect.yMax + 160));
        var self = this;
        if(cc.rectContainsPoint(Urect, p) && this.temp){
         
            this.temp = false;
            this.up.scaleX = 1;
            this.up.scaleY = 1;
           
        }
        else if(!cc.rectContainsPoint(Urect, p) && !this.temp){
            this.temp = true;
            this.up.scaleX = 0;
            this.up.scaleY = 0;
        }
        
        if(cc.rectContainsPoint(Drect, p) && this.temp2){
      
            this.temp2 = false;
            this.down.scaleX = 1;
            this.down.scaleY = 1;
          
        }
        else if(!cc.rectContainsPoint(Drect, p) && !this.temp2){
            this.temp2 = true;
            this.down.scaleX = 0;
            this.down.scaleY = 0;
        }
    },
});


