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

  if (
    element.type === "LiquidTank" ||
    element.type === "squareTank" ||
    element.type === "BoosterPumpHouse" ||
    element.type === "ConicTank"
  ) {
    listItem += `
    <li class="UL">
        <div class="port-settings">
          <div class="edit-container">
            <span for="${element.id}-port-type" class="display">Port:</span>
            <select id="${element.id}-port-type">
              <option value="in">in</option>
              <option value="out">out</option>
            </select>
          </div>

            <div class="edit-container">
              <!-- Input field for X position -->
              <span class="display">Position-X:</span>
              <span id="${element.id}-position-x-display">0</span>
            </div>

            <div class="edit-container">
              <!-- Input field for Y position -->
              <span class="display">Position-Y:</span>
              <span id="${element.id}-position-y-display">0</span>
            </div>

          <div class="edit-container">
            <!-- Input field for entering the position value -->
            <span class="display">Size:</span>
            <span id="${element.id}-size-display">0</span>
          </div>
        </div>
    </li>
  `;
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
  waterLevelDisplay.innerHTML = `<input id="${cellId}-waterLevel-input" type="number"  onblur="saveWaterLevel('${cellId}')" onkeypress="handleEnter(event, '${cellId}', 'waterLevel')"/>`;

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
      return;
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
  locationDisplay.innerHTML = `<input id="${cellId}-location-input" type="text"  onblur="saveLocation('${cellId}')" onkeypress="handleEnter(event, '${cellId}', 'location')"/>`;

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
  levelDisplay.innerHTML = `<input id="${cellId}-level-input" type="number"  onblur="saveLevel('${cellId}')" onkeypress="handleEnter(event, '${cellId}', 'level')"/>`;

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
  nameDisplay.innerHTML = `<input id="${cellId}-name-input" type="text"  onblur="saveName('${cellId}')" onkeypress="handleEnter(event, '${cellId}', 'name')"/>`;

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

// Function to handle editing location
function editPositionX(cellId) {
  const positionXDisplay = document.getElementById(
    `${cellId}-position-x-display`
  );

  // Replace the position-X display with an input field
  positionXDisplay.innerHTML = `<input id="${cellId}-position-x-input" type="number" onblur="savePositionX('${cellId}')" onkeypress="handleEnter(event, '${cellId}', 'position-x')"/>`;

  // Focus the input field
  const inputX = document.getElementById(`${cellId}-position-x-input`);
  inputX.focus();
}
function editPositionY(cellId) {
  const positionYDisplay = document.getElementById(
    `${cellId}-position-y-display`
  );

  // Replace the position-Y display with an input field
  positionYDisplay.innerHTML = `<input id="${cellId}-position-y-input" type="number" onblur="savePositionY('${cellId}')" onkeypress="handleEnter(event, '${cellId}', 'position-y')"/>`;

  // Focus the input field
  const inputY = document.getElementById(`${cellId}-position-y-input`);
  inputY.focus();
}

// Function to handle saving location
function savePositionX(cellId) {
  try {
    const portTypeSelect = document.getElementById(`${cellId}-port-type`);
    const inputX = document.getElementById(`${cellId}-position-x-input`);
    let newPositionX = parseFloat(inputX.value.trim());

    if (isNaN(newPositionX)) {
      newPositionX = 0;
    }
    if (newPositionX > 180 || newPositionX < -10) {
      alert("Please input from range of -10 to 180");
      newPositionX = 0;
    }

    // Update the position-X in the DOM display
    const positionXDisplay = document.getElementById(
      `${cellId}-position-x-display`
    );
    try {
      if (positionXDisplay) positionXDisplay.innerHTML = `${newPositionX}`;
    } catch (error) {}

    // Update the position-X in the cell model based on the selected port type
    const cell = graph.getCell(cellId);
    const elements = graph.getElements();
    if (cell) {
      let group = cell.get("ports");

      if (portTypeSelect.value === "out") {
        group.groups.out.position.args.x = newPositionX;
      } else if (portTypeSelect.value === "in") {
        group.groups.in.position.args.x = newPositionX;
      }

      // Trigger a change event to update the size in the graph
      cell.trigger("change:ports", cell);
      elements.forEach((element) => {
        element.remove({ disconnectLinks: false });
        graph.addCell(element);
      });
    }
  } catch (error) {
    console.error("Error updating Position-X:", error);
  }
}
function savePositionY(cellId) {
  try {
    const portTypeSelect = document.getElementById(`${cellId}-port-type`);
    const inputY = document.getElementById(`${cellId}-position-y-input`);
    let newPositionY = parseFloat(inputY.value.trim());

    if (isNaN(newPositionY)) {
      newPositionY = 0;
    }
    if (newPositionY > 180 || newPositionY < -10) {
      alert("Please input from range of -10 to 180");
      newPositionY = 0;
    }

    // Update the position-Y in the DOM display
    const positionYDisplay = document.getElementById(
      `${cellId}-position-y-display`
    );
    try {
      if (positionYDisplay) positionYDisplay.innerHTML = `${newPositionY}`;
    } catch (error) {}

    // Update the position-Y in the cell model based on the selected port type
    const cell = graph.getCell(cellId);
    const elements = graph.getElements();
    if (cell) {
      let group = cell.get("ports");

      if (portTypeSelect.value === "out") {
        group.groups.out.position.args.y = newPositionY;
      } else if (portTypeSelect.value === "in") {
        group.groups.in.position.args.y = newPositionY;
      }

      // Trigger a change event to update the ports in the graph
      cell.trigger("change:ports", cell);
      elements.forEach((element) => {
        element.remove({ disconnectLinks: false });
        graph.addCell(element);
      });
    }
  } catch (error) {
    console.error("Error updating Position-Y:", error);
  }
}

// Function to handle editing size for ports
function editSize(cellId) {
  const sizeDisplay = document.getElementById(`${cellId}-size-display`);

  // Replace the size display with an input field
  sizeDisplay.innerHTML = `<input id="${cellId}-size-input" type="number" onblur="saveSize('${cellId}')" onkeypress="handleEnter(event, '${cellId}', 'size')"/>`;

  // Focus the input field
  const inputSize = document.getElementById(`${cellId}-size-input`);
  inputSize.focus();
}

// Function to handle saving Size for ports
function saveSize(cellId) {
  try {
    const portTypeSelect = document.getElementById(`${cellId}-port-type`);
    const inputSize = document.getElementById(`${cellId}-size-input`);
    let newSize = parseFloat(inputSize.value.trim());

    if (isNaN(newSize)) {
      newSize = 1.3;
    }

    if (newSize < 1.3 || newSize > 8) {
      alert("Please enter value between 1.3 to 8");
      newSize = 1.3;
    }

    // Update the size in the DOM display
    const sizeDisplay = document.getElementById(`${cellId}-size-display`);
    try {
      if (sizeDisplay) sizeDisplay.innerHTML = `${newSize}`;
    } catch (error) {}

    // Update the size in the cell model
    const cell = graph.getCell(cellId);
    if (cell) {
      const elements = graph.getElements();

      let group = cell.get("ports");
      if (portTypeSelect.value === "out") {
        group.groups.out.attrs.portBody.r = newSize;
      } else if (portTypeSelect.value === "in") {
        group.groups.in.attrs.portBody.r = newSize;
      }

      // Trigger a change event to update the size in the graph
      cell.trigger("change:ports", cell);
      elements.forEach((element) => {
        element.remove({ disconnectLinks: false });
        graph.addCell(element);
      });
    }
  } catch (error) {
    console.error("Error updating Size:", error);
  }
}

// Function to handle pressing Enter to save the name
function handleEnter(event, cellId, type) {
  if (event.key === "Enter") {
    switch (type) {
      case "position-x":
        savePositionX(cellId);
        break;
      case "position-y":
        savePositionY(cellId);
        break;
      case "size":
        saveSize(cellId);
        break;
      case "waterLevel":
        saveWaterLevel(cellId);
        break;
      case "name":
        saveName(cellId);
        break;
      case "location":
        saveLocation(cellId);
        break;
      case "level":
        saveLevel(cellId);
        break;
      default:
        console.log("Invalid type");
    }
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
