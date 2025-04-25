class ObjectManager{
    constructor(){
        this.objects = []
        // this.objectTypes = ["tree","palm tree","log","iceberg","bamboo"]
        this.objectTypes = ["tree","palmtree","log","iceberg","bamboo"]
        this.keyCardFound = false
        this.mainframeActive = true
        this.bound = 5
    }

    addObject(object){
        this.objects.push(object)
    }

    positionObjects(biomeManager){
        for(let i=0;i<this.objects.length;i++){
            if(this.objects[i].type != "iceberg top" && this.objects[i].type != "iceberg middle" && this.objects[i].type != "iceberg bottom" && this.objects[i].type != "tree trunk" && this.objects[i].type != "tree leaf" && this.objects[i].type != "palmtree trunk" && this.objects[i].type != "palmtree leaf"){
                let point = []
                point = [biomeManager.x+Math.round(Math.random()*(biomeManager.width-biomeManager.size*2)/biomeManager.size*2)*biomeManager.size*2, biomeManager.y+Math.round(Math.random()*(biomeManager.height-biomeManager.size*2)/biomeManager.size*2)*biomeManager.size*2]
                this.objects[i].x = point[0]
                this.objects[i].y = point[1]
                let biome = biomeManager.checkAnimalBiome(this.objects[i])
                while((biome != "forest" && this.objects[i].type == "tree")
                    || (biome != "desert" && this.objects[i].type == "palmtree")
                    || (biome != "ocean" && this.objects[i].type == "log")
                    || (biome != "tundra" && this.objects[i].type == "iceberg")
                    || (biome != "jungle" && this.objects[i].type == "bamboo")){
                    point = [biomeManager.x+Math.round(Math.random()*(biomeManager.width-biomeManager.size*2)/biomeManager.size*2)*biomeManager.size*2, biomeManager.y+Math.round(Math.random()*(biomeManager.height-biomeManager.size*2)/biomeManager.size*2)*biomeManager.size*2]
                    this.objects[i].x = point[0]
                    this.objects[i].y = point[1]
                    biome = biomeManager.checkAnimalBiome(this.objects[i])
                }
                if(this.objects[i].type == "iceberg"){
                    this.objects.splice(i,1)
                    i--
                    this.objects.push(new CollisionObject(point[0]+28,point[1],34,30,"iceberg top"))
                    this.objects.push(new CollisionObject(point[0]+11,point[1]+30,68,30,"iceberg middle"))
                    this.objects.push(new CollisionObject(point[0],point[1]+60,90,30,"iceberg bottom"))
                }
                if(this.objects[i].type == "tree"){
                    this.objects.splice(i,1)
                    i--
                    this.objects.push(new CollisionObject(point[0],point[1],40,52,"tree trunk"))
                    this.objects.push(new CollisionObject(point[0]-30,point[1]-67,90,67,"tree leaf"))
                }
                if(this.objects[i].type == "palmtree"){
                    this.objects.splice(i,1)
                    i--
                    this.objects.push(new CollisionObject(point[0],point[1],36,54,"palmtree trunk"))
                    this.objects.push(new CollisionObject(point[0]-30,point[1]-30,75,57,"palmtree leaf"))
                }
            }
        }
    }

    update(renderManager,player){
        player.disable = [false,false,false,false]
        for(let j=0;j<this.objects.length;j++){
            let i = this.objects.length - 1 - j
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
                    if(player.prevY <= this.objects[i].y - player.h + this.bound){
                        player.disable[1] = true
                        player.y = this.objects[i].y - player.h + this.bound
                    }
                    if(player.prevY >= this.objects[i].y + this.objects[i].h - this.bound){
                        player.disable[0] = true
                        player.y = this.objects[i].y + this.objects[i].h - this.bound
                    }
                    if(player.prevX <= this.objects[i].x - player.w + this.bound){
                        player.disable[3] = true
                        player.x = this.objects[i].x - player.w + this.bound
                    }
                    if(player.prevX >= this.objects[i].x + this.objects[i].w - this.bound){
                        player.disable[2] = true
                        player.x = this.objects[i].x + this.objects[i].w - this.bound
                    }
                }
            }
            this.objects[i].update()
            // renderManager.render("objects",this.objects[i].type,this.objects[i].x,this.objects[i].y,this.objects[i].w,this.objects[i].h)
        }
    }
}