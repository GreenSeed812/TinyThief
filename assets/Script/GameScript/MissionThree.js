var Player = require('Player');
var Mutong = require('Mutong');
var Tizi = require('Tizi');
var Item = require('Item');
var Enemy = require('Enemy');
var Light = require('Light');
var Zhezhao = require('Zhezhao');
var Food = require('Food');
var NextMission = require('NextMission');
var Door = require('Door');
var LouTi = require('LouTi');
var banshou = require('banshou');
var Newlight = require('Newlight');

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
        
        food:{
            default:null,
            type:Food
        },
        
        light:{
            default:null,
            type:cc.Prefab
        },
        
        zhezhao:{
            default:null,
            type:cc.Prefab
        },
        
        floor:{
            default:null,
            type:cc.Node
        },
        
        floor1:{
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
        
        louti:{
            default:null,
            type:cc.Node
        },
        
        door:{
            default:null,
            type:cc.Node
        },
        
        banshou:{
          default:null,
          type:cc.Node
        },
        
        gameover:{
            default:null,
            type:cc.Node
        },
        
        newlight:{
            default:null,
            type:Newlight
        },
        
        banshoubuff:{
            default:null,
            type:cc.Node
        },
        
        keybuff:{
            default:null,
            type:cc.Node
        },
        
        weizz:{
            default:null,
            type:cc.Node
        },
        
        weidoor:{
            default:null,
            type:cc.Node
        },
        
        weitizi:{
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
        
        var mt2 = cc.instantiate(this.mutong);
        bg.addChild(mt2);
        mt2.getComponent('Mutong').init(this,cc.p(1700,127));
        
        var mt1 = cc.instantiate(this.mutong);
        bg.addChild(mt1);
        mt1.getComponent('Mutong').init(this,cc.p(956.25,467));

        this.keyNode = false;
        
        var tz = cc.instantiate(this.tizi);
        bg.addChild(tz);
        tz.getComponent('Tizi').init(this,cc.p(2507.5,127)); 
        
        
        this.newlight.init(this);
      
        var zz = cc.instantiate(this.zhezhao);
        bg.addChild(zz,2);
        zz.getComponent('Zhezhao').init(this,cc.p(2125,127));
   
        var nm = cc.instantiate(this.nextmission);
        bg.addChild(nm);
        nm.getComponent('NextMission').init(this,cc.p(2635,552.5));
        
        this.player.startMoveAt(cc.p(1700, 127));
        this.player.node.zIndex = 3;
        this.player._light = false;
        this.enemy.init(this,cc.p(1912.5,127));
        this.enemy.node.zIndex = 1;
        
        this.enemy2.init(this,cc.p(510,467));
        this.enemy2.node.zIndex = 1;
        
        this.banshou.getComponent('banshou').init(this);
        
        this.doorkey = false;
        this.door.getComponent('Door').init(this);
        
        this.louti.getComponent('LouTi').init(this);
        
        this.food.init(this);
        
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
        
        this.banshoubuff.scaleX = 0;
        this.banshoubuff.scaleY = 0;
        
        this.keybuff.scaleX = 0;
        this.keybuff.scaleY = 0;
        
        this.weizz.zIndex = 2;
        this.weitizi.zIndex = 1;
        
        this.weidoor.scaleX = 0;
        this.weidoor.scaleY = 0;
        
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
      cc.director.loadScene('MissionThree');  
    },

    
    update: function (dt) {
        
        if(this.keyNode){
            
            var key = cc.instantiate(this.item);
            this.background.addChild(key,3);
            key.getComponent('Item').init(this,cc.p(2125.25,127));
            this.keyNode = false;
        }
  
        //推图
        var bgrect = this.background.getBoundingBox();
        if(this.player.node.x > this.node.x && this.player.node.x < bgrect.width - 680 && this.player.canMove){
    
            if(this.player._right){
               
                if(!this.player._stop){
                    this.background.x -= 2;
                }
                if(this.background.x < -2040){
                    this.background.x = -2040;
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
            
            if(this.player.node.y > this.node.y){
                
                this.background.y -= 2;
                if(this.background.y < -552.5){
                    this.background.y = -552.5;
                }
            }
            if(this.player.node.y < this.node.y){
                
                this.background.y += 2;
                if(this.background.y > -368.5){
                    this.background.y = -368.5;
                }
            }
            else if(this.player.node.x < 510){
            this.player.node.x = 510;
            }
      
        }
        //floor
        var p = cc.p(this.player.node.x, this.player.node.y - 42);
        var rect = this.floor.getBoundingBox();
        if(cc.rectContainsPoint(rect, p)){
            //console.log(p.x.toString() + ':::' + rect.xMax.toString());
          if(this.player.node.x < rect.xMin + 45){
              this.player.node.x = rect.xMin + 45;
              this.player._stop = true;
          }
          if(this.player.node.x > rect.xMax - 3 ){
              
              this.player.node.x = rect.xMax - 3;
              this.player._stop = true;
          }
   
        }
        
        //floor1
        var rect1 = this.floor1.getBoundingBox();
        if(cc.rectContainsPoint(rect1, p)){
            //console.log(p.x.toString() + ':::' + rect.xMax.toString());
          if(this.player.node.x < rect1.xMin + 45){
              this.player.node.x = rect1.xMin + 45;
              this.player._stop = true;
          }
          if(this.player.node.x > rect1.xMax - 45 ){
              
              this.player.node.x = rect1.xMax - 45;
              this.player._stop = true;
          }
   
        }
 
        if(this.door && !this.doorkey){
            if(this.player.node.x < 1145 && this.player.node.y == 127){
                this.player.node.x = 1145;
                this.player._stop = true;
            }
        }
        
        if(this._gameover === true){
            
            this.gameover.scaleX = 1;
            this.gameover.scaleY = 1;
            this.gameover.zIndex = 4;
            this.enemy.speed = 0;
            this.enemy2.speed = 0;
            
        }
        
        
    },
});
