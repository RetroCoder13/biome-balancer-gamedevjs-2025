class BiomeManager{
    constructor(width,height,size,player){
        this.width = width
        this.height = height
        this.size = size
        this.x = -this.width/2 + player.w/2
        this.y = -this.height/2 + player.h/2
        this.biomes = ["forest","desert","ocean","tundra","jungle"]
        this.points = []
    }

    generateBiomes(){
        for(let i=0;i<this.biomes.length*2;i++){
            let randomPoint = [this.size+Math.round(Math.random()*(this.width-this.size*2)/this.size)*this.size,this.size+Math.round(Math.random()*(this.height-this.size*2)/this.size)*this.size]
            while(JSON.stringify(this.points).includes(JSON.stringify(randomPoint))){
                randomPoint = [this.size+Math.round(Math.random()*(this.width-this.size*2)/this.size)*this.size,this.size+Math.round(Math.random()*(this.height-this.size*2)/this.size)*this.size]
            }
            this.points.push(randomPoint)
        }
    }

    checkPlayerBiome(player){
        let biome = ""
        let value = 100000000000
        for(let p=0;p<this.points.length;p++){
            if(Math.sqrt((this.x+this.points[p][0]-player.x)**2 + (this.y+this.points[p][1]-player.y)**2) < value){
                value = Math.sqrt((this.x+this.points[p][0]-player.x)**2 + (this.y+this.points[p][1]-player.y)**2)
                biome = this.biomes[p%this.biomes.length]
            }
        }
        return biome
    }

    checkAnimalBiome(animal){
        let biome = ""
        let value = 100000000000
        for(let p=0;p<this.points.length;p++){
            if(Math.sqrt((this.x+this.points[p][0]-animal.x)**2 + (this.y+this.points[p][1]-animal.y)**2) < value){
                value = Math.sqrt((this.x+this.points[p][0]-animal.x)**2 + (this.y+this.points[p][1]-animal.y)**2)
                biome = this.biomes[p%this.biomes.length]
            }
        }
        return biome
    }

    update(renderManager){
        for(let i=0;i<this.width/this.size;i++){
            for(let j=0;j<this.height/this.size;j++){
                let biome = ""
                let value = 100000000000
                for(let p=0;p<this.points.length;p++){
                    if(Math.sqrt((this.points[p][0]-i*this.size)**2 + (this.points[p][1]-j*this.size)**2) < value){
                        value = Math.sqrt((this.points[p][0]-i*this.size)**2 + (this.points[p][1]-j*this.size)**2)
                        biome = this.biomes[p%this.biomes.length]
                    }
                }
                if(biome == "forest"){
                    renderManager.render("biome","forest",this.x+i*this.size,this.y+j*this.size,this.size,this.size)
                } else if(biome == "desert"){
                    renderManager.render("biome","desert",this.x+i*this.size,this.y+j*this.size,this.size,this.size)
                } else if(biome == "ocean"){
                    renderManager.render("biome","ocean",this.x+i*this.size,this.y+j*this.size,this.size,this.size)
                } else if(biome == "tundra"){
                    renderManager.render("biome","tundra",this.x+i*this.size,this.y+j*this.size,this.size,this.size)
                } else {
                    renderManager.render("biome","jungle",this.x+i*this.size,this.y+j*this.size,this.size,this.size)
                }
            }
        }
    }
}