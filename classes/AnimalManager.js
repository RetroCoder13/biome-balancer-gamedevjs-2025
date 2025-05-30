class AnimalManager{
    constructor(){
        this.animals = []
        this.canPickup = false
        this.canDrop = false
        this.animalTypes = ["rabbit","fox","deer","fennec fox","camel","desert mouse","panda","monkey","snake","fish","turtle","crab","arctic fox","polar bear","reindeer"]

        if(localStorage.getItem("biome-balancer-compendium") == null){
            this.foundAnimals = []
            localStorage.setItem("biome-balancer-compendium",JSON.stringify(this.foundAnimals))
        } else {
            this.foundAnimals = JSON.parse(localStorage.getItem("biome-balancer-compendium"))
        }
    }

    addAnimal(animal){
        this.animals.push(animal)
    }

    getHappyAnimals(){
        let count = 0
        for(let i=0;i<this.animals.length;i++){
            if(this.animals[i].happy){
                count++
            }
        }
        return {count:count, total:this.animals.length}
    }

    positionAnimals(biomeManager){
        for(let i=0;i<this.animals.length;i++){
            let point = []
            point = [biomeManager.x+Math.round(Math.random()*(biomeManager.width-biomeManager.size*2)/biomeManager.size)*biomeManager.size, biomeManager.y+Math.round(Math.random()*(biomeManager.height-biomeManager.size*2)/biomeManager.size)*biomeManager.size]
            this.animals[i].targetX = point[0]
            this.animals[i].x = point[0]
            this.animals[i].targetY = point[1]
            this.animals[i].y = point[1]
            let biome = biomeManager.checkAnimalBiome(this.animals[i])
            while((biome == "forest" && this.animals[i].type == "rabbit")
                || (biome == "forest" && this.animals[i].type == "fox")
                || (biome == "forest" && this.animals[i].type == "deer")
                || (biome == "desert" && this.animals[i].type == "fennec fox")
                || (biome == "desert" && this.animals[i].type == "camel")
                || (biome == "desert" && this.animals[i].type == "desert mouse")
                || (biome == "jungle" && this.animals[i].type == "panda")
                || (biome == "jungle" && this.animals[i].type == "monkey")
                || (biome == "jungle" && this.animals[i].type == "snake")
                || (biome == "ocean" && this.animals[i].type == "fish")
                || (biome == "ocean" && this.animals[i].type == "turtle")
                || (biome == "ocean" && this.animals[i].type == "crab")
                || (biome == "tundra" && this.animals[i].type == "arctic fox")
                || (biome == "tundra" && this.animals[i].type == "polar bear")
                || (biome == "tundra" && this.animals[i].type == "reindeer")){
                point = [biomeManager.x+Math.round(Math.random()*(biomeManager.width-biomeManager.size*2)/biomeManager.size)*biomeManager.size, biomeManager.y+Math.round(Math.random()*(biomeManager.height-biomeManager.size*2)/biomeManager.size)*biomeManager.size]
                this.animals[i].targetX = point[0]
                this.animals[i].x = point[0]
                this.animals[i].targetY = point[1]
                this.animals[i].y = point[1]
                biome = biomeManager.checkAnimalBiome(this.animals[i])
            }
        }
    }

    update(renderManager,inputManager,player,endMenu){
        this.canDrop = false
        this.canPickup = false
        if(true){
            for(let i=0;i<this.animals.length;i++){
                if(this.animals[i].held) {
                    if(inputManager.getKey("r")){
                        // this.animals[i].y += 50
                        this.animals[i].targetY = player.y
                        this.animals[i].held = false
                        player.holdingAnimal = false
                        audioManager.stop("effects","drop")
                        audioManager.play("effects","drop")
                    } else {
                        this.canDrop = true
                    }
                } else if(this.animals[i].x + this.animals[i].w >= player.x
                    && this.animals[i].x <= player.x + player.w
                    && this.animals[i].y + this.animals[i].h >= player.y
                    && this.animals[i].y <= player.y + player.h
                    && !player.holdingAnimal
                ){
                    if(inputManager.getKey("e")){
                        this.animals[i].held = true
                        player.holdingAnimal = true
                        audioManager.stop("effects","pickup")
                        audioManager.play("effects","pickup")
                        if(!this.foundAnimals.includes(this.animals[i].type)){
                            this.foundAnimals.push(this.animals[i].type)
                            localStorage.setItem("biome-balancer-compendium",JSON.stringify(this.foundAnimals))

                        }
                    } else {
                        this.canPickup = true
                    }
                }
            }
        }
        let count = 0
        for(let i=0;i<this.animals.length;i++){
            if(this.animals[i].happy){
                count++
            }
            this.animals[i].update(renderManager,player)
        }
        if(count == this.animals.length){
            endMenu.active = true
        }
    }
}