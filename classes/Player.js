class Player{
    constructor(x,y,w,h,speed){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.targetX = x
        this.targetY = y
        this.speed = speed
    }

    update(renderManager,inputManager){
        let movement = [0,0]
        if(inputManager.getKey("w")){
            movement[1] -= 1
        }
        if(inputManager.getKey("s")){
            movement[1] += 1
        }
        if(inputManager.getKey("a")){
            movement[0] -= 1
        }
        if(inputManager.getKey("d")){
            movement[0] += 1
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

        ctx.fillStyle = "#000"
        // ctx.fillRect(this.x,this.y,this.w,this.h)
        // ctx.drawImage(this.image,this.x,this.y,this.w,this.h)
        renderManager.render("player","idle",this.x,this.y,this.w,this.h)
        
    }
}