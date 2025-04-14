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

renderManager.createObject("player")
renderManager.createState("player","idle",true,18)
renderManager.addImages("assets/textures/player/idle","player","idle",18)

renderManager.createState("player","walk",true,4)
renderManager.addImages("assets/textures/player/walk","player","walk",4)

animalManager.addAnimal(new Animal(100,100,50,50,1,"rabbit"))

renderManager.createObject("rabbit")
renderManager.createState("rabbit","idle",true,28)
renderManager.addImages("assets/textures/animals/rabbit/idle","rabbit","idle",28)

function update(){
    ctx.clearRect(cameraManager.x-cameraManager.offsetX-offset[0],cameraManager.y-cameraManager.offsetY-offset[1],canvas.width,canvas.height)

    player.update(renderManager,inputManager)
    animalManager.update(renderManager)
    cameraManager.update(player)

    requestAnimationFrame(update)
}

function lerp(a,b,t){
    return (b-a)*t
}

update()