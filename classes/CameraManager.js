class CameraManager{
    constructor(x,y){
        this.offsetX = x
        this.offsetY = y
        this.x = x
        this.y = y
        this.targetX = x
        this.targetY = y

        this.speed = 0.05
    }

    update(player){
        this.dx = lerp(this.x,this.targetX,this.speed)
        this.dy = lerp(this.y,this.targetY,this.speed)
        this.x += this.dx
        this.y += this.dy
        ctx.translate(-this.dx,-this.dy)
        this.targetX = player.x
        this.targetY = player.y
        canvas.style.backgroundPosition = `${-this.x}px ${-this.y}px`
    }
}