cc.Class({
    extends: cc.Component,

    properties: {
        
        findingX:0,
        findingY:0,
        
        moveX:0,
        speed:0,
        
        anim:{
            default:null,
            type:cc.Animation
        }
        
    },
    
    getPlayerDistance: function () {
 
        var playerPos = this.game.player.getCenterPos();
        return playerPos;
    },
    
    init: function (game,pos) {
  
        this.game = game;
        this.enabled = true;
        this.node.setPosition(pos);
        this.temp = false; //false = 右 , true = 左
    },
    
    // use this for initialization
    onLoad: function () {
        
        this.startx = this.node.x;
       
    },

    //called every frame, uncomment this function to activate update callback
    update: function (dt) {
        //巡逻
        if(this.node.x <= this.startx){
            
            this.anim.play('enemymoveright');
            this.temp = false;
        }
        else if(this.node.x - this.startx >= this.moveX){
            
            this.anim.play('enemymoveleft');
            this.temp = true;
        }
        if(this.temp === false){
            
            this.node.x += this.speed;
            var findrectRight = cc.rect(this.node.x + 50,this.node.y - 5,this.findingX,this.findingY);
            if(cc.rectContainsPoint(findrectRight,this.getPlayerDistance()) 
            && this.game.player._stand 
            && this.game.player.node.zIndex >0){
                
                this.game._gameover = true;
                
            }
            
        }
        else if(this.temp === true){
            this.node.x -= this.speed;
            
            //发现玩家
            var findrectLeft = cc.rect(this.node.x - this.findingX,this.node.y - 5,this.findingX,this.findingY);
            if(cc.rectContainsPoint(findrectLeft,this.getPlayerDistance()) 
            && this.game.player._stand 
            && this.game.player.node.zIndex >0){
                
                this.game._gameover = true;
       
            }
        }
        
        //发现玩家
        
        
        
        
        
    },
});
