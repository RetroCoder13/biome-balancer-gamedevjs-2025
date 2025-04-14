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
    }

    update(renderManager,player){
        let move = false
        if(this.held){
            this.x = player.x
            this.y = player.y - this.h
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

            this.x += lerp(this.x,this.targetX,0.5)
            this.y += lerp(this.y,this.targetY,0.5)
        }

        if(move){
            renderManager.render(this.type,"walk",this.x,this.y,this.w,this.h)
        } else {
            renderManager.render(this.type,"idle",this.x,this.y,this.w,this.h)
        }
    }
}