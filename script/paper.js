LIQUID_COLOR = "#0EAD69";
MAX_LIQUID_COLOR = "#ED2637";
MIN_LIQUID_COLOR = "#FFD23F";
START_LIQUID = 70;
PRESSURE_COLOR = "#1446A0";
MAX_PRESSURE_COLOR = "#ED2637";

POWER_FLAG = "POWER";
LIGHT_FLAG = "LIGHT";
FLOW_FLAG = "FLOW";
OPEN_FLAG = "OPEN";
LEVEL_FLAG = "LEVEl";

//-------for mini map----------------
var win = window,
  doc = document,
  docElem = doc.documentElement,
  body = doc.getElementsByTagName("body")[0],
  x = win.innerWidth || docElem.clientWidth || body.clientWidth,
  y = win.innerHeight || docElem.clientHeight || body.clientHeight;

let k = x;
let p = y;
var config = {
  paeprWidth: k / 1.3, //1.87
  paperHeight: p, //1.36
};

//-----links----
class Pipe extends joint.dia.Link {
  defaults() {
    return {
      ...super.defaults,
      type: "Pipe",
      z: -1,
      router: { name: "rightAngle" },
      flow: 1,
      attrs: {
        liquid: {
          connection: true,
          stroke: "#0EAD69",
          strokeWidth: 10,
          strokeLinejoin: "round",
          strokeLinecap: "square",
          strokeDasharray: "10,20",
        },
        line: {
          connection: true,
          stroke: "#eee",
          strokeWidth: 10,
          strokeLinejoin: "round",
          strokeLinecap: "round",
        },
        outline: {
          connection: true,
          stroke: "#444",
          strokeWidth: 16,
          strokeLinejoin: "round",
          strokeLinecap: "round",
        },
      },
    };
  }

  preinitialize() {
    this.markup = joint.util.svg/* xml */ `
            <path @selector="outline" fill="none"/>
            <path @selector="line" fill="none"/>
            <path @selector="liquid" fill="none"/>
        `;
  }
}

