cc.Class({
    extends: cc.Component,

    properties: {
        
        dunxia:{
            default:null,
            type:cc.Node
        },
        
        zhanqi:{
            default:null,
            type:cc.Node
        },
    },

    // use this for initialization
    onLoad: function () {
        
        this.dunxia.scaleX = 0;
        this.dunxia.scaleY = 0;
        this.zhanqi.scaleX = 0;
        this.zhanqi.scaleY = 0;
        
        
    },
    
    init: function (game,pos) {
        this.game = game;
        this.enabled = true;
        this.node.setPosition(pos);
        this.temp = true;
        this.temp2 = true;
    },
    
    getPlayerDistance: function () {
    
        var playerPos = this.game.player.getCenterPos();
        return playerPos;
    },
    
    playerGetDown: function(){
        
        this.game.player._stand = false;
        this.game.player._getdown = true;
        this.game.player.node.scaleX = 0.5;
        this.game.player.node.scaleY = 0.5;
     
    },
    
    playerStand: function(){
        
        this.game.player._stand = true;
        this.game.player._getdown = false;
        this.game.player.node.scaleX = 1;
        this.game.player.node.scaleY = 1;
        
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        
        var p = this.getPlayerDistance();
       
        if(cc.rectContainsPoint(this.node.getBoundingBox(), p) && this.game.player._stand === true){
        
            this.dunxia.scaleX = 1;
            this.dunxia.scaleY = 1;
            this.zhanqi.scaleX = 0;
            this.zhanqi.scaleY = 0;
  
        }
        if(cc.rectContainsPoint(this.node.getBoundingBox(), p) && this.game.player._getdown === true){
 
            this.zhanqi.scaleX = 1;
            this.zhanqi.scaleY = 1;
            this.dunxia.scaleX = 0;
            this.dunxia.scaleY = 0;
   
        }
        else if(!cc.rectContainsPoint(this.node.getBoundingBox(), p)){
            
            this.dunxia.scaleX = 0;
            this.dunxia.scaleY = 0;
            this.zhanqi.scaleX = 0;
            this.zhanqi.scaleY = 0;
        }
        if(this.game.player.node.x >= this.node.getBoundingBox().xMax - 12.5 && this.game.player._getdown){
            
            this.game.player.node.x = this.node.getBoundingBox().xMax - 12.5;
            
            if(this.game.player._right){ 
                this.game.player._stop = true;
            }
            
        }
        if(this.game.player.node.x <= this.node.getBoundingBox().xMin + 12.5 && this.game.player._getdown){
            this.game.player.node.x = this.node.getBoundingBox().xMin + 12.5;
            if(this.game.player._left){
                this.game.player._stop = true;
            }
        }
        if(this.game.player.stand){
            this.game.player._stop = false;
        }
  
    },
});
