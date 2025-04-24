class UI{
    constructor(cameraManager,w,h,triggerKey){
        this.active = false
        this.w = w
        this.h = h
        this.x = cameraManager.x-cameraManager.offsetX-offset[0]
        this.y = cameraManager.y-cameraManager.offsetY-offset[1]
        this.triggerKey = triggerKey
        this.cooldown = false
    }

    updatePosition(cameraManager){
        this.x = cameraManager.x-cameraManager.offsetX-offset[0]
        this.y = cameraManager.y-cameraManager.offsetY-offset[1]
    }

    update(renderManager,inputManager,cameraManager){
        if(inputManager.getKey(this.triggerKey) && !this.cooldown){
            this.active = !this.active
            this.cooldown = true
            let that = this
            setTimeout(function(){that.cooldown = false},100)
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
        if(inputManager.getKey(this.triggerKey) && !this.cooldown){
            this.active = !this.active
            this.cooldown = true
            let that = this
            setTimeout(function(){that.cooldown = false},100)
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
                        biome = biomeManager.biomes[p%biomeManager.biomes.length]
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
        ctx.fillStyle = "#000000"
        ctx.fillRect(this.x+10,this.y+10,105,45)
        renderManager.renderText("map",this.x+20,this.y+20,25)
    }
}

class CompendiumUI extends UI{

    update(renderManager,inputManager,cameraManager,animalManager){
        if(inputManager.getKey(this.triggerKey) && !this.cooldown){
            this.active = !this.active
            this.cooldown = true
            let that = this
            setTimeout(function(){that.cooldown = false},100)
        }
        if(this.active){
            this.updatePosition(cameraManager)
            this.render(renderManager,inputManager,animalManager)
        }
    }

    render(renderManager,inputManager,animalManager){
        let biome = biomeManager.checkPlayerBiome(player)
        let bgSize = 100
        for(let i=0;i<1000/bgSize;i++){
            for(let j=0;j<500/bgSize;j++){
                renderManager.render("biome",biome,this.x+i*bgSize,this.y+j*bgSize,bgSize,bgSize)
            }
        }
        let size = 75
        let offset = [100,80]
        ctx.fillStyle = "#000000"
        ctx.fillRect(this.x+10,this.y+10,315,45)
        renderManager.renderText("compendium",this.x+20,this.y+20,25)
        let mouse = inputManager.getMouse()
        let animal = ""
        for(let i=0;i<animalManager.animalTypes.length;i++){
            ctx.fillStyle = "#AAAAAA"
            let j = Math.floor(i/5)
            let k = i % 5
            let x = this.x + offset[0] + k*(size+10)
            let y = this.y + offset[1] + j*(size+10)
            if(animalManager.foundAnimals.includes(animalManager.animalTypes[i])){
                if(mouse.pos[0] >= x && mouse.pos[0] <= x + size && mouse.pos[1] >= y && mouse.pos[1] <= y + size){
                    animal = animalManager.animalTypes[i]
                    ctx.fillStyle = "#333333"
                }
                ctx.fillRect(x,y,size,size)
                if(animalManager.animalTypes[i] == "fish"){
                    renderManager.render(animalManager.animalTypes[i],"idle",x+10,y+20,size-20,(size-20)/2)
                } else {
                    renderManager.render(animalManager.animalTypes[i],"idle",x+10,y+10,size-20,size-20)
                }
            } else {
                ctx.fillRect(x,y,size,size)
                renderManager.render("icons","question",x+10,y+10,size-20,size-20)
            }
        }
        ctx.fillStyle = "#AAAAAA"
        ctx.fillRect(this.x + offset[0] + 5*(size+10),this.y + offset[1], 450,300)
        renderManager.renderText(animal,this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 10,30)
        if(animal == "rabbit" || animal == "fox" || animal == "deer"){
            if(animal == "rabbit"){
                renderManager.renderText("",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 90,10)
            } else if(animal == "fox"){
                renderManager.renderText("",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 90,10)
            } else if(animal == "deer"){
                renderManager.renderText("",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 90,10)
            }
            renderManager.renderText("biome: forest",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 50,20)
        } else if(animal == "fennec fox" || animal == "camel" || animal == "desert mouse"){
            if(animal == "fennec fox"){
                renderManager.renderText("",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 90,10)
            } else if(animal == "camel"){
                renderManager.renderText("",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 90,10)
            } else if(animal == "desert mouse"){
                renderManager.renderText("",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 90,10)
            }
            renderManager.renderText("biome: desert",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 50,20)
        } else if(animal == "panda" || animal == "monkey" || animal == "snake"){
            if(animal == "panda"){
                renderManager.renderText("",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 90,10)
            } else if(animal == "monkey"){
                renderManager.renderText("",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 90,10)
            } else if(animal == "snake"){
                renderManager.renderText("",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 90,10)
            }
            renderManager.renderText("biome: jungle",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 50,20)
        } else if(animal == "fish" || animal == "turtle" || animal == "crab"){
            if(animal == "fish"){
                renderManager.renderText("",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 90,10)
            } else if(animal == "turtle"){
                renderManager.renderText("",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 90,10)
            } else if(animal == "crab"){
                renderManager.renderText("",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 90,10)
            }
            renderManager.renderText("biome: ocean",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 50,20)
        } else if(animal == "arctic fox" || animal == "polar bear" || animal == "reindeer"){
            if(animal == "arctic fox"){
                renderManager.renderText("",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 90,10)
            } else if(animal == "polar bear"){
                renderManager.renderText("",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 90,10)
            } else if(animal == "reindeer"){
                renderManager.renderText("",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 90,10)
            }
            renderManager.renderText("biome: tundra",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 50,20)
        }
        ctx.fillStyle = "#000000"
        ctx.fillRect(this.x + 10,this.y + 450,135,40)
        renderManager.renderText("reset",this.x + 20,this.y+460,20)
        if(mouse.pos[0] >= this.x + 10 && mouse.pos[0] <= this.x + 145 && mouse.pos[1] >= this.y + 450 && this.y <= this.y + 490){
            animalManager.foundAnimals = []
            localStorage.setItem("biome-balancer-compendium",JSON.stringify(animalManager.foundAnimals))
        }
    }
}