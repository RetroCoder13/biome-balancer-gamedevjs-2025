class ObjectManager{
    constructor(){
        this.objects = []
        // this.objectTypes = ["tree","palm tree","log","iceberg","bamboo"]
        this.objectTypes = ["log","iceberg","bamboo"]
        this.keyCardFound = false
        this.mainframeActive = true
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
        player.disable = [false,false,false,false]
        for(let i=0;i<this.objects.length;i++){
            // if((player.y + player.h >= this.objects[i].y) && (player.y <= this.objects[i].y + this.objects[i].h) && (player.x + player.w >= this.objects[i].x) && (player.x <= this.objects[i].x + this.objects[i].w)){
            //     if(this.objects[i] instanceof Keycard){
            //         this.objects[i].found = true
            //         this.keyCardFound = true
            //     } else if(this.objects[i] instanceof Mainframe && this.keyCardFound){
            //         this.objects[i].active = false
            //         this.mainframeActive = false
            //     } else {
            //         if(player.y > this.objects[i].y - player.h && player.y - player.h/2 < this.objects[i].y){
            //             player.targetY -= 1
            //             player.disable[1] = true
            //         }
            //         if(player.y < this.objects[i].y + this.objects[i].h && player.y + player.h/2 > this.objects[i].y){
            //             player.targetY += 1
            //             player.disable[0] = true
            //         }
            //         if(player.x > this.objects[i].x - player.w && player.x - player.w/2 < this.objects[i].x){
            //             player.targetX -= 1
            //             player.disable[3] = true
            //         }
            //         if(player.x < this.objects[i].x + this.objects[i].w && player.x + player.w/2 > this.objects[i].x){
            //             player.targetX += 1
            //             player.disable[2] = true
            //         }
            //     }
            // }
            if((player.y + player.h >= this.objects[i].y) && (player.y <= this.objects[i].y + this.objects[i].h) && (player.x + player.w >= this.objects[i].x) && (player.x <= this.objects[i].x + this.objects[i].w)){
                if(this.objects[i] instanceof Keycard){
                    this.objects[i].found = true
                    this.keyCardFound = true
                } else if(this.objects[i] instanceof Mainframe && this.keyCardFound){
                    this.objects[i].active = false
                    this.mainframeActive = false
                } else {
                    if(player.prevY <= this.objects[i].y - player.h){
                        player.disable[1] = true
                        player.y = this.objects[i].y - player.h
                    }
                    if(player.prevY >= this.objects[i].y + this.objects[i].h){
                        player.disable[0] = true
                        player.y = this.objects[i].y + this.objects[i].h
                    }
                    if(player.prevX <= this.objects[i].x - player.w){
                        player.disable[3] = true
                        player.x = this.objects[i].x - player.w - 1
                    }
                    if(player.prevX >= this.objects[i].x + this.objects[i].w){
                        player.disable[2] = true
                        player.x = this.objects[i].x + this.objects[i].w + 1
                    }
                }
            }
            this.objects[i].update()
            // renderManager.render("objects",this.objects[i].type,this.objects[i].x,this.objects[i].y,this.objects[i].w,this.objects[i].h)
        }
    }
}