class RenderManager{
    constructor(){
        this.images = {}
        this.totalFrames = 0
        this.frames = 0
    }

    createObject(object){
        this.images[object] = {}
    }

    createState(object,state,animation,frames){
        this.images[object][state] = {
            "animation":animation,
            "frames":frames,
            "images":[]
        }
    }

    addImage(path,object,state){
        let image = new Image()
        image.src = path
        this.images[object][state].images.push(image)
    }

    render(object,state,x,y,w,h){
        this.totalFrames += 1
        if(this.totalFrames % 10 == 0){
            this.frames += 1
        }
        if(this.images[object][state].animation){
            ctx.drawImage(this.images[object][state].images[this.frames % this.images[object][state].frames],x,y,w,h)
        } else {
            ctx.drawImage(this.images[object][state].images[0],x,y,w,h)
        }
    }
}