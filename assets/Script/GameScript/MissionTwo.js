var Player = require('Player');
var Mutong = require('Mutong');
var Tizi = require('Tizi');
var Item = require('Item');
var Enemy = require('Enemy');
var Light = require('Light');
var Zhezhao = require('Zhezhao');
var GameBox = require('GameBox');
var NextMission = require('NextMission');
var Money = require('Money');
var Xiangzi = require('xiangzi');

cc.Class({
    extends: cc.Component,

    properties: {
        
        player:{
            default:null,
            type: Player
        },
        
        enemy:{
            default:null,
            type: Enemy
        },
        
        enemy2:{
            default:null,
            type: Enemy
        },
        
        mutong:{
            default:null,
            type: cc.Prefab
        },
        
        tizi:{
            default:null,
            type:cc.Prefab
        },
        
        item:{
            default:null,
            type:cc.Prefab
        },
        
        light:{
            default:null,
            type:cc.Prefab
        },
        
        zhezhao:{
            default:null,
            type:cc.Prefab
        },
        
        money:{
            default:null,
            type:Money
        },
        
        floor:{
            default:null,
            type:cc.Node
        },
        
        nextmission:{
            default:null,
            type:cc.Prefab
        },
        
        
        //UI
        pauseLayer: {
            default:null,
            type:cc.Node
        },
        
        quitQueRen: {
            default:null,
            type:cc.Node
        },
        
        missionComplate: {
            default:null,
            type:cc.Node
        },
        
        background:{
            default:null,
            type:cc.Node
        },
        
        gameover:{
            default:null,
            type:cc.Node
        },
        
        xiangzi1:{
            default:null,
            type:Xiangzi
        },
        
        weizz:{
            default:null,
            type:cc.Node
        },
        
        weikey:{
            default:null,
            type:cc.Node
        },
        
        yuganbuff:{
            default:null,
            type:cc.Node
        },
        
        sound:{
           default:null,
            type:cc.Node 
        },
        
        nosound:{
            default:null,
            type:cc.Node
        },
        
        audio:cc.Node,
        
        
    },

    // use this for initialization
    onLoad: function () {
        
        this.audio = this.audio.getComponent('AudioDate');
        this.audio.playMusic();
        
        var bg = this.background;
        
        var mt = cc.instantiate(this.mutong);
        bg.addChild(mt);
        mt.getComponent('Mutong').init(this,cc.p(828.75,127));
     
        this.keyNode = false;

        var tz = cc.instantiate(this.tizi);
        bg.addChild(tz);
        tz.getComponent('Tizi').init(this,cc.p(240,127)); 
        
        var zz = cc.instantiate(this.zhezhao);
        bg.addChild(zz,2);
        zz.getComponent('Zhezhao').init(this,cc.p(1285,127));

        this.weizz.zIndex = 2;

        var nm = cc.instantiate(this.nextmission);
        bg.addChild(nm);
        nm.getComponent('NextMission').init(this,cc.p(1585,127));
        
        this.player.startMoveAt(cc.p(45, 127));
        this.player.node.zIndex = 3;
        
        this.enemy.init(this,cc.p(580,127));
        this.enemy.node.zIndex = 1;
        
        this.enemy2.init(this,cc.p(1130,127));
        this.enemy2.node.zIndex = 1;
        
        this.money.init(this);
        this.xiangzi1.init(this);
        this.xiangzi1.node.zIndex = 4;
        
        this.gameover.scaleX = 0;
        this.gameover.scaleY = 0;
        this._gameover = false;
        
        //UI
        this.pauseLayer.scaleX = 0;
        this.pauseLayer.scaleY = 0;
        
        this.quitQueRen.scaleX = 0;
        this.quitQueRen.scaleY = 0;
        
        this.missionComplate.scaleX = 0;
        this.missionComplate.scaleY = 0;
        
        this.weikey.scaleX = 0;
        this.weikey.scaleY = 0;
        
        this.yuganbuff.scaleX = 0;
        this.yuganbuff.scaleY = 0;
        
    },
    
    mutemusic:function(){
        
        this.sound.scaleX = 0;
        this.sound.scaleY = 0;
        this.nosound.scaleX = 1;
        this.nosound.scaleY = 1;
        cc.audioEngine.setMusicVolume(0);
    },
    
    resumemusic:function(){
        
        this.sound.scaleX = 1;
        this.sound.scaleY = 1;
        this.nosound.scaleX = 0;
        this.nosound.scaleY = 0;
        cc.audioEngine.setMusicVolume(1);
    },
    
    pausegame:function(){
        
        this.pauseLayer.scaleX = 1;
        this.pauseLayer.scaleY = 1;
        this.pauseLayer.zIndex = 4;
        if(cc.audioEngine.getMusicVolume() == 1){
        
            this.sound.scaleX = 1;
            this.sound.scaleY = 1;
            this.nosound.scaleX = 0;
            this.nosound.scaleY = 0;
        }
        else if(cc.audioEngine.getMusicVolume() === 0){
            
            this.sound.scaleX = 0;
            this.sound.scaleY = 0;
            this.nosound.scaleX = 1;
            this.nosound.scaleY = 1;
        }
        cc.director.pause();

    },
    
    continuegame:function(){
        
        this.pauseLayer.scaleX = 0;
        this.pauseLayer.scaleY = 0;
        cc.director.resume();  
    },
    
    returnMissionChose:function(){
      
      this.quitQueRen.scaleX = 1;
      this.quitQueRen.scaleY = 1;
      this.quitQueRen.zIndex = 5;
  
    },
    
    returnMissionChoseOk:function(){
        
      cc.director.resume(); 
      cc.director.loadScene('MissionChose1'); 
    },
    
    returnMissionChoseNo:function(){
        
      this.quitQueRen.scaleX = 0;
      this.quitQueRen.scaleY = 0;
    },
    
    replay:function(){
  
      cc.director.resume(); 
      cc.director.loadScene('MissionTwo');  
    },
    
    ToNextMission:function(){
      
        cc.director.loadScene('MissionThree'); 
    },

    // called every frame
    update: function (dt) {
        
        if(this.keyNode ){
            
            var key = cc.instantiate(this.item);
            this.background.addChild(key);
            key.getComponent('Item').init(this,cc.p(552.5,127));
            
            this.weikey.scaleX = 1;
            this.weikey.scaleY = 1;
            this.weikey.zIndex = 1;
            this.keyNode = false;
        }

     //推屏幕
        var bgrect = this.background.getBoundingBox();
        if(this.player.node.x > this.node.x && this.player.node.x < bgrect.width - 680 && this.player.canMove){
            
           
            if(this.player._right){
    
                if(!this.player._stop){
                    this.background.x -= 2;
                }
                if(this.background.x < -1360){
                    this.background.x = -1360;
                }
                
            }
            if(this.player._left){
         
                if(!this.player._stop){
                    this.background.x += 2;
                }
                if(this.background.x > -680){
                    this.background.x = -680;
                }
                
            }
        }
        
        //楼层
        if(this.player.node.y >= this.floor.y){

            var rect = this.floor.getBoundingBox();
            if(this.player.node.x < rect.xMin + 32){
                this.player.node.x = rect.xMin + 32;
            }
            if(this.player.node.x > rect.xMax - 32){
                this.player.node.x = rect.xMax - 32;
            }
        }
    
        if(this._gameover === true){
            
            this.gameover.scaleX = 1;
            this.gameover.scaleY = 1;
            this.gameover.zIndex = 4;
            this.enemy2.speed = 0;
      
        }
    
    },
    
    
    
});
