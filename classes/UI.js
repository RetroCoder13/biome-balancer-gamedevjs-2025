class UI{
    constructor(player,w,h,triggerKey){
        this.active = false
        this.w = w
        this.h = h
        this.x = -w/2+player.x
        this.y = -h/2+player.y
        this.triggerKey = triggerKey
    }

    updatePosition(player){
        this.x = -this.w/2+player.x
        this.y = -this.h/2+player.y
    }

    update(renderManager,inputManager,player){
        if(inputManager.getKey(this.triggerKey)){
            this.active = true
        } else if(inputManager.getKey("Escape")){
            this.active = false
        }
        if(this.active){
            this.updatePosition(player)
            this.render(renderManager,inputManager)
        }
    }

    render(renderManager,inputManager){
        ctx.fillText("UI",this.x+100,this.y+100,100)
    }
}

class MapUI extends UI{
    render(renderManager,inputManager){

    }
}

class CompendiumUI extends UI{
    render(renderManager,inputManager){
        
    }
}