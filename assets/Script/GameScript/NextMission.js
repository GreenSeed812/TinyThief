cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    onLoad: function () {
        
        this.node.scaleX = 0;
        this.node.scaleY = 0;
        
    },
    
    getPlayerDistance: function () {

        var playerPos = this.game.player.getCenterPos();
        return playerPos;
    },
    
    init: function (game,pos) {
        
        this.game = game;
        this.node.setPosition(pos);
        
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        
        var p = this.getPlayerDistance();
        
        if(this.game.player._nextmission === true){
            this.node.scaleX = 1;
            this.node.scaleY = 1;

            if(cc.rectContainsPoint(this.node.getBoundingBox(), p)){
         
                this.game.missionComplate.scaleX = 1;
                this.game.missionComplate.scaleY = 1;
                this.game.missionComplate.zIndex = 4;

            }
            
        }
        
    },
});
