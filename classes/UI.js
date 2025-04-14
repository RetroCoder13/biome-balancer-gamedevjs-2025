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
    update(renderManager,inputManager,player,biomeManager){
        if(inputManager.getKey(this.triggerKey)){
            this.active = true
        } else if(inputManager.getKey("Escape")){
            this.active = false
        }
        if(this.active){
            this.updatePosition(player)
            this.render(renderManager,inputManager,player,biomeManager)
        }
    }

    render(renderManager,inputManager,player,biomeManager){
        ctx.fillStyle = "rgba(0,0,0,0.5)"
        ctx.fillRect(this.x,this.y,this.w,this.h)
        ctx.fillStyle = "#FFFFFF"
        ctx.fillText("Map",this.x+50,this.y+50,100)

        let size = 4
        let offset = [300,50]

        let renderPlayer = false

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
                    ctx.fillStyle = "#00AA00"
                    ctx.fillRect(this.x+offset[0]+i*size,this.y+offset[1]+j*size,size,size)
                }
                if(biomeManager.x+i*biomeManager.size + biomeManager.size >= player.x
                    && biomeManager.x+i*biomeManager.size <= player.x + player.w
                    && biomeManager.y+j*biomeManager.size + biomeManager.size >= player.y
                    && biomeManager.y+j*biomeManager.size <= player.y + player.h
                    && !renderPlayer){
                        renderPlayer = true
                        renderManager.render("player","idle",this.x+offset[0]+i*size,this.y+offset[1]+j*size,size,size)
                }
            }
        }
    }
}

class CompendiumUI extends UI{
    render(renderManager,inputManager){

    }
}