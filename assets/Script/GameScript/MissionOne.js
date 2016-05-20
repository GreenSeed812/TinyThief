var Player = require('Player');
var Mutong = require('Mutong');
var Tizi = require('Tizi');
var Item = require('Item');
var Enemy = require('Enemy');
var Light = require('Light');
var Zhezhao = require('Zhezhao');
var GameBox = require('GameBox');
var NextMission = require('NextMission');

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
        
        gamebox:{
            default:null,
            type:cc.Prefab
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
        
        gameover:{
            default:null,
            type:cc.Node
        },
        
        keybuff:{
            default:null,
            type:cc.Node
        },
        
        openbox:{
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
        
        tishitu:{
            default:[],
            type:cc.Node
        },
        
        audio:cc.Node,
      
    },

    // use this for initialization
    onLoad: function () {
        
        this.audio = this.audio.getComponent('AudioDate');
        this.audio.playMusic();
        
        this.index = 0;
        for(i = 0;i < 9; ++i){
                this.tishitu[i].scaleX = 0;
                this.tishitu[i].scaleY = 0;
        }
        
        
        var mt = cc.instantiate(this.mutong);
        this.node.addChild(mt);
        mt.getComponent('Mutong').init(this,cc.p(-425,-255));
        
        this.keyNode = false;
        
        this.floor.zIndex = 2;
        
        var tz = cc.instantiate(this.tizi);
        this.node.addChild(tz,3);
        tz.getComponent('Tizi').init(this,cc.p(425,-255)); 
        
        var lt = cc.instantiate(this.light);
        this.node.addChild(lt);
        lt.getComponent('Light').init(this,cc.p(-42.5,182),true);
        
        var zz = cc.instantiate(this.zhezhao);
        this.node.addChild(zz,2);
        zz.getComponent('Zhezhao').init(this,cc.p(28,-255));
        
        var box = cc.instantiate(this.gamebox);
        this.node.addChild(box);
        box.getComponent('GameBox').init(this,cc.p(318.75,-255));
        
        this.openbox.scaleX = 0;
        this.openbox.scaleY = 0;
        
        var nm = cc.instantiate(this.nextmission);
        this.node.addChild(nm);
        nm.getComponent('NextMission').init(this,cc.p(595,-255));
        
        this.player.startMoveAt(cc.p(-637, -255));
        this.player.node.zIndex = 3;
        
        this.enemy.init(this,cc.p(-127.5,-255));
        this.enemy.node.zIndex = 1;
 
      //UI
        this.pauseLayer.scaleX = 0;
        this.pauseLayer.scaleY = 0;
        
        this.quitQueRen.scaleX = 0;
        this.quitQueRen.scaleY = 0;
        
        this.missionComplate.scaleX = 0;
        this.missionComplate.scaleY = 0;
        
        this.gameover.scaleX = 0;
        this.gameover.scaleY = 0;
    
        this.keybuff.scaleX = 0;
        this.keybuff.scaleY = 0;
        
        this._gameover = false;
        
        this.tishitu.scaleX = 0;
        this.tishitu.scaleY = 0;
        this.t = 0;
   
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
        
        for(i = 0;i < 9; ++i){
            this.tishitu[i].scaleX = 0;
            this.tishitu[i].scaleY = 0;
        }
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
      this._gameover = false; 
      cc.director.loadScene('MissionOne');  
    },
    
    ToNextMission:function(){
        
      cc.director.loadScene('MissionTwo');  
    },
    
    nexttishi:function(){
      
      this.tishitu[this.index].scaleX = 0;
      this.tishitu[this.index].scaleY = 0;
      this.index +=1;
      this.tishitu[this.index].scaleX = 1;
      this.tishitu[this.index].scaleY = 1;
      
        
    },
    
    update: function (dt) {
        
        this.t++;
        if(this.t == 60){
            
            this.tishitu[0].scaleX = 1;
            this.tishitu[0].scaleY = 1;
            
            cc.director.pause();
            
        }
        if(this.keyNode ){
            
            var key = cc.instantiate(this.item);
            this.node.addChild(key,3);
            key.getComponent('Item').init(this,cc.p(0,-255));
            this.keyNode = false;
        }
        
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
            this.enemy.speed = 0;
        }
        
    },
});
