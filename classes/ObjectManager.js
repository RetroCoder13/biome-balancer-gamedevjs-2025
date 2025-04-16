class ObjectManager{
    constructor(){
        this.objects = []
        // this.objectTypes = ["tree","palm tree","log","iceberg","bamboo"]
        this.objectTypes = ["bamboo"]
    }

    addObject(object){
        this.objects.push(object)
    }

    positionObjects(biomeManager){
        for(let i=0;i<this.objects.length;i++){
            let point = []
            point = [biomeManager.x+Math.round(Math.random()*(biomeManager.width-biomeManager.size*2)/biomeManager.size)*biomeManager.size, biomeManager.y+Math.round(Math.random()*(biomeManager.height-biomeManager.size*2)/biomeManager.size)*biomeManager.size]
            this.objects[i].x = point[0]
            this.objects[i].y = point[1]
            let biome = biomeManager.checkAnimalBiome(this.objects[i])
            while((biome != "forest" && this.objects[i].type == "tree")
                || (biome != "desert" && this.objects[i].type == "palm tree")
                || (biome != "ocean" && this.objects[i].type == "log")
                || (biome != "tundra" && this.objects[i].type == "iceberg")
                || (biome != "jungle" && this.objects[i].type == "bamboo")){
                point = [biomeManager.x+Math.round(Math.random()*(biomeManager.width-biomeManager.size*2)/biomeManager.size)*biomeManager.size, biomeManager.y+Math.round(Math.random()*(biomeManager.height-biomeManager.size*2)/biomeManager.size)*biomeManager.size]
                this.objects[i].x = point[0]
                this.objects[i].y = point[1]
                biome = biomeManager.checkAnimalBiome(this.objects[i])
            }
        }
    }

    update(renderManager,player){
        for(let i=0;i<this.objects.length;i++){
            // if((player.y + player.h >= this.objects[i].y) && (player.y <= this.objects[i].y + this.objects[i].h) && (player.x + player.w >= this.objects[i].x) && (player.x <= this.objects[i].x + this.objects[i].w)){
            //     if(player.y > this.objects[i].y - player.h && player.y - player.h/2 < this.objects[i].y){
            //         player.targetY = this.objects[i].y - player.h
            //     }
            //     if(player.y < this.objects[i].y + this.objects[i].h && player.y + player.h/2 > this.objects[i].y){
            //         player.targetY = this.objects[i].y + this.objects[i].h
            //     }
            //     if(player.x > this.objects[i].x - player.w && player.x - player.w/2 < this.objects[i].x){
            //         player.targetX = this.objects[i].x - player.w
            //     }
            //     if(player.x < this.objects[i].x + this.objects[i].w && player.x + player.w/2 > this.objects[i].x){
            //         player.targetX = this.objects[i].x + this.objects[i].w
            //     }
            // }
            renderManager.render("objects",this.objects[i].type,this.objects[i].x,this.objects[i].y,this.objects[i].w,this.objects[i].h)
        }
    }
}