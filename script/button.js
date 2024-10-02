let graphData;
const toggle_flag = async () => {
  if (flag) {
    flag = 0;

    if (window.innerWidth < 1650) {
      $(".main").css("grid-template-columns", "1fr 2.5fr 3fr");
      $(".center").css("width", "51vw");
      $("#paper2").css("width", "20vw ");
    }
    if (window.innerWidth > 1650) {
      $(".center").css("width", "58.2vw");
      $("#paper2").css("width", "15.2vw");
    }
    var containerWidth = $("#container").width() * scale;
    console.log(containerWidth + "komal");
    $("#minimap-navigator").width(containerWidth);
  } else {
    flag = 1;
    if (window.innerWidth < 1650) {
      $(".main").css("grid-template-columns", "1.5fr 5.8fr 2.7fr");
      $(".center").css("width", "62vw");
      $("#paper2").css("width", "20vw ");
    }
    if (window.innerWidth > 1650) {
      $("#paper2").css("width", "18vw");
      $(".center").css("width", "64vw");
    }
    var containerWidth = $("#container").width() * scale - 1;
    console.log(containerWidth + "komal");
    $("#minimap-navigator").width(containerWidth);
    minimapNavigatorPosition.maxX =
      config.paeprWidth * scale - $("#minimap-navigator").width() / Scale;
    minimapNavigatorPosition.maxY =
      config.paperHeight * scale - $("#minimap-navigator").height() / Scale;
  }
};

joint.dia.Graph.prototype.toJSON = function () {
  const cellsArray = [];

  // Iterate over all cells in the graph and add custom properties
  this.getCells().forEach((cell) => {
    // Create a JSON representation for each cell with custom properties
    const cellJSON = {
      id: cell.id, // Unique identifier for the cell
      type: cell.get("type"), // The type of the element (e.g., 'standard.Rectangle')
      position: cell.get("position"), // Position on the canvas
      size: cell.get("size"), // Size (width and height)
      attrs: cell.get("attrs"), // SVG attributes like styles and labels
      z: cell.get("z"), // Z-index to manage the stacking order
      parent: cell.get("parent"), // Parent element (if any)
      markup: cell.markup, // Markup for SVG rendering
      embeds: cell.get("embeds"), // Embedded elements (if any)
      ports: cell.get("ports"), // Port configurations (if any)
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
  console.log(jsonData);
}

// Function to handle saving graph to JSON
const handlejson = () => {
  try {
    // Convert the current graph state to JSON
    const graphJson = JSON.stringify(graph.toJSON());
    //console.log("Graph JSON Data:", graphJson);

    // Create a Blob from the JSON data
    const blob = new Blob([graphJson], { type: "application/json" });

    // Create a link element and trigger download
    const link = document.createElement("a");
    let inputVal = document.getElementById("json2")?.value || "jointjs_graph";
    link.download = `${inputVal}.json`; // Use input value or default name

    link.href = URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    //console.log("Graph downloaded successfully.");
  } catch (error) {
    //console.error("Error during download:", error);
  }
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
      graphData = JSON.parse(reader.result);
      //console.log("Graph data loaded:", graphData);

      // Deserialize the graph with custom properties
      graph.fromJSON(graphData);

      // Add controls after loading the graph
      addControlsFromJSON(graphData);

      let json = JSON.parse(reader.result);
      json["cells"].forEach((cell) => {
        if (cell.type != "Pipe") {
          append3rd(cell);
        }
      });
      //console.log("Graph loaded successfully with controls.");
    } catch (error) {
      //console.error("Error parsing JSON:", error);
    }
  };

  reader.onerror = (error) => {
    //console.error("Error reading file:", error);
  };
};

graph.on("add", function () {
  if (graphData) addControlsFromJSON(graphData);
});

function addControlsFromJSON(graphData) {
  graphData.cells.forEach((cellData) => {
    const cell = graph.getCell(cellData.id);

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

    // Trigger a change event to update the ports in the graph
    //cell.trigger("change", cell);

    // Temporarily remove the cell and re-add it to refresh its display
    //cell.remove({ disconnectLinks: false });
    //graph.addCell(cell);
  });
}

const savejson = () => {
  try {
    // Convert the current graph state to JSON
    const graphJson = JSON.stringify(graph.toJSON());

    // Save JSON to localStorage
    localStorage.setItem("GraphJson", graphJson);
    //console.log("Graph saved to local storage.");
  } catch (error) {
    //console.error("Error during save:", error);
  }
};

//-------------------Clear-----------------------------
const cleargraph = async () => {
  try {
    graph.clear(); // Clear the graph contents
    graph_undo_redo = []; // Clear undo/redo stack
    graphsteps = []; // Clear any graph steps or history
    console.log("Graph cleared.");

    // Clear any relevant DOM elements
    let panel = document.getElementById("paper2li");
    if (panel) {
      panel.innerHTML = ""; // Clear panel content
    }

    // Clear the file input field
    $("#file").val("");

    // Optionally clear the graph from localStorage
    localStorage.removeItem("GraphJson");
    // console.log("Graph removed from local storage.");
  } catch (error) {
    // console.error("Error during graph clearing:", error);
  }
};
