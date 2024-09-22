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

const handlejson = () => {
  try {
    const graphJson = JSON.stringify(graph.toJSON());
    console.log(graphJson);

    const blob = new Blob([graphJson], { type: "application/json" });
    const a = document.createElement("a");

    let inputVal = document.getElementById("json2")?.value || "jointjs";
    a.download = `${inputVal}.json`;

    a.href = URL.createObjectURL(blob);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    console.log("Graph downloaded successfully:", graphJson);
  } catch (error) {
    console.error("Error during download:", error);
  }
};

function handleFileLoad(event) {
  const jsonContent = event.target.result;
  const jsonData = JSON.parse(jsonContent);
  // Do something with the parsed JSON data (e.g., log it to the console)
  console.log(jsonData);
}

const uploadjson = () => {
  try {
    const fileInput = document.getElementById("file");
    const file = fileInput?.files[0]; // Get the selected file
    console.log(file); // Log the file object to ensure it exists

    if (!file) {
      console.error("No file selected.");
      return; // Exit if no file is selected
    }

    const reader = new FileReader();

    // Start reading the file asynchronously
    reader.readAsText(file);

    // This callback will execute once the file is fully read
    reader.onload = () => {
      try {
        // Log the full file content and its length
        console.log("File content length:", reader.result.length);
        console.log("File content:", reader.result);

        let graphData = JSON.parse(reader.result); // Parse the JSON from file content
        console.log("Graph data loaded:", graphData);

        // Load the graph from the JSON data
        graph.fromJSON(graphData);

        // Loop through cells and append them (if not links)
        graphData["cells"].forEach((cell) => {
          if (cell.type !== "link") {
            append3rd(cell); // Ensure append3rd is working properly
          }
        });
      } catch (error) {
        console.error("Error parsing JSON:", error); // Handle JSON parse errors
      }
    };

    // Handle errors during file reading
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  } catch (error) {
    console.error("Error during file upload:", error);
  }
};

const savejson = () => {
  const blob = JSON.stringify(undoStack);
  console.log(blob);
  localStorage.setItem("GraphJson", blob);
  graph_undo_redo = [];
};

//-------------------Clear-----------------------------
const cleargraph = async () => {
  graph.clear();
  blob = JSON.stringify(undostack);
  localStorage.setItem("GraphJson", blob);
  graph_undo_redo = [];
  graphsteps = [];
  console.log(graphsteps.length);
  let panel = document.getElementById("paper2li");
  panel.innerHTML = "";
  $("#file").val("");
};