//-----animations----
const PipeView = joint.dia.LinkView.extend({
  presentationAttributes: joint.dia.LinkView.addPresentationAttributes({
    flow: [FLOW_FLAG],
  }),

  initFlag: [...joint.dia.LinkView.prototype.initFlag, FLOW_FLAG],

  flowAnimation: null,

  confirmUpdate(...args) {
    let flags = joint.dia.LinkView.prototype.confirmUpdate.call(this, ...args);
    if (this.hasFlag(flags, FLOW_FLAG)) {
      this.updateFlow();
      flags = this.removeFlag(flags, FLOW_FLAG);
    }
    return flags;
  },

  getFlowAnimation() {
    let { flowAnimation } = this;
    if (flowAnimation) return flowAnimation;
    const [liquidEl] = this.findBySelector("liquid");
    // stroke-dashoffset = sum(stroke-dasharray) * n;
    // 90 = 10 + 20 + 10 + 20 + 10 + 20
    const keyframes = { strokeDashoffset: [90, 0] };
    flowAnimation = liquidEl.animate(keyframes, {
      fill: "forwards",
      duration: 1000,
      iterations: Infinity,
    });
    this.flowAnimation = flowAnimation;
    return flowAnimation;
  },

  updateFlow() {
    const { model } = this;
    const flowRate = model.get("flow") || 0;
    this.getFlowAnimation().playbackRate = flowRate;
    const [liquidEl] = this.findBySelector("liquid");
    liquidEl.style.stroke = flowRate === 0 ? "#ccc" : "";
  },
});
const PumpView = joint.dia.ElementView.extend({
  presentationAttributes: joint.dia.ElementView.addPresentationAttributes({
    power: [POWER_FLAG],
  }),

  initFlag: [joint.dia.ElementView.Flags.RENDER, POWER_FLAG],

  powerAnimation: null,

  confirmUpdate(...args) {
    let flags = joint.dia.ElementView.prototype.confirmUpdate.call(
      this,
      ...args
    );
    if (this.hasFlag(flags, POWER_FLAG)) {
      this.togglePower();
      flags = this.removeFlag(flags, POWER_FLAG);
    }
    return flags;
  },

  getSpinAnimation() {
    let { spinAnimation } = this;
    if (spinAnimation) return spinAnimation;
    const [rotorEl] = this.findBySelector("rotor");
    // It's important to use start and end frames to make it work in Safari.
    const keyframes = { transform: ["rotate(0deg)", "rotate(360deg)"] };
    spinAnimation = rotorEl.animate(keyframes, {
      fill: "forwards",
      duration: 1000,
      iterations: Infinity,
    });
    this.spinAnimation = spinAnimation;
    return spinAnimation;
  },

  togglePower() {
    const { model } = this;
    this.getSpinAnimation().playbackRate = model.power;
  },
});
const ControlValveView = joint.dia.ElementView.extend({
  presentationAttributes: joint.dia.ElementView.addPresentationAttributes({
    open: [OPEN_FLAG],
  }),

  initFlag: [joint.dia.ElementView.Flags.RENDER, OPEN_FLAG],

  framePadding: 6,

  liquidAnimation: null,

  confirmUpdate(...args) {
    let flags = joint.dia.ElementView.prototype.confirmUpdate.call(
      this,
      ...args
    );
    this.animateLiquid();
    if (this.hasFlag(flags, OPEN_FLAG)) {
      this.updateCover();
      flags = this.removeFlag(flags, OPEN_FLAG);
    }
    return flags;
  },

  updateCover() {
    const { model } = this;
    const opening = Math.max(0, Math.min(1, model.get("open") || 0));
    const [coverEl] = this.findBySelector("cover");
    const [coverFrameEl] = this.findBySelector("coverFrame");
    const frameWidth =
      Number(coverFrameEl.getAttribute("width")) - this.framePadding;
    const width = Math.round(frameWidth * (1 - opening));
    coverEl.animate(
      {
        width: [`${width}px`],
      },
      {
        fill: "forwards",
        duration: 200,
      }
    );
  },

  animateLiquid() {
    if (this.liquidAnimation) return;
    const [liquidEl] = this.findBySelector("liquid");
    this.liquidAnimation = liquidEl.animate(
      {
        // 24 matches the length of the liquid path
        strokeDashoffset: [0, 24],
      },
      {
        fill: "forwards",
        iterations: Infinity,
        duration: 3000,
      }
    );
  },
});
const PanelView = joint.dia.ElementView.extend({
  presentationAttributes: joint.dia.ElementView.addPresentationAttributes({
    level: [LEVEL_FLAG],
    color: [LEVEL_FLAG],
  }),

  initFlag: [joint.dia.ElementView.Flags.RENDER, LEVEL_FLAG],

  confirmUpdate(...args) {
    let flags = joint.dia.ElementView.prototype.confirmUpdate.call(
      this,
      ...args
    );
    if (this.hasFlag(flags, LEVEL_FLAG)) {
      this.updateLevel();
      flags = this.removeFlag(flags, LEVEL_FLAG);
    }
    return flags;
  },

  updateLevel() {
    const { model } = this;
    const level = Math.max(0, Math.min(100, model.get("level") || 0));
    const color = model.get("color") || "red";
    const [liquidEl] = this.findBySelector("liquid");
    const [windowEl] = this.findBySelector("frame");
    const windowHeight = Number(windowEl.getAttribute("height"));
    const height = Math.round((windowHeight * level) / 100);
    liquidEl.animate(
      {
        height: [`${height}px`],
        fill: [color],
      },
      {
        fill: "forwards",
        duration: 1000,
      }
    );
  },
});

