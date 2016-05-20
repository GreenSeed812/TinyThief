cc.Class({
    extends: cc.Component,

    properties: {
        
        logo:{
            default:null,
            type:cc.Node
        },
        
        seed:{
            default:null,
            type:cc.Node
        },
        
        zz:{
            default:null,
            type:cc.Node
        },
        
        zz2:{
            default:null,
            type:cc.Node
        },
        
    },

    // use this for initialization
    onLoad: function () {
        
        cc.director.setDisplayStats(false);
        
        this.zz.runAction(cc.fadeOut(1.5));
    
        this.t = 0;
    },
    
    

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.t++;
        if(this.t == 95){
            this.logo.runAction(cc.fadeOut(1.5));
        }
        else if(this.t == 190){
            this.zz2.runAction(cc.fadeOut(1.5));
        }
        else if(this.t == 285){
            this.seed.runAction(cc.fadeOut(1.5));
        }
        else if(this.t == 380){
            cc.director.loadScene('TitleScene');
        }
        
    },
});
