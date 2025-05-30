class InputManager{
    constructor(cameraManager,offsetX,offsetY){
        this.mouse = {pos:[0,0],click:false}
        this.keys = {}
        this.offsetX = offsetX
        this.offsetY = offsetY
        var that = this
        window.addEventListener('mousedown',function(e){
            that.mouse.pos = [(e.offsetX/windowScale + cameraManager.x - that.offsetX),(e.offsetY/windowScale + cameraManager.y - that.offsetY)]
            that.mouse.click = true
        })

        window.addEventListener('mouseup', function(e){
            that.mouse.click = false
        })

        window.addEventListener('keydown',function(e){
            that.keys[e.key] = true
        })
        window.addEventListener('keyup',function(e){
            that.keys[e.key] = false
        })
    }

    getKey(key){
        return this.keys[key]
    }

    getMouse(){
        return this.mouse
    }
}