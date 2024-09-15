var portsIn = {
  position: {
    name: "left",
  },
  attrs: {
    portBody: {
      magnet: true,
      r: 1.3,
      stroke: "#023047",
    },
  },
  label: {
    position: {
      name: "left",
      args: {
        y: 4,
        x: -4,
      },
    },
    markup: [
      {
        tagName: "text",
        selector: "label",
        className: "label-text",
      },
    ],
  },

  markup: [
    {
      tagName: "circle",
      selector: "portBody",
    },
  ],
};

var portsOut = {
  position: {
    name: "right",
  },
  attrs: {
    portBody: {
      magnet: true,
      r: 1.7,
      fill: "whitesmoke",
      stroke: "#023047",
    },
  },
  label: {
    position: {
      name: "right",
      args: {
        y: 4,
        x: 5,
      },
    },
    markup: [
      {
        tagName: "text",
        selector: "label",
        className: "label-text",
      },
    ],
  },
  markup: [
    {
      tagName: "circle",
      selector: "portBody",
    },
  ],
};

const { dia, shapes, util, ui } = joint;

//custom view flags
const POWER_FLAG = "POWER";
const LIGHT_FLAG = "LIGHT";
const FLOW_FLAG = "FLOW";
const OPEN_FLAG = "OPEN";

// Constants
const LIQUID_COLOR = "#0EAD69";
const MAX_LIQUID_COLOR = "#ED2637";
const MIN_LIQUID_COLOR = "#FFD23F";
const START_LIQUID = 70;
const PRESSURE_COLOR = "#1446A0";
const MAX_PRESSURE_COLOR = "#ED2637";

// Pump metrics
const r = 30;
const d = 10;
const l = (3 * r) / 4;
const step = 13;

//-----------------------------------Tank Model--------------------------------------
class LiquidTank extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "LiquidTank",
      size: {
        width: 120,
        height: 220,
      },
      attrs: {
        root: {
          magnetSelector: "body",
          magnet: "true",
        },
        legs: {
          fill: "none",
          stroke: "#350100",
          strokeWidth: 8,
          strokeLinecap: "round",
          d: "M 20 calc(h) l -5 10 M calc(w - 20) calc(h) l 5 10",
        },
        body: {
          stroke: "gray",
          strokeWidth: 4,
          x: 0,
          y: 0,
          width: "calc(w)",
          height: "calc(h)",
          rx: 120,
          ry: 10,
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "gray" },
              { offset: "30%", color: "white" },
              { offset: "70%", color: "white" },
              { offset: "100%", color: "gray" },
            ],
          },
        },
        top: {
          x: 0,
          y: 20,
          width: "calc(w)",
          height: 20,
          fill: "none",
          stroke: "gray",
          strokeWidth: 2,
        },
        label: {
          text: "Tank",
          textAnchor: "middle",
          textVerticalAnchor: "top",
          x: "calc(w / 2)",
          y: "calc(h + 10)",
          fontSize: 10,
          fontFamily: "sans-serif",
          fill: "#350100",
        },
        panel: {
          text: "Tank",
          href: "./Images/Elements/Tank.png",
        },
      },
      ports: {
        groups: {
          in: {
            ...portsIn,
            position: {
              name: "left",
              args: {
                y: "180",
              },
            },
          },
          out: {
            ...portsOut,
            position: {
              name: "right",
              args: {
                y: "40",
              },
            },
          },
          out1: {
            ...portsOut,
            position: {
              name: "right",
              args: {
                y: "180",
              },
            },
          },
        },
        attrs: {
          fontSize: 250,
        },
        items: [
          {
            group: "in",
            id: "in",
            attrs: {
              label: {
                text: "in",
                fill: "#383838",
              },
            },
          },
          {
            group: "out",
            id: "out",
            attrs: {
              label: {
                text: "out",
                fill: "#383838",
              },
            },
          },
          {
            group: "out1",
            id: "out1",
            attrs: {
              label: {
                text: "out",
                fill: "#383838",
              },
            },
          },
        ],
      },
    };
  }

  preinitialize() {
    this.markup = util.svg`
      <path @selector="legs"/>
      <rect @selector="body"/>
      <rect @selector="top"/>
      <text @selector="label"/>
    `;
  }

  get level() {
    return this.get("level") || 0;
  }

  set level(level) {
    const newLevel = Math.max(0, Math.min(100, level));
    this.set("level", newLevel);
  }
}

