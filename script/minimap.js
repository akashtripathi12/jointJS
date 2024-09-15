var scale = 0.2;

var minimapNavigatorPosition = {
  minX: 0,
  minY: 0,
  maxX: config.paeprWidth * scale - ($("#container").width() * scale) / Scale,
  maxY: config.paperHeight * scale - ($("#container").height() * scale) / Scale,
};

var minimapPaper = new joint.dia.Paper({
  el: document.getElementById("minimap-paper"),
  model: graph,
  width: config.paeprWidth * scale, // + 8,
  height: config.paperHeight * scale, // - 32,
  gridSize: 1,
  interactive: false,
});

minimapPaper.scale(scale);

// Set minimap navigator width, height

var containerWidth = $("#container").width() * scale;
var containerHeight = $("#container").height() * scale;
$("#minimap-navigator").width(containerWidth);
$("#minimap-navigator").height(containerHeight);

// Bind container scrolling
$("#container").scroll(function (e) {
  $("#minimap-navigator").css(
    "top",
    minimapNavigatorPosition.minY + e.target.scrollTop * scale * (1 / Scale) * 1
  );
  $("#minimap-navigator").css(
    "left",
    minimapNavigatorPosition.minX +
      e.target.scrollLeft * scale * (1 / Scale) * 1
  );
});

// Bind minimap navigator drag
var dragFlag = false;
var x = 0;
var y = 0;
var initialOffset = { x: 0, y: 0 };
$("#minimap-navigator").mousedown(function (e) {
  dragFlag = true;
  x = e.clientX;
  y = e.clientY;
  initialOffset.x = e.target.offsetLeft;
  initialOffset.y = e.target.offsetTop;
});
$("#minimap-navigator").mouseup(function () {
  dragFlag = false;
});
$("#minimap-container").mouseleave(function () {
  dragFlag = false;
});
$("#minimap-navigator").mousemove(function (e) {
  if (dragFlag) {
    let newX = initialOffset.x + e.clientX - x;
    let newY = initialOffset.y + e.clientY - y;
    if (minimapNavigatorPosition.minY > newY) {
      newY = minimapNavigatorPosition.minY;
    }
    if (minimapNavigatorPosition.minX > newX) {
      newX = minimapNavigatorPosition.minX;
    }
    if (minimapNavigatorPosition.maxY < newY) {
      newY = minimapNavigatorPosition.maxY;
    }
    if (minimapNavigatorPosition.maxX < newX) {
      newX = minimapNavigatorPosition.maxX;
    }
    $("#minimap-navigator").css("top", newY);
    $("#minimap-navigator").css("left", newX);
    paperLeftDisplacement = -(newX - minimapNavigatorPosition.minX) / scale;
    paperTopDisplacement = -(newY - minimapNavigatorPosition.minY) / scale;
    paper.translate(paperLeftDisplacement, paperTopDisplacement);
  }
});