// ---Controls----
const PumpControl = joint.dia.HighlighterView.extend({
  UPDATE_ATTRIBUTES: ["power"],
  tagName: "g",
  children: joint.util.svg/* xml */ `
        <foreignObject width="20" height="20">
            <div class="jj-checkbox" xmlns="http://www.w3.org/1999/xhtml">
                <input @selector="input" class="jj-checkbox-input" type="checkbox" style="width: 14px; height: 14px; box-sizing: border-box; margin: 2px;"/>
            </div>
        </foreignObject>
    `,
  events: {
    "change input": "onChange",
  },
  attributes: {
    transform: "translate(5, 5)",
  },
  highlight: function (cellView) {
    this.renderChildren();
    this.childNodes.input.checked = Boolean(cellView.model.power);
  },
  onChange: function (evt) {
    this.cellView.model.power = evt.target.checked ? 1 : 0;
  },
});
const ToggleValveControl = joint.dia.HighlighterView.extend({
  UPDATE_ATTRIBUTES: ["open"],
  children: joint.util.svg/* xml */ `
        <foreignObject width="100" height="50">
            <div class="jj-switch" xmlns="http://www.w3.org/1999/xhtml">
                <div @selector="label" class="jj-switch-label"></div>
                <button @selector="buttonOn" class="jj-switch-on">open</button>
                <button @selector="buttonOff" class="jj-switch-off">close</button>
            </div>
        </foreignObject>
    `,
  events: {
    "click button": "onButtonClick",
  },
  highlight: function (cellView) {
    this.renderChildren();
    const { model } = cellView;
    const { el, childNodes } = this;
    const size = model.size();
    const isOpen = model.get("open");
    el.setAttribute(
      "transform",
      `translate(${size.width / 2 - 50}, ${size.height + 10})`
    );
    childNodes.buttonOn.disabled = !isOpen;
    childNodes.buttonOff.disabled = isOpen;
    // childNodes.label.textContent = model.attr("label/text");
  },
  onButtonClick: function (evt) {
    const { model } = this.cellView;
    const isOpen = model.get("open");
    model.set("open", !isOpen);
  },
});
const SliderValveControl = joint.dia.HighlighterView.extend({
  UPDATE_ATTRIBUTES: ["open"],
  children: joint.util.svg/* xml */ `
        <foreignObject width="100" height="60">
            <div class="jj-slider" xmlns="http://www.w3.org/1999/xhtml">
                <div @selector="label" class="jj-slider-label"></div>
                <input @selector="slider" class="jj-slider-input" type="range" min="0" max="100" step="25" style="width:100%; margin-t"/>
                <output @selector="value" class="jj-slider-output"></output>
            </div>
        </foreignObject>
    `,
  events: {
    "input input": "onInput",
  },
  highlight: function (cellView) {
    const { name = "" } = this.options;
    const { model } = cellView;
    const size = model.size();
    if (!this.childNodes) {
      // Render the slider only once to allow the user to drag it.
      this.renderChildren();
      this.childNodes.slider.value = model.get("open") * 100;
    }
    this.el.setAttribute(
      "transform",
      `translate(${size.width / 2 - 50}, ${size.height + 25})`
    );
    //this.childNodes.label.textContent = name;
    this.childNodes.value.textContent = this.getSliderTextValue(
      model.get("open")
    );
  },
  getSliderTextValue: function (value = 0) {
    if (value === 0) {
      return "Closed";
    }
    if (value === 1) {
      return "Open";
    }
    return `${value * 100}% open`;
  },
  onInput: function (evt) {
    this.cellView.model.set("open", Number(evt.target.value) / 100);
  },
});

//namespace and graph
var namespace = {
  joint: joint.shapes,
  Pipe: Pipe,
  PipeView: PipeView,
  PumpView: PumpView,
  ControlValveView: ControlValveView,
  PanelView: PanelView,
};
var graph = new joint.dia.Graph(
  {},
  {
    cellNamespace: namespace,
  }
);
var flag = 0;
var newZoom = 1;

var paper = new joint.dia.Paper({
  el: document.getElementById("paper"),
  width: k / 1.3, //1.87
  height: p, //1.36
  gridSize: 1,
  model: graph,
  cellViewNamespace: namespace,
  linkPinning: false, // Prevent link being dropped in blank paper area
  defaultLink: new Pipe(), // Set Pipe as the default link
  interactive: {
    linkMove: true,
    stopDelegation: false,
  },
  defaultAnchor: {
    name: "perpendicular",
  },
  defaultConnectionPoint: {
    name: "boundary",
  },
  // validateConnection: function (
  //   cellViewS,
  //   magnetS,
  //   cellViewT,
  //   magnetT,
  //   end,
  //   linkView
  // ) {
  //   // Prevent linking from input ports
  //   if (magnetS && magnetS.getAttribute("port-group") === "in") return false;
  //   // Prevent linking from output ports to input ports within one element
  //   if (cellViewS === cellViewT) return false;
  //   // Prevent linking to output ports
  //   return magnetT && magnetT.getAttribute("port-group") === "in";
  // },
  // validateMagnet: function (cellView, magnet) {
  //   // Note that this is the default behaviour. It is shown for reference purposes.
  //   // Disable linking interaction for magnets marked as passive
  //   return magnet.getAttribute("magnet") !== "passive";
  // },

  // Enable link snapping
  snapLinks: { radius: 75 },
});

