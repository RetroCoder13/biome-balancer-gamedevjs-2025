function update(){
    ctx.clearRect(cameraManager.x-cameraManager.offsetX-offset[0],cameraManager.y-cameraManager.offsetY-offset[1],canvas.width,canvas.height)

    if(!compendiumUI.active){
        mapUI.update(renderManager,inputManager,cameraManager,player,biomeManager,animalManager)
    }
    if(!mapUI.active){
        compendiumUI.update(renderManager,inputManager,cameraManager,animalManager)
    }
    if(!mapUI.active && !compendiumUI.active){
        renderManager.update()
        biomeManager.update(renderManager)
        objectManager.update(renderManager,player)
        player.update(renderManager,inputManager,biomeManager)
        animalManager.update(renderManager,inputManager,player)
        hud.update(renderManager,cameraManager,animalManager)
    }
    cameraManager.update(player)

    requestAnimationFrame(update)
}

function lerp(a,b,t){
    return (b-a)*t
}

update()