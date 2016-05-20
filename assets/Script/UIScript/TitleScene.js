cc.Class({
    extends: cc.Component,

    properties: {
        
        t_layer:{
            default:null,
            type:cc.Node
        },
        
        t_layer2:{
            
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
        
        audio: cc.Node,
      
    },

    // use this for initialization
    onLoad: function () {
        
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
        
        this.t_layer.scaleX = 0;
        this.t_layer.scaleY = 0;
        this.t_layer2.scaleX = 0;
        this.t_layer2.scaleY = 0;
        
        
        this.audio = this.audio.getComponent('AudioDate');
        this.audio.playMusic();
    },
    
    mutemusic:function(){
        
        this.sound.scaleX = 0;
        this.sound.scaleY = 0;
        this.nosound.scaleX = 1;
        this.nosound.scaleY = 1;
        cc.audioEngine.setMusicVolume(0.0);
    },
    
    resumemusic:function(){
        this.sound.scaleX = 1;
        this.sound.scaleY = 1;
        this.nosound.scaleX = 0;
        this.nosound.scaleY = 0;
        cc.audioEngine.setMusicVolume(1.0);
    },
    
    quitgame: function(){
      
        this.t_layer.scaleX = 1;
        this.t_layer.scaleY = 1;
    
    },
    
    tishi:function(){
        
        this.t_layer2.scaleX = 1;
        this.t_layer2.scaleY = 1;
        
    },
    
    toChapterScene: function(){
        
        cc.director.loadScene('ChapterChose');
        
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
