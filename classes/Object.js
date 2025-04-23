class CollisionObject{
    constructor(x,y,w,h,type){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.type = type
    }

    update(){
        renderManager.render("objects",this.type,this.x-5,this.y-5,this.w+10,this.h+10)
    }
}

class Keycard extends CollisionObject{
    constructor(x,y,w,h){
        super(x,y,w,h,"keycard")
        this.found = false
    }

    update(){
        if(!this.found){
            renderManager.render("objects","keycard",this.x,this.y,this.w,this.h)
        }
    }
}

class Mainframe extends CollisionObject{
    constructor(x,y,w,h){
        super(x,y,w,h,"mainframe")
        this.active = true
    }

    update(){
        if(this.active){
            renderManager.render("objects","mainframe",this.x-5,this.y-5,this.w+10,this.h+10)
        } else {
            renderManager.render("objects","mainframeDead",this.x-5,this.y-5,this.w+10,this.h+10)
        }
    }
}