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
            setTimeout(function(){that.cooldown = false},200)
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
            setTimeout(function(){that.cooldown = false},200)
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
    constructor(cameraManager,w,h,triggerKey){
        super(cameraManager,w,h,triggerKey)
        this.easterEggKeys = []
    }

    update(renderManager,inputManager,cameraManager,animalManager){
        if(inputManager.getKey(this.triggerKey) && !this.cooldown){
            this.active = !this.active
            this.cooldown = true
            let that = this
            setTimeout(function(){that.cooldown = false},200)
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
        ctx.fillRect(this.x + offset[0] + 5*(size+10),this.y + offset[1], 450,245)
        renderManager.renderText(animal,this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 10,30)
        if(animal == "rabbit" || animal == "fox" || animal == "deer"){
            if(animal == "rabbit"){
                renderManager.renderText("the rabbit is cute and",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 100,15)
                renderManager.renderText("cuddly, predominantly",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 120,15)
                renderManager.renderText("eating grass and carrots",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 140,15)
            } else if(animal == "fox"){
                renderManager.renderText("the fox has beautiful",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 100,15)
                renderManager.renderText("orange fur, chasing",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 120,15)
                renderManager.renderText("after its prey to catch",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 140,15)
                renderManager.renderText("a meal",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 160,15)
            } else if(animal == "deer"){
                renderManager.renderText("the deer group together",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 100,15)
                renderManager.renderText("in herds, eating grass",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 120,15)
                renderManager.renderText("and shrubs",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 140,15)
            }
            renderManager.renderText("biome: forest",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 50,20)
        } else if(animal == "fennec fox" || animal == "camel" || animal == "desert mouse"){
            if(animal == "fennec fox"){
                renderManager.renderText("the fennec fox has sand",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 100,15)
                renderManager.renderText("coloured fur to blend in",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 120,15)
                renderManager.renderText("with its surroundings",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 140,15)
                renderManager.renderText("and stalk its prey",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 160,15)
            } else if(animal == "camel"){
                renderManager.renderText("the camel has sturdy",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 100,15)
                renderManager.renderText("legs to support itself",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 120,15)
                renderManager.renderText("on sand, and stores fat",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 140,15)
                renderManager.renderText("in its hump and stalk",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 160,15)
                renderManager.renderText("its prey",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 180,15)
            } else if(animal == "desert mouse"){
                renderManager.renderText("the desert mouse has",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 100,15)
                renderManager.renderText("large ears to allow",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 120,15)
                renderManager.renderText("itself to cool down,",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 140,15)
                renderManager.renderText("eating small plants and",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 160,15)
                renderManager.renderText("berries",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 180,15)
            }
            renderManager.renderText("biome: desert",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 50,20)
        } else if(animal == "panda" || animal == "monkey" || animal == "snake"){
            if(animal == "panda"){
                renderManager.renderText("the panda is lazy and",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 100,15)
                renderManager.renderText("spends most of its time",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 120,15)
                renderManager.renderText("sleeping, having a diet",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 140,15)
                renderManager.renderText("consisting of mainly",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 160,15)
                renderManager.renderText("bamboo",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 180,15)
            } else if(animal == "monkey"){
                renderManager.renderText("the monkey climbs trees",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 100,15)
                renderManager.renderText("and hangs cheekily,",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 120,15)
                renderManager.renderText("holding its banana at",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 140,15)
                renderManager.renderText("all times for a quick",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 160,15)
                renderManager.renderText("snack",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 180,15)
            } else if(animal == "snake"){
                renderManager.renderText("the snake uses its green",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 100,15)
                renderManager.renderText("shade to hide as a vine,",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 120,15)
                renderManager.renderText("and then it shoots out.",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 140,15)
                renderManager.renderText("its favourite meal is a",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 160,15)
                renderManager.renderText("desert mouse",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 180,15)
            }
            renderManager.renderText("biome: jungle",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 50,20)
        } else if(animal == "fish" || animal == "turtle" || animal == "crab"){
            if(animal == "fish"){
                renderManager.renderText("the fish usually swims",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 100,15)
                renderManager.renderText("in schools, and is sad",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 120,15)
                renderManager.renderText("to be on its own, eating",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 140,15)
                renderManager.renderText("little bits of plankton",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 160,15)
            } else if(animal == "turtle"){
                renderManager.renderText("the turtle just loves to",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 100,15)
                renderManager.renderText("swim, eating algae and",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 120,15)
                renderManager.renderText("insects",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 140,15)
            } else if(animal == "crab"){
                renderManager.renderText("the crab spends its day",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 100,15)
                renderManager.renderText("shuffling left and",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 120,15)
                renderManager.renderText("right, clamping little",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 140,15)
                renderManager.renderText("shrimp in its pincers",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 160,15)
            }
            renderManager.renderText("biome: ocean",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 50,20)
        } else if(animal == "arctic fox" || animal == "polar bear" || animal == "reindeer"){
            if(animal == "arctic fox"){
                renderManager.renderText("the arctic fox uses its",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 100,15)
                renderManager.renderText("thick fur to protect",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 120,15)
                renderManager.renderText("itself in the cold,",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 140,15)
                renderManager.renderText("eating small animals",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 160,15)
            } else if(animal == "polar bear"){
                renderManager.renderText("the polar bear uses its",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 100,15)
                renderManager.renderText("thick fat to keep itself",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 120,15)
                renderManager.renderText("warm, catching fish to",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 140,15)
                renderManager.renderText("eat",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 160,15)
            } else if(animal == "reindeer"){
                renderManager.renderText("the reindeer is white in",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 100,15)
                renderManager.renderText("colour, being very rare",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 120,15)
                renderManager.renderText("and eating lichen in the",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 140,15)
                renderManager.renderText("chilly environment",this.x + offset[0] + 5*(size+10) + 10,this.y + offset[1] + 160,15)
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

        if(!audioManager.sounds.music.whatstartedaslove.playing){
            if(inputManager.getKey("e")){
                this.easterEggKeys[0] = true
            } else if(inputManager.getKey("l") && this.easterEggKeys[0]){
                this.easterEggKeys[1] = true
            }
            if(inputManager.getKey("l") && this.easterEggKeys[1]){
                this.easterEggKeys[2] = true
            } else if(inputManager.getKey("a") && this.easterEggKeys[2]){
                this.easterEggKeys[3] = true
            }
            if(this.easterEggKeys.length == 4){
                audioManager.stop("music","music")
                audioManager.play("music","whatstartedaslove")
                this.easterEggKeys = []
                setTimeout(function(){
                    audioManager.stop("music","whatstartedaslove")
                    audioManager.play("music","music")
                },127000)
            }
        }
    }
}