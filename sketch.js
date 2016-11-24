
var circles = [];

var rw, rh, r;

function setup(){
  // alert(dist(0,0,123,354))
  // alert(sin(20))
  createCanvas(window.innerWidth, window.innerHeight);

  rw = function(){
    return random(window.innerWidth)
  };
  rh = function(){
    return random(window.innerHeight)
  };
  r = function(){
    return random(12, 200)
  };

  var h1 = createElement('h1', 's/ice');
  h1.position(rw(),rh())

}
function draw(){
  background(255);
  noStroke();
    for(var i = 0; i < circles.length; i++){
        var c = circles[i];
        c.draw();
    }
    var newLoc = {x: rw(), y: rh()};
    var newD = r();
    if ( detectAnyCollision(circles, newLoc, newD) ) {
      /* If the values do interect make new values. */
      newLoc =  {x: rw(), y: rh()};
      newD = r();
    }else{
      if(circles.length < 50){
        c = new Circle(newLoc, newD);
        circles.push(c);
      }
    }
  //text("s/ice", window.innerWidth/2, window.innerHeight/2);
}

function Circle(loc,d , cl) {

  this.loc = loc;
  this.d = d;
  this.cl = cl || {r:undefined,g:undefined,b:undefined};

  this.draw = function() {
    var r = dist(loc.x, loc.y, width/2, height/2);
    var g = sin(radians(loc.x+frameCount)) * map(loc.x, 0, width, 0, 255);
    var b = cos(radians(loc.y+frameCount)) * map(loc.y, 0, height, 0, 255);
    fill( r , g ,  b );
    var angle = sin(radians(r+frameCount)) * d/3;
    //if (r < num) {
      ellipse(loc.x, loc.y, d/1.5+angle, d/1.5+angle);
    //}
  }

  this.detectCollision = function(newLoc, newD) {
    return dist(loc.x, loc.y, newLoc.x, newLoc.y) < ((d + newD)/2);
  }
}

function detectAnyCollision(cs, newLoc, newR) {
  for (var c in cs) {
    if (cs[c].detectCollision(newLoc, newR)) {
      return true;
    }
  }
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

