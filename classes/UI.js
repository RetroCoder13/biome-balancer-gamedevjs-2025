class UI{
    constructor(cameraManager,w,h,triggerKey){
        this.active = false
        this.w = w
        this.h = h
        this.x = cameraManager.x-cameraManager.offsetX-offset[0]
        this.y = cameraManager.y-cameraManager.offsetY-offset[1]
        this.triggerKey = triggerKey
    }

    updatePosition(cameraManager){
        this.x = cameraManager.x-cameraManager.offsetX-offset[0]
        this.y = cameraManager.y-cameraManager.offsetY-offset[1]
    }

    update(renderManager,inputManager,cameraManager){
        if(inputManager.getKey(this.triggerKey)){
            this.active = true
        } else if(inputManager.getKey("Escape")){
            this.active = false
        }
        if(this.active){
            this.updatePosition(cameraManager)
            this.render(renderManager,inputManager)
        }
    }

    render(renderManager,inputManager){
        ctx.fillText("UI",this.x+100,this.y+100,100)
    }
}

class MapUI extends UI{
    update(renderManager,inputManager,cameraManager,player,biomeManager,animalManager){
        if(inputManager.getKey(this.triggerKey)){
            this.active = true
        } else if(inputManager.getKey("Escape")){
            this.active = false
        }
        if(this.active){
            this.updatePosition(cameraManager)
            this.render(renderManager,inputManager,player,biomeManager,animalManager)
        }
    }

    render(renderManager,inputManager,player,biomeManager,animalManager){
        let biome = biomeManager.checkPlayerBiome(player)
        let bgSize = 100
        for(let i=0;i<1000/bgSize;i++){
            for(let j=0;j<500/bgSize;j++){
                renderManager.render("biome",biome,this.x+i*bgSize,this.y+j*bgSize,bgSize,bgSize)
            }
        }

        renderManager.render("menu","map",this.x,this.y,1000,500)

        let size = 4
        let offset = [300,50]

        for(let i=0;i<biomeManager.width/biomeManager.size;i++){
            for(let j=0;j<biomeManager.height/biomeManager.size;j++){
                let biome = ""
                let value = 100000000000
                for(let p=0;p<biomeManager.points.length;p++){
                    if(Math.sqrt((biomeManager.points[p][0]-i*biomeManager.size)**2 + (biomeManager.points[p][1]-j*biomeManager.size)**2) < value){
                        value = Math.sqrt((biomeManager.points[p][0]-i*biomeManager.size)**2 + (biomeManager.points[p][1]-j*biomeManager.size)**2)
                        biome = biomeManager.biomes[p]
                    }
                }
                if(biome == "forest"){
                    renderManager.render("biome","forest",this.x+offset[0]+i*size,this.y+offset[1]+j*size,size,size)
                } else if(biome == "desert"){
                    renderManager.render("biome","desert",this.x+offset[0]+i*size,this.y+offset[1]+j*size,size,size)
                } else if(biome == "ocean"){
                    renderManager.render("biome","ocean",this.x+offset[0]+i*size,this.y+offset[1]+j*size,size,size)
                } else if(biome == "tundra"){
                    renderManager.render("biome","tundra",this.x+offset[0]+i*size,this.y+offset[1]+j*size,size,size)
                } else {
                    renderManager.render("biome","jungle",this.x+offset[0]+i*size,this.y+offset[1]+j*size,size,size)
                }
            }
        }
        renderManager.render("player","idle",this.x+offset[0]+(player.x)*size/50+200-size*1.5,this.y+offset[1]+(player.y)*size/50+200-size*1.5,size*3,size*3)
        for(let i=0;i<animalManager.animals.length;i++){
            if(!animalManager.animals[i].happy){
                ctx.fillStyle = "#FF0000"
                ctx.fillRect(this.x+offset[0]+(animalManager.animals[i].x)*size/50+200-size*.5,this.y+offset[1]+(animalManager.animals[i].y)*size/50+200-size*.5,size,size)
            }
        }
        renderManager.render("icons","keyesc",this.x+10,this.y+10,50,50)
    }
}

class CompendiumUI extends UI{
    render(renderManager,inputManager){
        ctx.fillRect(this.x,this.y,1000,500)
        renderManager.renderText("compendium",this.x+100,this.y+15,40)
        renderManager.render("icons","keyesc",this.x+10,this.y+10,50,50)
    }
}