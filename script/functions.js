//--------------------------right pannel list-------------------------------
const disableClick = () => {
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

  listItem += `
    <li class="UL" id="edit-container-${element.id}">
      <div class="edit-container">
        <span class="display">NAME:</span>
        <span id="${element.id}-name-display"> ${element.attrs.label.text}</span>
      </div>
    </li>`;

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
          <span id="${element.id}-waterLevel-display">${element.attrs.water.text}</span>
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
  const portTypes = Object.keys(portGroups);

  let portOptions = portTypes
    .map((port) => `<option value="${port}">${port}</option>`)
    .join("");

  const defaultPort = portTypes[0];

  // Get initial position-X, position-Y, and size values based on the default port type
  const initialPositionX = portGroups[defaultPort]?.position?.args?.x || 0;
  const initialPositionY = portGroups[defaultPort]?.position?.args?.y || 0;
  const initialSize = portGroups[defaultPort]?.attrs?.portBody?.r || 1.3;
  const initialPanelSize = element?.ports?.panel?.size || 5;

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
    </li>
     <li class="UL">
      <div class="edit-container">
        <span class="display">Panel Size:</span>
        <input id="${element.id}-panel-slider" 
          type="range"
          min="1"
          max="5"
          step="1"
          value="${initialPanelSize}" 
          oninput="savePanelSize('${element.id}', this.value)" 
          />
      </div>
    </li>`;
  }

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
      cell.rotate(90);
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

  waterLevelDisplay.innerHTML = `<input id="${cellId}-waterLevel-input" type="number"  onblur="saveWaterLevel('${cellId}')"/>`;

  const input = document.getElementById(`${cellId}-waterLevel-input`);
  input.focus();
}

// Function to handle saving waterLevel
function saveWaterLevel(cellId) {
  try {
    const inputSize = document.getElementById(`${cellId}-panel-slider`);
    const input = document.getElementById(`${cellId}-waterLevel-input`);
    let newWaterLevel = input.value.trim();
    const panelSize = parseFloat(inputSize.value.trim());

    if (newWaterLevel === "") {
      newWaterLevel = 0;
    }

    if (isNaN(newWaterLevel) || newWaterLevel < 0 || newWaterLevel > 5) {
      alert("Please enter a valid level between 0 and 5.");
      newWaterLevel = 0;
    }

    const locationDisplay = document.getElementById(
      `${cellId}-waterLevel-display`
    );
    locationDisplay.innerHTML = `${newWaterLevel}`;

    const cell = graph.getCell(cellId);
    if (cell) {
      if (panelSize === 1) {
        setLevel(cell, (newWaterLevel / 5) * 100, 39, 45);
      } else if (panelSize === 2) {
        setLevel(cell, (newWaterLevel / 5) * 100, 49, 55);
      } else if (panelSize === 3) {
        setLevel(cell, (newWaterLevel / 5) * 100, 59, 65);
      } else if (panelSize === 4) {
        setLevel(cell, (newWaterLevel / 5) * 100, 69, 75);
      } else if (panelSize === 5) {
        setLevel(cell, (newWaterLevel / 5) * 100, 79, 85);
      }

      cell.attr("waterlevel/text", newWaterLevel);
      cell.attr("water/text", newWaterLevel);
    }
  } catch (error) {}
}

// Function to handle editing location
function editLocation(cellId) {
  const locationDisplay = document.getElementById(`${cellId}-location-display`);

  locationDisplay.innerHTML = `<input id="${cellId}-location-input" type="text"  onblur="saveLocation('${cellId}')"/>`;

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

    const locationDisplay = document.getElementById(
      `${cellId}-location-display`
    );
    if (newLocation !== "") locationDisplay.innerHTML = `${newLocation}`;

    const cell = graph.getCell(cellId);
    if (cell) {
      cell.attr("location/text", newLocation);
    }
  } catch (error) {}
}

function editLevel(cellId) {
  const levelDisplay = document.getElementById(`${cellId}-level-display`);

  levelDisplay.innerHTML = `<input id="${cellId}-level-input" type="number"  onblur="saveLevel('${cellId}')"/>`;

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

    const levelDisplay = document.getElementById(`${cellId}-level-display`);
    levelDisplay.innerHTML = `${newLevel}`;

    const cell = graph.getCell(cellId);
    if (cell) {
      updateWaterLevel(cell, newLevel);
    }
  } catch (error) {}
}

// Function to turn the lower 'Name' into an editable input field
function editName(cellId) {
  const nameDisplay = document.getElementById(`${cellId}-name-display`);

  nameDisplay.innerHTML = `<input id="${cellId}-name-input" type="text"  onblur="saveName('${cellId}')"/>`;

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

    const nameDisplay = document.getElementById(`${cellId}-name-display`);
    nameDisplay.innerHTML = newName;

    const mainText = document.getElementById(`${cellId}-text`);
    mainText.innerText = newName;

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

    const cell = graph.getCell(cellId);
    if (cell && selectedPortType) {
      let group = cell.get("ports");

      if (group.groups[selectedPortType]) {
        group.groups[selectedPortType].position.args.x = newPositionX;
      }

      cell.prop("ports", group);
      cell.trigger("change:ports", { property: "ports" });

      const cellView = paper.findViewByModel(cell);
      if (cellView) {
        cellView.update();
      }
    }
  } catch (error) {}
}

// Function to handle saving Y position for ports using the slider
let newPositionY;
function savePositionY(cellId) {
  try {
    const portTypeSelect = document.getElementById(`${cellId}-port-type`);
    const selectedPortType = portTypeSelect ? portTypeSelect.value : null;
    const inputY = document.getElementById(`${cellId}-position-y-slider`);
    newPositionY = parseFloat(inputY.value.trim());

    const cell = graph.getCell(cellId);
    if (cell && selectedPortType) {
      let group = cell.get("ports");

      if (group.groups[selectedPortType]) {
        group.groups[selectedPortType].position.args.y = newPositionY;
      }

      cell.prop("ports", group);
      cell.trigger("change:ports", { property: "ports" });

      const cellView = paper.findViewByModel(cell);
      if (cellView) {
        cellView.update();
      }
    }
  } catch (error) {}
}

// Function to handle saving size for ports using the slider
let currentSize;
function saveSize(cellId) {
  try {
    const portTypeSelect = document.getElementById(`${cellId}-port-type`);
    const selectedPortType = portTypeSelect ? portTypeSelect.value : null;
    const inputSize = document.getElementById(`${cellId}-size-slider`);
    let newSize = parseFloat(inputSize.value.trim());
    currentSize = newSize;

    const cell = graph.getCell(cellId);
    if (cell && selectedPortType) {
      let group = cell.get("ports");

      if (group.groups[selectedPortType]) {
        group.groups[selectedPortType].attrs.portBody.r = newSize;
      }

      cell.prop("ports", group);
      cell.trigger("change:ports", { property: "ports" });

      const cellView = paper.findViewByModel(cell);
      if (cellView) {
        cellView.update();
      }
    }
  } catch (error) {}
}

// Function to update the slider values based on the selected port type
function updatePortValues(cellId) {
  const portTypeSelect = document.getElementById(`${cellId}-port-type`);
  const selectedPortType = portTypeSelect ? portTypeSelect.value : null;

  const cell = graph.getCell(cellId);
  if (cell && selectedPortType) {
    const group = cell.get("ports").groups[selectedPortType];

    const positionX = group?.position?.args?.x || 0;
    const positionY = group?.position?.args?.y || 0;
    const size = group?.attrs?.portBody?.r || 1.3;

    document.getElementById(`${cellId}-position-x-slider`).value = positionX;
    document.getElementById(`${cellId}-position-y-slider`).value = positionY;
    document.getElementById(`${cellId}-size-slider`).value = size;
  }
}

// Function to handle saving size of the panel using the slider
function savePanelSize(cellId) {
  const inputSize = document.getElementById(`${cellId}-panel-slider`);
  let newSize = parseFloat(inputSize.value.trim());

  const cell = graph.getCell(cellId);
  const panel = graph.getCell(cell.attributes.embeds[0]);

  let width, height;
  if (panel) {
    if (newSize === 1) {
      width = 50;
      height = 50;
      cell.attributes.ports.panel.size = 1;
    }
    if (newSize === 2) {
      width = 55;
      height = 60;
      cell.attributes.ports.panel.size = 2;
    }
    if (newSize === 3) {
      width = 50;
      height = 70;
      cell.attributes.ports.panel.size = 3;
    }
    if (newSize === 4) {
      width = 60;
      height = 80;
      cell.attributes.ports.panel.size = 4;
    }
    if (newSize === 5) {
      width = 70;
      height = 90;
      cell.attributes.ports.panel.size = 5;
    }
    panel.remove({ disconnectLinks: false });

    if (cell.attributes.power === 0) {
      addPanelwithSize(cell.attributes.type, cell, width, height);
    } else {
      addPanelwithSize(cell.attributes.type, cell, width, height);
    }
  }
}

var elementvisible = (ID) => {
  $("#paper2li")
    .children("LI")
    .each(function () {
      if (this.id != ID) {
        $(this).hide();
      } else {
        $(this).show();
      }
      const ulElements = this.querySelectorAll(".UL");
      ulElements.forEach((ul) => {
        ul.style.display = "block";
      });
    });
};

var elementdisable = (elementView) => {
  let item_id = elementView.model.id;

  $("#paper2li")
    .children("LI")
    .each(function () {
      if (this.id != item_id) {
        $(this).show();
      }
      const ulElements = this.querySelectorAll(".UL");
      ulElements.forEach((ul) => {
        ul.style.display = "none";
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

//graph level cbm
updateWaterLevel = (cell, level) => {
  cell.attr("graphlevel/text", `${parseFloat(level)} cbm`);
};

//function to set the level of the cell and its embedded panel
setLevel = (cell, level, heightFactor, yOffset) => {
  const newLevel = Math.max(0, Math.min(100, level));
  cell.set("level", newLevel);

  const levelHeight = (newLevel / 100) * heightFactor;
  cell.attr("liquid/height", levelHeight);
  cell.attr("liquid/y", yOffset - levelHeight);

  const waterLevelMeters = (newLevel / 20).toPrecision(4);
  cell.attr("waterLevel/text", `Level: ${parseFloat(waterLevelMeters)} m`);

  const embeddedPanel = cell.getEmbeddedCells();

  if (embeddedPanel && embeddedPanel.length > 0) {
    setPanelLevel(embeddedPanel[0], newLevel, heightFactor, yOffset);
  }
};

//Function to update the level of the embedded panel
setPanelLevel = (cell, level, heightFactor, yOffset) => {
  const newLevel = Math.max(0, Math.min(100, level));
  cell.set("level", newLevel);

  const liquidHeight = (newLevel / 100) * heightFactor;
  cell.attr("liquid/height", liquidHeight);
  cell.attr("liquid/y", yOffset - liquidHeight);
};

addPanelwithSize = (type, cell, width, height) => {
  if (width === 50 && height === 50) {
    addPanel1(type, cell);
  } else if (width === 55 && height === 60) {
    addPanel2(type, cell);
  } else if (width === 50 && height === 70) {
    addPanel3(type, cell);
  } else if (width === 60 && height === 80) {
    addPanel4(type, cell);
  } else if (width === 70 && height === 90) {
    addPanel(type, cell);
  }
};

//add Panel if JSON save
addPanel1 = (type, cell) => {
  const panel = new Panel1();
  if (type === "LiquidTank") {
    panel.position(cell.position().x + 10, cell.position().y + 60);
    panel.addTo(graph);
    cell.embed(panel);
  } else if (type === "BoosterPumpHouse") {
    panel.position(cell.position().x + 5, cell.position().y + 60);
    panel.addTo(graph);
    cell.embed(panel);
  } else if (type === "squareTank") {
    panel.position(cell.position().x + 10, cell.position().y + 20);
    panel.addTo(graph);
    cell.embed(panel);
  } else if (type === "ConicTank") {
    panel.position(cell.position().x + 5, cell.position().y + 10);
    panel.addTo(graph);
    cell.embed(panel);
  }
  setLevel(cell, (cell.attributes.attrs.water.text / 5) * 100, 39, 45);
};

addPanel2 = (type, cell) => {
  const panel = new Panel2();
  if (type === "LiquidTank") {
    panel.position(cell.position().x + 10, cell.position().y + 60);
    panel.addTo(graph);
    cell.embed(panel);
  } else if (type === "BoosterPumpHouse") {
    panel.position(cell.position().x + 5, cell.position().y + 60);
    panel.addTo(graph);
    cell.embed(panel);
  } else if (type === "squareTank") {
    panel.position(cell.position().x + 10, cell.position().y + 20);
    panel.addTo(graph);
    cell.embed(panel);
  } else if (type === "ConicTank") {
    panel.position(cell.position().x + 5, cell.position().y + 10);
    panel.addTo(graph);
    cell.embed(panel);
  }
  setLevel(cell, (cell.attributes.attrs.water.text / 5) * 100, 49, 55);
};

addPanel3 = (type, cell) => {
  const panel = new Panel3();
  if (type === "LiquidTank") {
    panel.position(cell.position().x + 10, cell.position().y + 60);
    panel.addTo(graph);
    cell.embed(panel);
  } else if (type === "BoosterPumpHouse") {
    panel.position(cell.position().x + 5, cell.position().y + 60);
    panel.addTo(graph);
    cell.embed(panel);
  } else if (type === "squareTank") {
    panel.position(cell.position().x + 10, cell.position().y + 20);
    panel.addTo(graph);
    cell.embed(panel);
  } else if (type === "ConicTank") {
    panel.position(cell.position().x + 5, cell.position().y + 10);
    panel.addTo(graph);
    cell.embed(panel);
  }
  setLevel(cell, (cell.attributes.attrs.water.text / 5) * 100, 59, 65);
};

addPanel4 = (type, cell) => {
  const panel = new Panel4();
  if (type === "LiquidTank") {
    panel.position(cell.position().x + 10, cell.position().y + 60);
    panel.addTo(graph);
    cell.embed(panel);
  } else if (type === "BoosterPumpHouse") {
    panel.position(cell.position().x + 5, cell.position().y + 60);
    panel.addTo(graph);
    cell.embed(panel);
  } else if (type === "squareTank") {
    panel.position(cell.position().x + 10, cell.position().y + 20);
    panel.addTo(graph);
    cell.embed(panel);
  } else if (type === "ConicTank") {
    panel.position(cell.position().x + 5, cell.position().y + 10);
    panel.addTo(graph);
    cell.embed(panel);
  }
  setLevel(cell, (cell.attributes.attrs.water.text / 5) * 100, 69, 75);
};

addPanel = (type, cell) => {
  const panel = new Panel();
  if (type === "LiquidTank") {
    panel.position(cell.position().x + 10, cell.position().y + 60);
    panel.addTo(graph);
    cell.embed(panel);
  } else if (type === "BoosterPumpHouse") {
    panel.position(cell.position().x + 5, cell.position().y + 60);
    panel.addTo(graph);
    cell.embed(panel);
  } else if (type === "squareTank") {
    panel.position(cell.position().x + 10, cell.position().y + 20);
    panel.addTo(graph);
    cell.embed(panel);
  } else if (type === "ConicTank") {
    panel.position(cell.position().x + 5, cell.position().y + 10);
    panel.addTo(graph);
    cell.embed(panel);
  }
  setLevel(cell, (cell.attributes.attrs.water.text / 5) * 100, 79, 85);
};
