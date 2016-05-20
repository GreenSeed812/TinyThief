cc.Class({
    extends: cc.Component,

    properties: {
        speed:0,
        
        put:{
            default:null,
            type:cc.Node
        },
            
    },

    // use this for initialization
    onLoad: function () {
        
        this.put.scaleX = 0;
        this.put.scaleY = 0;
        this.t = 0;
       
    },
    
    getPlayerDistance: function () {
  
        var playerPos = this.game.player.getCenterPos();
        return playerPos;
    },
    
    init: function (game,pos,take) {
        
        this.game = game;
        this.enabled = true;
        this.node.setPosition(pos);
        this.temp = true;
        this.down = false;
        this.game.player._light = take;
     
    },
    
    pudown:function(){
  
      if(this.game.player._light === true){
         
        this.down = true;
        
      }else{
          
          this.down = false;
      }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        
        var p = this.getPlayerDistance();
        var self = this;
        if(cc.rectContainsPoint(this.node.getBoundingBox(), p) && this.temp){
  
            this.put.scaleX = 1;
            this.put.scaleY = 1;
            this.temp = false;
     
        }
        else if(!cc.rectContainsPoint(this.node.getBoundingBox(), p) && !this.temp){
            this.temp = true;
            this.put.scaleX = 0;
            this.put.scaleY = 0;
            
        }
        
        if(this.down === true){
            this.node.y -= this.speed;
            if(this.node.getBoundingBox().intersects(this.game.enemy.node.getBoundingBox())){
                this.node.removeFromParent();
                this.game.enemy.node.removeFromParent();
                this.game.keyNode = true;
                
            }
            
            if(this.node.y <= -200)
            {
                this.node.removeFromParent();
            }
        }
        
    },
});
