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
  $("#paper2li").append(`
    <li id="${cell.id}" style="padding-top: 10px;">
      <span>
        <strong>
          <img class="paper-image element" src="${
            cell.attrs.panel.href
          }" alt="icon"/>
          <span id="${cell.id + "-text"}">${cell.attrs.label.text}</span>
        </strong>
        <i class="fa fa-check-circle check_icon"></i>
      </span>
      <ul>
        <li class="UL" id="edit-container-${cell.id}">
          <div class="edit-container" >
            <span id="${cell.id}-name-display">${cell.attrs.label.text}</span>
          </div>
        </li>
      </ul>
      <br/>
    </li>
  `);

  // Attach the click event listener after the element has been appended
  $(`#edit-container-${cell.id}`).on("click", function () {
    editName(cell.id);
  });
};

// Function to turn the lower 'Name' into an editable input field
function editName(cellId) {
  const nameDisplay = document.getElementById(`${cellId}-name-display`);
  const currentName = nameDisplay.innerText;

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
    saveName(cellId);
  }
}

//------------------------Graph Create from JSON
const createGraph = async (json) => {
  json = JSON.parse(json);
  await graph.fromJSON(json);
  json["cells"].forEach((cell) => {
    //
    if (cell.type != "link") {
      append3rd(cell);
    }
  });
  span();
};

//-----------------------Graph Undo and Redo
var graphsteps = [],
  graph_undo_redo = [];

const clearPanel = () => {
  document.getElementById("paper2li").innerHTML = "";
};

const GraphUndo = async () => {
  if (graphsteps.length > 1) {
    graph_undo_redo.push(JSON.stringify(graph.toJSON()));
    await clearPanel();
    createGraph(graphsteps[graphsteps.length - 2]);
    graphsteps.pop();
  }
};

const GraphRedo = async () => {
  if (graph_undo_redo.length > 0) {
    await clearPanel();
    createGraph(graph_undo_redo[graph_undo_redo.length - 1]);
    graph_undo_redo.pop();
    graphsteps.push(JSON.stringify(graph.toJSON()));
  }
};

graph.on("change:source change:target", function (link) {
  if (link.get("source").id && link.get("target").id) {
    graphsteps.push(JSON.stringify(graph.toJSON()));
    graph_undo_redo = [];
  }
});

var elementvisible = (ID) => {
  $("#paper2li")
    .children("LI")
    .each(function () {
      if (this.id != ID) {
        $(this).hide();
      } else {
        $(this).show();
      }
      this.querySelector(".UL").style.display = "block";
    });
};

var elementdisable = (elementView) => {
  let item = document.getElementById(elementView.model.id);
  let item_id = elementView.model.id;

  $("#paper2li")
    .children("LI")
    .each(function () {
      if (this.id != item_id) {
        $(this).show();
      }
      this.querySelector(".UL").style.display = "none";
    });
};
