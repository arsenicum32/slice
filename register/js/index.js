(function() {
  var canvas = this.__canvas = new fabric.StaticCanvas('c');
  
  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
    canvas.setHeight(window.innerHeight);
    canvas.setWidth(window.innerWidth);
    canvas.renderAll();
  }
  
  resizeCanvas();
  
  genobj();
  
  function genobj(){
    for (var i = fabric.util.getRandomInt(15, 50); i--; ) {
    var dim = fabric.util.getRandomInt(4, 12);
    var klass = ['Rect', 'Triangle', 'Circle'][fabric.util.getRandomInt(0,2)];
    var options = {
      top: fabric.util.getRandomInt(0, window.innerHeight),
      left: fabric.util.getRandomInt(0, window.innerWidth),
      fill: ['#f55', 'blue', 'yellow', 'lightgreen','pink', 'hotpink'][
        Math.floor(
          Math.random() * 5
        )]
    };
    if (klass === 'Circle') {
      options.radius = dim;
    }
    else {
      options.width = dim;
      options.height = dim;
    }
    canvas.add(new fabric[klass](options));
  }
    canvas.renderAll();
  }
})();