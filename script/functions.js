//--------------------------right pannel list-------------------------------
const disableClick = () => {
  //console.log("Wont Open ");
  $("#paper2li")
    .children("LI")
    .each(function () {
      $(this).children("UL").children("LI").css("display", "none");
    });
};

// Append the element to the list with a blue-themed UI and editable name in the lower <li>
const append3rd = (cell) => {
  let element = cell.attributes;
  if (element === undefined) {
    element = cell;
    if (element.type === "Panel") return;
  }

  // Create the base list item with the image, name, and check icon
  let listItem = `
    <li id="${element.id}" class="element" style="padding-top: 10px;">
      <span>
        <strong>
          <img class="paper-image element" src="${
            element.attrs.panel.href
          }" alt="icon"/>
          <span id="${cell.id + "-text"}">${element.attrs.label.text}</span>
        </strong>
        <i class="fa fa-check-circle check_icon"></i>
      </span>
      <ul class="UL-list">
  `;

  // For elements with edit functionality (like name editing)
  listItem += `
    <li class="UL" id="edit-container-${element.id}">
      <div class="edit-container">
        <span class="display">NAME:</span>
        <span id="${element.id}-name-display"> ${element.attrs.label.text}</span>
      </div>
    </li>`;

  // Conditionally add elements based on type
  if (element.type === "HandValve" || element.type === "ControlValve") {
    listItem += `
        <button id="rotate-${element.id}" class="rotate-btn UL">Rotate 90°</button>
      `;
  }

  if (
    element.type === "LiquidTank" ||
    element.type === "squareTank" ||
    element.type === "BoosterPumpHouse" ||
    element.type === "ConicTank"
  ) {
    let waterLevel = 0;
    if (parseFloat(element.attrs.waterLevel.text) === NaN) {
      waterLevel = 0;
    }
    listItem += `
      <li class="UL">
        <div class="edit-container">
          <span class="display">WaterLevel:</span>
          <span id="${element.id}-waterLevel-display"> ${waterLevel}</span>
        </div>
      </li>`;
  }

  if (element.type === "FlowMeter") {
    listItem += `
      <li class="UL">
        <div class="edit-container">
          <span class="display">Meter:</span>
          <input id="${element.id}-flow-m3h" class="flowInput" type="number" placeholder="0"/>
        </div>
      </li>
      <li class="UL">
        <div class="edit-container">
          <span class="display">Meter:</span>
          <input id="${element.id}-flow-mld" class="flowInput" type="number" placeholder="0"/>
        </div>
      </li>`;
  }

  if (
    element.type === "LiquidTank" ||
    element.type === "squareTank" ||
    element.type === "BoosterPumpHouse" ||
    element.type === "ConicTank"
  ) {
    listItem += `
      <li class="UL">
        <div class="edit-container">
          <span class="display">Location:</span>
          <span id="${element.id}-location-display">${element.attrs.location.text}</span>
        </div>
      </li>`;
  }

  if (
    element.type === "LiquidTank" ||
    element.type === "squareTank" ||
    element.type === "BoosterPumpHouse" ||
    element.type === "ConicTank"
  ) {
    listItem += `
      <li class="UL">
        <div class="edit-container">
          <span class="display">CBM:</span>
          <span id="${element.id}-level-display">${element.attrs.graphlevel.text}</span>
        </div>
      </li>`;
  }

  // Get available port types dynamically
  const portGroups = element.ports.groups;
  const portTypes = Object.keys(portGroups); // Get the port group names dynamically

  // Generate the dropdown options dynamically based on the available port groups
  let portOptions = portTypes
    .map((port) => `<option value="${port}">${port}</option>`)
    .join("");

  // Set default port value to be the first available port type (if any)
  const defaultPort = portTypes[0];

  // Get initial position-X, position-Y, and size values based on the default port type
  const initialPositionX = portGroups[defaultPort]?.position?.args?.x || 0;
  const initialPositionY = portGroups[defaultPort]?.position?.args?.y || 0;
  const initialSize = portGroups[defaultPort]?.attrs?.portBody?.r || 1.3;

  let minX, minY, maxX, maxY;
  if (element.type === "LiquidTank" || element.type === "BoosterPumpHouse") {
    minX = 0;
    minY = 30;
    maxX = 150;
    maxY = 160;
  } else if (element.type === "ConicTank") {
    minX = 0;
    minY = 0;
    maxX = 132;
    maxY = 170;
  } else if (element.type === "squareTank") {
    minX = 0;
    minY = 0;
    maxX = 150;
    maxY = 120;
  }
  if (
    element.type === "LiquidTank" ||
    element.type === "squareTank" ||
    element.type === "BoosterPumpHouse" ||
    element.type === "ConicTank"
  ) {
    listItem += `
    <li class="UL">
      <div class="edit-container">
        <span for="${element.id}-port-type" class="display">Port:</span>
        <select id="${element.id}-port-type" onchange="updatePortValues('${element.id}')">${portOptions}</select>
      </div>
    </li>
    <li class="UL">
      <div class="edit-container">
        <span class="display">Position-X:</span>
        
        <input id="${element.id}-position-x-slider" 
          type="range"
          min="${minX}"
          max="${maxX}"
          step="1"
          value="${initialPositionX}"
          onmousemove="savePositionX('${element.id}', this.value)" 
           />
      </div>
    </li>
    <li class="UL">
      <div class="edit-container">
        <span class="display">Position-Y:</span>
        <input id="${element.id}-position-y-slider" 
          type="range"
          min="${minY}"
          max="${maxY}"
          step="1"
          value="${initialPositionY}"
          onmousemove="savePositionY('${element.id}', this.value)" 
           />
      </div>
    </li>
    <li class="UL">
      <div class="edit-container">
        <span class="display">Size:</span>
        <input id="${element.id}-size-slider" 
          type="range"
          min="1.3"
          max="5"
          step="0.1"
          value="${initialSize}" 
          onmousemove="saveSize('${element.id}', this.value)" 
          />
      </div>
    </li>`;
  }

  // Close the unordered list and list item
  listItem += `
      </ul>
      <br/>
    </li>`;

  // Append the constructed list item to the target element
  $("#paper2li").append(listItem);

  // Attach event listeners for name editing
  $(`#edit-container-${element.id}`).on("click", function () {
    editName(element.id);
  });

  // Attach event listeners for location editing
  if (
    element.type === "LiquidTank" ||
    element.type === "squareTank" ||
    element.type === "BoosterPumpHouse" ||
    element.type === "ConicTank"
  ) {
    $(`#${element.id}-location-display`).on("click", function () {
      editLocation(element.id);
    });
  }

  //Attach event listeners for port adjustment location editing
  if (
    element.type === "LiquidTank" ||
    element.type === "squareTank" ||
    element.type === "BoosterPumpHouse" ||
    element.type === "ConicTank"
  ) {
    // Attach event listeners for editing Position-X
    $(`#${element.id}-position-x-display`).on("click", function () {
      editPositionX(element.id);
    });

    // Attach event listeners for editing Position-Y
    $(`#${element.id}-position-y-display`).on("click", function () {
      editPositionY(element.id);
    });

    // Attach event listeners for editing Size
    $(`#${element.id}-size-display`).on("click", function () {
      editSize(element.id); // Open edit mode for Size
    });
  }

  // Attach event listeners for panel Level editing
  if (
    element.type === "LiquidTank" ||
    element.type === "squareTank" ||
    element.type === "BoosterPumpHouse" ||
    element.type === "ConicTank"
  ) {
    $(`#${element.id}-level-display`).on("click", function () {
      editLevel(element.id);
    });
  }

  // Attach event listeners for flowMeter editing
  if (element.type === "FlowMeter") {
    $(`#${element.id}-flow-m3h`).on("change", function () {
      cell = graph.getCell(element.id);
      let flow = parseFloat($(this).val());
      updateFlowRate(cell, flow, "m³/h");
    });

    $(`#${element.id}-flow-mld`).on("change", function () {
      cell = graph.getCell(element.id);
      let flow = parseFloat($(this).val());
      updateFlowRate(cell, flow, "MLD");
    });
  }

  // Attach event listeners for rotation
  if (element.type === "HandValve" || element.type === "ControlValve") {
    $(`#rotate-${element.id}`).on("click", function () {
      cell = graph.getCell(element.id);
      cell.rotate(90); // Rotate the valve 90 degrees clockwise
    });
  }

  // Attach event listeners for waterLevel editing
  if (
    element.type === "LiquidTank" ||
    element.type === "squareTank" ||
    element.type === "BoosterPumpHouse" ||
    element.type === "ConicTank"
  ) {
    $(`#${element.id}-waterLevel-display`).on("click", function () {
      editWaterLevel(element.id);
    });
  }
};

