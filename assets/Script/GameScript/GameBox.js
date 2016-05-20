cc.Class({
    extends: cc.Component,

    properties: {
        
        open:{
            default:null,
            type:cc.Node
        },
        
        noopen:{
            default:null,
            type:cc.Node
        }
        
    },

    // use this for initialization
    onLoad: function () {
        
        this.open.scaleX = 0;
        this.open.scaleY = 0;
        this.noopen.scaleX = 0;
        this.noopen.scaleY = 0;
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
    
    openBox:function(){
        
        if(this.game.player._key === true){
            
            this.game.player._nextmission = true;       
            this.game.keybuff.scaleX = 0;
            this.game.keybuff.scaleY = 0;
            this.game.openbox.scaleX = 1;
            this.game.openbox.scaleY = 1;
            this.node.removeFromParent();
        }
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        
        var p = this.getPlayerDistance();
        if(this.game.player._key){
            if(cc.rectContainsPoint(this.node.getBoundingBox(), p) && this.temp){
    
                this.open.scaleX = 1;
                this.open.scaleY = 1;
                this.temp = false;
        
            }
            else if(!cc.rectContainsPoint(this.node.getBoundingBox(), p) && !this.temp){
                this.temp = true;
                this.open.scaleX = 0;
                this.open.scaleY = 0;
                
            }
        }
        if(!this.game.player._key){
            if(cc.rectContainsPoint(this.node.getBoundingBox(), p) && this.temp){
    
                this.noopen.scaleX = 1;
                this.noopen.scaleY = 1;
                this.temp = false;
        
            }
            else if(!cc.rectContainsPoint(this.node.getBoundingBox(), p) && !this.temp){
                this.temp = true;
                this.noopen.scaleX = 0;
                this.noopen.scaleY = 0;
                
            }
        }
    },
});
