cc.Class({
    extends: cc.Component,

    properties: {
  
    },

    // use this for initialization
    onLoad: function () {
     
    },
    
    fanhui: function(){
        
        cc.director.loadScene('TitleScene');
        
    },
    
    tochapterOne: function(){  
        cc.director.loadScene('MissionChose1');
    },
  
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