//Function to handle editing water Level
function editWaterLevel(cellId) {
  const waterLevelDisplay = document.getElementById(
    `${cellId}-waterLevel-display`
  );

  // Replace the location display with an input field
  waterLevelDisplay.innerHTML = `<input id="${cellId}-waterLevel-input" type="number"  onblur="saveWaterLevel('${cellId}')"/>`;

  // Focus the input field
  const input = document.getElementById(`${cellId}-waterLevel-input`);
  input.focus();
}

// Function to handle saving waterLevel
function saveWaterLevel(cellId) {
  try {
    const input = document.getElementById(`${cellId}-waterLevel-input`);
    let newWaterLevel = input.value.trim();

    if (newWaterLevel === "") {
      newWaterLevel = 0;
    }

    if (isNaN(newWaterLevel) || newWaterLevel < 0 || newWaterLevel > 5) {
      alert("Please enter a valid level between 0 and 5.");
      newWaterLevel = 0;
    }

    // Update the waterLevel in the DOM
    const locationDisplay = document.getElementById(
      `${cellId}-waterLevel-display`
    );
    locationDisplay.innerHTML = `${newWaterLevel}`;

    // Update the waterLevel in the cell model
    const cell = graph.getCell(cellId);
    if (cell) {
      // Get the current text value of the water level
      setLevel(cell, (newWaterLevel / 5) * 100);

      // Update only the numeric part of the waterlevel text attribute
      cell.attr("waterlevel/text", newWaterLevel);
    }
  } catch (error) {}
}

