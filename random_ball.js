const canvas = document.getElementById('canvas')
const bounds = canvas.getBoundingClientRect()
canvas.height = bounds.height
canvas.width = bounds.width
const TWO_PI = 2*Math.PI
const R = 25
const MAX_Y = bounds.height - R
const MAX_X = bounds.width - R
const ctx = canvas.getContext('2d')

var DEBUG = 0

function randomInterval(min, max){
  return Math.random()*(max - min) + min
}

function randomVelocity(){
  VEL.X = randomInterval(-POS.X + R, MAX_X - POS.X)
  VEL.Y = randomInterval(-POS.Y + R, MAX_Y - POS.Y)
}

var POS = {X: bounds.width/2, Y: bounds.height/2}
var VEL = {X: 0, Y: 0}
var LAST_TIME = window.performance.now()

function drawCircle(color){
  ctx.strokeStyle = color
  ctx.beginPath()
  ctx.arc(POS.X, POS.Y, R, 0, TWO_PI, true)
  ctx.stroke()
}

function draw(timestamp){
  var dt = (timestamp - LAST_TIME)/1000
  var dx = VEL.X*dt
  var dy = VEL.Y*dt

  ctx.clearRect(
    POS.X - R - 1,
    POS.Y - R - 1,
    POS.X + R + 1,
    POS.Y + R + 1
  )
  POS.X += dx
  POS.Y += dy
  drawCircle('#000000')
  LAST_TIME = timestamp
  requestAnimationFrame(draw)
}

randomVelocity()
drawCircle('#000000')
setInterval(randomVelocity, 1000)
requestAnimationFrame(draw)
