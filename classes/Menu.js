class Menu{
    constructor(offsetX,offsetY,w,h){
        this.active = true
        this.offsetX = -offsetX
        this.offsetY = -offsetY
        this.w = w
        this.h = h
    }

    update(inputManager,renderManager){
        let name = "game name"
        ctx.fillStyle = "#000000"
        ctx.fillRect(this.offsetX,this.offsetY,this.w,this.h)
        renderManager.renderText(name,this.offsetX+(this.w-name.length*60)/2,this.offsetY+50,50)
        renderManager.render("menu","play",this.offsetX+(this.w-500)/2,this.offsetY+150,500,250)
        let mouse = inputManager.getMouse()
        if(mouse.pos[0] >= this.offsetX+(this.w-500)/2 && mouse.pos[0] <= this.offsetX+(this.w-500)/2 + 500 && mouse.pos[1] >= this.offsetY+150 && mouse.pos[1] <= this.offsetY+150 + 250 && mouse.click){
            this.active = false
        }
    }
}