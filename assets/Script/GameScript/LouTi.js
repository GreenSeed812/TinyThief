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
        
        var playerPos = this.player.getCenterPos();
        return playerPos;
    },
    
    init: function (game) {
        this.game = game;
        this.enabled = true;
        this.temp = true;
        this.temp2 = true;
    },
    
    uptizi: function(){
      
      this.player._stop = true;
      this.player.node.x = this.node.x + 213 ;
      this.player.anim.play('PlayerMove');
      this.player.node.runAction(cc.moveBy(532/150, -this.node.getBoundingBox().width, this.node.getBoundingBox().height));
      this.game.background.runAction(cc.moveBy(532/150, this.node.getBoundingBox().width, 0));
    }, 
    
    downtizi: function(){
      
      this.player._stop = true;
      this.player.node.x = this.node.x - 213;
      this.player.anim.play('MoveRight');
      this.player.node.runAction(cc.moveBy(532/150, this.node.getBoundingBox().width, -this.node.getBoundingBox().height));
      this.game.background.runAction(cc.moveBy(532/150, -this.node.getBoundingBox().width, 0));  
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        
        var p = this.getPlayerDistance();
        var Urect = cc.Rect.fromMinMax(cc.p(this.node.x + 170,this.node.y - 10),cc.p(this.node.x + 255,this.node.y + 160));
        var Drect = cc.Rect.fromMinMax(cc.p(this.node.x - 290,this.node.y + 330),cc.p(this.node.x - 205,this.node.y + 400));
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
