class InputManager{
    constructor(cameraManager){
        this.mouse = {pos:[0,0],click:false}
        this.keys = {}
        var that = this
        addEventListener('mousedown',function(e){
            that.mouse.pos = [e.offsetX + cameraManager.x,e.offsetY + cameraManager.y]
            that.mouse.click = true
        })

        addEventListener('mouseup', function(e){
            that.mouse.click = false
        })

        addEventListener('keydown',function(e){
            that.keys[e.key] = true
        })
        addEventListener('keyup',function(e){
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