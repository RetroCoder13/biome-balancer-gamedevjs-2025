function update(){
    ctx.clearRect(cameraManager.x-cameraManager.offsetX-offset[0],cameraManager.y-cameraManager.offsetY-offset[1],canvas.width,canvas.height)

    mapUI.update(renderManager,inputManager,player,biomeManager)
    if(!mapUI.active){
        renderManager.update()
        biomeManager.update(renderManager)
        player.update(renderManager,inputManager,biomeManager)
        animalManager.update(renderManager,inputManager,player)
    }
    cameraManager.update(player)

    requestAnimationFrame(update)
}

function lerp(a,b,t){
    return (b-a)*t
}

update()