//------------------------------------Selecting element on paper-----------------------------------
var previousCellView = null;
paper.on("element:pointerdown", function (elementView, evt, x, y) {
  elementvisible(elementView.model.id);

  // if (elementView.model.attributes.type !== "Panel") {
  // let x = elementView.model.attributes.position.x,
  //   y = elementView.model.attributes.position.y;
  // elementView.model.resize(120, 100, { x, y });
  elementView.highlight();
  elementView.addTools(toolsView);

  if (elementView !== previousCellView && previousCellView != null) {
    graphsteps.push(JSON.stringify(graph.toJSON()));
    //console.log(graphsteps.length);
    graph_undo_redo = [];
    previousCellView.unhighlight();
  }
  previousCellView = elementView;
  $("#container").css("overflow", "hidden");
  //}
});

paper.on("blank:pointerdown", function (evt, x, y) {
  if (previousCellView != null) {
    elementdisable(previousCellView);
    previousCellView.removeTools();
    previousCellView.unhighlight();
  }
  $("#container").css("overflow", "hidden");
});

let dimenMeters;
let currentElement;
function SaveDimensionModal(e) {
  dimenMeters = document.getElementById("Dimensioninput").value;
  document.getElementById("Dimensioninput").value = "";
  $("#DimensionModal").modal("hide");
  console.log($(`#` + currentElement.attributes.id + `text`)[0].innerHTML);
  $(`#` + currentElement.attributes.id + `text`)[0].innerHTML = dimenMeters;
  currentElement.attr("text/text", dimenMeters);
}

paper.on("element:contextmenu", function (elementView, e) {
  var currentElement = elementView.model;
  currentElement.attr("body/stroke", "orange");
  const origin = {
    left: e.pageX,
    top: e.pageY,
  };
  setPosition(origin);
  return false;
  $("#container").css("overflow", "hidden");
});

paper.on("cell: mouseover element:mouseover", function (e) {
  $("#container").css("overflow", "hidden");
  $("#container").css("overflow", "hidden");
});
paper.on("cell: mouseleave element:mouseleave", function (e) {
  $("#container").css("overflow", "scroll");
  $("#container").css("overflow", "hidden");
});
