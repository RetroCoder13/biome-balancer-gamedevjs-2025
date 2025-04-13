var canvas = document.querySelector('canvas')
var ctx = canvas.getContext('2d')

ctx.imageSmoothingEnabled = false;

var scale = 2

canvas.style.width = "1000px"
canvas.style.height = "500px"
canvas.width = 1000*scale
canvas.height = 500*scale

ctx.scale(scale,scale)