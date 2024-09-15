let draggedElementType = null;

// Handle drag start from the sidebar
document.querySelectorAll(".drag").forEach((item) => {
  item.addEventListener("dragstart", function (event) {
    draggedElementType = event.currentTarget.getAttribute("data-type");
    event.dataTransfer.setData("text/plain", draggedElementType);
  });
});

// Prevent default behavior for dragover (to allow dropping)
paper.el.addEventListener("dragover", (event) => {
  event.preventDefault();
});

// Handle drop event on the paper
paper.el.addEventListener("drop", (event) => {
  event.preventDefault();

  // Get the element type from the sidebar
  const type = event.dataTransfer.getData("text/plain");

  // Convert the position relative to the paper container to the position relative to the paper
  const dropPosition = paper.clientToLocalPoint({
    x: event.clientX,
    y: event.clientY,
  });

  // Add the corresponding JointJS element to the graph
  addElementToGraph(type, dropPosition);
});

// Function to create elements based on the dragged type
function addElementToGraph(type, position) {
  let element;

  switch (type) {
    case "ControlValve":
      element = new ControlValve();
      element.position(position.x, position.y);
      break;

    case "ConicTank":
      element = new ConicTank();
      element.position(position.x, position.y);
      break;

    case "Pump":
      element = new Pump();
      element.position(position.x, position.y);
      break;

    case "LiquidTank":
      element = new LiquidTank();
      console.log(element);
      element.position(position.x, position.y);
      break;

    case "HandValve":
      element = new HandValve();
      console.log(element);
      element.position(position.x, position.y);
      break;

    case "Zone":
      element = new Zone();
      console.log(element);
      element.position(position.x, position.y);
      break;

    case "Panel":
      element = new Panel();
      console.log(element);
      element.position(position.x, position.y);
      break;

    case "Join":
      element = new Join();
      console.log(element);
      element.position(position.x, position.y);
      break;

    default:
      console.error("Unknown element type:", type);
      return;
  }

  // Add the element to the graph
  append3rd(element.attributes);
  graph.addCell(element);
}
// necessary for the drop event to trigger
paper.el.addEventListener(
  "dragover",
  function (evt) {
    evt.preventDefault();
    $("#container").css("overflow", "hidden");
  },
  false
);
$("#container").css("overflow", "hidden");
