class CameraManager{
    constructor(x,y,mapWidth,mapHeight){
        this.offsetX = x
        this.offsetY = y
        this.x = x
        this.y = y
        this.targetX = x
        this.targetY = y

        this.mapWidth = mapWidth
        this.mapHeight = mapHeight

        this.speed = 0.05
    }

    update(player){
        this.dx = lerp(this.x,this.targetX,this.speed)
        this.dy = lerp(this.y,this.targetY,this.speed)
        this.x += this.dx
        this.y += this.dy
        if(this.x > this.mapWidth/2 - 500){
            this.x = this.mapWidth/2 - 500
            this.dx = 0
        } else if(this.x < -this.mapWidth/2 + 500){
            this.x = -this.mapWidth/2 + 500
            this.dx = 0
        }
        if(this.y > this.mapHeight/2 - 250){
            this.y = this.mapHeight/2 - 250
            this.dy = 0
        } else if(this.y < -this.mapHeight/2 + 250){
            this.y = -this.mapHeight/2 + 250
            this.dy = 0
        }
        console.log(this.x)
        ctx.translate(-this.dx,-this.dy)
        this.targetX = player.x
        this.targetY = player.y
        canvas.style.backgroundPosition = `${-this.x}px ${-this.y}px`
    }
}