//-----------------------------------Conic Tank Model--------------------------------------
class ConicTank extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "ConicTank",
      size: {
        width: 110,
        height: 80,
      },
      attrs: {
        root: {
          magnetSelector: "body",
          magnet: "true",
        },
        body: {
          stroke: "gray",
          strokeWidth: 4,
          x: 0,
          y: 0,
          width: "calc(w)",
          height: "calc(h)",
          rx: 120,
          ry: 10,
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "gray" },
              { offset: "30%", color: "white" },
              { offset: "70%", color: "white" },
              { offset: "100%", color: "gray" },
            ],
          },
        },
        top: {
          x: 0,
          y: 20,
          width: "calc(w)",
          height: 20,
          fill: "none",
          stroke: "gray",
          strokeWidth: 2,
        },
        bottom: {
          d: "M 0 0 L calc(w) 0 L calc(w / 2 + 10) 70 h -20 Z",
          transform: "translate(0, calc(h - 10))",
          stroke: "gray",
          strokeLinejoin: "round",
          strokeWidth: 2,
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "10%", color: "#aaa" },
              { offset: "30%", color: "#fff" },
              { offset: "90%", color: "#aaa" },
            ],
            attrs: {
              gradientTransform: "rotate(-10)",
            },
          },
        },
        label: {
          text: "Conic Tank",
          textAnchor: "middle",
          textVerticalAnchor: "bottom",
          x: "calc(w / 2)",
          y: -10,
          fontSize: 10,
          fontFamily: "sans-serif",
          fill: "#350100",
        },
        panel: {
          text: "Conic Tank",
          href: "./Images/Elements/conicTank.png",
        },
      },
      ports: {
        groups: {
          in: {
            ...portsIn,
            position: {
              name: "bottom",
              args: {
                y: "140",
              },
            },
          },
        },
        attrs: {
          fontSize: 250,
        },
        items: [
          {
            group: "in",
            id: "in",
            attrs: {
              label: {
                text: "in",
                fill: "#383838",
              },
            },
          },
        ],
      },
    };
  }

  preinitialize() {
    this.markup = util.svg/* xml */ `
          <path @selector="bottom"/>
          <rect @selector="body"/>
          <rect @selector="top"/>
          <text @selector="label" />
      `;
  }
}

//-----------------------------------Pump Model--------------------------------------
class Pump extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "Pump",
      size: {
        width: 80,
        height: 80,
      },
      power: 0,
      attrs: {
        root: {
          magnetSelector: "body",
        },
        body: {
          rx: "calc(w / 2)",
          ry: "calc(h / 2)",
          cx: "calc(w / 2)",
          cy: "calc(h / 2)",
          stroke: "gray",
          strokeWidth: 2,
          fill: "lightgray",
        },
        label: {
          text: "Pump",
          textAnchor: "middle",
          textVerticalAnchor: "top",
          x: "calc(0.5*w)",
          y: "calc(h+10)",
          fontSize: 10,
          fontFamily: "sans-serif",
          fill: "#350100",
        },
        rotorGroup: {
          transform: "translate(calc(w/2),calc(h/2))",
          event: "element:power:click",
          cursor: "pointer",
        },
        rotorFrame: {
          r: 40,
          fill: "#eee",
          stroke: "#666",
          strokeWidth: 2,
        },
        rotorBackground: {
          r: 34,
          fill: "#777",
          stroke: "#222",
          strokeWidth: 1,
          style: {
            transition: "fill 0.5s ease-in-out",
          },
        },
        rotor: {
          // d: `M ${a} ${a} ${b} ${r} -${b} ${r} -${a} ${a} -${r} ${b} -${r} -${b} -${a} -${a} -${b} -${r} ${b} -${r} ${a} -${a} ${r} -${b} ${r} ${b} Z`,
          d: `M 0 0 V ${r} l ${-d} ${-l} Z M 0 0 V ${-r} l ${d} ${l} Z M 0 0 H ${r} l ${-l} ${d} Z M 0 0 H ${-r} l ${l} ${-d} Z`,
          stroke: "#222",
          strokeWidth: 3,
          fill: "#bbb",
        },
        panel: {
          text: "Pump",
          href: "./Images/Elements/pump.png",
        },
      },
      ports: {
        groups: {
          in: portsIn,
          out: portsOut,
        },
        attrs: {
          fontSize: 250,
        },
        items: [
          {
            group: "in",
            id: "in",
            attrs: {
              label: {
                text: "in",
                fill: "#383838",
              },
            },
          },
          {
            group: "out",
            id: "out",
            attrs: {
              label: {
                text: "out",
                fill: "#383838",
              },
            },
          },
        ],
      },
    };
  }

  preinitialize() {
    this.markup = util.svg/* xml */ `
            <ellipse @selector="body" />
            <g @selector="rotorGroup">
                <circle @selector="rotorFrame" />
                <circle @selector="rotorBackground" />
                <path @selector="rotor" />
            </g>
            <text @selector="label" />
        `;
  }

  get power() {
    return this.get("power") || 0;
  }

  set power(value) {
    this.set("power", value);
  }
}