// Create all controls and add them to the graph
graph.on("add", function () {
  addControls(paper);
});
// Transform the paper so that the content fits the viewport
paper.transformToFitContent({
  useModelGeometry: true,
  padding: { top: 80, bottom: 10, horizontal: 50 },
  horizontalAlign: "middle",
  verticalAlign: "top",
});

function addControls(paper) {
  const graph = paper.model;
  graph.getElements().forEach((cell) => {
    switch (cell.get("type")) {
      case "ControlValve":
        SliderValveControl.add(cell.findView(paper), "root", "slider", {
          name: cell.attr("label/text"),
        });
        break;
      case "HandValve":
        ToggleValveControl.add(cell.findView(paper), "root", "button");
        break;
      case "Pump":
        PumpControl.add(cell.findView(paper), "root", "selection");
        break;
    }
  });
}

let Scale = 2.2;
var mouseDownFlag = false;
var dragStartPosition, navigatorh;
paper.on("blank:pointerdown", function (event, x, y) {
  mouseDownFlag = true;
  dragStartPosition = { x: x, y: y };
  navigatorh = {
    h: document.querySelector("#minimap-navigator").getBoundingClientRect()
      .height,
    Hei: $("#minimap-paper").height(),
    w: document.querySelector("#minimap-navigator").getBoundingClientRect()
      .width,
    Wei: $("#minimap-paper").width(),
  };
});

paper.on("cell:pointerup blank:pointerup", function (cellView, x, y) {
  mouseDownFlag = false;
});
let topDisplacement = 0,
  leftDisplacement = 0,
  ltopDisplacement = 0,
  lleftDisplacement = 0;
let paperTopDisplacement = 0,
  paperLeftDisplacement = 0;
$("#container").mousemove(async function (event) {
  if (mouseDownFlag) {
    ltopDisplacement = paperTopDisplacement;
    lleftDisplacement = paperLeftDisplacement;
    paperLeftDisplacement = event.offsetX - dragStartPosition.x;
    paperTopDisplacement = event.offsetY - dragStartPosition.y;
    leftDisplacement = -paperLeftDisplacement * scale;
    topDisplacement = -paperTopDisplacement * scale;
    if (topDisplacement + navigatorh.h > navigatorh.Hei) {
      paperTopDisplacement = ltopDisplacement;
      topDisplacement = document.getElementById("minimap-navigator").style.top;
    }
    if (leftDisplacement + navigatorh.w > navigatorh.Wei) {
      paperLeftDisplacement = lleftDisplacement;
      leftDisplacement =
        document.getElementById("minimap-navigator").style.left;
    }
    if (paperLeftDisplacement > 0) {
      leftDisplacement = 0;
      paperLeftDisplacement = 0;
    }
    if (paperTopDisplacement > 0) {
      topDisplacement = 0;
      paperTopDisplacement = 0;
    }
    paper.translate(paperLeftDisplacement, paperTopDisplacement);
    //translate the mini map as well
    document.getElementById("minimap-navigator").style.left =
      leftDisplacement + "px";
    document.getElementById("minimap-navigator").style.top =
      topDisplacement + "px";
  }
});

//-------------------------------Element delete from canvas/paper------------------------------
var removeButton = new joint.elementTools.Remove({
  focusOpacity: 0.5,
  action: function (evt, elementView, toolView) {
    elementView.model.remove({ ui: true, tool: toolView.cid });
    document.getElementById(elementView.model.id).remove();
    $("#paper2li")
      .children("LI")
      .each(function () {
        $(this).show();
        this.querySelector(".UL").style.display = "none";
      });
    graphsteps.push(JSON.stringify(graph.toJSON()));
    console.log(graphsteps.length);
    graph_undo_redo = [];
    console.log("Remove");
  },
});
var toolsView = new joint.dia.ToolsView({
  tools: [removeButton],
});
