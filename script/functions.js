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
    element.type === "BoosterPumpHouse"
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
    element.type === "BoosterPumpHouse"
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
    element.type === "BoosterPumpHouse"
  ) {
    listItem += `
      <li class="UL">
        <div class="edit-container">
          <span class="display">CBM:</span>
          <span id="${element.id}-level-display">${element.attrs.graphlevel.text}</span>
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

  if (
    element.type === "LiquidTank" ||
    element.type === "squareTank" ||
    element.type === "BoosterPumpHouse"
  ) {
    $(`#${element.id}-location-display`).on("click", function () {
      editLocation(element.id);
    });
  }

  if (
    element.type === "LiquidTank" ||
    element.type === "squareTank" ||
    element.type === "BoosterPumpHouse"
  ) {
    $(`#${element.id}-level-display`).on("click", function () {
      editLevel(element.id);
    });
  }

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

  if (element.type === "HandValve" || element.type === "ControlValve") {
    $(`#rotate-${element.id}`).on("click", function () {
      cell.rotateValve(90); // Rotate the valve 90 degrees clockwise
    });
  }

  if (
    element.type === "LiquidTank" ||
    element.type === "squareTank" ||
    element.type === "BoosterPumpHouse"
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
  waterLevelDisplay.innerHTML = `<input id="${cellId}-waterLevel-input" type="number"  onblur="saveWaterLevel('${cellId}')" onkeypress="handleEnter(event, '${cellId}')"/>`;

  // Focus the input field
  const input = document.getElementById(`${cellId}-waterLevel-input`);
  input.focus();
}

// Function to handle saving waterLevel
function saveWaterLevel(cellId) {
  const input = document.getElementById(`${cellId}-waterLevel-input`);
  const newWaterLevel = input.value.trim();

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
}

// Function to handle editing location
function editLocation(cellId) {
  const locationDisplay = document.getElementById(`${cellId}-location-display`);
  const currentLocation = locationDisplay.innerText;

  // Replace the location display with an input field
  locationDisplay.innerHTML = `<input id="${cellId}-location-input" type="text"  onblur="saveLocation('${cellId}')" onkeypress="handleEnter(event, '${cellId}')"/>`;

  // Focus the input field
  const input = document.getElementById(`${cellId}-location-input`);
  input.focus();
}

// Function to handle saving location
function saveLocation(cellId) {
  const input = document.getElementById(`${cellId}-location-input`);
  const newLocation = input.value.trim();

  // Update the location in the DOM
  const locationDisplay = document.getElementById(`${cellId}-location-display`);
  locationDisplay.innerHTML = `${newLocation}`;

  // Update the location in the cell model
  const cell = graph.getCell(cellId);
  if (cell) {
    cell.attr("location/text", newLocation);
  }

  console.log(`Updated location for ${cellId}: ${newLocation}`);
}

function editLevel(cellId) {
  const levelDisplay = document.getElementById(`${cellId}-level-display`);

  // Replace the location display with an input field
  levelDisplay.innerHTML = `<input id="${cellId}-level-input" type="number"  onblur="saveLevel('${cellId}')" onkeypress="handleEnter(event, '${cellId}')"/>`;

  // Focus the input field
  const input = document.getElementById(`${cellId}-level-input`);
  input.focus();
}

// Function to handle saving location
function saveLevel(cellId) {
  const input = document.getElementById(`${cellId}-level-input`);
  const newLevel = input.value.trim();

  // Update the location in the DOM
  const levelDisplay = document.getElementById(`${cellId}-level-display`);
  levelDisplay.innerHTML = `${newLevel}`;

  // Update the location in the cell model
  const cell = graph.getCell(cellId);
  cell.updateWaterLevel(newLevel);
}

// Function to turn the lower 'Name' into an editable input field
function editName(cellId) {
  const nameDisplay = document.getElementById(`${cellId}-name-display`);

  // Replace the name display with an input field
  nameDisplay.innerHTML = `<input id="${cellId}-name-input" type="text"  onblur="saveName('${cellId}')" onkeypress="handleEnter(event, '${cellId}')"/>`;

  // Focus the input field
  const input = document.getElementById(`${cellId}-name-input`);
  input.focus();
}

// Function to save the name once editing is done
function saveName(cellId) {
  const input = document.getElementById(`${cellId}-name-input`);
  const newName = input.value;

  // Update the name in the DOM
  const nameDisplay = document.getElementById(`${cellId}-name-display`);
  nameDisplay.innerHTML = newName;

  // Update the name in the main text
  const mainText = document.getElementById(`${cellId}-text`);
  mainText.innerText = newName;

  // Update the name in the cell model
  const cell = graph.getCell(cellId);
  if (cell) {
    cell.attr("label/text", newName);
  }

  console.log(`Updated name for ${cellId}: ${newName}`);
}

// Function to handle pressing Enter to save the name
function handleEnter(event, cellId) {
  if (event.key === "Enter") {
    // saveName(cellId);
    // saveLocation(cellId);
    // saveLevel(cellId);
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