//-----------------------------------ControlValve Model--------------------------------------
class ControlValve extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "ControlValve",
      size: {
        width: 60,
        height: 60,
      },
      open: 1,
      attrs: {
        root: {
          magnetSelector: "body",
        },
        body: {
          rx: "calc(w / 2)",
          ry: "calc(h / 2)",
          cx: "calc(w / 2)",
          cy: "calc(h / 2)",
          stroke: "gray",
          strokeWidth: 2,
          fill: {
            type: "radialGradient",
            stops: [
              { offset: "80%", color: "white" },
              { offset: "100%", color: "gray" },
            ],
          },
        },
        liquid: {
          // We use path instead of rect to make it possible to animate
          // the stroke-dasharray to show the liquid flow.
          d: "M calc(w / 2 + 12) calc(h / 2) h -24",
          stroke: LIQUID_COLOR,
          strokeWidth: 24,
          strokeDasharray: "3,1",
        },
        cover: {
          x: "calc(w / 2 - 12)",
          y: "calc(h / 2 - 12)",
          width: 24,
          height: 24,
          stroke: "#333",
          strokeWidth: 2,
          fill: "#fff",
        },
        coverFrame: {
          x: "calc(w / 2 - 15)",
          y: "calc(h / 2 - 15)",
          width: 30,
          height: 30,
          stroke: "#777",
          strokeWidth: 2,
          fill: "none",
          rx: 1,
          ry: 1,
        },
        stem: {
          width: 10,
          height: 30,
          x: "calc(w / 2 - 5)",
          y: -30,
          stroke: "#333",
          strokeWidth: 2,
          fill: "#555",
        },
        control: {
          d: "M 0 0 C 0 -30 60 -30 60 0 Z",
          transform: "translate(calc(w / 2 - 30), -20)",
          stroke: "#333",
          strokeWidth: 2,
          rx: 5,
          ry: 5,
          fill: "#666",
        },
        label: {
          text: "Valve",
          textAnchor: "middle",
          textVerticalAnchor: "top",
          x: "calc(0.5*w)",
          y: "calc(h+10)",
          fontSize: 10,
          fontFamily: "sans-serif",
          fill: "#350100",
        },
        panel: {
          text: "ControlValve",
          href: "./Images/Elements/ControlValve.png",
        },
      },
      ports: {
        groups: {
          in: portsIn,
          out: portsOut,
        },
        attrs: {
          fontSize: 250,
        },
        items: [
          {
            group: "in",
            id: "in",
            attrs: {
              label: {
                text: "in",
                fill: "#383838",
              },
            },
          },
          {
            group: "out",
            id: "out",
            attrs: {
              label: {
                text: "out",
                fill: "#383838",
              },
            },
          },
        ],
      },
    };
  }

  preinitialize() {
    this.markup = util.svg/* xml */ `
          <rect @selector="stem" />
          <path @selector="control" />
          <ellipse @selector="body" />
          <rect @selector="coverFrame" />
          <path @selector="liquid" />
          <rect @selector="cover" />
          <text @selector="label" />
      `;
  }
}

