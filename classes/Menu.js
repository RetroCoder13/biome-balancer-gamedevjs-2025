class Menu{
    constructor(w,h){
        this.active = true
        this.offsetX = 0
        this.offsetY = 0
        this.w = w
        this.h = h
        this.gameName = "biome balance"
    }

    update(inputManager,renderManager,cameraManager){
        this.offsetX = cameraManager.x-cameraManager.offsetX-offset[0]
        this.offsetY = cameraManager.y-cameraManager.offsetY-offset[1]
        ctx.fillStyle = "#000000"
        ctx.fillRect(this.offsetX,this.offsetY,this.w,this.h)
        renderManager.renderText(this.gameName,this.offsetX+(this.w-this.gameName.length*60)/2,this.offsetY+50,50)
        renderManager.render("menu","play",this.offsetX+(this.w-500)/2,this.offsetY+150,500,250)
        let mouse = inputManager.getMouse()
        if(mouse.pos[0] >= this.offsetX+(this.w-500)/2 && mouse.pos[0] <= this.offsetX+(this.w-500)/2 + 500 && mouse.pos[1] >= this.offsetY+150 && mouse.pos[1] <= this.offsetY+150 + 250 && mouse.click){
            this.active = false
        }
    }
}

class EndMenu extends Menu{
    update(inputManager,renderManager,cameraManager){
        this.offsetX = cameraManager.x-cameraManager.offsetX-offset[0]
        this.offsetY = cameraManager.y-cameraManager.offsetY-offset[1]
        ctx.fillStyle = "#000000"
        ctx.fillRect(this.offsetX,this.offsetY,this.w,this.h)
        renderManager.renderText(this.gameName,this.offsetX+(this.w-this.gameName.length*60)/2,this.offsetY+50,50)
        let thanks = "thank you for saving the animals"
        renderManager.renderText(thanks,this.offsetX+(this.w-thanks.length*30)/2,this.offsetY+150,25)
        renderManager.render("menu","play",this.offsetX+(this.w-300)/2,this.offsetY+300,300,150)
        let mouse = inputManager.getMouse()
        if(mouse.pos[0] >= this.offsetX+(this.w-300)/2 && mouse.pos[0] <= this.offsetX+(this.w-300)/2 + 300 && mouse.pos[1] >= this.offsetY+300 && mouse.pos[1] <= this.offsetY+300 + 150 && mouse.click){
            this.active = false
            setup()
        }
    }
}