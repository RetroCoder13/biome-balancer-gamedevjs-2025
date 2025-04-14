class UI{
    constructor(player,w,h,triggerKey){
        this.active = false
        this.w = w
        this.h = h
        this.x = -this.w/2+player.x+player.w/2
        this.y = -this.h/2+player.y+player.h/2
        this.triggerKey = triggerKey
    }

    updatePosition(player){
        this.x = -this.w/2+player.x+player.w/2
        this.y = -this.h/2+player.y+player.h/2
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
        ctx.fillStyle = "rgba(0,0,0,0.5)"
        ctx.fillRect(this.x,this.y,this.w,this.h)
        ctx.fillStyle = "#FFFFFF"
        ctx.fillText("Map",this.x+50,this.y+50,100)
    }
}

class CompendiumUI extends UI{
    render(renderManager,inputManager){

    }
}