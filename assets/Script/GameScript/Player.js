cc.Class({
    extends: cc.Component,

    properties: {
        
        speed:0,
        
        moveX:0,
  
        moveLayer:{
            default:null,
            type:cc.Node
        },
        
        anim:{
            default:null,
            type:cc.Animation
        }
        
        
    },

    // use this for initialization
    onLoad: function () {
        
        this._left = false;
        this._right = false;
        this._up = false;
        this._down = false;
        this._stop = true;
        this._key = false;
        this._light = true;
        this._stand = true;
        this._getdown = false;
        this.canMove = true;
        this._nextmission = false;
        this.setInputControl();
 
    },
    
    
    
    setInputControl: function(){
        
        var self = this;
        var movelayer = this.moveLayer;
        self.node.movePos = cc.p(0,0);
        cc.eventManager.addListener({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch,event){
                
                var touchpos = touch.getLocation();
                self.node.movePos = self.moveLayer.convertTouchToNodeSpaceAR(touch);
                
                if(self.node.movePos.x > self.node.x){
           
                    self._stop = false;
                    self._left = false;
                    self._right = true;
                    self.anim.play('MoveRight');
                    
                }
                if(self.node.movePos.x < self.node.x){
                    
                    self._stop = false;
                    self._right = false;
                    self._left = true;
                    self.anim.play('PlayerMove');
                    
                }
                
                self.moveX = self.node.movePos.x;
                
                return true;
            }    
            },self.moveLayer);
    },
    
    startMoveAt: function(pos){
        
      this.enabled = true;
      this.speed = 2;
      this.node.setPosition(pos);
      
    },
    
    getCenterPos: function () {
        
        var centerPos = cc.p(this.node.x, this.node.y);
        return centerPos;
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        
        if(this.canMove){
      
            if(this._left === true && this._stop === false){
               
                this.node.x -= this.speed;
                if(this.moveX >= this.node.x){
                    this._stop = true;
                    this.anim.play('StopLeft');
                }
            }
            else if(this._right === true && this._stop === false){
                
                this.node.x += this.speed;
                if(this.moveX <= this.node.x){
                    this._stop = true;
                    this.anim.play('StopRight');
                }
            }
        }
    },
});
