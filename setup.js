var canvas = document.querySelector('canvas')
var ctx = canvas.getContext('2d')

let scale = 2
canvas.style.width = "1000px"
canvas.style.height = "500px"
canvas.width = 1000*scale
canvas.height = 500*scale
ctx.scale(scale,scale)
let offset = [475,225]
ctx.translate(offset[0],offset[1])

ctx.imageSmoothingEnabled = false

let mapSize = [5000,5000]

var player = new Player(0,0,50,50,2)
var renderManager = new RenderManager()
var audioManager = new AudioManager()
var cameraManager = new CameraManager(player.x,player.y,mapSize[0],mapSize[1],offset[0],offset[1])
var inputManager = new InputManager(cameraManager,offset[0],offset[1])
var animalManager = new AnimalManager()
var biomeManager = new BiomeManager(mapSize[0],mapSize[1],50,player)
var objectManager = new ObjectManager()
var enemyManager = new EnemyManager()

var mapUI = new MapUI(cameraManager,1000,500,"m")
var compendiumUI = new CompendiumUI(cameraManager,1000,500,"c")
var hud = new HUD(cameraManager,1000,500)
var menu = new Menu(1000,500)
var endMenu = new EndMenu(1000,500)

function setup(){
    ctx.resetTransform()
    ctx.scale(scale,scale)
    let offset = [475,225]
    ctx.translate(offset[0],offset[1])
    player = new Player(0,0,50,50,2)
    renderManager = new RenderManager()
    audioManager = new AudioManager()
    cameraManager = new CameraManager(player.x,player.y,mapSize[0],mapSize[1],offset[0],offset[1])
    inputManager = new InputManager(cameraManager,offset[0],offset[1])
    animalManager = new AnimalManager()
    biomeManager = new BiomeManager(mapSize[0],mapSize[1],50,player)
    objectManager = new ObjectManager()
    enemyManager = new EnemyManager()
    
    biomeManager.generateBiomes()

    renderManager.loadFont("assets/textures/font")

    renderManager.createObject("icons")
    renderManager.createState("icons","map",false)
    renderManager.addImage("assets/textures/icons/map.png","icons","map")
    renderManager.createState("icons","compendium",false)
    renderManager.addImage("assets/textures/icons/compendium.png","icons","compendium")
    renderManager.createState("icons","keyc",false)
    renderManager.addImage("assets/textures/icons/keys/c.png","icons","keyc")
    renderManager.createState("icons","keye",false)
    renderManager.addImage("assets/textures/icons/keys/e.png","icons","keye")
    renderManager.createState("icons","keym",false)
    renderManager.addImage("assets/textures/icons/keys/m.png","icons","keym")
    renderManager.createState("icons","keyr",false)
    renderManager.addImage("assets/textures/icons/keys/r.png","icons","keyr")
    renderManager.createState("icons","question",false)
    renderManager.addImage("assets/textures/icons/question.png","icons","question")

    renderManager.createObject("menu")
    renderManager.createState("menu","map",false)
    renderManager.addImage("assets/textures/menu/map.png","menu","map")

    renderManager.createObject("biome")
    renderManager.createState("biome","forest",false)
    renderManager.addImage("assets/textures/biome/forest.png","biome","forest")
    renderManager.createState("biome","desert",false)
    renderManager.addImage("assets/textures/biome/desert.png","biome","desert")
    renderManager.createState("biome","tundra",false)
    renderManager.addImage("assets/textures/biome/tundra.png","biome","tundra")
    renderManager.createState("biome","jungle",false)
    renderManager.addImage("assets/textures/biome/jungle.png","biome","jungle")
    renderManager.createState("biome","ocean",false)
    renderManager.addImage("assets/textures/biome/ocean.png","biome","ocean")

    renderManager.createObject("player")
    renderManager.createState("player","idle",true,18)
    renderManager.addImages("assets/textures/player/idle","player","idle",18)

    renderManager.createState("player","walk",true,4)
    renderManager.addImages("assets/textures/player/walk","player","walk",4)

    renderManager.createState("player","walkAnimal",true,4)
    renderManager.addImages("assets/textures/player/walk/animal","player","walkAnimal",4)

    renderManager.createState("player","idleAnimal",true,18)
    renderManager.addImages("assets/textures/player/idle/animal","player","idleAnimal",18)

    renderManager.createState("player","swim",true,16)
    renderManager.addImages("assets/textures/player/swim","player","swim",16)
    renderManager.createState("player","idleSwim",true,30)
    renderManager.addImages("assets/textures/player/swim/idle","player","idleSwim",30)
    renderManager.createState("player","swimAnimal",true,8)
    renderManager.addImages("assets/textures/player/swim/animal","player","swimAnimal",8)

    for(let i=0;i<15;i++){
        let animal = animalManager.animalTypes[Math.round(Math.random()*(animalManager.animalTypes.length-1))]
        if(animal == "panda" || animal == "polar bear" || animal == "camel" || animal == "deer" || animal == "reindeer"){
            animalManager.addAnimal(new Animal(0,0,100,100,1,animal))
        } else if(animal == "fish"){
            animalManager.addAnimal(new Animal(0,0,50,25,1,animal))
        } else {
            animalManager.addAnimal(new Animal(0,0,50,50,1,animal))
        }
    }

    animalManager.positionAnimals(biomeManager)

    renderManager.createObject("animal")
    renderManager.createState("animal","home",true,10)
    renderManager.addImages("assets/textures/animals/home","animal","home",10)

    renderManager.createObject("rabbit")
    renderManager.createState("rabbit","idle",true,28)
    renderManager.addImages("assets/textures/animals/rabbit/idle","rabbit","idle",28)

    renderManager.createObject("panda")
    renderManager.createState("panda","idle",true,39)
    renderManager.addImages("assets/textures/animals/panda/idle","panda","idle",39)

    renderManager.createObject("fish")
    renderManager.createState("fish","idle",true,8)
    renderManager.addImages("assets/textures/animals/fish/idle","fish","idle",8)
    renderManager.createState("fish","swim",true,16)
    renderManager.addImages("assets/textures/animals/fish/swim","fish","swim",16)

    renderManager.createObject("turtle")
    renderManager.createState("turtle","idle",true,44)
    renderManager.addImages("assets/textures/animals/turtle/idle","turtle","idle",44)
    renderManager.createState("turtle","swim",true,12)
    renderManager.addImages("assets/textures/animals/turtle/swim","turtle","swim",12)

    renderManager.createObject("fox")
    renderManager.createState("fox","idle",true,34)
    renderManager.addImages("assets/textures/animals/fox/idle","fox","idle",34)

    renderManager.createObject("desert mouse")
    renderManager.createState("desert mouse","idle",true,36)
    renderManager.addImages("assets/textures/animals/desert mouse/idle","desert mouse","idle",36)

    renderManager.createObject("crab")
    renderManager.createState("crab","idle",true,32)
    renderManager.addImages("assets/textures/animals/crab/idle","crab","idle",32)

    renderManager.createObject("arctic fox")
    renderManager.createState("arctic fox","idle",true,34)
    renderManager.addImages("assets/textures/animals/arctic fox/idle","arctic fox","idle",34)

    renderManager.createObject("fennec fox")
    renderManager.createState("fennec fox","idle",true,34)
    renderManager.addImages("assets/textures/animals/fennec fox/idle","fennec fox","idle",34)

    renderManager.createObject("polar bear")
    renderManager.createState("polar bear","idle",true,20)
    renderManager.addImages("assets/textures/animals/polar bear/idle","polar bear","idle",20)

    renderManager.createObject("snake")
    renderManager.createState("snake","idle",true,33)
    renderManager.addImages("assets/textures/animals/snake/idle","snake","idle",33)

    renderManager.createObject("camel")
    renderManager.createState("camel","idle",true,62)
    renderManager.addImages("assets/textures/animals/camel/idle","camel","idle",62)

    renderManager.createObject("deer")
    renderManager.createState("deer","idle",true,72)
    renderManager.addImages("assets/textures/animals/deer/idle","deer","idle",72)

    renderManager.createObject("reindeer")
    renderManager.createState("reindeer","idle",true,72)
    renderManager.addImages("assets/textures/animals/reindeer/idle","reindeer","idle",72)

    renderManager.createObject("monkey")
    renderManager.createState("monkey","idle",true,53)
    renderManager.addImages("assets/textures/animals/monkey/idle","monkey","idle",53)

    objectManager.addObject(new Mainframe(0,0,100,100))
    objectManager.addObject(new Keycard(0,0,45,45))

    for(let i=0;i<200;i++){
        let object = objectManager.objectTypes[Math.round(Math.random()*(objectManager.objectTypes.length-1))]
        if(object == "iceberg"){
            objectManager.addObject(new CollisionObject(0,0,90,90,object))
        } else {
            objectManager.addObject(new CollisionObject(0,0,45,45,object))
        }
    }

    objectManager.positionObjects(biomeManager)

    renderManager.createObject("objects")

    renderManager.createState("objects","mainframe",true,8)
    renderManager.addImages("assets/textures/objects/mainframe/working","objects","mainframe",8)
    renderManager.createState("objects","mainframeDead",false)
    renderManager.addImage("assets/textures/objects/mainframe/dead/mainframe.png","objects","mainframeDead")
    renderManager.createState("objects","keycard",false)
    renderManager.addImage("assets/textures/objects/keycard/keycard.png","objects","keycard")

    renderManager.createState("objects","bamboo",false)
    renderManager.addImage("assets/textures/biome/bamboo.png","objects","bamboo")
    renderManager.createState("objects","log",false)
    renderManager.addImage("assets/textures/biome/log.png","objects","log")
    renderManager.createState("objects","iceberg bottom",false)
    renderManager.addImage("assets/textures/biome/iceberg/bottom.png","objects","iceberg bottom")
    renderManager.createState("objects","iceberg middle",false)
    renderManager.addImage("assets/textures/biome/iceberg/middle.png","objects","iceberg middle")
    renderManager.createState("objects","iceberg top",false)
    renderManager.addImage("assets/textures/biome/iceberg/top.png","objects","iceberg top")
    renderManager.createState("objects","tree trunk",false)
    renderManager.addImage("assets/textures/biome/tree/trunk.png","objects","tree trunk")
    renderManager.createState("objects","tree leaf",false)
    renderManager.addImage("assets/textures/biome/tree/leaf.png","objects","tree leaf")
    renderManager.createState("objects","palmtree trunk",false)
    renderManager.addImage("assets/textures/biome/palmtree/trunk.png","objects","palmtree trunk")
    renderManager.createState("objects","palmtree leaf",false)
    renderManager.addImage("assets/textures/biome/palmtree/leaf.png","objects","palmtree leaf")

    for(let i=0;i<2;i++){
        enemyManager.addEnemy(new Enemy(100,100,50,50))
    }
    enemyManager.positionEnemies(biomeManager)

    renderManager.createObject("enemy")
    renderManager.createState("enemy","walk",true,8)
    renderManager.addImages("assets/textures/enemy/walk","enemy","walk",8)
    renderManager.createState("enemy","death",true,11)
    renderManager.addImages("assets/textures/enemy/death","enemy","death",11)

    audioManager.createGroup("music")
    audioManager.createState("music","music")
    audioManager.addSound("assets/sounds/music/music.wav","music","music",true)

    mapUI = new MapUI(cameraManager,1000,500,"m")
    compendiumUI = new CompendiumUI(cameraManager,1000,500,"c")

    hud = new HUD(cameraManager,1000,500)

    // menu = new Menu(offset[0],offset[1],1000,500)

    endMenu = new EndMenu(1000,500)
    endMenu.active = false

    renderManager.createState("menu","play",false)
    renderManager.addImage("assets/textures/icons/menu/play.png","menu","play")

    renderManager.createState("menu","menu",false)
    renderManager.addImage("assets/textures/menu/menu.png","menu","menu")

    renderManager.createState("menu","end",false)
    renderManager.addImage("assets/textures/menu/end.png","menu","end")
}

setup()