//-----------------------------------Panel Model--------------------------------------
class Panel extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "Panel",
      size: {
        width: 90,
        height: 160,
      },
      level: 0,
      attrs: {
        root: {
          magnetSelector: "panelBody",
        },
        panelBody: {
          x: 0,
          y: 0,
          width: "calc(w)",
          height: "calc(h)",
          rx: 1,
          ry: 1,
          fill: "lightgray",
          stroke: "gray",
          strokeWidth: 1,
        },
        panelWindow: {
          // turn the panel over so that we can grow the liquid from the bottom
          // by increasing the height of the bar.
          transform: "translate(10, 10) rotate(180) translate(-40,-205)",
        },
        panelTicks: {
          transform: "translate(55, 15)",
          d: `M 0 0 h 8 M 0 ${step} h 8 M 0 ${step * 2} h 8 M 0 ${
            step * 3
          } h 8 M 0 ${step * 4} h 8 M 0 ${step * 5} h 8 M 0 ${
            step * 6
          } h 8 M 0 ${step * 7} h 8 M 0 ${step * 8} h 8 M 0 ${
            step * 9
          } h 8 M 0 ${step * 10} h 8`,
          fill: "none",
          stroke: "black",
          strokeWidth: 2,
          strokeLinecap: "round",
        },
        panelValues: {
          text: "100\n90\n80\n70\n60\n50\n40\n30\n20\n10\n0",
          textAnchor: "middle",
          textVerticalAnchor: "top",
          x: 80,
          y: 10,
          lineHeight: step,
          fontSize: 8,
          fontFamily: "sans-serif",
        },
        frame: {
          y: 65,
          width: 40,
          height: 140,
          rx: 1,
          ry: 1,
          fill: "none",
          stroke: "black",
          strokeWidth: 3,
        },
        liquid: {
          x: 0,
          y: 0,
          width: 40,
          height: 0,
          stroke: "black",
          strokeWidth: 2,
          strokeOpacity: 0.2,
          fill: MIN_LIQUID_COLOR,
        },
        glass: {
          x: 0,
          y: 65,
          width: 40,
          height: 140,
          fill: "blue",
          stroke: "none",
          fillOpacity: 0.1,
        },
        label: {
          text: "Panel",
          textAnchor: "middle",
          textVerticalAnchor: "top",
          x: "calc(w / 2)",
          y: "calc(h + 10)",
          fontSize: 20,
          fontFamily: "sans-serif",
          fill: "#350100",
        },
        panel: {
          text: "Panel",
          href: "./Images/Elements/Panel.png",
        },
      },
    };
  }

  preinitialize() {
    this.markup = util.svg/* xml */ `
            <rect @selector="panelBody"/>
            <path @selector="panelTicks"/>
            <text @selector="panelValues" />
            <g @selector="panelWindow">
                <rect @selector="glass"/>
                <rect @selector="liquid"/>
                <rect @selector="frame"/>
            </g>
      `;
  }
}

//-----------------------------------Zone Model--------------------------------------
class Zone extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "Zone",
      size: {
        width: 120,
        height: 40,
      },
      attrs: {
        body: {
          fill: "#ffffff",
          stroke: "#cad8e3",
          strokeWidth: 1,
          d: "M 0 calc(0.5*h) calc(0.5*h) 0 H calc(w) V calc(h) H calc(0.5*h) Z",
        },
        label: {
          text: "Zone",
          fontSize: 14,
          fontFamily: "sans-serif",
          fontWeight: "bold",
          fill: LIQUID_COLOR,
          textVerticalAnchor: "middle",
          textAnchor: "middle",
          x: "calc(w / 2 + 10)",
          y: "calc(h / 2)",
        },
        panel: {
          text: "Zone",
          href: "./Images/Elements/Zone.png",
        },
      },
      ports: {
        groups: {
          out: {
            ...portsOut,
            position: {
              name: "left",
            },
          },
        },
        attrs: {
          fontSize: 250,
        },
        items: [
          {
            group: "out",
            id: "out",
            attrs: {
              label: {
                text: "out",
                fill: "#383838",
              },
            },
          },
        ],
      },
    };
  }

  preinitialize() {
    this.markup = util.svg/* xml */ `
            <path @selector="body"/>
            <text @selector="label"/>
        `;
  }
}

