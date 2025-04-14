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
                if(this.animals[i].x + this.animals[i].w >= player.x
                    && this.animals[i].x <= player.x + player.w
                    && this.animals[i].y + this.animals[i].h >= player.y
                    && this.animals[i].y <= player.y + player.h
                ){
                    this.animals[i].held = inputManager.getKey("e")
                    player.holdingAnimal = inputManager.getKey("e")
                }
            }
        }
        for(let i=0;i<this.animals.length;i++){
            this.animals[i].update(renderManager,player)
        }
    }
}