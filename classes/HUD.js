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

    update(cameraManager,animalManager){
        this.updatePosition(cameraManager)
        this.render(animalManager)
    }

    render(animalManager){
        let happyAnimals = animalManager.getHappyAnimals()
        ctx.font = "25px Source Code Pro"
        ctx.fillText(`${happyAnimals.count}/${happyAnimals.total}`,this.x+50,this.y+50,1000)
        renderManager.render("keys","m",this.x+940,this.y+440,50,50)
    }
}