//-----------------------------------HandValve Model--------------------------------------
class HandValve extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "HandValve",
      size: {
        width: 50,
        height: 50,
      },
      power: 0,
      attrs: {
        root: {
          magnetSelector: "body",
        },
        body: {
          rx: "calc(w / 2)",
          ry: "calc(h / 2)",
          cx: "calc(w / 2)",
          cy: "calc(h / 2)",
          stroke: "gray",
          strokeWidth: 2,
          fill: {
            type: "radialGradient",
            stops: [
              { offset: "70%", color: "white" },
              { offset: "100%", color: "gray" },
            ],
          },
        },
        stem: {
          width: 10,
          height: 30,
          x: "calc(w / 2 - 5)",
          y: -30,
          stroke: "#333",
          strokeWidth: 2,
          fill: "#555",
        },
        handwheel: {
          width: 60,
          height: 10,
          x: "calc(w / 2 - 30)",
          y: -30,
          stroke: "#333",
          strokeWidth: 2,
          rx: 5,
          ry: 5,
          fill: "#666",
        },
        label: {
          text: "Valve",
          textAnchor: "middle",
          textVerticalAnchor: "top",
          x: "calc(0.5*w)",
          y: "calc(h+10)",
          fontSize: "14",
          fontFamily: "sans-serif",
          fill: "#350100",
        },
        panel: {
          text: "HandValve",
          href: "./Images/Elements/HandValve.png",
        },
      },
      ports: {
        groups: {
          in: portsIn,
          out: portsOut,
        },
        attrs: {
          fontSize: 250,
        },
        items: [
          {
            group: "in",
            id: "in",
            attrs: {
              label: {
                text: "in",
                fill: "#383838",
              },
            },
          },
          {
            group: "out",
            id: "out",
            attrs: {
              label: {
                text: "out",
                fill: "#383838",
              },
            },
          },
        ],
      },
    };
  }

  preinitialize() {
    this.markup = util.svg/* xml */ `
          <rect @selector="stem" />
          <rect @selector="handwheel" />
          <ellipse @selector="body" />
          <text @selector="label" />
      `;
  }
}

//-----------------------------------Join Model--------------------------------------
class Join extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "Join",
      size: {
        width: 30,
        height: 30,
      },
      attrs: {
        body: {
          fill: "#eee",
          stroke: "#666",
          strokeWidth: 2,
          d: "M 10 0 H calc(w - 10) l 10 10 V calc(h - 10) l -10 10 H 10 l -10 -10 V 10 Z",
        },
        label: {
          text: "Join",
          fontSize: 14,
          fontFamily: "sans-serif",
          fontWeight: "bold",
        },
        panel: {
          text: "Join",
          href: "./Images/Elements/Join.png",
        },
      },
      ports: {
        groups: {
          in: portsIn,
          out: portsOut,
          in1: {
            ...portsIn,
            position: {
              name: "bottom",
            },
          },
        },
        attrs: {
          fontSize: 250,
        },
        items: [
          {
            group: "in",
            id: "in",
            attrs: {
              label: {
                text: "in",
                fill: "#383838",
              },
            },
          },
          {
            group: "in1",
            id: "in1",
            attrs: {
              label: {
                text: "in",
                fill: "#383838",
              },
            },
          },
          {
            group: "out",
            id: "out",
            attrs: {
              label: {
                text: "out",
                fill: "#383838",
              },
            },
          },
        ],
      },
    };
  }

  preinitialize() {
    this.markup = util.svg/* xml */ `
            <path @selector="body"/>
        `;
  }
}
