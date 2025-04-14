class AnimalManager{
    constructor(){
        this.animals = []
    }

    addAnimal(animal){
        this.animals.push(animal)
    }

    update(renderManager){
        for(let i=0;i<this.animals.length;i++){
            this.animals[i].update(renderManager)
        }
    }
}