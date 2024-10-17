scaleContent(Scale);
scaleminimap(Scale);
let count = 0;
paper.on("blank:mousewheel", async function (evt, x, y, delta) {
  evt.preventDefault();
  count += delta;
  if (count >= -13 && count <= 6) {
    scaleContent(Scale + delta * 0.11);
    scaleminimap(Scale);
  } else if (count < -13) count = -13;
  else if (count > 6) count = 6;
});

async function scaleminimap(newScale, minimapNavigatorPosition, scale) {
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
    maxX: config.paeprWidth * scale - ($("#container").width() * scale) / Scale,
    maxY:
      config.paperHeight * scale - ($("#container").height() * scale) / Scale,
  };
  minimapNavigatorPosition.maxX =
    config.paeprWidth * scale - $("#minimap-navigator").width() / newScale;
  minimapNavigatorPosition.maxY =
    config.paperHeight * scale - $("#minimap-navigator").height() / newScale;
}

async function scaleContent(newScale) {
  var $paper = $("#paper");
  var scaleString = "scale(" + newScale + ")";

  $paper.css({
    "-webkit-transform": scaleString,
    "-webkit-transform-origin": "0 0",
    "-moz-transform": scaleString,
    "-moz-transform-origin": "0 0",
    "-o-transform": scaleString,
    "-o-transform-origin": "0 0",
    transform: scaleString,
    "transform-origin": "0 0",
  });
  Scale = newScale;
  $("#container").css("overflow", "hidden");
}
