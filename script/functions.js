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
          <input id="${element.id}-flow-m3h" class="flowInput" type="number" value="${element.attrs.flowRateM3h}"/>
        </div>
      </li>
      <li class="UL">
        <div class="edit-container">
          <span class="display">Meter:</span>
          <input id="${element.id}-flow-mld" class="flowInput" type="number" value="${element.attrs.flowRateMLD}"/>
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
              <option value="in">In</option>
              <option value="out">Out</option>
            </select>
          </div>

          <div class="edit-container">
          <!-- Dropdown for selecting the position type (x or y) -->
          <span for="${element.id}-position-type" class="display">Position:</span>
          <select id="${element.id}-position-type">
            <option value="x">X</option>
            <option value="y">Y</option>
          </select>
          </div>

          <div class="edit-container">
            <!-- Input field for entering the position value -->
            <span class="display">Position:</span>
            <span id="${element.id}-position-display">0</span>
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

  //Attach event listeners for portOut location editing
  if (
    element.type === "LiquidTank" ||
    element.type === "squareTank" ||
    element.type === "BoosterPumpHouse" ||
    element.type === "ConicTank"
  ) {
    $(`#${element.id}-position-display`).on("click", function () {
      editPortOut(element.id);
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
      let flow = parseFloat($(this).val());
      cell.updateFlowRate(flow, "m³/h");
    });

    $(`#${element.id}-flow-mld`).on("change", function () {
      let flow = parseFloat($(this).val());
      cell.updateFlowRate(flow, "MLD");
    });
  }

  // Attach event listeners for rotation
  if (element.type === "HandValve" || element.type === "ControlValve") {
    $(`#rotate-${element.id}`).on("click", function () {
      cell.rotateValve(90); // Rotate the valve 90 degrees clockwise
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
      cell.setlevel((newWaterLevel / 5) * 100);
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
    cell.updateWaterLevel(newLevel);
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
function editPortOut(cellId) {
  const portLocation = document.getElementById(`${cellId}-position-display`);

  // Replace the location display with an input field
  portLocation.innerHTML = `<input id="${cellId}-position-input" type="number"  onblur="savePortOut('${cellId}')" onkeypress="handleEnter(event, '${cellId}', 'portOut')"/>`;

  // Focus the input field
  const input = document.getElementById(`${cellId}-position-input`);
  input.focus();
}

// Function to handle saving location
function savePortOut(cellId) {
  try {
    const portTypeSelect = document.getElementById(`${cellId}-port-type`);
    const positionTypeSelect = document.getElementById(
      `${cellId}-position-type`
    );
    const input = document.getElementById(`${cellId}-position-input`);
    let newPortOut = input.value.trim();

    if (newPortOut === "") {
      newPortOut = 0;
    }

    // Update the location in the DOM
    const portLocation = document.getElementById(`${cellId}-position-display`);
    portLocation.innerHTML = `${newPortOut}`;

    // Update the location in the cell model
    const cell = graph.getCell(cellId);
    if (cell) {
      let group = cell.get("ports");
      //group.groups.out.position.args.y = newPortOut;

      if (portTypeSelect.value === "out") {
        if (positionTypeSelect.value === "y") {
          group.groups.out.position.args.y = newPortOut;
        } else if (positionTypeSelect.value === "x") {
          group.groups.out.position.args.x = newPortOut;
        }
      }

      if (portTypeSelect.value === "in") {
        if (positionTypeSelect.value === "y") {
          group.groups.in.position.args.y = newPortOut;
        } else if (positionTypeSelect.value === "x") {
          group.groups.in.position.args.x = newPortOut;
        }
      }

      cell.trigger("change:ports", cell);

      // Temporarily remove the cell
      cell.remove({ disconnectLinks: false });

      // Re-add the cell to the graph
      graph.addCell(cell);
    }
  } catch (error) {}
}

// Function to handle pressing Enter to save the name
function handleEnter(event, cellId, type) {
  if (event.key === "Enter") {
    switch (type) {
      case "portOut":
        savePortOut(cellId);
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

//------------------------Graph Create from JSON
// const createGraph = async (json) => {
//   json = JSON.parse(json);
//   await graph.fromJSON(json);
//   // console.log(graph.fromJSON(json.attributes));

//   console.log("Create Graph Function");
//   json["cells"].forEach((cell) => {
//     if (cell.type != "link") {
//       append3rd(cell);
//       console.log(cell);
//     }
//   });
//   span();
// };

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
