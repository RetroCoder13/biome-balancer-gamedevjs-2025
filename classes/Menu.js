class Menu{
    constructor(w,h){
        this.active = true
        this.offsetX = 0
        this.offsetY = 0
        this.w = w
        this.h = h
    }

    update(inputManager,renderManager,cameraManager,audioManager){
        this.offsetX = cameraManager.x-cameraManager.offsetX-offset[0]
        this.offsetY = cameraManager.y-cameraManager.offsetY-offset[1]
        // ctx.fillStyle = "#000000"
        // ctx.fillRect(this.offsetX,this.offsetY,this.w,this.h)
        renderManager.render("menu","menu",this.offsetX,this.offsetY,this.w,this.h)
        renderManager.render("menu","play",this.offsetX+(this.w-200)/2,this.offsetY+125,200,100)
        let mouse = inputManager.getMouse()
        if(mouse.pos[0] >= this.offsetX+(this.w-200)/2 && mouse.pos[0] <= this.offsetX+(this.w-200)/2 + 200 && mouse.pos[1] >= this.offsetY+125 && mouse.pos[1] <= this.offsetY+125 + 100 && mouse.click){
            this.active = false
            audioManager.play("music","music")
        }
    }
}

class EndMenu extends Menu{
    update(inputManager,renderManager,cameraManager,audioManager){
        this.offsetX = cameraManager.x-cameraManager.offsetX-offset[0]
        this.offsetY = cameraManager.y-cameraManager.offsetY-offset[1]
        renderManager.render("menu","end",this.offsetX,this.offsetY,this.w,this.h)
        renderManager.render("menu","play",this.offsetX+(this.w-150)/2,this.offsetY+400,150,75)
        let mouse = inputManager.getMouse()
        if(mouse.pos[0] >= this.offsetX+(this.w-300)/2 && mouse.pos[0] <= this.offsetX+(this.w-300)/2 + 300 && mouse.pos[1] >= this.offsetY+300 && mouse.pos[1] <= this.offsetY+300 + 150 && mouse.click){
            this.active = false
            audioManager.stop("music","music")
            setup()
        }
    }
}