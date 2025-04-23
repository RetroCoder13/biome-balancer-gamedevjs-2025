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
        if(this.active){
            for(let i=0;i<this.enemies.length;i++){
                let distance = 1000
                let animal = null
                for(let j=0;j<animalManager.animals.length;j++){
                    if(Math.sqrt((this.enemies[i].x - animalManager.animals[j].x)**2 + (this.enemies[i].y - animalManager.animals[j].y)**2) < distance && animalManager.animals[j].happy){
                        distance = Math.sqrt((this.enemies[i].x - animalManager.animals[j].x)**2 + (this.enemies[i].y - animalManager.animals[j].y)**2)
                        animal = j
                    }
                }
                if(animal != null){
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
                            this.enemies[i].pointTarget = biomeManager.points[Math.random()]
                    }
                }
            }
        }
        for(let i=0;i<this.enemies.length;i++){
            this.enemies[i].render(renderManager,this.active)
        }
    }
}