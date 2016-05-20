cc.Class({
    extends: cc.Component,

    properties: {
        
        layer:{
            default:null,
            type:cc.Node
        },
    },

    // use this for initialization
    onLoad: function () {
        
        this.layer.scaleX = 0;
        this.layer.scaleY = 0;
        this.missionNum = 1;
        
    },
    
    fanhui: function(){
        
        cc.director.loadScene('ChapterChose');  
        
    },
   
    
    guanbiguanqia: function(){
        
        this.layer.scaleX = 0;
        this.layer.scaleY = 0;
    },
    
    toMissionOne: function(){
        this.missionNum = 1;
        this.layer.scaleX = 1;
        this.layer.scaleY = 1; 
        
    },
    
    toMissionTwo:function(){
        this.missionNum = 2;
        this.layer.scaleX = 1;
        this.layer.scaleY = 1; 
      
    },
    
    toMissionThree:function(){
        this.missionNum = 3;
        this.layer.scaleX = 1;
        this.layer.scaleY = 1; 
      
    },
    
    toMissionScene:function(){
        
        if(this.missionNum == 1){
            cc.director.loadScene('MissionOne'); 
        }
        else if(this.missionNum == 2){
            cc.director.loadScene('MissionTwo'); 
        }
        else if(this.missionNum == 3){
            cc.director.loadScene('MissionThree'); 
        }
    }
    
    
});
