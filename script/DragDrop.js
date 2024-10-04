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
      element.position(position.x, position.y);
      break;

    case "HandValve":
      element = new HandValve();
      element.position(position.x, position.y);
      break;

    case "Zone":
      element = new Zone();
      element.position(position.x, position.y);
      break;

    // case "Panel":
    //   element = new Panel();
    //   element.position(position.x, position.y);
    //   break;

    case "Join":
      element = new Join();
      element.position(position.x, position.y);
      break;

    case "BoosterPumpHouse":
      element = new BoosterPumpHouse();
      element.position(position.x, position.y);
      break;

    case "SquareTank":
      element = new squareTank();
      element.position(position.x, position.y);
      break;

    case "FlowMeter":
      element = new FlowMeter();
      element.position(position.x, position.y);
      break;

    default:
      console.error("Unknown element type:", type);
      return;
  }

  undoStack.push(element);

  // Add the element to the graph
  append3rd(element);
  graph.addCell(element);
  const graphJson = graph.toJSON();
  localStorage.setItem("GraphJson", graphJson);
}

// Listen for an element being added to the graph
graph.on("add", (cell) => {
  if (cell instanceof LiquidTank) {
    const panel = new Panel();
    panel.position(cell.position().x + 10, cell.position().y + 60);
    panel.addTo(graph);
    cell.embed(panel);
  } else if (cell instanceof BoosterPumpHouse) {
    const panel = new Panel();
    panel.position(cell.position().x + 5, cell.position().y + 60);
    panel.addTo(graph);
    cell.embed(panel);
  } else if (cell instanceof squareTank) {
    const panel = new Panel();
    panel.position(cell.position().x + 10, cell.position().y + 20);
    panel.addTo(graph);
    cell.embed(panel);
    panel.attr({ z: -1 }); // set z-index of panel to -1
  } else if (cell instanceof ConicTank) {
    const panel = new Panel();
    panel.position(cell.position().x + 5, cell.position().y + 10);
    panel.addTo(graph);
    cell.embed(panel);
  }
});

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

let graphsteps = [],
  graph_undo_redo = [];

//redo and undo
let undoStack = [];
let redoStack = [];

const undo = document.getElementById("undo-button");
const redo = document.getElementById("redo-button");

undo.addEventListener("click", () => {
  let element = undoStack.pop();
  if (element) {
    redoStack.push(element);
    if (element.cid) {
      element.remove();
    } else {
      if (element.embeds) {
        let element2 = undoStack.pop();
        redoStack.push(element2);
        setupMutualRemoval(graph, element, element2);
      } else if (element.parent) {
        let element2 = undoStack.pop();
        redoStack.push(element2);
        setupMutualRemoval(graph, element2, element);
      } else graph.getCell(element.id).remove();
    }
  }
});

redo.addEventListener("click", () => {
  let element = redoStack.pop();
  if (element) {
    undoStack.push(element);
    if (element.cid) {
      graph.addCell(element);
    } else {
      if (element.embeds || element.parent) {
        let child = redoStack.pop();
        undoStack.push(child);
        addEmbeddedCell(graph, child, element);
      } else {
        graph.addCell(element);
      }
    }
  }
});

function addEmbeddedCell(graph, childElement, parentElement) {
  graph.addCell(parentElement);
  graph.addCell(childElement);
}

function setupMutualRemoval(graph, parentElement) {
  const parent = graph.getCell(parentElement.id);
  if (parent) {
    parent.remove();
  }
}
