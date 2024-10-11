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
  paeprWidth: k / 1.35, //1.87
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
    //console.log(rotorEl);

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

    // Log the power value for debugging purposes
    if (model.power != undefined) {
      //console.log("Current power value:", model.power);

      // Check if model.power is a valid number
      let power = model.power;
      if (typeof power !== "number" || !isFinite(power)) {
        power = 1; // Set a default playback rate if power is not valid
      }

      // Set the playback rate to the validated power value
      this.getSpinAnimation().playbackRate = power;
    } else {
      //console.log("Current power value:", model.attributes.power);
      let power = model.attributes.power;
      if (typeof power !== "number" || !isFinite(power)) {
        power = 1; // Set a default playback rate if power is not valid
      }

      // Set the playback rate to the validated power value
      this.getSpinAnimation().playbackRate = power;
    }
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
// ---Controls----
const PumpControl = joint.dia.HighlighterView.extend({
  UPDATE_ATTRIBUTES: ["power"],
  tagName: "g",
  children: joint.util.svg`
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
    if (evt.target.checked === true) {
      // Set the playback rate to the validated power value
      this.cellView.getSpinAnimation().playbackRate = 1;
    } else if (evt.target.checked === false) {
      this.cellView.getSpinAnimation().playbackRate = 0;
    }
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
                <div @selector="label" class="jj-slider-label" style=""></div>
                <input @selector="slider" class="jj-slider-input" type="range" min="0" max="100" step="25" style="width:100%;"/>
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
      `translate(${size.width / 2 - 50}, ${size.height + 10})`
    );
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

getPower = (cell) => {
  return cell.get("power") || 0;
};

setPower = (cell, value) => {
  cell.set("power", value);
};

//namespace and graph
var namespace = {
  joint: joint.shapes,
  Pipe: Pipe,
  PipeView: PipeView,
  PumpView: PumpView,
  ControlValveView: ControlValveView,
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
  width: k / 1.35, //1.87
  height: p, //1.36
  gridSize: 1,
  model: graph,
  cellViewNamespace: namespace,
  linkPinning: false,
  defaultLink: new Pipe(),
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

// Transform the paper so that the content fits the viewport
paper.transformToFitContent({
  useModelGeometry: true,
  padding: { top: 80, bottom: 10, horizontal: 50 },
  horizontalAlign: "middle",
  verticalAlign: "top",
});

// Add the double-click event listener to remove links
paper.on("link:pointerdblclick", function (linkView) {
  const link = linkView.model;
  if (link instanceof Pipe) {
    link.remove({ disconnectLinks: false });
  }
});

//-------------------------------Element delete from canvas/paper------------------------------
var removeButton = new joint.elementTools.Remove({
  focusOpacity: 0.5,
  action: function (evt, elementView, toolView) {
    const removedElement = elementView.model;
    removedElement.remove({ ui: true, tool: toolView.cid });

    const mainElement = document.getElementById(removedElement.id);
    if (mainElement) {
      mainElement.remove();
    }

    $("#paper2li")
      .children("LI")
      .each(function () {
        $(this).show();
        this.querySelectorAll(".UL").forEach((ul) => {
          ul.style.display = "none";
        });
      });

    redoStack = [];

    console.log("Remove action saved in undo stack.");
  },
});

// Add the remove button to the tools view
var toolsView = new joint.dia.ToolsView({
  tools: [removeButton],
});
