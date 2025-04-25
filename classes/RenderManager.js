class RenderManager{
    constructor(){
        this.images = {}
        this.totalFrames = 0
        this.frames = 0
        this.totalImages = 0
        this.loadedImages = 0
        this.loaded = false
    }

    loadFont(path){
        this.createObject("font")
        for(let i=97;i<97+26;i++){
            let character = String.fromCharCode(i)
            this.createState("font",character,false)
            this.addImage(`${path}/${character}.png`,"font",character)
        }
        for(let i=0;i<10;i++){
            this.createState("font",i,false)
            this.addImage(`${path}/${i}.png`,"font",i)
        }
        this.createState("font","/",false)
        this.addImage(`${path}/slash.png`,"font","/")
        this.createState("font",":",false)
        this.addImage(`${path}/colon.png`,"font",":")
        this.createState("font",".",false)
        this.addImage(`${path}/fullstop.png`,"font",".")
        this.createState("font",",",false)
        this.addImage(`${path}/comma.png`,"font",",")
    }

    createObject(object){
        this.images[object] = {}
    }

    createState(object,state,animation,frames){
        this.images[object][state] = {
            "animation":animation,
            "frames":frames,
            "images":[],
        }
    }

    addImage(path,object,state){
        let image = new Image()
        image.src = path
        this.images[object][state].images.push(image)
        let that = this
        this.images[object][state].images[this.images[object][state].images.length-1].onload = function(){that.loadedImages++;that.loaded = that.loadedImages == that.totalImages}
        this.totalImages++
    }

    addImages(path,object,state,frames){
        for(let i=1;i<frames+1;i++){
            this.addImage(`${path}/${i}.png`,object,state)
        }
    }

    render(object,state,x,y,w,h){
        if(this.images[object][state].animation){
            ctx.drawImage(this.images[object][state].images[this.frames % this.images[object][state].frames],x,y,w,h)
        } else {
            ctx.drawImage(this.images[object][state].images[0],x,y,w,h)
        }
    }

    renderText(text,x,y,w){
        for(let i=0;i<text.length;i++){
            let character = text[i]
            if(character != " "){
                this.render("font",character,x+i*(w+w/5),y,w,w)
            }
        }
    }

    update(){
        this.totalFrames++
        if(this.totalFrames % 10 == 0){
            this.frames += 1
        }
    }
}