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

    update(renderManager,cameraManager,animalManager,objectManager,biomeManager,player){
        this.updatePosition(cameraManager)
        this.render(renderManager,animalManager,objectManager,biomeManager,player)
    }

    render(renderManager,animalManager,objectManager,biomeManager,player){
        let happyAnimals = animalManager.getHappyAnimals()
        ctx.fillStyle = "#000000"
        ctx.fillRect(this.x+10,this.y+10,370,70)
        renderManager.renderText(`saved animals: ${happyAnimals.count}/${happyAnimals.total}`,this.x+25,this.y+25,15)
        renderManager.renderText(`biome: ${biomeManager.checkPlayerBiome(player)}`,this.x+25,this.y+50,15)
        renderManager.render("icons","keym",this.x+880,this.y+440,50,50)
        renderManager.render("icons","map",this.x+940,this.y+440,50,50)
        renderManager.render("icons","keyc",this.x+880,this.y+380,50,50)
        renderManager.render("icons","compendium",this.x+940,this.y+380,50,50)

        if(animalManager.canPickup){
            renderManager.render("icons","keye",this.x+10,this.y+440,50,50)
        }
        if(animalManager.canDrop){
            renderManager.render("icons","keyr",this.x+10,this.y+440,50,50)
        }
        if(objectManager.keyCardFound && objectManager.mainframeActive){
            renderManager.render("objects","keycard",this.x+940,this.y+10,50,50)
        }
    }
}