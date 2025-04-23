class EnemyManager{
    constructor(){
        this.enemies = []
        this.active = true
        this.speed = 1
    }

    addEnemy(enemy){
        this.enemies.push(enemy)
    }

    positionEnemies(biomeManager){
        for(let i=0;i<this.animals.length;i++){
            let point = []
            point = [biomeManager.x+Math.round(Math.random()*(biomeManager.width-biomeManager.size*2)/biomeManager.size)*biomeManager.size, biomeManager.y+Math.round(Math.random()*(biomeManager.height-biomeManager.size*2)/biomeManager.size)*biomeManager.size]
            this.enemies[i].targetX = point[0]
            this.enemies[i].x = point[0]
            this.enemies[i].targetY = point[1]
            this.enemies[i].y = point[1]
        }
    }

    update(renderManager,animalManager,objectManager,biomeManager){
        if(objectManager.mainframeActive){
            for(let i=0;i<this.enemies.length;i++){
                if(this.enemies[i].pointTarget == undefined){
                    let distance = 500
                    let animal = null
                    for(let j=0;j<animalManager.animals.length;j++){
                        if(Math.sqrt((this.enemies[i].x - animalManager.animals[j].x)**2 + (this.enemies[i].y - animalManager.animals[j].y)**2) < distance && !animalManager.animals[j].held && Math.sqrt((objectManager.objects[0].x - animalManager.animals[j].x)**2 + (objectManager.objects[0].y - animalManager.animals[j].y)**2) > distance){
                            distance = Math.sqrt((this.enemies[i].x - animalManager.animals[j].x)**2 + (this.enemies[i].y - animalManager.animals[j].y)**2)
                            animal = j
                        }
                    }
                    if(animal != null || animal != undefined){
                        if(this.enemies[i].x > animalManager.animals[animal].x){
                            this.enemies[i].targetX -= this.speed
                        } else if(this.enemies[i].x < animalManager.animals[animal].x){
                            this.enemies[i].targetX += this.speed
                        }
                        if(this.enemies[i].y > animalManager.animals[animal].y){
                            this.enemies[i].targetY -= this.speed
                        } else if(this.enemies[i].y < animalManager.animals[animal].y){
                            this.enemies[i].targetY += this.speed
                        }
                        if(this.enemies[i].x + this.enemies[i].w > animalManager.animals[animal].x
                            && this.enemies[i].x < animalManager.animals[animal].x + animalManager.animals[animal].w
                            && this.enemies[i].y + this.enemies[i].h > animalManager.animals[animal].y
                            && this.enemies[i].y < animalManager.animals[animal].y + animalManager.animals[animal].h){
                                this.enemies[i].pointTarget = [objectManager.objects[0].x,objectManager.objects[0].y]
                                this.enemies[i].targetAnimal = animal
                        }
                    } else {
                        console.log(false)
                        if(renderManager.totalFrames % 300 == 0){
                            console.log(true)
                            this.enemies[i].randomDirection = [Math.round(Math.random()*2)-1,Math.round(Math.random()*2)-1]
                        } else {
                            this.enemies[i].targetX += this.enemies[i].randomDirection[0] * this.speed
                            this.enemies[i].targetY += this.enemies[i].randomDirection[1] * this.speed
                        }
                    }
                } else {
                    if(this.enemies[i].x > objectManager.objects[0].x){
                        this.enemies[i].targetX -= this.speed
                    } else if(this.enemies[i].x < objectManager.objects[0].x){
                        this.enemies[i].targetX += this.speed
                    }
                    if(this.enemies[i].y > objectManager.objects[0].y){
                        this.enemies[i].targetY -= this.speed
                    } else if(this.enemies[i].y < objectManager.objects[0].y){
                        this.enemies[i].targetY += this.speed
                    }
                    animalManager.animals[this.enemies[i].targetAnimal].targetX = this.enemies[i].x - (animalManager.animals[this.enemies[i].targetAnimal].w - 50)/2
                    animalManager.animals[this.enemies[i].targetAnimal].targetY = this.enemies[i].y - animalManager.animals[this.enemies[i].targetAnimal].h
                    if(this.enemies[i].x + this.enemies[i].w > objectManager.objects[0].x
                        && this.enemies[i].x < objectManager.objects[0].x + objectManager.objects[0].w
                        && this.enemies[i].y + this.enemies[i].h > objectManager.objects[0].y
                        && this.enemies[i].y < objectManager.objects[0].y + objectManager.objects[0].h){
                            this.enemies[i].pointTarget = undefined
                            this.enemies[i].targetAnimal = undefined
                    }
                }
            }
        }
        for(let i=0;i<this.enemies.length;i++){
            this.enemies[i].render(renderManager,objectManager.mainframeActive)
        }
    }
}