cc.Class({
    extends: cc.Component,

    properties: {
        
        pickup:{
            default:null,
            type:cc.Node
        },
        
    },

    // use this for initialization
    onLoad: function () {
        
        this.pickup.scaleX = 0;
        this.pickup.scaleY = 0;
        
    },
    
    getPlayerDistance: function () {
       
        var playerPos = this.game.player.getCenterPos();
        return playerPos;
    },
    
    init: function (game) {
        this.game = game;
        this.enabled = true; 
        this.temp = true;
        
    },
    
    pickupfood:function(){
            
        this.node.removeFromParent();        
        this.game.player._nextmission = true;
  
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        
        var p = this.getPlayerDistance();
        
        if(cc.rectContainsPoint(this.node.getBoundingBox(), p) && this.temp){

            this.pickup.scaleX = 1;
            this.pickup.scaleY = 1;
            this.temp = false;
    
        }
        else if(!cc.rectContainsPoint(this.node.getBoundingBox(), p) && !this.temp){
            this.temp = true;
            this.pickup.scaleX = 0;
            this.pickup.scaleY = 0;
            
        }
    },
});
