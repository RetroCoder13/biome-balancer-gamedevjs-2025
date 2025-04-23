class Animal{
    constructor(x,y,w,h,speed,type){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.targetX = x
        this.targetY = y
        this.speed = speed
        this.type = type
        this.held = false
        this.happy = false
    }

    update(renderManager,player){
        let move = false
        if(this.held){
            // this.x = player.x
            // this.y = player.y - this.h
            this.targetX = player.x - (this.w - 50)/2
            this.targetY = player.y - this.h
        } else {
            let movement = [0,0]

            let theta = Math.atan(movement[1]/movement[0])

            if(!isNaN(theta)){
                if(movement[0] < 0){
                    this.targetX -= Math.cos(theta) * this.speed
                    this.targetY -= Math.sin(theta) * this.speed
                } else {
                    this.targetX += Math.cos(theta) * this.speed
                    this.targetY += Math.sin(theta) * this.speed
                }
            }

        }
        this.x += lerp(this.x,this.targetX,0.5)
        this.y += lerp(this.y,this.targetY,0.5)

        if((this.type == "fish" || this.type == "turtle") && biomeManager.checkAnimalBiome(this) == "ocean"){
            renderManager.render(this.type,"swim",this.x,this.y,this.w,this.h)
        } else if(move){
            renderManager.render(this.type,"walk",this.x,this.y,this.w,this.h)
        } else {
            renderManager.render(this.type,"idle",this.x,this.y,this.w,this.h)
        }

        let biome = biomeManager.checkAnimalBiome(this)
        if(((biome == "forest" && this.type == "rabbit")
            || (biome == "forest" && this.type == "fox")
            || (biome == "forest" && this.type == "deer")
            || (biome == "desert" && this.type == "fennec fox")
            || (biome == "desert" && this.type == "camel")
            || (biome == "desert" && this.type == "desert mouse")
            || (biome == "jungle" && this.type == "panda")
            || (biome == "jungle" && this.type == "monkey")
            || (biome == "jungle" && this.type == "snake")
            || (biome == "ocean" && this.type == "fish")
            || (biome == "ocean" && this.type == "turtle")
            || (biome == "ocean" && this.type == "crab")
            || (biome == "tundra" && this.type == "arctic fox")
            || (biome == "tundra" && this.type == "polar bear")
            || (biome == "tundra" && this.type == "reindeer"))
            && (!this.held)){
                this.happy = true
                renderManager.render("animal","home",this.x,this.y,this.w,this.h)
        } else {
            this.happy = false
        }
    }
}