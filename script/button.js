let graphData;
// const toggle_flag = async () => {
//   if (flag) {
//     flag = 0;

//     if (window.innerWidth < 1650) {
//       $(".main").css("grid-template-columns", "1fr 2.5fr 3fr");
//       $(".center").css("width", "51vw");
//       $("#paper2").css("width", "20vw ");
//     }
//     if (window.innerWidth > 1650) {
//       $(".center").css("width", "58.2vw");
//       $("#paper2").css("width", "15.2vw");
//     }
//     var containerWidth = $("#container").width() * scale;
//     // // console.log(containerWidth + "komal");
//     $("#minimap-navigator").width(containerWidth);
//   } else {
//     flag = 1;
//     if (window.innerWidth < 1650) {
//       $(".main").css("grid-template-columns", "1.5fr 5.8fr 2.7fr");
//       $(".center").css("width", "62vw");
//       $("#paper2").css("width", "20vw ");
//     }
//     if (window.innerWidth > 1650) {
//       $("#paper2").css("width", "18vw");
//       $(".center").css("width", "64vw");
//     }
//     var containerWidth = $("#container").width() * scale - 1;
//     //// console.log(containerWidth + "komal");
//     $("#minimap-navigator").width(containerWidth);
//     minimapNavigatorPosition.maxX =
//       config.paeprWidth * scale - $("#minimap-navigator").width() / Scale;
//     minimapNavigatorPosition.maxY =
//       config.paperHeight * scale - $("#minimap-navigator").height() / Scale;
//   }
// };

joint.dia.Graph.prototype.toJSON = function () {
  const cellsArray = [];

  // Iterate over all cells in the graph and add custom properties
  this.getCells().forEach((cell) => {
    //// console.log(cell);

    // Create a JSON representation for each cell with custom properties
    const cellJSON = {
      id: cell.id, // Unique identifier for the cell
      type: cell.get("type"), // The type of the element (e.g., 'standard.Rectangle')
      position: cell.get("position"), // Position on the canvas
      size: cell.get("size"), // Size (width and height)
      attrs: cell.get("attrs"), // SVG attributes like styles and labels
      z: cell.get("z"), // Z-index to manage the stacking order
      parent: cell.get("parent"), // Parent element (if any)
      markup: cell.markup || cell.get("markup"), // Markup for SVG rendering
      embeds: cell.get("embeds"), // Embedded elements (if any)
      ports: cell.get("ports"), // Port configurations (if any)
      angle: cell.get("angle"),
      power: 0, // Include power property (default value is 1 if undefined)
      controls: cell.get("controls"), // Custom controls property if available
    };

    // Check if the cell is a link and include source/target info
    if (cell.isLink()) {
      cellJSON.source = cell.get("source"); // Source element reference
      cellJSON.target = cell.get("target"); // Target element reference
      cellJSON.vertices = cell.get("vertices"); // Custom vertices for the link path
      cellJSON.labels = cell.get("labels"); // Link labels
    }

    // Add the cell's JSON representation to the array
    cellsArray.push(cellJSON);
    //// console.log(cellsArray);
  });

  // Return the final JSON representation of the graph
  return {
    cells: cellsArray,
  };
};

function handleFileLoad(event) {
  const jsonContent = event.target.result;
  const jsonData = JSON.parse(jsonContent);
  // Do something with the parsed JSON data (e.g., log it to the console)
  //// console.log(jsonData);
}

// Function to handle saving graph to JSON
const handlejson = () => {
  try {
    const graphJson = JSON.stringify(graph.toJSON());
    // console.log(graph.toJSON());

    const blob = new Blob([graphJson], { type: "application/json" });
    const link = document.createElement("a");
    let inputVal = document.getElementById("json2")?.value || "jointjs_graph";
    link.download = `${inputVal}.json`;

    link.href = URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {}
};

const uploadjson = () => {
  const fileInput = document.getElementById("file");
  const file = fileInput?.files[0];

  if (!file) {
    console.error("No file selected.");
    return;
  }

  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => {
    try {
      cleargraph();

      graphData = JSON.parse(reader.result);

      graph.fromJSON(graphData);
      addControlsFromJSON(graphData);

      let json = JSON.parse(reader.result);
      json["cells"].forEach((cell) => {
        if (cell.type != "Pipe") {
          append3rd(cell);
        }
      });
    } catch (error) {
      // console.log(error);
    }
  };

  graph.on("add", function () {
    if (graphData) addControlsFromJSON(graphData);
  });
};

function addControlsFromJSON(graphData) {
  graphData.cells.forEach((cellData) => {
    //// console.log(cellData);

    const cell = graph.getCell(cellData.id);

    // if (cell.markup) cell.markup = cellData.markup;
    // else {
    //   return;
    // }

    if (!cell || !cell.attributes.attrs.controls) return;

    const controlType = cell.attributes.attrs.controls.type;

    const cellView = cell.findView(paper);

    // Add controls based on control type
    switch (controlType) {
      case "checkbox":
        PumpControl.add(cellView, "root", "selection", cell);
        break;
      case "slider":
        SliderValveControl.add(cellView, "root", "slider", {
          name: cell.attr("label/text"),
        });
        break;
      case "button":
        ToggleValveControl.add(cellView, "root", "button");
        break;
      default:
        console.warn(`Unsupported control type: ${controlType}`);
        break;
    }
  });
}

// Save the current graph state to localStorage
const savejson = () => {
  try {
    const graphJson = JSON.stringify(graph.toJSON());
    if (graph.getElements().length === 0) {
      localStorage.setItem("GraphJson", graphJson);
      return;
    }

    localStorage.setItem("GraphJson", graphJson);
  } catch (error) {}
};

window.onbeforeunload = () => {
  localStorage.setItem("isReload", true);
};

window.onload = () => {
  if (localStorage.getItem("isReload") === "true") {
    localStorage.removeItem("isReload");
    const savedGraphJson = localStorage.getItem("GraphJson");

    if (savedGraphJson) {
      try {
        const graphData = JSON.parse(savedGraphJson);
        // console.log(graphData);

        if (graphData.cells.length > 0) {
          try {
            graph.fromJSON(graphData);
            addControlsFromJSON(graphData);
            graphData.cells.forEach((cell) => {
              undoStack.push(cell);

              append3rd(cell);
            });
          } catch (error) {
            // console.log(error);
          }
        }
      } catch (error) {}
    }
  }
};

//-------------------Clear-----------------------------
const cleargraph = async () => {
  try {
    graph.clear();
    redoStack = [];
    undoStack = [];

    let panel = document.getElementById("paper2li");
    if (panel) {
      panel.innerHTML = "";
    }

    $("#file").val("");

    localStorage.removeItem("GraphJson");
  } catch (error) {}
};
