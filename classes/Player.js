class Player{
    constructor(x,y,w,h,speed){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.prevX = x
        this.prevY = y
        this.targetX = x
        this.targetY = y
        this.speed = speed
        this.holdingAnimal = false
        this.disable = [false,false,false,false]
    }

    update(renderManager,inputManager,biomeManager){
        this.prevX = this.x
        this.prevY = this.y
        let movement = [0,0]
        let move = false
        if(inputManager.getKey("w") && !this.disable[0]){
            movement[1] -= 1
            move = true
        }
        if(inputManager.getKey("s") && !this.disable[1]){
            movement[1] += 1
            move = true
        }
        if(inputManager.getKey("a") && !this.disable[2]){
            movement[0] -= 1
            move = true
        }
        if(inputManager.getKey("d") && !this.disable[3]){
            movement[0] += 1
            move = true
        }

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

        this.x += lerp(this.x,this.targetX,0.5)
        this.y += lerp(this.y,this.targetY,0.5)

        if(this.x > biomeManager.width/2 - this.w/2){
            this.x = biomeManager.width/2 - this.w/2
        } else if(this.x < -biomeManager.width/2 + this.w/2){
            this.x = -biomeManager.width/2 + this.w/2
        }
        if(this.y > biomeManager.height/2 - this.h/2){
            this.y = biomeManager.height/2 - this.h/2
        } else if(this.y < -biomeManager.height/2 + this.h/2){
            this.y = -biomeManager.height/2 + this.h/2
        }

        ctx.fillStyle = "#000"
        // ctx.fillRect(this.x,this.y,this.w,this.h)
        // ctx.drawImage(this.image,this.x,this.y,this.w,this.h)
        if(this.holdingAnimal){
            if(biomeManager.checkPlayerBiome(this) == "ocean"){
                renderManager.render("player","swimAnimal",this.x,this.y,this.w,this.h)
            } else if(move){
                renderManager.render("player","walkAnimal",this.x,this.y,this.w,this.h)
            } else {
                renderManager.render("player","idleAnimal",this.x,this.y,this.w,this.h)
            }
        } else if(move){
            if(biomeManager.checkPlayerBiome(this) == "ocean"){
                renderManager.render("player","swim",this.x,this.y,this.w,this.h)
            } else {
                renderManager.render("player","walk",this.x,this.y,this.w,this.h)
            }
        } else {
            if(biomeManager.checkPlayerBiome(this) == "ocean"){
                renderManager.render("player","idleSwim",this.x,this.y,this.w,this.h)
            } else {
                renderManager.render("player","idle",this.x,this.y,this.w,this.h)
            }
        }
    }
}