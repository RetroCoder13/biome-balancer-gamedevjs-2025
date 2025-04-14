class AnimalManager{
    constructor(){
        this.animals = []
    }

    addAnimal(animal){
        this.animals.push(animal)
    }

    update(renderManager,inputManager,player){
        if(inputManager.getKey("e") || inputManager.getKey("r")){
            for(let i=0;i<this.animals.length;i++){
                if(inputManager.getKey("r") && this.animals[i].held) {
                    // this.animals[i].y += 50
                    this.animals[i].targetY = player.y
                    this.animals[i].held = false
                    player.holdingAnimal = false
                } else if(this.animals[i].x + this.animals[i].w >= player.x
                    && this.animals[i].x <= player.x + player.w
                    && this.animals[i].y + this.animals[i].h >= player.y
                    && this.animals[i].y <= player.y + player.h
                    && inputManager.getKey("e") && !player.holdingAnimal
                ){
                    this.animals[i].held = true
                    player.holdingAnimal = true
                }
            }
        }
        for(let i=0;i<this.animals.length;i++){
            this.animals[i].update(renderManager,player)
        }
    }
}