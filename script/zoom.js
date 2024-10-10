scaleContent(Scale);
scaleminimap(Scale);
let count = 0;
paper.on("blank:mousewheel", async function (evt, x, y, delta) {
  evt.preventDefault();

  count += delta;
  if (count >= -13 && count <= 6) {
    scaleContent(Scale + delta * 0.15);
    scaleminimap(Scale);
  } else if (count < -13) count = -13;
  else if (count > 6) count = 6;
});

async function scaleminimap(newScale, minimapNavigatorPosition, scale1) {
  var navScaleString = "scale(" + 1 / newScale + ")";
  $("#minimap-navigator").css({
    "-webkit-transform": navScaleString,
    "-webkit-transform-origin": "0 0",
    "-moz-transform": navScaleString,
    "-moz-transform-origin": "0 0",
    "-o-transform": navScaleString,
    "-o-transform-origin": "0 0",
    transform: navScaleString,
    "transform-origin": "0 0",
  });
  minimapNavigatorPosition = {
    minX: 0,
    minY: 0,
    maxX:
      config.paeprWidth * scale1 - ($("#container").width() * scale1) / Scale,
    maxY:
      config.paperHeight * scale1 - ($("#container").height() * scale1) / Scale,
  };
  minimapNavigatorPosition.maxX =
    config.paeprWidth * scale1 - $("#minimap-navigator").width() / newScale;
  minimapNavigatorPosition.maxY =
    config.paperHeight * scale1 - $("#minimap-navigator").height() / newScale;
}

async function scaleContent(newScale) {
  var $paper = $("#paper");
  var scaleString = "scale(" + newScale + ")";

  // $paper.css({
  //   "-webkit-transform": scaleString,
  //   "-webkit-transform-origin": "0 0",
  //   "-moz-transform": scaleString,
  //   "-moz-transform-origin": "0 0",
  //   "-o-transform": scaleString,
  //   "-o-transform-origin": "0 0",
  //   transform: scaleString,
  //   "transform-origin": "0 0",
  // });
  paper.scale(newScale);
  Scale = newScale;
  $("#container").css("overflow", "hidden");
}