// Function to handle editing location
function editLocation(cellId) {
  const locationDisplay = document.getElementById(`${cellId}-location-display`);

  // Replace the location display with an input field
  locationDisplay.innerHTML = `<input id="${cellId}-location-input" type="text"  onblur="saveLocation('${cellId}')"/>`;

  // Focus the input field
  const input = document.getElementById(`${cellId}-location-input`);
  input.focus();
}

// Function to handle saving location
function saveLocation(cellId) {
  try {
    const input = document.getElementById(`${cellId}-location-input`);

    let newLocation = input.value.trim();

    if (newLocation === "") {
      newLocation = "Location";
    }

    // Update the location in the DOM
    const locationDisplay = document.getElementById(
      `${cellId}-location-display`
    );
    if (newLocation !== "") locationDisplay.innerHTML = `${newLocation}`;

    // Update the location in the cell model
    const cell = graph.getCell(cellId);
    if (cell) {
      cell.attr("location/text", newLocation);
    }
  } catch (error) {}
}

function editLevel(cellId) {
  const levelDisplay = document.getElementById(`${cellId}-level-display`);

  // Replace the location display with an input field
  levelDisplay.innerHTML = `<input id="${cellId}-level-input" type="number"  onblur="saveLevel('${cellId}')"/>`;

  // Focus the input field
  const input = document.getElementById(`${cellId}-level-input`);
  input.focus();
}

// Function to handle saving location
function saveLevel(cellId) {
  try {
    const input = document.getElementById(`${cellId}-level-input`);
    let newLevel = input.value.trim();

    if (newLevel === "") {
      newLevel = "0 cbm";
    }

    // Update the location in the DOM
    const levelDisplay = document.getElementById(`${cellId}-level-display`);
    levelDisplay.innerHTML = `${newLevel}`;

    // Update the location in the cell model
    const cell = graph.getCell(cellId);
    if (cell) {
      updateWaterLevel(cell, newLevel);
    }
  } catch (error) {}
}

// Function to turn the lower 'Name' into an editable input field
function editName(cellId) {
  const nameDisplay = document.getElementById(`${cellId}-name-display`);

  // Replace the name display with an input field
  nameDisplay.innerHTML = `<input id="${cellId}-name-input" type="text"  onblur="saveName('${cellId}')"/>`;

  // Focus the input field
  const input = document.getElementById(`${cellId}-name-input`);
  input.focus();
}

// Function to save the name once editing is done
function saveName(cellId) {
  try {
    const cell = graph.getCell(cellId);

    const input = document.getElementById(`${cellId}-name-input`);
    let newName = input.value;
    if (newName === "") {
      newName = cell.attr("label/text");
    }
    // Update the name in the DOM
    const nameDisplay = document.getElementById(`${cellId}-name-display`);
    nameDisplay.innerHTML = newName;

    // Update the name in the main text
    const mainText = document.getElementById(`${cellId}-text`);
    mainText.innerText = newName;

    // Update the name in the cell model

    if (cell) {
      cell.attr("label/text", newName);
    }
  } catch (error) {}
}

