class Enemy{
    constructor(x,y,w,h){
        this.x = x
        this.y = y
        this.w = w
        this.h = h

        this.pointTarget = undefined
        this.randomDirection = [0,0]
        this.targetAnimal = undefined

        this.targetX = this.x
        this.targetY = this.y
    }

    render(renderManager,biomeManager,active){
        this.x += lerp(this.x,this.targetX,0.5)
        this.y += lerp(this.y,this.targetY,0.5)
        if(this.x > biomeManager.width/2 - this.w/2){
            this.targetX = biomeManager.width/2 - this.w/2
        } else if(this.x < -biomeManager.width/2 + this.w/2){
            this.targetX = -biomeManager.width/2 + this.w/2
        }
        if(this.y > biomeManager.height/2 - this.h/2){
            this.targetY = biomeManager.height/2 - this.h/2
        } else if(this.y < -biomeManager.height/2 + this.h/2){
            this.targetY = -biomeManager.height/2 + this.h/2
        }
        if(active){
            renderManager.render("enemy","walk",this.x,this.y,this.w,this.h)
        } else {
            renderManager.render("enemy","death",this.x,this.y,this.w,this.h)
        }
    }
}