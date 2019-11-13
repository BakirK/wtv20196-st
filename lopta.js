src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"

var context;
function init()
{
  context= myCanvas.getContext('2d');
  setInterval(draw, 15);
}


var x=0;
var y=20;
var dx=5;
var dy=5;
function draw()
{
  context.clearRect(0,0, 500, 500);
  context.beginPath();
  context.fillStyle="#0000ff";
  // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
  context.arc(x,y,20,0,Math.PI*2,true);
  context.closePath();
  context.fill();
  if( x<0 || x>300) dx=-dx; 
  if( y<0 || y>300) dy=-dy; 
  x+=dx;
  y+=dy;
}