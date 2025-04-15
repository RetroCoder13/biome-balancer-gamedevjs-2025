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

var player = new Player(0,0,50,50,2)
var renderManager = new RenderManager()
var audioManager = new AudioManager()
var cameraManager = new CameraManager(player.x,player.y)
var inputManager = new InputManager(cameraManager)
var animalManager = new AnimalManager()
var biomeManager = new BiomeManager(5000,5000,50,player)
biomeManager.generateBiomes()

renderManager.createObject("biome")
renderManager.createState("biome","forest",false)
renderManager.addImage("assets/textures/biome/forest.png","biome","forest")
renderManager.createState("biome","desert",false)
renderManager.addImage("assets/textures/biome/desert.png","biome","desert")
renderManager.createState("biome","tundra",false)
renderManager.addImage("assets/textures/biome/tundra.png","biome","tundra")

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

animalManager.addAnimal(new Animal(100,100,50,50,1,"rabbit"))
animalManager.addAnimal(new Animal(200,100,50,50,1,"rabbit"))

renderManager.createObject("rabbit")
renderManager.createState("rabbit","idle",true,28)
renderManager.addImages("assets/textures/animals/rabbit/idle","rabbit","idle",28)

var mapUI = new MapUI(cameraManager,1000,500,"m")