class AnimalManager{
    constructor(){
        this.animals = []
    }

    addAnimal(animal){
        this.animals.push(animal)
    }

    positionAnimals(biomeManager){
        for(let i=0;i<this.animals.length;i++){
            let point = []
            point = [biomeManager.x+Math.round(Math.random()*(biomeManager.width-biomeManager.size*2)/biomeManager.size)*biomeManager.size, biomeManager.y+Math.round(Math.random()*(biomeManager.height-biomeManager.size*2)/biomeManager.size)*biomeManager.size]
            this.animals[i].targetX = point[0]
            this.animals[i].x = point[0]
            this.animals[i].targetY = point[0]
            this.animals[i].y = point[0]
            let biome = biomeManager.checkAnimalBiome(this.animals[i])
            while((biome == "forest" && this.animals[i].type == "rabbit")
                || (biome == "forest" && this.animals[i].type == "fox")
                || (biome == "forest" && this.animals[i].type == "deer")
                || (biome == "desert" && this.animals[i].type == "desert fox")
                || (biome == "desert" && this.animals[i].type == "camel")
                || (biome == "desert" && this.animals[i].type == "desert mouse")
                || (biome == "jungle" && this.animals[i].type == "panda")
                || (biome == "jungle" && this.animals[i].type == "monkey")
                || (biome == "jungle" && this.animals[i].type == "tiger")
                || (biome == "ocean" && this.animals[i].type == "fish")
                || (biome == "ocean" && this.animals[i].type == "turtle")
                || (biome == "ocean" && this.animals[i].type == "crab")
                || (biome == "tundra" && this.animals[i].type == "arctic fox")
                || (biome == "tundra" && this.animals[i].type == "polar bear")
                || (biome == "tundra" && this.animals[i].type == "reindeer")){
                point = [biomeManager.x+Math.round(Math.random()*(biomeManager.width-biomeManager.size*2)/biomeManager.size)*biomeManager.size, biomeManager.y+Math.round(Math.random()*(biomeManager.height-biomeManager.size*2)/biomeManager.size)*biomeManager.size]
                this.animals[i].targetX = point[0]
                this.animals[i].x = point[0]
                this.animals[i].targetY = point[0]
                this.animals[i].y = point[0]
                biome = biomeManager.checkAnimalBiome(this.animals[i])
            }
        }
        console.log(this.animals)
    }

    update(renderManager,inputManager,player){
        if(inputManager.getKey("e") || inputManager.getKey("r")){
            for(let i=0;i<this.animals.length;i++){
                if(inputManager.getKey("r") && this.animals[i].held) {
                    // this.animals[i].y += 50
                    this.animals[i].targetY = player.y
                    this.animals[i].held = false
                    player.holdingAnimal = false
                } else if(this.animals[i].x + this.animals[i].w >= player.x
                    && this.animals[i].x <= player.x + player.w
                    && this.animals[i].y + this.animals[i].h >= player.y
                    && this.animals[i].y <= player.y + player.h
                    && inputManager.getKey("e") && !player.holdingAnimal
                ){
                    this.animals[i].held = true
                    player.holdingAnimal = true
                }
            }
        }
        for(let i=0;i<this.animals.length;i++){
            this.animals[i].update(renderManager,player)
        }
    }
}