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
  var blob = new Blob([JSON.stringify(graph.toJSON())], {
    type: "text/json;charset=utf-8",
  });

  var a = document.createElement("a");

  a.href = (window.URL || window.webkitURL).createObjectURL(blob);
  let inputVal = document.getElementById("json2").value;
  if (inputVal == "" || inputVal == "File Name") a.download = "jointjs.json";
  else a.download = inputVal + ".json";

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const uploadjson = () => {
  let panel = document.getElementById("paper2li");
  panel.innerHTML = "";

  var doc = document.getElementById("file").files[0];
  var reader = new FileReader();
  reader.readAsText(doc);
  reader.onload = () => {
    graph.fromJSON(JSON.parse(reader.result));
    let json = JSON.parse(reader.result);
    json["cells"].forEach((cell) => {
      if (cell.type != "link") {
        append3rd(cell);
      }
    });
    span();
  };
};

const savejson = () => {
  var blob = JSON.stringify(graph.toJSON());
  localStorage.setItem("GraphJson", blob);
  graph_undo_redo = [];
};

//-------------------Clear-----------------------------
const cleargraph = async () => {
  graph.clear();
  blob = JSON.stringify(graph.toJSON());
  localStorage.setItem("GraphJson", blob);
  graph_undo_redo = [];
  graphsteps = [];
  console.log(graphsteps.length);
  let panel = document.getElementById("paper2li");
  panel.innerHTML = "";
  $("#file").val("");
};
