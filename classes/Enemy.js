class Enemy{
    constructor(x,y,w,h){
        this.x = x
        this.y = y
        this.w = w
        this.h = h

        this.pointTarget = undefined
        this.randomDirection = [0,0]

        this.targetX = this.x
        this.targetY = this.y
    }

    render(renderManager,active){
        this.x += lerp(this.x,this.targetX,0.5)
        this.y += lerp(this.y,this.targetY,0.5)
        if(active){
            renderManager.render("enemy","walk",this.x,this.y,this.w,this.h)
        } else {
            renderManager.render("enemy","death",this.x,this.y,this.w,this.h)
        }
    }
}