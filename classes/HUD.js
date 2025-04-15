class HUD{
    constructor(cameraManager,w,h){
        this.x = cameraManager.x-cameraManager.offsetX-offset[0]
        this.y = cameraManager.y-cameraManager.offsetY-offset[1]
        this.w = w
        this.h = h
    }

    updatePosition(cameraManager){
        this.x = cameraManager.x-cameraManager.offsetX-offset[0]
        this.y = cameraManager.y-cameraManager.offsetY-offset[1]
    }

    update(cameraManager){
        this.updatePosition(cameraManager)
        this.render()
    }

    render(){
        // ctx.fillText()
        renderManager.render("keys","m",this.x,this.y,50,50)
    }
}