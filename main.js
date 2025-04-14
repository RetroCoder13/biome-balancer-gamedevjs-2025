function update(){
    ctx.clearRect(cameraManager.x-cameraManager.offsetX-offset[0],cameraManager.y-cameraManager.offsetY-offset[1],canvas.width,canvas.height)

    renderManager.update()
    biomeManager.update(renderManager)
    player.update(renderManager,inputManager)
    animalManager.update(renderManager,inputManager,player)
    cameraManager.update(player)
    ui.update(renderManager,inputManager,player)

    requestAnimationFrame(update)
}

function lerp(a,b,t){
    return (b-a)*t
}

update()