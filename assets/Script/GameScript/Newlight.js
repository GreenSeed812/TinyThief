cc.Class({
    extends: cc.Component,

    properties: {
        speed:0,
        
        put:{
            default:null,
            type:cc.Node
        },
        
        noput:{
            default:null,
            type:cc.Node
        }
         
    },

    // use this for initialization
    onLoad: function () {
        
        this.put.scaleX = 0;
        this.put.scaleY = 0;
        this.noput.scaleX = 0;
        this.noput.scaleY = 0;
        
    },
    
    getPlayerDistance: function () {
      
        var playerPos = this.game.player.getCenterPos();
        return playerPos;
    },
    
    init: function (game) {
        
        this.game = game;
        this.enabled = true;
        this.temp = true;
        this.down = false;
        this.canput = false
     
    },
    
    pudown:function(){
  
        this.put.scaleX = 0;
        this.put.scaleY = 0;
        this.game.banshoubuff.scaleX = 0;
        this.game.banshoubuff.sacleY = 0;
        this.down = true;
  
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        
        var p = this.getPlayerDistance();
        var self = this;
        if(!this.canput){
            if(cc.rectContainsPoint(this.node.getBoundingBox(), p) && this.temp){
       
                this.noput.scaleX = 1;
                this.noput.scaleY = 1;
                this.temp = false;
     
            }
            else if(!cc.rectContainsPoint(this.node.getBoundingBox(), p) && !this.temp){
                this.temp = true;
                this.noput.scaleX = 0;
                this.noput.scaleY = 0;
                
            }
        }
        else if(this.canput){
            
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
            
        }
        
        if(this.down === true){
            this.node.y -= this.speed;
            if(this.node.getBoundingBox().intersects(this.game.enemy.node.getBoundingBox())){
                this.node.removeFromParent();
                this.game.enemy.node.removeFromParent();
                this.game.keyNode = true;
                
            }  
            if(this.node.y <= 127)
            {
                this.node.removeFromParent();
            }
        }
        
    },
});