// Function to handle saving location
function savePositionX(cellId) {
  try {
    const portTypeSelect = document.getElementById(`${cellId}-port-type`);
    const selectedPortType = portTypeSelect ? portTypeSelect.value : null;
    const inputX = document.getElementById(`${cellId}-position-x-slider`);
    let newPositionX = parseFloat(inputX.value.trim());

    // Update the position-X in the cell model based on the selected port type
    const cell = graph.getCell(cellId);
    if (cell && selectedPortType) {
      let group = cell.get("ports");

      // Update the position-X of the selected port type dynamically
      if (group.groups[selectedPortType]) {
        group.groups[selectedPortType].position.args.x = newPositionX;
      }

      // Update the graph with the new position-X without removing/re-adding the cell
      cell.set("ports", group); // Update the port group directly
      cell.trigger("change:ports", cell);
      cell.remove({ disconnectLinks: false });
      graph.addCell(cell);
      if (cell.attributes.power === 0) {
        addPanel(cell.attributes.type, cell);
      }
    }
  } catch (error) {
    console.error("Error updating Position-X:", error);
  }
}

let newPositionY;
// Function to handle saving Y position for ports using the slider
function savePositionY(cellId) {
  try {
    const portTypeSelect = document.getElementById(`${cellId}-port-type`);
    const selectedPortType = portTypeSelect ? portTypeSelect.value : null;
    const inputY = document.getElementById(`${cellId}-position-y-slider`);
    newPositionY = parseFloat(inputY.value.trim());

    // Update the position-Y in the cell model based on the selected port type
    const cell = graph.getCell(cellId);
    if (cell && selectedPortType) {
      let group = cell.get("ports");

      // Update the position-X of the selected port type dynamically
      if (group.groups[selectedPortType]) {
        group.groups[selectedPortType].position.args.y = newPositionY;
      }

      // Update the graph with the new position-Y without removing/re-adding the cell
      cell.set("ports", group); // Update the port group directly
      cell.trigger("change:ports", cell); // Trigger the change event
      cell.remove({ disconnectLinks: false });
      graph.addCell(cell);
      if (cell.attributes.power === 0) {
        addPanel(cell.attributes.type, cell);
      }
    }
  } catch (error) {
    console.error("Error updating Position-Y:", error);
  }
}

let currentSize;
// Function to handle saving size for ports using the slider
function saveSize(cellId) {
  try {
    const portTypeSelect = document.getElementById(`${cellId}-port-type`);
    const selectedPortType = portTypeSelect ? portTypeSelect.value : null;
    const inputSize = document.getElementById(`${cellId}-size-slider`);
    let newSize = parseFloat(inputSize.value.trim());
    currentSize = newSize;

    // Update the size in the DOM display
    const sizeDisplay = document.getElementById(`${cellId}-size-display`);
    const sizeSliderValue = document.getElementById(
      `${cellId}-size-slider-value`
    );
    if (sizeDisplay) sizeDisplay.innerHTML = `${newSize}`;
    if (sizeSliderValue) sizeSliderValue.innerHTML = `${newSize}`; // Update the slider display value

    // Update the size in the cell model
    const cell = graph.getCell(cellId);
    if (cell && selectedPortType) {
      let group = cell.get("ports");

      // Update the port size attribute for the selected port type dynamically
      if (group.groups[selectedPortType]) {
        group.groups[selectedPortType].attrs.portBody.r = newSize;
      }

      // Update the graph with the new port size without removing/re-adding the cell
      cell.trigger("change:ports", cell);
      cell.remove({ disconnectLinks: false });
      graph.addCell(cell);
      if (cell.attributes.power === 0) {
        addPanel(cell.attributes.type, cell);
      }
    }
  } catch (error) {
    console.error("Error updating Size:", error);
  }
}

// Function to update the slider values based on the selected port type
function updatePortValues(cellId) {
  const portTypeSelect = document.getElementById(`${cellId}-port-type`);
  const selectedPortType = portTypeSelect ? portTypeSelect.value : null;

  const cell = graph.getCell(cellId);
  if (cell && selectedPortType) {
    const group = cell.get("ports").groups[selectedPortType];

    // Get initial values for position and size for the selected port
    const positionX = group?.position?.args?.x || 0;
    const positionY = group?.position?.args?.y || 0;
    const size = group?.attrs?.portBody?.r || 1.3;
    console.log(positionX, positionY);

    // Update the sliders and their display values
    document.getElementById(`${cellId}-position-x-slider`).value = positionX;
    document.getElementById(`${cellId}-position-y-slider`).value = positionY;
    document.getElementById(`${cellId}-size-slider`).value = size;
  }
}

