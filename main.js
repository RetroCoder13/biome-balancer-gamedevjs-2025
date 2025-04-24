let totalFrames = 0
function update(){
    ctx.clearRect(cameraManager.x-cameraManager.offsetX-offset[0],cameraManager.y-cameraManager.offsetY-offset[1],canvas.width,canvas.height)

    if(renderManager.loaded && audioManager.loaded){
        if(endMenu.active){
            endMenu.update(inputManager,renderManager,cameraManager)
        } else if(menu.active){
            menu.update(inputManager,renderManager,cameraManager)
        } else {
            if(!compendiumUI.active){
                mapUI.update(renderManager,inputManager,cameraManager,player,biomeManager,animalManager)
            }
            if(!mapUI.active){
                compendiumUI.update(renderManager,inputManager,cameraManager,animalManager)
            }
            if(!mapUI.active && !compendiumUI.active){
                biomeManager.update(renderManager)
                objectManager.update(renderManager,player)
                enemyManager.update(renderManager,animalManager,objectManager,biomeManager)
                player.update(renderManager,inputManager,biomeManager)
                animalManager.update(renderManager,inputManager,player,endMenu)
                hud.update(renderManager,cameraManager,animalManager,objectManager,biomeManager,player)
                renderManager.update()
            }
            cameraManager.update(player)
        }
    } else {
        totalFrames++
        ctx.fillStyle = "#000000"
        console.log(totalFrames)
        for(let i=0;i<50;i++){
            ctx.fillRect(20*Math.cos((totalFrames-i)/10),20*Math.sin((totalFrames-i)/10),2,2)
        }
        ctx.fillRect(-100,100,(renderManager.loadedImages+audioManager.loadedSounds)/(renderManager.totalImages+audioManager.totalSounds)*200,10)
    }

    requestAnimationFrame(update)
}

function lerp(a,b,t){
    return (b-a)*t
}

update()

var windowScale = 1
window.addEventListener('resize',function(e){
    let width = this.window.innerWidth
    let height = this.window.innerHeight
    if(width >= height*2){
        canvas.style.height = height + "px"
        canvas.style.width = height*2 + "px"
        windowScale = height/500
    } else {
        canvas.style.height = width/2 + "px"
        canvas.style.width = width + "px"
        windowScale = width/1000
    }
})