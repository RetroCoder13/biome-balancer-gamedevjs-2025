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
    update(renderManager,inputManager,cameraManager,player,biomeManager){
        if(inputManager.getKey(this.triggerKey)){
            this.active = true
        } else if(inputManager.getKey("Escape")){
            this.active = false
        }
        if(this.active){
            this.updatePosition(cameraManager)
            this.render(renderManager,inputManager,player,biomeManager)
        }
    }

    render(renderManager,inputManager,player,biomeManager){
        ctx.fillStyle = "rgba(0,0,0,0.5)"
        ctx.fillRect(this.x,this.y,this.w,this.h)
        ctx.fillStyle = "#FFFFFF"
        ctx.font = "25px Source Code Pro"
        ctx.fillText("Map",this.x+475,this.y+30,50)

        let size = 4
        let offset = [300,50]

        let renderPlayer = false
        let playerPosition = []

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
                    ctx.fillStyle = "#0000FF"
                    ctx.fillRect(this.x+offset[0]+i*size,this.y+offset[1]+j*size,size,size)
                } else if(biome == "tundra"){
                    renderManager.render("biome","tundra",this.x+offset[0]+i*size,this.y+offset[1]+j*size,size,size)
                } else {
                    renderManager.render("biome","jungle",this.x+i*this.size,this.y+j*this.size,this.size,this.size)
                }
                if(biomeManager.x+i*biomeManager.size + biomeManager.size >= player.x
                    && biomeManager.x+i*biomeManager.size <= player.x + player.w
                    && biomeManager.y+j*biomeManager.size + biomeManager.size >= player.y
                    && biomeManager.y+j*biomeManager.size <= player.y + player.h
                    && !renderPlayer){
                        renderPlayer = true
                        playerPosition = [this.x+offset[0]+i*size - size*1.5,this.y+offset[1]+j*size - size*1.5]
                }
            }
        }
        renderManager.render("player","idle",playerPosition[0],playerPosition[1],size*3,size*3)
        renderManager.render("keys","esc",this.x+10,this.y+10,50,50)
    }
}

class CompendiumUI extends UI{
    render(renderManager,inputManager){

    }
}