var elementvisible = (ID) => {
  $("#paper2li")
    .children("LI")
    .each(function () {
      if (this.id != ID) {
        $(this).hide(); // Hide the entire LI if it's not the target ID
      } else {
        $(this).show(); // Show the LI that matches the target ID
      }

      // Show all .UL elements for the visible LI
      const ulElements = this.querySelectorAll(".UL");
      ulElements.forEach((ul) => {
        ul.style.display = "block"; // Show each .UL within the visible LI
      });
    });
};

var elementdisable = (elementView) => {
  let item_id = elementView.model.id;

  $("#paper2li")
    .children("LI")
    .each(function () {
      if (this.id != item_id) {
        $(this).show(); // Show all LI elements that don't match the current element's ID
      }

      // Hide all .UL elements for every LI
      const ulElements = this.querySelectorAll(".UL");
      ulElements.forEach((ul) => {
        ul.style.display = "none"; // Hide each .UL for all LIs
      });
    });
};

// Convert flow rate from m³/h to MLD
convertM3hToMLD = (m3h) => {
  return (m3h * 0.024).toFixed(2);
};

// Convert flow rate from MLD to m³/h
convertMLDToM3h = (mld) => {
  return (mld / 0.024).toFixed(2);
};

// Update flow rate dynamically
updateFlowRate = (cell, value, unit = "m³/h") => {
  if (unit === "m³/h") {
    const mld = convertM3hToMLD(value);
    cell.set("flowRateM3h", parseFloat(value));
    cell.set("flowRateMLD", parseFloat(mld));
    cell.attr("m3h/text", `Flow: ${parseFloat(value)} m³/h`);
    cell.attr("mld/text", `${parseFloat(mld)} MLD`);
  } else if (unit === "MLD") {
    const m3h = convertMLDToM3h(value);
    cell.set("flowRateMLD", value);
    cell.set("flowRateM3h", m3h);
    cell.attr("m3h/text", `Flow: ${parseFloat(m3h)} m³/h`);
    cell.attr("mld/text", `${parseFloat(value)} MLD`);
  }
};

//LEVEL
setLevel = (cell, level) => {
  const newLevel = Math.max(0, Math.min(100, level)); // Clamp level between 0 and 100
  cell.set("level", newLevel);

  // Calculate the height for the liquid fill based on the level
  const levelHeight = (newLevel / 100) * 90; // Assume full height of indicator is 90px
  cell.attr("liquid/height", levelHeight);
  cell.attr("liquid/y", 85 - levelHeight); // Adjust y to move the liquid up

  // Update the waterLevel text to display the current water level in meters
  const waterLevelMeters = (newLevel / 20).toPrecision(4); // Assume 5 meters corresponds to 100%
  cell.attr("waterLevel/text", `Level: ${parseFloat(waterLevelMeters)} m`);

  // Update the panel if it's embedded
  const embeddedPanel = cell.getEmbeddedCells();

  if (embeddedPanel) {
    setLevelPanel(embeddedPanel[0], newLevel); // Update the panel's level
  }
};

//level for panel
setLevelPanel = (cell, level) => {
  const newLevel = Math.max(0, Math.min(100, level)); // Clamp level between 0 and 100
  cell.set("level", newLevel);

  // Update the liquid height based on the new level
  const liquidHeight = (newLevel / 100) * 80;
  cell.attr("liquid/height", liquidHeight);
  cell.attr("liquid/y", 85 - liquidHeight);
};

//graph level cbm
updateWaterLevel = (cell, level) => {
  cell.attr("graphlevel/text", `${parseFloat(level)} cbm`);
};

//add Panel if JSON save
addPanel = (type, cell) => {
  if (type === "LiquidTank") {
    const panel = new Panel();
    panel.position(cell.position().x + 10, cell.position().y + 60);
    panel.addTo(graph);
    cell.embed(panel);
  } else if (type === "BoosterPumpHouse") {
    const panel = new Panel();
    panel.position(cell.position().x + 5, cell.position().y + 60);
    panel.addTo(graph);
    cell.embed(panel);
  } else if (type === "squareTank") {
    const panel = new Panel();
    panel.position(cell.position().x + 10, cell.position().y + 20);
    panel.addTo(graph);
    cell.embed(panel);
  } else if (type === "ConicTank") {
    const panel = new Panel();
    panel.position(cell.position().x + 5, cell.position().y + 10);
    panel.addTo(graph);
    cell.embed(panel);
  }
};
