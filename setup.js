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
var cameraManager = new CameraManager(player.x,player.y,mapSize[0],mapSize[1])
var inputManager = new InputManager(cameraManager)
var animalManager = new AnimalManager()
var biomeManager = new BiomeManager(mapSize[0],mapSize[1],50,player)
biomeManager.generateBiomes()

renderManager.createObject("icons")
renderManager.createState("icons","map",false)
renderManager.addImage("assets/textures/icons/map.png","icons","map")
renderManager.createState("icons","keyesc",false)
renderManager.addImage("assets/textures/icons/keys/esc.png","icons","keyesc")
renderManager.createState("icons","keye",false)
renderManager.addImage("assets/textures/icons/keys/e.png","icons","keye")
renderManager.createState("icons","keym",false)
renderManager.addImage("assets/textures/icons/keys/m.png","icons","keym")
renderManager.createState("icons","keyr",false)
renderManager.addImage("assets/textures/icons/keys/r.png","icons","keyr")

renderManager.createObject("biome")
renderManager.createState("biome","forest",false)
renderManager.addImage("assets/textures/biome/forest.png","biome","forest")
renderManager.createState("biome","desert",false)
renderManager.addImage("assets/textures/biome/desert.png","biome","desert")
renderManager.createState("biome","tundra",false)
renderManager.addImage("assets/textures/biome/tundra.png","biome","tundra")
renderManager.createState("biome","jungle",false)
renderManager.addImage("assets/textures/biome/jungle.png","biome","jungle")

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

animalManager.addAnimal(new Animal(0,0,50,50,1,"rabbit"))
animalManager.addAnimal(new Animal(0,0,50,50,1,"rabbit"))
animalManager.addAnimal(new Animal(0,0,100,100,1,"panda"))
animalManager.addAnimal(new Animal(0,0,100,100,1,"panda"))

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

audioManager.createGroup("music")
audioManager.createState("music","music")
audioManager.addSound("assets/sounds/music/music.wav","music","music",true)
audioManager.play("music","music")

var mapUI = new MapUI(cameraManager,1000,500,"m")

var hud = new HUD(cameraManager,1000,500)