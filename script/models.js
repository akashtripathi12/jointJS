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
  position: {},
  attrs: {
    portBody: {
      magnet: true,
      r: 1.3,
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

var portsOut1 = {
  position: {
    name: "bottom",
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
const MIN_LIQUID_COLOR = "skyblue";
const START_LIQUID = 70;
const PRESSURE_COLOR = "#1446A0";
const MAX_PRESSURE_COLOR = "#ED2637";

// Pump metrics
const r = 30;
const d = 10;
const l = (3 * r) / 4;
const step = 16;
const step4 = 12;
const step3 = 10;
const step2 = 8;
const step1 = 6;

//-----------------------------------SquareTank Model DONE--------------------------------------
class squareTank extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "squareTank",
      size: {
        width: 150,
        height: 120,
      },
      attrs: {
        node: {
          size: 5,
        },
        body: {
          d: "M 0 0 L calc(w) 0 L calc(w) calc(h) L 0 calc(h) Z",
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "#f5f5f5" },
              { offset: "50%", color: "#d1d1d1" },
              { offset: "100%", color: "#bfbfbf" },
            ],
          },
          stroke: "gray",
          strokeWidth: 2,
        },
        label: {
          text: "Square Tank", // Tank label
          textAnchor: "middle",
          textVerticalAnchor: "top",
          x: "calc(w/2)", // Center the label horizontally
          y: "-20", // Adjust y positioning of the label
          fontSize: 14,
          fontFamily: "sans-serif",
          fill: "black", // Tank label in black
        },
        panel: {
          text: "Square Tank",
          href: "./Images/Elements/squareTank.jpg",
        },
        waterLevel: {
          text: "Level 0 m",
          textAnchor: "middle",
          textVerticalAnchor: "bottom",
          x: "calc(w/2)",
          y: "calc(h+30)",
          fontSize: 18,
          fontFamily: "sans-serif",
          fill: "blue",
        },
        water: {
          text: 0,
        },
        graph: {
          x: "calc(h-25)",
          width: "35",
          height: "90",
          href: "./Images/Elements/graph.svg",
        },
        graphlevel: {
          text: "0 cbm",
          fontSize: 8,
          fontWeight: "bold",
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "calc(h-5)",
          y: "calc(h-40)",
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
        location: {
          text: "Location",
          fontSize: 14,
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "calc(w+50)",
          y: "calc(h)",
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
      },
      ports: {
        panel: {
          size: 5,
        },
        groups: {
          p1: {
            ...portsIn,
            position: {
              args: {
                y: "20",
              },
            },
          },
          p2: {
            ...portsOut,
            position: {
              args: {
                y: "90",
                x: "150",
              },
            },
          },
        },
        items: [
          {
            group: "p1",
            id: "p1",
            attrs: {
              label: {
                text: "p1",
                fill: "#383838",
              },
            },
          },
          {
            group: "p2",
            id: "p2",
            attrs: {
              label: {
                text: "p2",
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
      <path @selector="body"/>   <!-- Defines the tank with a concave top -->
      <image @selector="graph" />
      <text @selector="graphlevel"/>
      <text @selector="label"/>           <!-- Tank label -->
      <text @selector="waterLevel"/>
      <text @selector="location"/>
    `;
  }
}
class squareTank4 extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "squareTank",
      size: {
        width: 130,
        height: 100,
      },
      attrs: {
        node: {
          size: 4,
        },
        body: {
          d: "M 0 0 L calc(w) 0 L calc(w) calc(h) L 0 calc(h) Z",
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "#f5f5f5" },
              { offset: "50%", color: "#d1d1d1" },
              { offset: "100%", color: "#bfbfbf" },
            ],
          },
          stroke: "gray",
          strokeWidth: 2,
        },
        label: {
          text: "Square Tank", // Tank label
          textAnchor: "middle",
          textVerticalAnchor: "top",
          x: "calc(w/2)", // Center the label horizontally
          y: "-20", // Adjust y positioning of the label
          fontSize: 13,
          fontFamily: "sans-serif",
          fill: "black", // Tank label in black
        },
        panel: {
          text: "Square Tank",
          href: "./Images/Elements/squareTank.jpg",
        },
        waterLevel: {
          text: "Level 0 m",
          textAnchor: "middle",
          textVerticalAnchor: "bottom",
          x: "calc(w/2)",
          y: "calc(h+30)",
          fontSize: 16,
          fontFamily: "sans-serif",
          fill: "blue",
        },
        water: {
          text: 0,
        },
        graph: {
          x: "85",
          y: "10",
          width: "30",
          height: "80",
          href: "./Images/Elements/graph.svg",
        },
        graphlevel: {
          text: "0 cbm",
          fontSize: 8,
          fontWeight: "bold",
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "100",
          y: "75",
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
        location: {
          text: "Location",
          fontSize: 13,
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "calc(w+50)",
          y: "calc(h)",
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
      },
      ports: {
        panel: {
          size: 5,
        },
        groups: {
          p1: {
            ...portsIn,
            position: {
              args: {
                y: "20",
              },
            },
          },
          p2: {
            ...portsOut,
            position: {
              args: {
                y: "80",
                x: "130",
              },
            },
          },
        },
        items: [
          {
            group: "p1",
            id: "p1",
            attrs: {
              label: {
                text: "p1",
                fill: "#383838",
              },
            },
          },
          {
            group: "p2",
            id: "p2",
            attrs: {
              label: {
                text: "p2",
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
      <path @selector="body"/>   <!-- Defines the tank with a concave top -->
      <image @selector="graph" />
      <text @selector="graphlevel"/>
      <text @selector="label"/>           <!-- Tank label -->
      <text @selector="waterLevel"/>
      <text @selector="location"/>
    `;
  }
}
class squareTank3 extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "squareTank",
      size: {
        width: 110,
        height: 90,
      },
      attrs: {
        node: {
          size: 3,
        },
        body: {
          d: "M 0 0 L calc(w) 0 L calc(w) calc(h) L 0 calc(h) Z",
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "#f5f5f5" },
              { offset: "50%", color: "#d1d1d1" },
              { offset: "100%", color: "#bfbfbf" },
            ],
          },
          stroke: "gray",
          strokeWidth: 2,
        },
        label: {
          text: "Square Tank", // Tank label
          textAnchor: "middle",
          textVerticalAnchor: "top",
          x: "calc(w/2)", // Center the label horizontally
          y: "-20", // Adjust y positioning of the label
          fontSize: 12,
          fontFamily: "sans-serif",
          fill: "black", // Tank label in black
        },
        panel: {
          text: "Square Tank",
          href: "./Images/Elements/squareTank.jpg",
        },
        waterLevel: {
          text: "Level 0 m",
          textAnchor: "middle",
          textVerticalAnchor: "bottom",
          x: "calc(w/2)",
          y: "calc(h+20)",
          fontSize: 14,
          fontFamily: "sans-serif",
          fill: "blue",
        },
        water: {
          text: 0,
        },
        graph: {
          x: "calc(h-25)",
          width: "30",
          height: "75",
          href: "./Images/Elements/graph.svg",
        },
        graphlevel: {
          text: "0 cbm",
          fontSize: 7,
          fontWeight: "bold",
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "80",
          y: "60",
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
        location: {
          text: "Location",
          fontSize: 12,
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "calc(w+40)",
          y: "calc(h)",
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
      },
      ports: {
        panel: {
          size: 5,
        },
        groups: {
          p1: {
            ...portsIn,
            position: {
              args: {
                y: "20",
              },
            },
          },
          p2: {
            ...portsOut,
            position: {
              args: {
                y: "60",
                x: "110",
              },
            },
          },
        },
        items: [
          {
            group: "p1",
            id: "p1",
            attrs: {
              label: {
                text: "p1",
                fill: "#383838",
              },
            },
          },
          {
            group: "p2",
            id: "p2",
            attrs: {
              label: {
                text: "p2",
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
      <path @selector="body"/>   <!-- Defines the tank with a concave top -->
      <image @selector="graph" />
      <text @selector="graphlevel"/>
      <text @selector="label"/>           <!-- Tank label -->
      <text @selector="waterLevel"/>
      <text @selector="location"/>
    `;
  }
}
class squareTank2 extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "squareTank",
      size: {
        width: 90,
        height: 70,
      },
      attrs: {
        node: {
          size: 2,
        },
        body: {
          d: "M 0 0 L calc(w) 0 L calc(w) calc(h) L 0 calc(h) Z",
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "#f5f5f5" },
              { offset: "50%", color: "#d1d1d1" },
              { offset: "100%", color: "#bfbfbf" },
            ],
          },
          stroke: "gray",
          strokeWidth: 2,
        },
        label: {
          text: "Square Tank", // Tank label
          textAnchor: "middle",
          textVerticalAnchor: "top",
          x: "calc(w/2)", // Center the label horizontally
          y: "-20", // Adjust y positioning of the label
          fontSize: 12,
          fontFamily: "sans-serif",
          fill: "black", // Tank label in black
        },
        panel: {
          text: "Square Tank",
          href: "./Images/Elements/squareTank.jpg",
        },
        waterLevel: {
          text: "Level 0 m",
          textAnchor: "middle",
          textVerticalAnchor: "bottom",
          x: "calc(w/2)",
          y: "calc(h+25)",
          fontSize: 14,
          fontFamily: "sans-serif",
          fill: "blue",
        },
        water: {
          text: 0,
        },
        graph: {
          x: "calc(h-10)",
          width: "22",
          height: "60",
          href: "./Images/Elements/graph.svg",
        },
        graphlevel: {
          text: "0 cbm",
          fontSize: 6,
          fontWeight: "bold",
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "70",
          y: "50",
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
        location: {
          text: "Location",
          fontSize: 11,
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "calc(w+30)",
          y: "calc(h)",
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
      },
      ports: {
        panel: {
          size: 5,
        },
        groups: {
          p1: {
            ...portsIn,
            position: {
              args: {
                y: "20",
              },
            },
          },
          p2: {
            ...portsOut,
            position: {
              args: {
                y: "50",
                x: "90",
              },
            },
          },
        },
        items: [
          {
            group: "p1",
            id: "p1",
            attrs: {
              label: {
                text: "p1",
                fill: "#383838",
              },
            },
          },
          {
            group: "p2",
            id: "p2",
            attrs: {
              label: {
                text: "p2",
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
      <path @selector="body"/>   <!-- Defines the tank with a concave top -->
      <image @selector="graph" />
      <text @selector="graphlevel"/>
      <text @selector="label"/>           <!-- Tank label -->
      <text @selector="waterLevel"/>
      <text @selector="location"/>
    `;
  }
}
class squareTank1 extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "squareTank",
      size: {
        width: 70,
        height: 50,
      },
      attrs: {
        node: {
          size: 1,
        },
        body: {
          d: "M 0 0 L calc(w) 0 L calc(w) calc(h) L 0 calc(h) Z",
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "#f5f5f5" },
              { offset: "50%", color: "#d1d1d1" },
              { offset: "100%", color: "#bfbfbf" },
            ],
          },
          stroke: "gray",
          strokeWidth: 2,
        },
        label: {
          text: "Square Tank", // Tank label
          textAnchor: "middle",
          textVerticalAnchor: "top",
          x: "calc(w/2)", // Center the label horizontally
          y: "-20", // Adjust y positioning of the label
          fontSize: 10,
          fontFamily: "sans-serif",
          fill: "black", // Tank label in black
        },
        panel: {
          text: "Square Tank",
          href: "./Images/Elements/squareTank.jpg",
        },
        waterLevel: {
          text: "Level 0 m",
          textAnchor: "middle",
          textVerticalAnchor: "bottom",
          x: "calc(w/2)",
          y: "calc(h+20)",
          fontSize: 10,
          fontFamily: "sans-serif",
          fill: "blue",
        },
        water: {
          text: 0,
        },
        graph: {
          x: "calc(h-5)",
          width: "15",
          height: "50",
          href: "./Images/Elements/graph.svg",
        },
        graphlevel: {
          text: "0 cbm",
          fontSize: 5,
          fontWeight: "bold",
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "52",
          y: "40",
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
        location: {
          text: "Location",
          fontSize: 9,
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "calc(w+25)",
          y: "calc(h)",
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
      },
      ports: {
        panel: {
          size: 5,
        },
        groups: {
          p1: {
            ...portsIn,
            position: {
              args: {
                y: "10",
              },
            },
          },
          p2: {
            ...portsOut,
            position: {
              args: {
                y: "30",
                x: "70",
              },
            },
          },
        },
        items: [
          {
            group: "p1",
            id: "p1",
            attrs: {
              label: {
                text: "p1",
                fill: "#383838",
              },
            },
          },
          {
            group: "p2",
            id: "p2",
            attrs: {
              label: {
                text: "p2",
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
      <path @selector="body"/>   <!-- Defines the tank with a concave top -->
      <image @selector="graph" />
      <text @selector="graphlevel"/>
      <text @selector="label"/>           <!-- Tank label -->
      <text @selector="waterLevel"/>
      <text @selector="location"/>
    `;
  }
}

//-----------------------------------LiquidTank Model DONE--------------------------------------
class LiquidTank extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "LiquidTank",
      size: {
        width: 200,
        height: 180,
      },
      attrs: {
        node: {
          size: 5,
        },
        panel: {
          text: "Liquid Tank",
          href: "./Images/Elements/liquidTank.jpg",
        },
        body: {
          d: "M 0 50 A 60 15 0 0 1 150 50 L 150 150 L 0 150 Z", // Rectangle for the tank body
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "#f5f5f5" }, // Light metallic gray
              { offset: "50%", color: "#d1d1d1" }, // Light gray in the middle
              { offset: "100%", color: "#f5f5f5" }, // Darker gray towards the bottom
            ],
          },
        },
        left: {
          d: "M 0 50 L 0 150",
          stroke: "gray",
          strokeWidth: 2,
        },
        right: {
          d: "M 150 50 L 150 150",
          stroke: "gray",
          strokeWidth: 2,
        },
        topEllipse: {
          d: "M 0 50 A 60 15 0 0 1 150 50 A 60 5 0 0 1 0 50 Z", // Ellipse for the top of the tank
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "#f5f5f5" }, // Light metallic gray
              { offset: "50%", color: "#d1d1d1" }, // Light gray in the middle
              { offset: "100%", color: "#f5f5f5" }, // Darker gray towards the bottom
            ],
          },
          stroke: "gray",
          strokeWidth: 2,
        },
        bottomEllipse: {
          d: "M 0 150 A 60 10 1 0 0 150 150", // Ellipse for the bottom of the tank
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "#f5f5f5" }, // Light metallic gray
              { offset: "50%", color: "#d1d1d1" }, // Light gray in the middle
              { offset: "100%", color: "#f5f5f5" }, // Darker gray towards the bottom
            ],
          },
          stroke: "gray",
          strokeWidth: 2,
        },
        label: {
          text: "Liquid Tank", // Tank label
          textAnchor: "middle",
          textVerticalAnchor: "top",
          x: "60", // Center the label horizontally
          y: "10", // Adjust y positioning of the label
          fontSize: 14,
          fontFamily: "sans-serif",
          fill: "black", // Tank label in black
        },
        waterLevel: {
          text: "Level 0 m", // Tank label
          textAnchor: "middle",
          textVerticalAnchor: "bottom",
          x: "60", // Center the label horizontally
          y: "190", // Adjust y positioning of the label
          fontSize: 18,
          fontFamily: "sans-serif",
          fill: "blue", // Tank label in black
        },
        water: {
          text: 0,
        },
        location: {
          text: "Location", // Label text
          fontSize: 14,
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "190", // Center the label horizontally
          y: "160", // Adjust y positioning of the label
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
        graph: {
          x: "95",
          y: "60",
          href: "./Images/Elements/graph.svg",
        },
        graphlevel: {
          text: "0 cbm", // Label text
          fontSize: 8,
          fontWeight: "bold",
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "115", // Center the label horizontally
          y: "140", // Adjust y positioning of the label
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
      },
      ports: {
        panel: {
          size: 5,
        },
        groups: {
          p1: {
            ...portsIn,
            position: {
              args: {
                y: 70,
                x: 0,
              },
            },
          },
          p2: {
            ...portsOut,
            position: {
              args: {
                y: 70,
                x: 150,
              },
            },
          },
          p3: {
            ...portsIn,
            position: {
              name: "top",
              args: {
                y: 40,
                x: 100,
              },
            },
          },
        },
        attrs: {
          fontSize: 250,
        },
        items: [
          {
            group: "p1",
            id: "p1",
            attrs: {
              label: {
                text: "p1",
                fill: "#383838",
              },
            },
          },
          {
            group: "p3",
            id: "p3",
            //z: 0,
            attrs: {
              label: {
                text: "p3",
                fill: "#383838",
              },
            },
          },
          {
            group: "p2",
            id: "p2",
            //z: 0,
            attrs: {
              label: {
                text: "p2",
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
    <path @selector="body"/>               <!-- Rectangle for the tank -->
      <path @selector="left"/>
      <path @selector="right"/>
      <path @selector="topEllipse"/>   <!-- Ellipse for the top of the tank -->
      <path @selector="bottomEllipse"/> <!-- Ellipse for the bottom of the tank -->
      <image @selector="graph" />
      <text @selector="graphlevel" />
      <text @selector="label"/>        <!-- Title text -->
      <text @selector="waterLevel"/>
      <text @selector="location"/>
    `;
  }

  // Getter and setter for level
  get level() {
    return this.get("level") || 0;
  }

  setlevel(level) {
    const newLevel = Math.max(0, Math.min(100, level)); // Clamp level between 0 and 100
    this.set("level", newLevel);

    // Update liquid fill for the tank
    const levelHeight = (newLevel / 100) * 90; // Assume full height of indicator is 90px
    this.attr("liquid/height", levelHeight);
    this.attr("liquid/y", 140 - levelHeight); // Adjust y to move the liquid up

    // Update the waterLevel text to display the current water level in meters
    const waterLevelMeters = (newLevel / 20).toPrecision(4); // Assume 5 meters corresponds to 100%

    this.attr("waterLevel/text", `Level: ${parseFloat(waterLevelMeters)} m`);

    // Update the panel if it's embedded
    const embeddedPanel = this.getEmbeddedCells().find(
      (cell) => cell instanceof Panel
    );
    if (embeddedPanel) {
      embeddedPanel.setLevel(newLevel); // Update the panel's level
    }
  }

  updateWaterLevel(level) {
    this.attr("graphlevel/text", `${parseFloat(level)} cbm`);
  }
}
class LiquidTank4 extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "LiquidTank",
      size: {
        width: 200,
        height: 180,
      },
      attrs: {
        node: {
          size: 4,
        },
        panel: {
          text: "Liquid Tank",
          href: "./Images/Elements/liquidTank.jpg",
        },
        body: {
          d: "M 0 50 A 60 15 0 0 1 130 50 L 130 130 L 0 130 Z", // Rectangle for the tank body
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "#f5f5f5" }, // Light metallic gray
              { offset: "50%", color: "#d1d1d1" }, // Light gray in the middle
              { offset: "100%", color: "#f5f5f5" }, // Darker gray towards the bottom
            ],
          },
        },
        left: {
          d: "M 0 50 L 0 130",
          stroke: "gray",
          strokeWidth: 2,
        },
        right: {
          d: "M 130 50 L 130 130",
          stroke: "gray",
          strokeWidth: 2,
        },
        topEllipse: {
          d: "M 0 50 A 60 15 0 0 1 130 50 A 60 5 0 0 1 0 50 Z", // Ellipse for the top of the tank
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "#f5f5f5" }, // Light metallic gray
              { offset: "50%", color: "#d1d1d1" }, // Light gray in the middle
              { offset: "100%", color: "#f5f5f5" }, // Darker gray towards the bottom
            ],
          },
          stroke: "gray",
          strokeWidth: 2,
        },
        bottomEllipse: {
          d: "M 0 130 A 60 10 1 0 0 130 130", // Ellipse for the bottom of the tank
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "#f5f5f5" }, // Light metallic gray
              { offset: "50%", color: "#d1d1d1" }, // Light gray in the middle
              { offset: "100%", color: "#f5f5f5" }, // Darker gray towards the bottom
            ],
          },
          stroke: "gray",
          strokeWidth: 2,
        },
        label: {
          text: "Liquid Tank", // Tank label
          textAnchor: "middle",
          textVerticalAnchor: "top",
          x: "60", // Center the label horizontally
          y: "10", // Adjust y positioning of the label
          fontSize: 13,
          fontFamily: "sans-serif",
          fill: "black", // Tank label in black
        },
        waterLevel: {
          text: "Level 0 m", // Tank label
          textAnchor: "middle",
          textVerticalAnchor: "bottom",
          x: "60", // Center the label horizontally
          y: "170", // Adjust y positioning of the label
          fontSize: 16,
          fontFamily: "sans-serif",
          fill: "blue", // Tank label in black
        },
        water: {
          text: 0,
        },
        location: {
          text: "Location", // Label text
          fontSize: 13,
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "180", // Center the label horizontally
          y: "140", // Adjust y positioning of the label
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
        graph: {
          x: "95",
          y: "60",
          width: "30",
          height: "80",
          href: "./Images/Elements/graph.svg",
        },
        graphlevel: {
          text: "0 cbm", // Label text
          fontSize: 8,
          fontWeight: "bold",
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "110", // Center the label horizontally
          y: "125", // Adjust y positioning of the label
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
      },
      ports: {
        panel: {
          size: 5,
        },
        groups: {
          p1: {
            ...portsIn,
            position: {
              args: {
                y: 70,
                x: 0,
              },
            },
          },
          p2: {
            ...portsOut,
            position: {
              args: {
                y: 70,
                x: 130,
              },
            },
          },
          p3: {
            ...portsIn,
            position: {
              name: "top",
              args: {
                y: 45,
                x: 95,
              },
            },
          },
        },
        attrs: {
          fontSize: 250,
        },
        items: [
          {
            group: "p1",
            id: "p1",
            attrs: {
              label: {
                text: "p1",
                fill: "#383838",
              },
            },
          },
          {
            group: "p3",
            id: "p3",
            //z: 0,
            attrs: {
              label: {
                text: "p3",
                fill: "#383838",
              },
            },
          },
          {
            group: "p2",
            id: "p2",
            //z: 0,
            attrs: {
              label: {
                text: "p2",
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
    <path @selector="body"/>               <!-- Rectangle for the tank -->
      <path @selector="left"/>
      <path @selector="right"/>
      <path @selector="topEllipse"/>   <!-- Ellipse for the top of the tank -->
      <path @selector="bottomEllipse"/> <!-- Ellipse for the bottom of the tank -->
      <image @selector="graph" />
      <text @selector="graphlevel" />
      <text @selector="label"/>        <!-- Title text -->
      <text @selector="waterLevel"/>
      <text @selector="location"/>
    `;
  }
}
class LiquidTank3 extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "LiquidTank",
      size: {
        width: 200,
        height: 180,
      },
      attrs: {
        node: {
          size: 3,
        },
        panel: {
          text: "Liquid Tank",
          href: "./Images/Elements/liquidTank.jpg",
        },
        body: {
          d: "M 0 50 A 60 15 0 0 1 120 50 L 120 120 L 0 120 Z", // Rectangle for the tank body
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "#f5f5f5" }, // Light metallic gray
              { offset: "50%", color: "#d1d1d1" }, // Light gray in the middle
              { offset: "100%", color: "#f5f5f5" }, // Darker gray towards the bottom
            ],
          },
        },
        left: {
          d: "M 0 50 L 0 120",
          stroke: "gray",
          strokeWidth: 2,
        },
        right: {
          d: "M 120 50 L 120 120",
          stroke: "gray",
          strokeWidth: 2,
        },
        topEllipse: {
          d: "M 0 50 A 60 15 0 0 1 120 50 A 60 5 0 0 1 0 50 Z", // Ellipse for the top of the tank
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "#f5f5f5" }, // Light metallic gray
              { offset: "50%", color: "#d1d1d1" }, // Light gray in the middle
              { offset: "100%", color: "#f5f5f5" }, // Darker gray towards the bottom
            ],
          },
          stroke: "gray",
          strokeWidth: 2,
        },
        bottomEllipse: {
          d: "M 0 120 A 60 10 1 0 0 120 120", // Ellipse for the bottom of the tank
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "#f5f5f5" }, // Light metallic gray
              { offset: "50%", color: "#d1d1d1" }, // Light gray in the middle
              { offset: "100%", color: "#f5f5f5" }, // Darker gray towards the bottom
            ],
          },
          stroke: "gray",
          strokeWidth: 2,
        },
        label: {
          text: "Liquid Tank", // Tank label
          textAnchor: "middle",
          textVerticalAnchor: "top",
          x: "60", // Center the label horizontally
          y: "20", // Adjust y positioning of the label
          fontSize: 12,
          fontFamily: "sans-serif",
          fill: "black", // Tank label in black
        },
        waterLevel: {
          text: "Level 0 m", // Tank label
          textAnchor: "middle",
          textVerticalAnchor: "bottom",
          x: "60", // Center the label horizontally
          y: "155", // Adjust y positioning of the label
          fontSize: 14,
          fontFamily: "sans-serif",
          fill: "blue", // Tank label in black
        },
        water: {
          text: 0,
        },
        location: {
          text: "Location", // Label text
          fontSize: 12,
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "160", // Center the label horizontally
          y: "130", // Adjust y positioning of the label
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
        graph: {
          x: "80",
          y: "55",
          width: "25",
          height: "70",
          href: "./Images/Elements/graph.svg",
        },
        graphlevel: {
          text: "0 cbm", // Label text
          fontSize: 7,
          fontWeight: "bold",
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "92", // Center the label horizontally
          y: "110", // Adjust y positioning of the label
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
      },
      ports: {
        panel: {
          size: 5,
        },
        groups: {
          p1: {
            ...portsIn,
            position: {
              args: {
                y: 70,
                x: 0,
              },
            },
          },
          p2: {
            ...portsOut,
            position: {
              args: {
                y: 70,
                x: 120,
              },
            },
          },
          p3: {
            ...portsIn,
            position: {
              name: "top",
              args: {
                y: 45,
                x: 90,
              },
            },
          },
        },
        attrs: {
          fontSize: 250,
        },
        items: [
          {
            group: "p1",
            id: "p1",
            attrs: {
              label: {
                text: "p1",
                fill: "#383838",
              },
            },
          },
          {
            group: "p3",
            id: "p3",
            //z: 0,
            attrs: {
              label: {
                text: "p3",
                fill: "#383838",
              },
            },
          },
          {
            group: "p2",
            id: "p2",
            //z: 0,
            attrs: {
              label: {
                text: "p2",
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
    <path @selector="body"/>               <!-- Rectangle for the tank -->
      <path @selector="left"/>
      <path @selector="right"/>
      <path @selector="topEllipse"/>   <!-- Ellipse for the top of the tank -->
      <path @selector="bottomEllipse"/> <!-- Ellipse for the bottom of the tank -->
      <image @selector="graph" />
      <text @selector="graphlevel" />
      <text @selector="label"/>        <!-- Title text -->
      <text @selector="waterLevel"/>
      <text @selector="location"/>
    `;
  }
}
class LiquidTank2 extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "LiquidTank",
      size: {
        width: 200,
        height: 180,
      },
      attrs: {
        node: {
          size: 2,
        },
        panel: {
          text: "Liquid Tank",
          href: "./Images/Elements/liquidTank.jpg",
        },
        body: {
          d: "M 0 40 A 60 25 0 0 1 100 40 L 100 100 L 0 100 Z", // Rectangle for the tank body
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "#f5f5f5" }, // Light metallic gray
              { offset: "50%", color: "#d1d1d1" }, // Light gray in the middle
              { offset: "100%", color: "#f5f5f5" }, // Darker gray towards the bottom
            ],
          },
        },
        left: {
          d: "M 0 40 L 0 100",
          stroke: "gray",
          strokeWidth: 2,
        },
        right: {
          d: "M 100 40 L 100 100",
          stroke: "gray",
          strokeWidth: 2,
        },
        topEllipse: {
          d: "M 0 40 A 60 25 0 0 1 100 40 A 60 10 0 0 1 0 40 Z", // Ellipse for the top of the tank
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "#f5f5f5" }, // Light metallic gray
              { offset: "50%", color: "#d1d1d1" }, // Light gray in the middle
              { offset: "100%", color: "#f5f5f5" }, // Darker gray towards the bottom
            ],
          },
          stroke: "gray",
          strokeWidth: 2,
        },
        bottomEllipse: {
          d: "M 0 100 A 60 10 1 0 0 100 100", // Ellipse for the bottom of the tank
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "#f5f5f5" }, // Light metallic gray
              { offset: "50%", color: "#d1d1d1" }, // Light gray in the middle
              { offset: "100%", color: "#f5f5f5" }, // Darker gray towards the bottom
            ],
          },
          stroke: "gray",
          strokeWidth: 2,
        },
        label: {
          text: "Liquid Tank", // Tank label
          textAnchor: "middle",
          textVerticalAnchor: "top",
          x: "50", // Center the label horizontally
          y: "10", // Adjust y positioning of the label
          fontSize: 12,
          fontFamily: "sans-serif",
          fill: "black", // Tank label in black
        },
        waterLevel: {
          text: "Level 0 m", // Tank label
          textAnchor: "middle",
          textVerticalAnchor: "bottom",
          x: "50", // Center the label horizontally
          y: "130", // Adjust y positioning of the label
          fontSize: 12,
          fontFamily: "sans-serif",
          fill: "blue", // Tank label in black
        },
        water: {
          text: 0,
        },
        location: {
          text: "Location", // Label text
          fontSize: 12,
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "140", // Center the label horizontally
          y: "100", // Adjust y positioning of the label
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
        graph: {
          x: "70",
          y: "40",
          width: "20",
          height: "70",
          href: "./Images/Elements/graph.svg",
        },
        graphlevel: {
          text: "0 cbm", // Label text
          fontSize: 6,
          fontWeight: "bold",
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "80", // Center the label horizontally
          y: "92  ", // Adjust y positioning of the label
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
      },
      ports: {
        panel: {
          size: 5,
        },
        groups: {
          p1: {
            ...portsIn,
            position: {
              args: {
                y: 70,
                x: 0,
              },
            },
          },
          p2: {
            ...portsOut,
            position: {
              args: {
                y: 70,
                x: 100,
              },
            },
          },
          p3: {
            ...portsIn,
            position: {
              name: "top",
              args: {
                y: 38,
                x: 72,
              },
            },
          },
        },
        attrs: {
          fontSize: 250,
        },
        items: [
          {
            group: "p1",
            id: "p1",
            attrs: {
              label: {
                text: "p1",
                fill: "#383838",
              },
            },
          },
          {
            group: "p3",
            id: "p3",
            //z: 0,
            attrs: {
              label: {
                text: "p3",
                fill: "#383838",
              },
            },
          },
          {
            group: "p2",
            id: "p2",
            //z: 0,
            attrs: {
              label: {
                text: "p2",
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
    <path @selector="body"/>               <!-- Rectangle for the tank -->
      <path @selector="left"/>
      <path @selector="right"/>
      <path @selector="topEllipse"/>   <!-- Ellipse for the top of the tank -->
      <path @selector="bottomEllipse"/> <!-- Ellipse for the bottom of the tank -->
      <image @selector="graph" />
      <text @selector="graphlevel" />
      <text @selector="label"/>        <!-- Title text -->
      <text @selector="waterLevel"/>
      <text @selector="location"/>
    `;
  }
}
class LiquidTank1 extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "LiquidTank",
      size: {
        width: 200,
        height: 180,
      },
      attrs: {
        node: {
          size: 1,
        },
        panel: {
          text: "Liquid Tank",
          href: "./Images/Elements/liquidTank.jpg",
        },
        body: {
          d: "M 0 40 A 60 35 0 0 1 80 50 L 80 80 L 0 80 Z", // Rectangle for the tank body
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "#f5f5f5" }, // Light metallic gray
              { offset: "50%", color: "#d1d1d1" }, // Light gray in the middle
              { offset: "100%", color: "#f5f5f5" }, // Darker gray towards the bottom
            ],
          },
        },
        left: {
          d: "M 0 40 L 0 80",
          stroke: "gray",
          strokeWidth: 2,
        },
        right: {
          d: "M 80 40 L 80 80",
          stroke: "gray",
          strokeWidth: 2,
        },
        topEllipse: {
          d: "M 0 40 A 60 35 0 0 1 80 40 A 60 15 0 0 1 0 40 Z", // Ellipse for the top of the tank
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "#f5f5f5" }, // Light metallic gray
              { offset: "50%", color: "#d1d1d1" }, // Light gray in the middle
              { offset: "100%", color: "#f5f5f5" }, // Darker gray towards the bottom
            ],
          },
          stroke: "gray",
          strokeWidth: 2,
        },
        bottomEllipse: {
          d: "M 0 80 A 60 15 1 0 0 80 80", // Ellipse for the bottom of the tank
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "#f5f5f5" }, // Light metallic gray
              { offset: "50%", color: "#d1d1d1" }, // Light gray in the middle
              { offset: "100%", color: "#f5f5f5" }, // Darker gray towards the bottom
            ],
          },
          stroke: "gray",
          strokeWidth: 2,
        },
        label: {
          text: "Liquid Tank", // Tank label
          textAnchor: "middle",
          textVerticalAnchor: "top",
          x: "40", // Center the label horizontally
          y: "18", // Adjust y positioning of the label
          fontSize: 10,
          fontFamily: "sans-serif",
          fill: "black", // Tank label in black
        },
        waterLevel: {
          text: "Level 0 m", // Tank label
          textAnchor: "middle",
          textVerticalAnchor: "bottom",
          x: "40", // Center the label horizontally
          y: "100", // Adjust y positioning of the label
          fontSize: 10,
          fontFamily: "sans-serif",
          fill: "blue", // Tank label in black
        },
        water: {
          text: 0,
        },
        location: {
          text: "Location", // Label text
          fontSize: 9,
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "110", // Center the label horizontally
          y: "80", // Adjust y positioning of the label
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
        graph: {
          x: "55",
          y: "30",
          width: "20",
          height: "55",
          href: "./Images/Elements/graph.svg",
        },
        graphlevel: {
          text: "0 cbm", // Label text
          fontSize: 5,
          fontWeight: "bold",
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "65", // Center the label horizontally
          y: "75", // Adjust y positioning of the label
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
      },
      ports: {
        panel: {
          size: 5,
        },
        groups: {
          p1: {
            ...portsIn,
            position: {
              args: {
                y: 70,
                x: 0,
              },
            },
          },
          p2: {
            ...portsOut,
            position: {
              args: {
                y: 70,
                x: 80,
              },
            },
          },
          p3: {
            ...portsIn,
            position: {
              name: "top",
              args: {
                y: 38,
                x: 60,
              },
            },
          },
        },
        items: [
          {
            group: "p1",
            id: "p1",
            attrs: {
              label: {
                text: "p1",
                fill: "#383838",
              },
            },
          },
          {
            group: "p3",
            id: "p3",
            //z: 0,
            attrs: {
              label: {
                text: "p3",
                fill: "#383838",
              },
            },
          },
          {
            group: "p2",
            id: "p2",
            //z: 0,
            attrs: {
              label: {
                text: "p2",
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
    <path @selector="body"/>               <!-- Rectangle for the tank -->
      <path @selector="left"/>
      <path @selector="right"/>
      <path @selector="topEllipse"/>   <!-- Ellipse for the top of the tank -->
      <path @selector="bottomEllipse"/> <!-- Ellipse for the bottom of the tank -->
      <image @selector="graph" />
      <text @selector="graphlevel" />
      <text @selector="label"/>        <!-- Title text -->
      <text @selector="waterLevel"/>
      <text @selector="location"/>
    `;
  }
}

//-----------------------------------PumpHouse Model DONE---------------------------------------
class BoosterPumpHouse extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "BoosterPumpHouse",
      attrs: {
        node: {
          size: 5,
        },
        panel: {
          text: "Booster Pump House",
          href: "./Images/Elements/pumpHouse.jpg",
        },
        body: {
          d: "M 0 50 A 60 15 0 0 1 150 50 L 150 150 L 0 150 Z", // Rectangle for the tank body
          fill: "#d3d3d3",
        },
        left: {
          d: "M 0 50 L 0 150",
          stroke: "black",
          strokeWidth: 2,
        },
        right: {
          d: "M 150 50 L 150 150",
          stroke: "black",
          strokeWidth: 2,
        },
        topEllipse: {
          d: "M 0 50 A 60 15 0 0 1 150 50 A 60 5 0 0 1 0 50 Z", // Ellipse for the top of the tank
          fill: "#d3d3d3",
          stroke: "gray",
          strokeWidth: 2,
        },
        bottomEllipse: {
          d: "M 0 150 A 60 10 1 0 0 150 150", // Ellipse for the bottom of the tank
          fill: "#d3d3d3",
          stroke: "black",
          strokeWidth: 2,
        },
        railingPosts: {
          d: `
            M 0 50 L 0 35
            M 20 27 L 20 38
            M 60 23 L 60 31
            M 100 23 L 100 32
            M 140 29 L 140 40
            M 20 55 L 20 42
            M 60 55 L 60 44
            M 100 55 L 100 42
            M 130 55 L 130 40
            M 150 50 L 150 35
          `, // Vertical posts for the railing
          stroke: "black",
          strokeWidth: 2,
        },
        handRail: {
          d: "M 0 35 A 60 10 0 0 1 150 35 A 60 7 0 0 1 0 35", // Curved handrail following the elliptical shape
          stroke: "black",
          strokeWidth: 2,
          fill: "none", // No fill for the handrail
        },
        ladder: {
          d: "M 80 55 L 80 162 M 90 55 L 90 162", // Ladder lines centered
          stroke: "black",
          strokeWidth: 2,
        },
        ladderSteps: {
          d: `
            M 80 65 L 90 65
            M 80 75 L 90 75
            M 80 85 L 90 85
            M 80 95 L 90 95
            M 80 105 L 90 105
            M 80 115 L 90 115
            M 80 125 L 90 125
            M 80 135 L 90 135
            M 80 145 L 90 145
            M 80 155 L 90 155
          `, // Ladder steps in the center
          stroke: "black",
          strokeWidth: 2,
        },
        label: {
          text: "Booster Pump House", // Tank label
          textAnchor: "middle",
          textVerticalAnchor: "top",
          x: "60", // Center the label horizontally
          y: "0", // Adjust y positioning of the label
          fontSize: 14,
          fontFamily: "sans-serif",
          fill: "black", // Tank label in black
        },
        waterLevel: {
          text: "Level 0 m", // Tank label
          textAnchor: "middle",
          textVerticalAnchor: "bottom",
          x: "60", // Center the label horizontally
          y: "190", // Adjust y positioning of the label
          fontSize: 18,
          fontFamily: "sans-serif",
          fill: "blue", // Tank label in black
        },
        water: {
          text: 0,
        },
        graph: {
          x: "100",
          y: "50",
          href: "./Images/Elements/graph.svg",
        },
        location: {
          text: "Location", // Label text
          fontSize: 14,
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "190", // Center the label horizontally
          y: "160", // Adjust y positioning of the label
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
        graphlevel: {
          text: "0 cbm", // Label text
          fontSize: 8,
          fontWeight: "bold",
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "125", // Center the label horizontally
          y: "130", // Adjust y positioning of the label
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
      },
      ports: {
        panel: {
          size: 5,
        },
        groups: {
          p1: {
            ...portsIn,
            position: {
              args: {
                y: "95",
              },
            },
          },
          p2: {
            ...portsOut,
            position: {
              name: "right",
              args: {
                x: "150",
                y: "95",
              },
            },
          },
        },
        items: [
          {
            group: "p1",
            id: "p1",
            attrs: {
              label: {
                text: "p1",
                fill: "#383838",
              },
            },
          },
          {
            group: "p2",
            id: "p2",
            attrs: {
              label: {
                text: "p2",
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
      <path @selector="body"/>         <!-- Rectangle for the tank -->
      <path @selector="left"/>
      <path @selector="right"/>
      <path @selector="topEllipse"/>   <!-- Ellipse for the top of the tank -->
      <path @selector="bottomEllipse"/> <!-- Ellipse for the bottom of the tank -->
      <path @selector="railingPosts"/>
      <path @selector="handRail"/>
      <path @selector="ladder"/>       <!-- Ladder on the tank -->
      <path @selector="ladderSteps"/>  <!-- Ladder steps -->
      <image @selector="graph"/>       <!-- Dotted border -->
      <text @selector="label"/>        <!-- Title text -->
      <text @selector="waterLevel"/>
      <text @selector="location"/> 
      <text @selector="graphlevel"/> 
    `;
  }
}
class BoosterPumpHouse4 extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "BoosterPumpHouse",
      attrs: {
        node: {
          size: 4,
        },
        panel: {
          text: "Booster Pump House",
          href: "./Images/Elements/pumpHouse.jpg",
        },
        body: {
          d: "M 0 50 A 60 15 0 0 1 130 50 L 130 130 L 0 130 Z", // Rectangle for the tank body
          fill: "#d3d3d3",
        },
        left: {
          d: "M 0 50 L 0 130",
          stroke: "black",
          strokeWidth: 2,
        },
        right: {
          d: "M 130 50 L 130 130",
          stroke: "black",
          strokeWidth: 2,
        },
        topEllipse: {
          d: "M 0 50 A 60 15 0 0 1 130 50 A 60 5 0 0 1 0 50 Z", // Ellipse for the top of the tank
          fill: "#d3d3d3",
          stroke: "gray",
          strokeWidth: 2,
        },
        bottomEllipse: {
          d: "M 0 130 A 60 10 1 0 0 130 130", // Ellipse for the bottom of the tank
          fill: "#d3d3d3",
          stroke: "black",
          strokeWidth: 2,
        },
        railingPosts: {
          d: `
            M 0 50 L 0 35
            M 20 27 L 20 38
            M 60 23 L 60 34
            M 100 26 L 100 35
            M 20 55 L 20 42
            M 60 55 L 60 44
            M 100 55 L 100 42
            M 130 55 L 130 40
            M 130 50 L 130 35
          `, // Vertical posts for the railing
          stroke: "black",
          strokeWidth: 2,
        },
        handRail: {
          d: "M 0 35 A 60 10 0 0 1 130 35 A 60 7 0 0 1 0 35", // Curved handrail following the elliptical shape
          stroke: "black",
          strokeWidth: 2,
          fill: "none", // No fill for the handrail
        },
        ladder: {
          d: "M 70 55 L 70 140 M 80 55 L 80 140", // Ladder lines centered
          stroke: "black",
          strokeWidth: 2,
        },
        ladderSteps: {
          d: `
            M 70 65 L 80 65
            M 70 75 L 80 75
            M 70 85 L 80 85
            M 70 95 L 80 95
            M 70 105 L 80 105
            M 70 115 L 80 115
            M 70 125 L 80 125
            M 70 135 L 80 135
          `, // Ladder steps in the center
          stroke: "black",
          strokeWidth: 2,
        },
        label: {
          text: "Booster Pump House", // Tank label
          textAnchor: "middle",
          textVerticalAnchor: "top",
          x: "60", // Center the label horizontally
          y: "0", // Adjust y positioning of the label
          fontSize: 13,
          fontFamily: "sans-serif",
          fill: "black", // Tank label in black
        },
        waterLevel: {
          text: "Level 0 m", // Tank label
          textAnchor: "middle",
          textVerticalAnchor: "bottom",
          x: "60", // Center the label horizontally
          y: "170", // Adjust y positioning of the label
          fontSize: 16,
          fontFamily: "sans-serif",
          fill: "blue", // Tank label in black
        },
        water: {
          text: 0,
        },
        graph: {
          x: "90",
          y: "50",
          width: "30",
          hieght: "60",
          href: "./Images/Elements/graph.svg",
        },
        location: {
          text: "Location", // Label text
          fontSize: 14,
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "175", // Center the label horizontally
          y: "130", // Adjust y positioning of the label
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
        graphlevel: {
          text: "0 cbm", // Label text
          fontSize: 8,
          fontWeight: "bold",
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "105", // Center the label horizontally
          y: "110", // Adjust y positioning of the label
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
      },
      ports: {
        panel: {
          size: 5,
        },
        groups: {
          p1: {
            ...portsIn,
            position: {
              args: {
                y: "95",
              },
            },
          },
          p2: {
            ...portsOut,
            position: {
              name: "right",
              args: {
                x: "130",
                y: "95",
              },
            },
          },
        },
        items: [
          {
            group: "p1",
            id: "p1",
            attrs: {
              label: {
                text: "p1",
                fill: "#383838",
              },
            },
          },
          {
            group: "p2",
            id: "p2",
            attrs: {
              label: {
                text: "p2",
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
      <path @selector="body"/>         <!-- Rectangle for the tank -->
      <path @selector="left"/>
      <path @selector="right"/>
      <path @selector="topEllipse"/>   <!-- Ellipse for the top of the tank -->
      <path @selector="bottomEllipse"/> <!-- Ellipse for the bottom of the tank -->
      <path @selector="railingPosts"/>
      <path @selector="handRail"/>
      <path @selector="ladder"/>       <!-- Ladder on the tank -->
      <path @selector="ladderSteps"/>  <!-- Ladder steps -->
      <image @selector="graph"/>       <!-- Dotted border -->
      <text @selector="label"/>        <!-- Title text -->
      <text @selector="waterLevel"/>
      <text @selector="location"/> 
      <text @selector="graphlevel"/> 
    `;
  }
}
class BoosterPumpHouse3 extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "BoosterPumpHouse",
      attrs: {
        node: {
          size: 3,
        },
        panel: {
          text: "Booster Pump House",
          href: "./Images/Elements/pumpHouse.jpg",
        },
        body: {
          d: "M 0 50 A 60 15 0 0 1 120 50 L 120 120 L 0 120 Z", // Rectangle for the tank body
          fill: "#d3d3d3",
        },
        left: {
          d: "M 0 50 L 0 120",
          stroke: "black",
          strokeWidth: 2,
        },
        right: {
          d: "M 120 50 L 120 120",
          stroke: "black",
          strokeWidth: 2,
        },
        topEllipse: {
          d: "M 0 50 A 60 15 0 0 1 120 50 A 60 5 0 0 1 0 50 Z", // Ellipse for the top of the tank
          fill: "#d3d3d3",
          stroke: "gray",
          strokeWidth: 2,
        },
        bottomEllipse: {
          d: "M 0 120 A 60 10 1 0 0 120 120", // Ellipse for the bottom of the tank
          fill: "#d3d3d3",
          stroke: "black",
          strokeWidth: 2,
        },
        railingPosts: {
          d: `
            M 0 50 L 0 35
            M 20 27 L 20 38
            M 60 24 L 60 34
            M 100 27 L 100 38
            M 20 54 L 20 40
            M 60 55 L 60 42
            M 100 55 L 100 40
            M 120 55 L 120 35
          `, // Vertical posts for the railing
          stroke: "black",
          strokeWidth: 2,
        },
        handRail: {
          d: "M 0 35 A 60 10 0 0 1 120 35 A 60 7 0 0 1 0 35", // Curved handrail following the elliptical shape
          stroke: "black",
          strokeWidth: 2,
          fill: "none", // No fill for the handrail
        },
        ladder: {
          d: "M 65 55 L 65 130 M 75 55 L 75 130", // Ladder lines centered
          stroke: "black",
          strokeWidth: 2,
        },
        ladderSteps: {
          d: `
            M 65 65 L 75 65
            M 65 75 L 75 75
            M 65 85 L 75 85
            M 65 95 L 75 95
            M 65 105 L 75 105
            M 65 115 L 75 115
            M 65 125 L 75 125
          `, // Ladder steps in the center
          stroke: "black",
          strokeWidth: 2,
        },
        label: {
          text: "Booster Pump House", // Tank label
          textAnchor: "middle",
          textVerticalAnchor: "top",
          x: "60", // Center the label horizontally
          y: "0", // Adjust y positioning of the label
          fontSize: 12,
          fontFamily: "sans-serif",
          fill: "black", // Tank label in black
        },
        waterLevel: {
          text: "Level 0 m", // Tank label
          textAnchor: "middle",
          textVerticalAnchor: "bottom",
          x: "60", // Center the label horizontally
          y: "160", // Adjust y positioning of the label
          fontSize: 14,
          fontFamily: "sans-serif",
          fill: "blue", // Tank label in black
        },
        water: {
          text: 0,
        },
        graph: {
          x: "90",
          y: "50",
          width: "25",
          height: "60",
          href: "./Images/Elements/graph.svg",
        },
        location: {
          text: "Location", // Label text
          fontSize: 12,
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "170", // Center the label horizontally
          y: "125", // Adjust y positioning of the label
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
        graphlevel: {
          text: "0 cbm", // Label text
          fontSize: 7,
          fontWeight: "bold",
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "100", // Center the label horizontally
          y: "100", // Adjust y positioning of the label
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
      },
      ports: {
        panel: {
          size: 5,
        },
        groups: {
          p1: {
            ...portsIn,
            position: {
              args: {
                y: "95",
              },
            },
          },
          p2: {
            ...portsOut,
            position: {
              name: "right",
              args: {
                x: "120",
                y: "95",
              },
            },
          },
        },
        items: [
          {
            group: "p1",
            id: "p1",
            attrs: {
              label: {
                text: "p1",
                fill: "#383838",
              },
            },
          },
          {
            group: "p2",
            id: "p2",
            attrs: {
              label: {
                text: "p2",
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
      <path @selector="body"/>         <!-- Rectangle for the tank -->
      <path @selector="left"/>
      <path @selector="right"/>
      <path @selector="topEllipse"/>   <!-- Ellipse for the top of the tank -->
      <path @selector="bottomEllipse"/> <!-- Ellipse for the bottom of the tank -->
      <path @selector="railingPosts"/>
      <path @selector="handRail"/>
      <path @selector="ladder"/>       <!-- Ladder on the tank -->
      <path @selector="ladderSteps"/>  <!-- Ladder steps -->
      <image @selector="graph"/>       <!-- Dotted border -->
      <text @selector="label"/>        <!-- Title text -->
      <text @selector="waterLevel"/>
      <text @selector="location"/> 
      <text @selector="graphlevel"/> 
    `;
  }
}
class BoosterPumpHouse2 extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "BoosterPumpHouse",
      attrs: {
        node: {
          size: 2,
        },
        panel: {
          text: "Booster Pump House",
          href: "./Images/Elements/pumpHouse.jpg",
        },
        body: {
          d: "M 0 50 A 60 15 0 0 1 100 50 L 100 100 L 0 100 Z", // Rectangle for the tank body
          fill: "#d3d3d3",
        },
        left: {
          d: "M 0 50 L 0 100",
          stroke: "black",
          strokeWidth: 2,
        },
        right: {
          d: "M 100 50 L 100 100",
          stroke: "black",
          strokeWidth: 2,
        },
        topEllipse: {
          d: "M 0 50 A 60 15 0 0 1 100 50 A 60 5 0 0 1 0 50 Z", // Ellipse for the top of the tank
          fill: "#d3d3d3",
          stroke: "gray",
          strokeWidth: 2,
        },
        bottomEllipse: {
          d: "M 0 100 A 60 10 1 0 0 100 100", // Ellipse for the bottom of the tank
          fill: "#d3d3d3",
          stroke: "black",
          strokeWidth: 2,
        },
        railingPosts: {
          d: `
            M 0 50 L 0 35
            M 30 32 L 30 45
            M 70 31 L 70 43
            M 20 52 L 20 38
            M 60 53 L 60 37
            M 100 50 L 100 35
          `, // Vertical posts for the railing
          stroke: "black",
          strokeWidth: 2,
        },
        handRail: {
          d: "M 0 35 A 60 10 0 0 1 100 35 A 60 7 0 0 1 0 35", // Curved handrail following the elliptical shape
          stroke: "black",
          strokeWidth: 2,
          fill: "none", // No fill for the handrail
        },
        ladder: {
          d: "M 55 53 L 55 105 M 65 53 L 65 105", // Ladder lines centered
          stroke: "black",
          strokeWidth: 2,
        },
        ladderSteps: {
          d: `
            M 55 60 L 65 60
            M 55 70 L 65 70
            M 55 80 L 65 80
            M 55 90 L 65 90
            M 55 100 L 65 100
          `, // Ladder steps in the center
          stroke: "black",
          strokeWidth: 2,
        },
        label: {
          text: "Booster Pump House", // Tank label
          textAnchor: "middle",
          textVerticalAnchor: "top",
          x: "60", // Center the label horizontally
          y: "010", // Adjust y positioning of the label
          fontSize: 11,
          fontFamily: "sans-serif",
          fill: "black", // Tank label in black
        },
        waterLevel: {
          text: "Level 0 m", // Tank label
          textAnchor: "middle",
          textVerticalAnchor: "bottom",
          x: "50", // Center the label horizontally
          y: "130", // Adjust y positioning of the label
          fontSize: 12,
          fontFamily: "sans-serif",
          fill: "blue", // Tank label in black
        },
        water: {
          text: 0,
        },
        graph: {
          x: "75",
          y: "50",
          width: "20",
          height: "50",
          href: "./Images/Elements/graph.svg",
        },
        location: {
          text: "Location", // Label text
          fontSize: 11,
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "140", // Center the label horizontally
          y: "100", // Adjust y positioning of the label
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
        graphlevel: {
          text: "0 cbm", // Label text
          fontSize: 6,
          fontWeight: "bold",
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "85", // Center the label horizontally
          y: "90", // Adjust y positioning of the label
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
      },
      ports: {
        panel: {
          size: 5,
        },
        groups: {
          p1: {
            ...portsIn,
            position: {
              args: {
                y: "55",
              },
            },
          },
          p2: {
            ...portsOut,
            position: {
              name: "right",
              args: {
                x: "100",
                y: "55",
              },
            },
          },
        },
        items: [
          {
            group: "p1",
            id: "p1",
            attrs: {
              label: {
                text: "p1",
                fill: "#383838",
              },
            },
          },
          {
            group: "p2",
            id: "p2",
            attrs: {
              label: {
                text: "p2",
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
      <path @selector="body"/>         <!-- Rectangle for the tank -->
      <path @selector="left"/>
      <path @selector="right"/>
      <path @selector="topEllipse"/>   <!-- Ellipse for the top of the tank -->
      <path @selector="bottomEllipse"/> <!-- Ellipse for the bottom of the tank -->
      <path @selector="railingPosts"/>
      <path @selector="handRail"/>
      <path @selector="ladder"/>       <!-- Ladder on the tank -->
      <path @selector="ladderSteps"/>  <!-- Ladder steps -->
      <image @selector="graph"/>       <!-- Dotted border -->
      <text @selector="label"/>        <!-- Title text -->
      <text @selector="waterLevel"/>
      <text @selector="location"/> 
      <text @selector="graphlevel"/> 
    `;
  }
}
class BoosterPumpHouse1 extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "BoosterPumpHouse",
      attrs: {
        node: {
          size: 1,
        },
        panel: {
          text: "Booster Pump House",
          href: "./Images/Elements/pumpHouse.jpg",
        },
        body: {
          d: "M 0 50 A 60 15 0 0 1 80 50 L 80 87 L 0 87 Z", // Rectangle for the tank body
          fill: "#d3d3d3",
        },
        left: {
          d: "M 0 50 L 0 87",
          stroke: "black",
          strokeWidth: 2,
        },
        right: {
          d: "M 80 50 L 80 87",
          stroke: "black",
          strokeWidth: 2,
        },
        topEllipse: {
          d: "M 0 50 A 60 15 0 0 1 80 50 A 60 5 0 0 1 0 50 Z", // Ellipse for the top of the tank
          fill: "#d3d3d3",
          stroke: "gray",
          strokeWidth: 2,
        },
        bottomEllipse: {
          d: "M 0 87 A 60 10 1 0 0 80 87", // Ellipse for the bottom of the tank
          fill: "#d3d3d3",
          stroke: "black",
          strokeWidth: 2,
        },
        railingPosts: {
          d: `
            M 0 50 L 0 35
            M 27 33 L 27 46
            M 67 33 L 67 48
            M 20 52 L 20 36
            M 60 52 L 60 36
            M 80 50 L 80 35
          `, // Vertical posts for the railing
          stroke: "black",
          strokeWidth: 2,
        },
        handRail: {
          d: "M 0 35 A 60 10 0 0 1 80 35 A 60 7 0 0 1 0 35", // Curved handrail following the elliptical shape
          stroke: "black",
          strokeWidth: 2,
          fill: "none", // No fill for the handrail
        },
        ladder: {
          d: "M 45 52 L 45 89 M 55 52 L 55 89", // Ladder lines centered
          stroke: "black",
          strokeWidth: 2,
        },
        ladderSteps: {
          d: `
            M 45 65 L 55 65
            M 45 75 L 55 75

          `, // Ladder steps in the center
          stroke: "black",
          strokeWidth: 2,
        },
        label: {
          text: "Booster Pump House", // Tank label
          textAnchor: "middle",
          textVerticalAnchor: "top",
          x: "40", // Center the label horizontally
          y: "14", // Adjust y positioning of the label
          fontSize: 10,
          fontFamily: "sans-serif",
          fill: "black", // Tank label in black
        },
        waterLevel: {
          text: "Level 0 m", // Tank label
          textAnchor: "middle",
          textVerticalAnchor: "bottom",
          x: "40", // Center the label horizontally
          y: "105", // Adjust y positioning of the label
          fontSize: 10,
          fontFamily: "sans-serif",
          fill: "blue", // Tank label in black
        },
        water: {
          text: 0,
        },
        graph: {
          x: "60",
          y: "45",
          wdith: "10",
          height: "30",
          href: "./Images/Elements/graph.svg",
        },
        location: {
          text: "Location", // Label text
          fontSize: 9,
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "110", // Center the label horizontally
          y: "75", // Adjust y positioning of the label
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
        graphlevel: {
          text: "0 cbm", // Label text
          fontSize: 5,
          fontWeight: "bold",
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "67", // Center the label horizontally
          y: "72", // Adjust y positioning of the label
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
      },
      ports: {
        panel: {
          size: 5,
        },
        groups: {
          p1: {
            ...portsIn,
            position: {
              args: {
                y: "40",
              },
            },
          },
          p2: {
            ...portsOut,
            position: {
              name: "right",
              args: {
                x: "80",
                y: "40",
              },
            },
          },
        },
        items: [
          {
            group: "p1",
            id: "p1",
            attrs: {
              label: {
                text: "p1",
                fill: "#383838",
              },
            },
          },
          {
            group: "p2",
            id: "p2",
            attrs: {
              label: {
                text: "p2",
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
      <path @selector="body"/>         <!-- Rectangle for the tank -->
      <path @selector="left"/>
      <path @selector="right"/>
      <path @selector="topEllipse"/>   <!-- Ellipse for the top of the tank -->
      <path @selector="bottomEllipse"/> <!-- Ellipse for the bottom of the tank -->
      <path @selector="railingPosts"/>
      <path @selector="handRail"/>
      <path @selector="ladder"/>       <!-- Ladder on the tank -->
      <path @selector="ladderSteps"/>  <!-- Ladder steps -->
      <image @selector="graph"/>       <!-- Dotted border -->
      <text @selector="label"/>        <!-- Title text -->
      <text @selector="waterLevel"/>
      <text @selector="location"/> 
      <text @selector="graphlevel"/> 
    `;
  }
}

//-----------------------------------Conic Tank Model DONE--------------------------------------
class ConicTank extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "ConicTank",
      size: {
        width: 130,
        height: 110,
      },
      attrs: {
        node: {
          size: 5,
        },
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
        waterLevel: {
          text: "Level 0 m", // Tank label
          textAnchor: "middle",
          textVerticalAnchor: "bottom",
          x: "140", // Center the label horizontally
          y: "170", // Adjust y positioning of the label
          fontSize: 18,
          fontFamily: "sans-serif",
          fill: "blue", // Tank label in black
        },
        water: {
          text: 0,
        },
        graph: {
          x: "80",
          y: "10",
          href: "./Images/Elements/graph.svg",
        },
        location: {
          text: "Location", // Label text
          fontSize: 14,
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "170", // Center the label horizontally
          y: "100", // Adjust y positioning of the label
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
        graphlevel: {
          text: "0 cbm", // Label text
          fontSize: 8,
          fontWeight: "bold",
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "100", // Center the label horizontally
          y: "90", // Adjust y positioning of the label
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
      },
      ports: {
        panel: {
          size: 5,
        },
        groups: {
          p1: {
            ...portsIn,
            position: {
              args: {
                y: "170",
                x: "65",
              },
            },
          },
        },
        attrs: {
          fontSize: 250,
        },
        items: [
          {
            group: "p1",
            id: "p1",
            attrs: {
              label: {
                text: "p1",
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
          <text @selector="waterLevel"/>
          <text @selector="location"/>
          <text @selector="graphlevel"/>
          <image @selector="graph" />
      `;
  }
}
class ConicTank4 extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "ConicTank",
      size: {
        width: 120,
        height: 100,
      },
      attrs: {
        node: {
          size: 4,
        },
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
        waterLevel: {
          text: "Level 0 m", // Tank label
          textAnchor: "middle",
          textVerticalAnchor: "bottom",
          x: "140", // Center the label horizontally
          y: "160", // Adjust y positioning of the label
          fontSize: 16,
          fontFamily: "sans-serif",
          fill: "blue", // Tank label in black
        },
        water: {
          text: 0,
        },
        graph: {
          x: "80",
          y: "10",
          width: "35",
          height: "80",
          href: "./Images/Elements/graph.svg",
        },
        location: {
          text: "Location", // Label text
          fontSize: 13,
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "160", // Center the label horizontally
          y: "100", // Adjust y positioning of the label
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
        graphlevel: {
          text: "0 cbm", // Label text
          fontSize: 8,
          fontWeight: "bold",
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "95", // Center the label horizontally
          y: "75", // Adjust y positioning of the label
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
      },
      ports: {
        panel: {
          size: 5,
        },
        groups: {
          p1: {
            ...portsIn,
            position: {
              args: {
                y: "160",
                x: "60",
              },
            },
          },
        },
        attrs: {
          fontSize: 250,
        },
        items: [
          {
            group: "p1",
            id: "p1",
            attrs: {
              label: {
                text: "p1",
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
          <text @selector="waterLevel"/>
          <text @selector="location"/>
          <text @selector="graphlevel"/>
          <image @selector="graph" />
      `;
  }
}
class ConicTank3 extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "ConicTank",
      size: {
        width: 110,
        height: 90,
      },
      attrs: {
        node: {
          size: 3,
        },
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
          d: "M 0 0 L calc(w) 0 L calc(w / 2 + 10) 68 h -20 Z",
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
        waterLevel: {
          text: "Level 0 m", // Tank label
          textAnchor: "middle",
          textVerticalAnchor: "bottom",
          x: "130", // Center the label horizontally
          y: "140", // Adjust y positioning of the label
          fontSize: 14,
          fontFamily: "sans-serif",
          fill: "blue", // Tank label in black
        },
        water: {
          text: 0,
        },
        graph: {
          x: "75",
          y: "10",
          width: "30",
          height: "75",
          href: "./Images/Elements/graph.svg",
        },
        location: {
          text: "Location", // Label text
          fontSize: 12,
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "150", // Center the label horizontally
          y: "90", // Adjust y positioning of the label
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
        graphlevel: {
          text: "0 cbm", // Label text
          fontSize: 8,
          fontWeight: "bold",
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "90", // Center the label horizontally
          y: "70", // Adjust y positioning of the label
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
      },
      ports: {
        panel: {
          size: 5,
        },
        groups: {
          p1: {
            ...portsIn,
            position: {
              args: {
                y: "148",
                x: "55",
              },
            },
          },
        },
        attrs: {
          fontSize: 250,
        },
        items: [
          {
            group: "p1",
            id: "p1",
            attrs: {
              label: {
                text: "p1",
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
          <text @selector="waterLevel"/>
          <text @selector="location"/>
          <text @selector="graphlevel"/>
          <image @selector="graph" />
      `;
  }
}
class ConicTank2 extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "ConicTank",
      size: {
        width: 100,
        height: 80,
      },
      attrs: {
        node: {
          size: 2,
        },
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
          d: "M 0 0 L calc(w) 0 L calc(w / 2 + 10) 65 h -20 Z",
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
        waterLevel: {
          text: "Level 0 m", // Tank label
          textAnchor: "middle",
          textVerticalAnchor: "bottom",
          x: "120", // Center the label horizontally
          y: "130", // Adjust y positioning of the label
          fontSize: 12,
          fontFamily: "sans-serif",
          fill: "blue", // Tank label in black
        },
        water: {
          text: 0,
        },
        graph: {
          x: "70",
          y: "10",
          width: "25",
          height: "60",
          href: "./Images/Elements/graph.svg",
        },
        location: {
          text: "Location", // Label text
          fontSize: 10,
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "135", // Center the label horizontally
          y: "70", // Adjust y positioning of the label
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
        graphlevel: {
          text: "0 cbm", // Label text
          fontSize: 7,
          fontWeight: "bold",
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "80", // Center the label horizontally
          y: "60", // Adjust y positioning of the label
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
      },
      ports: {
        panel: {
          size: 5,
        },
        groups: {
          p1: {
            ...portsIn,
            position: {
              args: {
                y: "135",
                x: "50",
              },
            },
          },
        },
        attrs: {
          fontSize: 250,
        },
        items: [
          {
            group: "p1",
            id: "p1",
            attrs: {
              label: {
                text: "p1",
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
          <text @selector="waterLevel"/>
          <text @selector="location"/>
          <text @selector="graphlevel"/>
          <image @selector="graph" />
      `;
  }
}
class ConicTank1 extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "ConicTank",
      size: {
        width: 70,
        height: 50,
      },
      attrs: {
        node: {
          size: 1,
        },
        root: {
          magnetSelector: "body",
          magnet: "true",
        },
        body: {
          stroke: "gray",
          strokeWidth: 2,
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
          d: "M 0 0 L calc(w) 0 L calc(w / 2 + 5) 35 h -10 Z",
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
          y: -6,
          fontSize: 10,
          fontFamily: "sans-serif",
          fill: "#350100",
        },
        panel: {
          text: "Conic Tank",
          href: "./Images/Elements/conicTank.png",
        },
        waterLevel: {
          text: "Level 0 m", // Tank label
          textAnchor: "middle",
          textVerticalAnchor: "bottom",
          x: "90", // Center the label horizontally
          y: "90", // Adjust y positioning of the label
          fontSize: 10,
          fontFamily: "sans-serif",
          fill: "blue", // Tank label in black
        },
        water: {
          text: 0,
        },
        graph: {
          x: "40",
          y: "-5",
          width: "20",
          height: "60",
          href: "./Images/Elements/graph.svg",
        },
        location: {
          text: "Location", // Label text
          fontSize: 9,
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "100", // Center the label horizontally
          y: "50", // Adjust y positioning of the label
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
        graphlevel: {
          text: "0 cbm", // Label text
          fontSize: 5,
          fontWeight: "bold",
          z: 10,
          fontFamily: "Arial",
          fill: "black",
          x: "50", // Center the label horizontally
          y: "40", // Adjust y positioning of the label
          textAnchor: "middle",
          textVerticalAnchor: "middle",
        },
      },
      ports: {
        panel: {
          size: 5,
        },
        groups: {
          p1: {
            ...portsIn,
            position: {
              args: {
                y: "75",
                x: "35",
              },
            },
          },
        },
        attrs: {
          fontSize: 250,
        },
        items: [
          {
            group: "p1",
            id: "p1",
            attrs: {
              label: {
                text: "p1",
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
          <text @selector="waterLevel"/>
          <text @selector="location"/>
          <text @selector="graphlevel"/>
          <image @selector="graph" />
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
        width: 100,
        height: 100,
      },
      power: 0,
      attrs: {
        node: {
          size: 3,
        },
        panel: {
          text: "Pump",
          href: "./Images/Elements/pump.png",
        },
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
          fontSize: 14,
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
        controls: {
          type: "checkbox",
          checked: false,
        },
      },
      ports: {
        groups: {
          in: {
            ...portsIn,
            position: {
              name: "line",
              args: {
                start: { x: "calc(w / 2)", y: "calc(h)" },
                end: { x: "calc(w / 2)", y: 0 },
              },
            },
            markup: util.svg`
              <rect @selector="pipeBody" />
              <rect @selector="pipeEnd" />
            `,
            size: { width: 80, height: 30 },
            attrs: {
              portRoot: {
                magnetSelector: "pipeEnd",
                magnet: true,
              },
              pipeBody: {
                width: "calc(w)",
                height: "calc(h)",
                y: 8,
                fill: {
                  type: "linearGradient",
                  stops: [
                    { offset: "0%", color: "gray" },
                    { offset: "30%", color: "white" },
                    { offset: "70%", color: "white" },
                    { offset: "100%", color: "gray" },
                  ],
                  attrs: {
                    x1: "0%",
                    y1: "0%",
                    x2: "0%",
                    y2: "100%",
                  },
                },
              },
              pipeEnd: {
                width: 10,
                refCx: "50%", // Center horizontally
                refCy: "50%", // Center vertically
                height: "calc(h+6)",
                y: 5,
                stroke: "gray",
                strokeWidth: 3,
                fill: "white",
                magnet: true,
              },
            },
          },
          out: {
            ...portsOut,
            position: {
              name: "line",
              args: {
                start: { x: "calc(w / 2)", y: "calc(h)" },
                end: { x: "calc(w / 2)", y: 0 },
              },
            },
            markup: util.svg`
              <rect @selector="pipeBody" />
              <rect @selector="pipeEnd" />
            `,
            size: { width: 80, height: 30 },
            attrs: {
              portRoot: {
                magnetSelector: "pipeEnd",
                magnet: true,
              },
              pipeBody: {
                width: "calc(w)",
                height: "calc(h)",
                y: -42,
                fill: {
                  type: "linearGradient",
                  stops: [
                    { offset: "0%", color: "gray" },
                    { offset: "30%", color: "white" },
                    { offset: "70%", color: "white" },
                    { offset: "100%", color: "gray" },
                  ],
                  attrs: {
                    x1: "0%",
                    y1: "0%",
                    x2: "0%",
                    y2: "100%",
                  },
                },
              },
              pipeEnd: {
                width: 10,
                height: "calc(h+6)",
                y: -45,
                stroke: "gray",
                strokeWidth: 3,
                fill: "white",
                magnet: true,
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
            z: 1,
            attrs: {
              label: {
                text: "in",
                fill: "#383838",
              },
              pipeBody: {
                x: "calc(-1 * w)",
              },
              pipeEnd: {
                x: "calc(-1 * w)",
              },
            },
          },
          {
            group: "out",
            id: "out",
            z: 0,
            attrs: {
              label: {
                text: "out",
                fill: "#383838",
              },
              pipeEnd: {
                x: "calc(w - 10)",
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
class Pump2 extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "Pump",
      size: {
        width: 70,
        height: 70,
      },
      power: 0,
      attrs: {
        node: {
          size: 2,
        },
        panel: {
          text: "Pump",
          href: "./Images/Elements/pump.png",
        },
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
          fontSize: 14,
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
        controls: {
          type: "checkbox",
          checked: false,
        },
      },
      ports: {
        groups: {
          in: {
            ...portsIn,
            position: {
              name: "line",
              args: {
                start: { x: "calc(w / 2)", y: "calc(h)" },
                end: { x: "calc(w / 2)", y: 0 },
              },
            },
            markup: util.svg`
              <rect @selector="pipeBody" />
              <rect @selector="pipeEnd" />
            `,
            size: { width: 80, height: 30 },
            attrs: {
              portRoot: {
                magnetSelector: "pipeEnd",
                magnet: true,
              },
              pipeBody: {
                width: "calc(w)",
                height: "calc(h)",
                y: 8,
                fill: {
                  type: "linearGradient",
                  stops: [
                    { offset: "0%", color: "gray" },
                    { offset: "30%", color: "white" },
                    { offset: "70%", color: "white" },
                    { offset: "100%", color: "gray" },
                  ],
                  attrs: {
                    x1: "0%",
                    y1: "0%",
                    x2: "0%",
                    y2: "100%",
                  },
                },
              },
              pipeEnd: {
                width: 10,
                refCx: "50%", // Center horizontally
                refCy: "50%", // Center vertically
                height: "calc(h+6)",
                y: 5,
                stroke: "gray",
                strokeWidth: 3,
                fill: "white",
                magnet: true,
              },
            },
          },
          out: {
            ...portsOut,
            position: {
              name: "line",
              args: {
                start: { x: "calc(w / 2)", y: "calc(h)" },
                end: { x: "calc(w / 2)", y: 0 },
              },
            },
            markup: util.svg`
              <rect @selector="pipeBody" />
              <rect @selector="pipeEnd" />
            `,
            size: { width: 80, height: 30 },
            attrs: {
              portRoot: {
                magnetSelector: "pipeEnd",
                magnet: true,
              },
              pipeBody: {
                width: "calc(w)",
                height: "calc(h)",
                y: -42,
                fill: {
                  type: "linearGradient",
                  stops: [
                    { offset: "0%", color: "gray" },
                    { offset: "30%", color: "white" },
                    { offset: "70%", color: "white" },
                    { offset: "100%", color: "gray" },
                  ],
                  attrs: {
                    x1: "0%",
                    y1: "0%",
                    x2: "0%",
                    y2: "100%",
                  },
                },
              },
              pipeEnd: {
                width: 10,
                height: "calc(h+6)",
                y: -45,
                stroke: "gray",
                strokeWidth: 3,
                fill: "white",
                magnet: true,
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
            z: 1,
            attrs: {
              label: {
                text: "in",
                fill: "#383838",
              },
              pipeBody: {
                x: "calc(-1 * w)",
              },
              pipeEnd: {
                x: "calc(-1 * w)",
              },
            },
          },
          {
            group: "out",
            id: "out",
            z: 0,
            attrs: {
              label: {
                text: "out",
                fill: "#383838",
              },
              pipeEnd: {
                x: "calc(w - 10)",
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
class Pump1 extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "Pump",
      size: {
        width: 50,
        height: 50,
      },
      power: 0,
      attrs: {
        node: {
          size: 1,
        },
        panel: {
          text: "Pump",
          href: "./Images/Elements/pump.png",
        },
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
          fontSize: 14,
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
        controls: {
          type: "checkbox",
          checked: false,
        },
      },
      ports: {
        groups: {
          in: {
            ...portsIn,
            position: {
              name: "line",
              args: {
                start: { x: "calc(w / 2)", y: "calc(h)" },
                end: { x: "calc(w / 2)", y: 0 },
              },
            },
            markup: util.svg`
              <rect @selector="pipeBody" />
              <rect @selector="pipeEnd" />
            `,
            size: { width: 80, height: 30 },
            attrs: {
              portRoot: {
                magnetSelector: "pipeEnd",
                magnet: true,
              },
              pipeBody: {
                width: "calc(w)",
                height: "calc(h)",
                y: 8,
                fill: {
                  type: "linearGradient",
                  stops: [
                    { offset: "0%", color: "gray" },
                    { offset: "30%", color: "white" },
                    { offset: "70%", color: "white" },
                    { offset: "100%", color: "gray" },
                  ],
                  attrs: {
                    x1: "0%",
                    y1: "0%",
                    x2: "0%",
                    y2: "100%",
                  },
                },
              },
              pipeEnd: {
                width: 10,
                refCx: "50%", // Center horizontally
                refCy: "50%", // Center vertically
                height: "calc(h+6)",
                y: 5,
                stroke: "gray",
                strokeWidth: 3,
                fill: "white",
                magnet: true,
              },
            },
          },
          out: {
            ...portsOut,
            position: {
              name: "line",
              args: {
                start: { x: "calc(w / 2)", y: "calc(h)" },
                end: { x: "calc(w / 2)", y: 0 },
              },
            },
            markup: util.svg`
              <rect @selector="pipeBody" />
              <rect @selector="pipeEnd" />
            `,
            size: { width: 80, height: 30 },
            attrs: {
              portRoot: {
                magnetSelector: "pipeEnd",
                magnet: true,
              },
              pipeBody: {
                width: "calc(w)",
                height: "calc(h)",
                y: -42,
                fill: {
                  type: "linearGradient",
                  stops: [
                    { offset: "0%", color: "gray" },
                    { offset: "30%", color: "white" },
                    { offset: "70%", color: "white" },
                    { offset: "100%", color: "gray" },
                  ],
                  attrs: {
                    x1: "0%",
                    y1: "0%",
                    x2: "0%",
                    y2: "100%",
                  },
                },
              },
              pipeEnd: {
                width: 10,
                height: "calc(h+6)",
                y: -45,
                stroke: "gray",
                strokeWidth: 3,
                fill: "white",
                magnet: true,
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
            z: 1,
            attrs: {
              label: {
                text: "in",
                fill: "#383838",
              },
              pipeBody: {
                x: "calc(-1 * w)",
              },
              pipeEnd: {
                x: "calc(-1 * w)",
              },
            },
          },
          {
            group: "out",
            id: "out",
            z: 0,
            attrs: {
              label: {
                text: "out",
                fill: "#383838",
              },
              pipeEnd: {
                x: "calc(w - 10)",
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

//-----------------------------------ControlValve Model DONE--------------------------------------
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
        node: {
          size: 3,
        },
        controls: {
          type: "slider",
        },
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
          in: {
            ...portsIn,
            position: {
              name: "absolute",
              args: {
                x: "calc(w / 2)",
                y: "calc(h / 2)",
              },
            },
            markup: util.svg`
              <rect @selector="pipeBody" />
              <rect @selector="pipeEnd" />
            `,
            size: { width: 50, height: 30 },
            attrs: {
              portRoot: {
                magnetSelector: "pipeEnd",
                magnet: true, // Enable magnet for linking
              },
              pipeBody: {
                width: "calc(w)",
                height: "calc(h)",
                y: "calc(h / -2)",
                fill: {
                  type: "linearGradient",
                  stops: [
                    { offset: "0%", color: "gray" },
                    { offset: "30%", color: "white" },
                    { offset: "70%", color: "white" },
                    { offset: "100%", color: "gray" },
                  ],
                  attrs: {
                    x1: "0%",
                    y1: "0%",
                    x2: "0%",
                    y2: "100%",
                  },
                },
              },
              pipeEnd: {
                width: 10,
                refCx: "50%", // Center horizontally
                refCy: "50%", // Center vertically
                height: "calc(h+6)",
                y: "calc(h / -2 - 3)",
                stroke: "gray",
                strokeWidth: 3,
                fill: "white",
              },
            },
          },
          out: {
            ...portsOut,
            position: {
              name: "absolute",
              args: {
                x: "calc(w / 2)",
                y: "calc(h / 2)",
              },
            },
            markup: util.svg`
              <rect @selector="pipeBody" />
              <rect @selector="pipeEnd" />
            `,
            size: { width: 50, height: 30 },
            attrs: {
              portRoot: {
                magnetSelector: "pipeEnd",
                magnet: true,
              },
              pipeBody: {
                magnet: true,
                width: "calc(w)",
                height: "calc(h)",
                y: "calc(h / -2)",
                fill: {
                  type: "linearGradient",
                  stops: [
                    { offset: "0%", color: "gray" },
                    { offset: "30%", color: "white" },
                    { offset: "70%", color: "white" },
                    { offset: "100%", color: "gray" },
                  ],
                  attrs: {
                    x1: "0%",
                    y1: "0%",
                    x2: "0%",
                    y2: "100%",
                  },
                },
              },
              pipeEnd: {
                width: 10,
                refCx: "50%", // Center horizontally
                refCy: "50%", // Center vertically
                height: "calc(h+6)",
                y: "calc(h / -2 - 3)",
                stroke: "gray",
                strokeWidth: 3,
                fill: "white",
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
            z: 0,
            attrs: {
              label: {
                text: "in",
                fill: "#383838",
              },
              pipeBody: {
                x: "calc(-1 * w)",
              },
              pipeEnd: {
                x: "calc(-1 * w)",
              },
            },
          },
          {
            group: "out",
            id: "out",
            z: 0,
            attrs: {
              label: {
                text: "out",
                fill: "#383838",
              },
              pipeEnd: {
                x: "calc(w - 10)",
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
class ControlValve2 extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "ControlValve",
      size: {
        width: 50,
        height: 50,
      },
      open: 1,
      attrs: {
        node: {
          size: 2,
        },
        controls: {
          type: "slider",
        },
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
          fill: "none",
          rx: 1,
          ry: 1,
        },
        stem: {
          width: 10,
          height: 20,
          x: "calc(w / 2 - 5)",
          y: -10,
          stroke: "#333",
          strokeWidth: 2,
          fill: "#555",
        },
        control: {
          d: "M 0 0 C 0 -30 50 -30 50 0 Z",
          transform: "translate(calc(w / 2 - 25), -10)",
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
          in: {
            ...portsIn,
            position: {
              name: "absolute",
              args: {
                x: "calc(w / 2)",
                y: "calc(h / 2)",
              },
            },
            markup: util.svg`
              <rect @selector="pipeBody" />
              <rect @selector="pipeEnd" />
            `,
            size: { width: 50, height: 25 },
            attrs: {
              portRoot: {
                magnetSelector: "pipeEnd",
                magnet: true, // Enable magnet for linking
              },
              pipeBody: {
                width: "calc(w)",
                height: "calc(h)",
                y: "calc(h / -2)",
                fill: {
                  type: "linearGradient",
                  stops: [
                    { offset: "0%", color: "gray" },
                    { offset: "30%", color: "white" },
                    { offset: "70%", color: "white" },
                    { offset: "100%", color: "gray" },
                  ],
                  attrs: {
                    x1: "0%",
                    y1: "0%",
                    x2: "0%",
                    y2: "100%",
                  },
                },
              },
              pipeEnd: {
                width: 10,
                refCx: "50%", // Center horizontally
                refCy: "50%", // Center vertically
                height: "calc(h+6)",
                y: "calc(h / -2 - 3)",
                stroke: "gray",
                strokeWidth: 3,
                fill: "white",
              },
            },
          },
          out: {
            ...portsOut,
            position: {
              name: "absolute",
              args: {
                x: "calc(w / 2)",
                y: "calc(h / 2)",
              },
            },
            markup: util.svg`
              <rect @selector="pipeBody" />
              <rect @selector="pipeEnd" />
            `,
            size: { width: 50, height: 25 },
            attrs: {
              portRoot: {
                magnetSelector: "pipeEnd",
                magnet: true,
              },
              pipeBody: {
                magnet: true,
                width: "calc(w)",
                height: "calc(h)",
                y: "calc(h / -2)",
                fill: {
                  type: "linearGradient",
                  stops: [
                    { offset: "0%", color: "gray" },
                    { offset: "30%", color: "white" },
                    { offset: "70%", color: "white" },
                    { offset: "100%", color: "gray" },
                  ],
                  attrs: {
                    x1: "0%",
                    y1: "0%",
                    x2: "0%",
                    y2: "100%",
                  },
                },
              },
              pipeEnd: {
                width: 10,
                refCx: "50%", // Center horizontally
                refCy: "50%", // Center vertically
                height: "calc(h+6)",
                y: "calc(h / -2 - 3)",
                stroke: "gray",
                strokeWidth: 3,
                fill: "white",
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
            z: 0,
            attrs: {
              label: {
                text: "in",
                fill: "#383838",
              },
              pipeBody: {
                x: "calc(-1 * w)",
              },
              pipeEnd: {
                x: "calc(-1 * w)",
              },
            },
          },
          {
            group: "out",
            id: "out",
            z: 0,
            attrs: {
              label: {
                text: "out",
                fill: "#383838",
              },
              pipeEnd: {
                x: "calc(w - 10)",
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
class ControlValve1 extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "ControlValve",
      size: {
        width: 40,
        height: 40,
      },
      open: 1,
      attrs: {
        node: {
          size: 1,
        },
        controls: {
          type: "slider",
        },
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
          x: "calc(w / 2 - 10)",
          y: "calc(h / 2 - 10)",
          width: 30,
          height: 30,
          fill: "none",
          rx: 1,
          ry: 1,
        },
        stem: {
          width: 10,
          height: 10,
          x: "calc(w / 2 - 5)",
          y: -10,
          stroke: "#333",
          strokeWidth: 2,
          fill: "#555",
        },
        control: {
          d: "M 0 0 C 0 -20 50 -20 50 0 Z",
          transform: "translate(calc(w / 2 - 25), -10)",
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
          in: {
            ...portsIn,
            position: {
              name: "absolute",
              args: {
                x: "calc(w / 2)",
                y: "calc(h / 2)",
              },
            },
            markup: util.svg`
              <rect @selector="pipeBody" />
              <rect @selector="pipeEnd" />
            `,
            size: { width: 40, height: 20 },
            attrs: {
              portRoot: {
                magnetSelector: "pipeEnd",
                magnet: true, // Enable magnet for linking
              },
              pipeBody: {
                width: "calc(w)",
                height: "calc(h)",
                y: "calc(h / -2)",
                fill: {
                  type: "linearGradient",
                  stops: [
                    { offset: "0%", color: "gray" },
                    { offset: "30%", color: "white" },
                    { offset: "70%", color: "white" },
                    { offset: "100%", color: "gray" },
                  ],
                  attrs: {
                    x1: "0%",
                    y1: "0%",
                    x2: "0%",
                    y2: "100%",
                  },
                },
              },
              pipeEnd: {
                width: 10,
                refCx: "50%", // Center horizontally
                refCy: "50%", // Center vertically
                height: "calc(h+6)",
                y: "calc(h / -2 - 3)",
                stroke: "gray",
                strokeWidth: 3,
                fill: "white",
              },
            },
          },
          out: {
            ...portsOut,
            position: {
              name: "absolute",
              args: {
                x: "calc(w / 2)",
                y: "calc(h / 2)",
              },
            },
            markup: util.svg`
              <rect @selector="pipeBody" />
              <rect @selector="pipeEnd" />
            `,
            size: { width: 40, height: 20 },
            attrs: {
              portRoot: {
                magnetSelector: "pipeEnd",
                magnet: true,
              },
              pipeBody: {
                magnet: true,
                width: "calc(w)",
                height: "calc(h)",
                y: "calc(h / -2)",
                fill: {
                  type: "linearGradient",
                  stops: [
                    { offset: "0%", color: "gray" },
                    { offset: "30%", color: "white" },
                    { offset: "70%", color: "white" },
                    { offset: "100%", color: "gray" },
                  ],
                  attrs: {
                    x1: "0%",
                    y1: "0%",
                    x2: "0%",
                    y2: "100%",
                  },
                },
              },
              pipeEnd: {
                width: 10,
                refCx: "50%", // Center horizontally
                refCy: "50%", // Center vertically
                height: "calc(h+6)",
                y: "calc(h / -2 - 3)",
                stroke: "gray",
                strokeWidth: 3,
                fill: "white",
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
            z: 0,
            attrs: {
              label: {
                text: "in",
                fill: "#383838",
              },
              pipeBody: {
                x: "calc(-1 * w)",
              },
              pipeEnd: {
                x: "calc(-1 * w)",
              },
            },
          },
          {
            group: "out",
            id: "out",
            z: 0,
            attrs: {
              label: {
                text: "out",
                fill: "#383838",
              },
              pipeEnd: {
                x: "calc(w - 10)",
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

//-----------------------------------Panel Model DONE (MODIFY ACC TO TANKS)----------------------------------------
class Panel extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "Panel",
      size: {
        width: 70,
        height: 90,
      },
      level: 0,
      attrs: {
        root: {
          magnetSelector: "panelBody",
        },
        panelBody: {
          z: 0,
          x: 0,
          y: 0,
          width: "calc(w)",
          height: "calc(h)",
          rx: 1,
          ry: 1,
          fill: "lightgray",
        },
        panelTicks: {
          transform: "translate(47, 6)",
          d: `M 0 0 h 8 M 0 ${step} h 8 M 0 ${step * 2} h 8 M 0 ${
            step * 3
          } h 8 M 0 ${step * 4} h 8 M 0 ${step * 5} h 8 M 0 ${step * 6}`,
          fill: "none",
          stroke: "black",
          strokeWidth: 2,
          strokeLinecap: "round",
        },
        panelValues: {
          text: "5\n4\n3\n2\n1\n0",
          textAnchor: "middle",
          textVerticalAnchor: "top",
          x: 60,
          y: 0,
          lineHeight: step,
          fontSize: 10,
          fontFamily: "sans-serif",
        },
        frame: {
          x: 5,
          y: 6,
          width: 40,
          height: 80,
          rx: 1,
          ry: 1,
          fill: "none",
          stroke: "black",
          strokeWidth: 2,
        },
        liquid: {
          y: 6,
          x: 5,
          rx: 1,
          ry: 1,
          width: 40,
          height: 0,
          stroke: "black",
          strokeWidth: 2,
          strokeOpacity: 0.2,
          fill: MIN_LIQUID_COLOR,
        },
        glass: {
          y: 6,
          width: 40,
          height: 80,
          rx: 1,
          x: 5,
          ry: 1,
          fill: "blue",
          stroke: "none",
          fillOpacity: 0.1,
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
            <rect @selector="glass"/>
            <rect @selector="liquid"/>
            <rect @selector="frame"/>
      `;
  }
}
class Panel4 extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "Panel",
      size: {
        width: 60,
        height: 70,
      },
      level: 0,
      attrs: {
        root: {
          magnetSelector: "panelBody",
        },
        panelBody: {
          z: 0,
          x: 0,
          y: 0,
          width: "calc(w)",
          height: "calc(h)",
          rx: 1,
          ry: 1,
          fill: "lightgray",
        },
        panelTicks: {
          transform: "translate(40, 6)",
          d: `M 0 0 h 8 M 0 ${step4} h 8 M 0 ${step4 * 2} h 8 M 0 ${
            step4 * 3
          } h 8 M 0 ${step4 * 4} h 8 M 0 ${step4 * 5} h 8 M 0 ${step4 * 6}`,
          fill: "none",
          stroke: "black",
          strokeWidth: 2,
          strokeLinecap: "round",
        },
        panelValues: {
          text: "5\n4\n3\n2\n1\n0",
          textAnchor: "middle",
          textVerticalAnchor: "top",
          x: 55,
          y: 3,
          lineHeight: step4,
          fontSize: 8,
          fontFamily: "sans-serif",
        },
        frame: {
          x: 5,
          y: 6,
          width: 35,
          height: 60,
          rx: 1,
          ry: 1,
          fill: "none",
          stroke: "black",
          strokeWidth: 2,
        },
        liquid: {
          y: 6,
          x: 5,
          rx: 1,
          ry: 1,
          width: 35,
          height: 0,
          stroke: "black",
          strokeWidth: 2,
          strokeOpacity: 0.2,
          fill: MIN_LIQUID_COLOR,
        },
        glass: {
          y: 6,
          width: 35,
          height: 60,
          rx: 1,
          x: 5,
          ry: 1,
          fill: "blue",
          stroke: "none",
          fillOpacity: 0.1,
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
            <rect @selector="glass"/>
            <rect @selector="liquid"/>
            <rect @selector="frame"/>
      `;
  }
}
class Panel3 extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "Panel",
      size: {
        width: 45,
        height: 60,
      },
      level: 0,
      attrs: {
        root: {
          magnetSelector: "panelBody",
        },
        panelBody: {
          z: 0,
          x: 0,
          y: 0,
          width: "calc(w)",
          height: "calc(h)",
          rx: 1,
          ry: 1,
          fill: "lightgray",
        },
        panelTicks: {
          transform: "translate(32, 6)",
          d: `M 0 0 h 6 M 0 ${step3} h 6 M 0 ${step3 * 2} h 6 M 0 ${
            step3 * 3
          } h 6 M 0 ${step3 * 4} h 6 M 0 ${step3 * 5} h 6 M 0 ${step3 * 6}`,
          fill: "none",
          stroke: "black",
          strokeWidth: 2,
          strokeLinecap: "round",
        },
        panelValues: {
          text: "5\n4\n3\n2\n1\n0",
          textAnchor: "middle",
          textVerticalAnchor: "top",
          x: 42,
          y: 2,
          lineHeight: step3,
          fontSize: 7,
          fontFamily: "sans-serif",
        },
        frame: {
          x: 2,
          y: 6,
          width: 30,
          height: 50,
          rx: 1,
          ry: 1,
          fill: "none",
          stroke: "black",
          strokeWidth: 2,
        },
        liquid: {
          y: 6,
          x: 2,
          rx: 1,
          ry: 1,
          width: 30,
          height: 0,
          stroke: "black",
          strokeWidth: 2,
          strokeOpacity: 0.2,
          fill: MIN_LIQUID_COLOR,
        },
        glass: {
          y: 6,
          width: 30,
          height: 50,
          rx: 1,
          x: 2,
          ry: 1,
          fill: "blue",
          stroke: "none",
          fillOpacity: 0.1,
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
            <rect @selector="glass"/>
            <rect @selector="liquid"/>
            <rect @selector="frame"/>
      `;
  }
}
class Panel2 extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "Panel",
      size: {
        width: 35,
        height: 50,
      },
      level: 0,
      attrs: {
        root: {
          magnetSelector: "panelBody",
        },
        panelBody: {
          z: 0,
          x: 0,
          y: 0,
          width: "calc(w)",
          height: "calc(h)",
          rx: 1,
          ry: 1,
          fill: "lightgray",
        },
        panelTicks: {
          transform: "translate(23, 6)",
          d: `M 0 0 h 5 M 0 ${step2} h 5 M 0 ${step2 * 2} h 5 M 0 ${
            step2 * 3
          } h 5 M 0 ${step2 * 4} h 5 M 0 ${step2 * 5} h 5 M 0 ${step2 * 6}`,
          fill: "none",
          stroke: "black",
          strokeWidth: 1.5,
          strokeLinecap: "round",
        },
        panelValues: {
          text: "5\n4\n3\n2\n1\n0",
          textAnchor: "middle",
          textVerticalAnchor: "top",
          x: 33,
          y: 3,
          lineHeight: step2,
          fontSize: 6,
          fontFamily: "sans-serif",
        },
        frame: {
          x: 2,
          y: 6,
          width: 20,
          height: 40,
          rx: 1,
          ry: 1,
          fill: "none",
          stroke: "black",
          strokeWidth: 2,
        },
        liquid: {
          y: 6,
          x: 2,
          rx: 1,
          ry: 1,
          width: 20,
          height: 0,
          stroke: "black",
          strokeWidth: 2,
          strokeOpacity: 0.2,
          fill: MIN_LIQUID_COLOR,
        },
        glass: {
          y: 6,
          width: 20,
          height: 40,
          rx: 1,
          x: 2,
          ry: 1,
          fill: "blue",
          stroke: "none",
          fillOpacity: 0.1,
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
            <rect @selector="glass"/>
            <rect @selector="liquid"/>
            <rect @selector="frame"/>
      `;
  }
}
class Panel1 extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "Panel",
      size: {
        width: 25,
        height: 35,
      },
      level: 0,
      attrs: {
        root: {
          magnetSelector: "panelBody",
        },
        panelBody: {
          z: 0,
          x: 0,
          y: 0,
          width: "calc(w)",
          height: "calc(h)",
          rx: 1,
          ry: 1,
          fill: "lightgray",
        },
        panelTicks: {
          transform: "translate(17, 2)",
          d: `M 0 0 h 3 M 0 ${step1} h 3 M 0 ${step1 * 2} h 3 M 0 ${
            step1 * 3
          } h 3 M 0 ${step1 * 4} h 3 M 0 ${step1 * 5} h 3 M 0 ${step1 * 6}`,
          fill: "none",
          stroke: "black",
          strokeWidth: 1,
          strokeLinecap: "round",
        },
        panelValues: {
          text: "5\n4\n3\n2\n1\n0",
          textAnchor: "middle",
          textVerticalAnchor: "top",
          x: 23,
          y: 0,
          lineHeight: step1,
          fontSize: 5,
          fontFamily: "sans-serif",
        },
        frame: {
          x: 2,
          y: 2,
          width: 15,
          height: 30,
          rx: 1,
          ry: 1,
          fill: "none",
          stroke: "black",
          strokeWidth: 1.2,
        },
        liquid: {
          y: 2,
          x: 2,
          rx: 1,
          ry: 1,
          width: 15,
          height: 0,
          stroke: "black",
          strokeWidth: 2,
          strokeOpacity: 0.2,
          fill: MIN_LIQUID_COLOR,
        },
        glass: {
          y: 2,
          width: 15,
          height: 30,
          rx: 1,
          x: 2,
          ry: 1,
          fill: "blue",
          stroke: "none",
          fillOpacity: 0.1,
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
            <rect @selector="glass"/>
            <rect @selector="liquid"/>
            <rect @selector="frame"/>
      `;
  }
}

//-----------------------------------Zone Model DONE--------------------------------------
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

//-----------------------------------HandValve Model DONE--------------------------------------
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
        node: {
          size: 3,
        },
        controls: {
          type: "button",
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
          in: {
            ...portsIn,
            position: {
              name: "absolute",
              args: {
                x: "calc(w / 2)",
                y: "calc(h / 2)",
              },
            },
            markup: util.svg`
              <rect @selector="pipeBody" />
              <rect @selector="pipeEnd" />
            `,
            size: { width: 50, height: 30 },
            attrs: {
              portRoot: {
                magnetSelector: "pipeEnd",
                magnet: true, // Enable magnet for linking
              },
              pipeBody: {
                width: "calc(w)",
                height: "calc(h)",
                y: "calc(h / -2)",
                fill: {
                  type: "linearGradient",
                  stops: [
                    { offset: "0%", color: "gray" },
                    { offset: "30%", color: "white" },
                    { offset: "70%", color: "white" },
                    { offset: "100%", color: "gray" },
                  ],
                  attrs: {
                    x1: "0%",
                    y1: "0%",
                    x2: "0%",
                    y2: "100%",
                  },
                },
              },
              pipeEnd: {
                width: 10,
                refCx: "50%", // Center horizontally
                refCy: "50%", // Center vertically
                height: "calc(h+6)",
                y: "calc(h / -2 - 3)",
                stroke: "gray",
                strokeWidth: 3,
                fill: "white",
                magnet: true,
              },
            },
          },
          out: {
            ...portsOut,
            position: {
              name: "absolute",
              args: {
                x: "calc(w / 2)",
                y: "calc(h / 2)",
              },
            },
            markup: util.svg`
              <rect @selector="pipeBody" />
              <rect @selector="pipeEnd" />
            `,
            size: { width: 50, height: 30 },
            attrs: {
              portRoot: {
                magnetSelector: "pipeEnd",
                magnet: true,
              },
              pipeBody: {
                magnet: true,
                width: "calc(w)",
                height: "calc(h)",
                y: "calc(h / -2)",
                fill: {
                  type: "linearGradient",
                  stops: [
                    { offset: "0%", color: "gray" },
                    { offset: "30%", color: "white" },
                    { offset: "70%", color: "white" },
                    { offset: "100%", color: "gray" },
                  ],
                  attrs: {
                    x1: "0%",
                    y1: "0%",
                    x2: "0%",
                    y2: "100%",
                  },
                },
              },
              pipeEnd: {
                width: 10,
                refCx: "50%", // Center horizontally
                refCy: "50%", // Center vertically
                height: "calc(h+6)",
                y: "calc(h / -2 - 3)",
                stroke: "gray",
                strokeWidth: 3,
                fill: "white",
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
            z: 0,
            attrs: {
              label: {
                text: "in",
                fill: "#383838",
              },
              pipeBody: {
                x: "calc(-1 * w)",
              },
              pipeEnd: {
                x: "calc(-1 * w)",
              },
            },
          },
          {
            group: "out",
            id: "out",
            z: 0,
            attrs: {
              label: {
                text: "out",
                fill: "#383838",
              },
              pipeEnd: {
                x: "calc(w - 10)",
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
class HandValve2 extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "HandValve",
      size: {
        width: 35,
        height: 35,
      },
      power: 0,
      attrs: {
        node: {
          size: 2,
        },
        controls: {
          type: "button",
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
          height: 15,
          x: "calc(w / 2 - 5)",
          y: -10,
          stroke: "#333",
          strokeWidth: 2,
          fill: "#555",
        },
        handwheel: {
          width: 50,
          height: 10,
          x: "calc(w / 2 - 25)",
          y: -20,
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
          in: {
            ...portsIn,
            position: {
              name: "absolute",
              args: {
                x: "calc(w / 2)",
                y: "calc(h / 2)",
              },
            },
            markup: util.svg`
              <rect @selector="pipeBody" />
              <rect @selector="pipeEnd" />
            `,
            size: { width: 40, height: 20 },
            attrs: {
              portRoot: {
                magnetSelector: "pipeEnd",
                magnet: true, // Enable magnet for linking
              },
              pipeBody: {
                width: "calc(w)",
                height: "calc(h)",
                y: "calc(h / -2)",
                fill: {
                  type: "linearGradient",
                  stops: [
                    { offset: "0%", color: "gray" },
                    { offset: "30%", color: "white" },
                    { offset: "70%", color: "white" },
                    { offset: "100%", color: "gray" },
                  ],
                  attrs: {
                    x1: "0%",
                    y1: "0%",
                    x2: "0%",
                    y2: "100%",
                  },
                },
              },
              pipeEnd: {
                width: 10,
                refCx: "50%", // Center horizontally
                refCy: "50%", // Center vertically
                height: "calc(h+6)",
                y: "calc(h / -2 - 3)",
                stroke: "gray",
                strokeWidth: 3,
                fill: "white",
                magnet: true,
              },
            },
          },
          out: {
            ...portsOut,
            position: {
              name: "absolute",
              args: {
                x: "calc(w / 2)",
                y: "calc(h / 2)",
              },
            },
            markup: util.svg`
              <rect @selector="pipeBody" />
              <rect @selector="pipeEnd" />
            `,
            size: { width: 40, height: 20 },
            attrs: {
              portRoot: {
                magnetSelector: "pipeEnd",
                magnet: true,
              },
              pipeBody: {
                magnet: true,
                width: "calc(w)",
                height: "calc(h)",
                y: "calc(h / -2)",
                fill: {
                  type: "linearGradient",
                  stops: [
                    { offset: "0%", color: "gray" },
                    { offset: "30%", color: "white" },
                    { offset: "70%", color: "white" },
                    { offset: "100%", color: "gray" },
                  ],
                  attrs: {
                    x1: "0%",
                    y1: "0%",
                    x2: "0%",
                    y2: "100%",
                  },
                },
              },
              pipeEnd: {
                width: 10,
                refCx: "50%", // Center horizontally
                refCy: "50%", // Center vertically
                height: "calc(h+6)",
                y: "calc(h / -2 - 3)",
                stroke: "gray",
                strokeWidth: 3,
                fill: "white",
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
            z: 0,
            attrs: {
              pipeBody: {
                x: "calc(-1 * w)",
              },
              pipeEnd: {
                x: "calc(-1 * w)",
              },
            },
          },
          {
            group: "out",
            id: "out",
            z: 0,
            attrs: {
              pipeEnd: {
                x: "calc(w - 10)",
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
class HandValve1 extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "HandValve",
      size: {
        width: 20,
        height: 20,
      },
      power: 0,
      attrs: {
        node: {
          size: 1,
        },
        controls: {
          type: "button",
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
          width: 5,
          height: 10,
          x: "calc(w / 2 - 3)",
          y: -10,
          stroke: "#333",
          strokeWidth: 2,
          fill: "#555",
        },
        handwheel: {
          width: 30,
          height: 7,
          x: "calc(w / 2 - 15)",
          y: -17,
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
          in: {
            ...portsIn,
            position: {
              name: "absolute",
              args: {
                x: "calc(w / 2)",
                y: "calc(h / 2)",
              },
            },
            markup: util.svg`
              <rect @selector="pipeBody" />
              <rect @selector="pipeEnd" />
            `,
            size: { width: 30, height: 10 },
            attrs: {
              portRoot: {
                magnetSelector: "pipeEnd",
                magnet: true, // Enable magnet for linking
              },
              pipeBody: {
                width: "calc(w)",
                height: "calc(h)",
                y: "calc(h / -2)",
                fill: {
                  type: "linearGradient",
                  stops: [
                    { offset: "0%", color: "gray" },
                    { offset: "30%", color: "white" },
                    { offset: "70%", color: "white" },
                    { offset: "100%", color: "gray" },
                  ],
                  attrs: {
                    x1: "0%",
                    y1: "0%",
                    x2: "0%",
                    y2: "100%",
                  },
                },
              },
              pipeEnd: {
                width: 7,
                refCx: "50%", // Center horizontally
                refCy: "50%", // Center vertically
                height: "calc(h+6)",
                y: "calc(h / -2 - 3)",
                stroke: "gray",
                strokeWidth: 1,
                fill: "white",
                magnet: true,
              },
            },
          },
          out: {
            ...portsOut,
            position: {
              name: "absolute",
              args: {
                x: "calc(w / 2)",
                y: "calc(h / 2)",
              },
            },
            markup: util.svg`
              <rect @selector="pipeBody" />
              <rect @selector="pipeEnd" />
            `,
            size: { width: 28, height: 10 },
            attrs: {
              portRoot: {
                magnetSelector: "pipeEnd",
                magnet: true,
              },
              pipeBody: {
                magnet: true,
                width: "calc(w)",
                height: "calc(h)",
                y: "calc(h / -2)",
                fill: {
                  type: "linearGradient",
                  stops: [
                    { offset: "0%", color: "gray" },
                    { offset: "30%", color: "white" },
                    { offset: "70%", color: "white" },
                    { offset: "100%", color: "gray" },
                  ],
                  attrs: {
                    x1: "0%",
                    y1: "0%",
                    x2: "0%",
                    y2: "100%",
                  },
                },
              },
              pipeEnd: {
                width: 7,
                height: "calc(h+6)",
                x: "calc(h / -2 - 10)",
                y: "calc(h / -2 - 3)",
                stroke: "gray",
                strokeWidth: 1,
                fill: "white",
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
            z: 0,
            attrs: {
              pipeBody: {
                x: "calc(-1 * w)",
              },
              pipeEnd: {
                x: "calc(-1 * w)",
              },
            },
          },
          {
            group: "out",
            id: "out",
            z: 0,
            attrs: {
              pipeEnd: {
                x: "calc(w - 5)",
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

//-----------------------------------Join Model DONE--------------------------------------
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

//-----------------------------------FLow Meter Model DONE---------------------------------------
class FlowMeter extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "FlowMeter",
      size: {
        width: 40, // Custom size for flow meter
        height: 60,
      },
      flowRateM3h: 0, // Flow rate in cubic meters per hour (m³/h)
      flowRateMLD: 0, // Flow rate in megaliters per day (MLD)
      attrs: {
        node: {
          size: 3,
        },
        bigCircle: {
          cx: "25",
          cy: "-22",
          r: "30",
          fill: "lightgray",
        },
        smallCircle: {
          cx: "25",
          cy: "-23",
          r: "20",
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "gray" },
              { offset: "50%", color: "#f5f5f5" },
              { offset: "100%", color: "gray" },
            ],
            attrs: {
              x1: "0%",
              y1: "0%",
              x2: "0%",
              y2: "100%",
            },
          },
        },
        label: {
          text: "Flow : 0 m3/h",
          fontSize: 14,
          fontFamily: "sans-serif",
          fontWeight: "bold",
          fill: "blue",
          textAnchor: "middle",
          refX: "50%",
          refY: "100%",
          yAlignment: "middle",
        },
        label: {
          text: "Flow Meter",
          fontSize: 14,
          fontFamily: "sans-serif",
          fontWeight: "bold",
          fill: "black",
          textAnchor: "middle",
          refX: "60%",
          refY: "-110%",
          yAlignment: "middle",
        },
        m3h: {
          text: "Flow : 0 m3/h",
          fontSize: 14,
          fontFamily: "sans-serif",
          fontWeight: "bold",
          fill: "blue",
          textAnchor: "middle",
          refX: "50%",
          refY: "100%",
          yAlignment: "middle",
        },
        mld: {
          text: "0 MLD",
          fontSize: 14,
          fontFamily: "sans-serif",
          fontWeight: "bold",
          fill: "blue",
          textAnchor: "middle",
          refX: "100%",
          refY: "140%",
          yAlignment: "middle",
        },
        panel: {
          text: "Flow Meter",
          href: "./Images/Elements/flowMeter.jpg", // Add a custom icon if necessary
        },
        rectangleSmall: {
          x: 5,
          height: "5",
          width: "40",
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "gray" }, // Light metallic gray
              { offset: "50%", color: "#f5f5f5" }, // Light gray in the middle
              { offset: "100%", color: "gray" }, // Darker gray towards the bottom
            ],
          },
        },
        rectangleBig: {
          y: 5,
          height: "5",
          width: "50",
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "gray" }, // Light metallic gray
              { offset: "50%", color: "#f5f5f5" }, // Light gray in the middle
              { offset: "100%", color: "gray" }, // Darker gray towards the bottom
            ],
          },
        },
        blueBox: {
          y: 10,
          x: -10,
          height: "30",
          width: "70",
          fill: "skyblue",
        },
        graph: {
          x: "5",
          y: "65",
          href: "./Images/Elements/graph1.svg",
        },
      },
      ports: {
        groups: {
          in: {
            ...portsIn,
            position: {
              name: "absolute",
              args: {
                x: "calc(w / 2)",
                y: "calc(h / 2)",
              },
            },
            markup: util.svg`
              <rect @selector="pipeBody" />
              <rect @selector="pipeEnd" />
            `,
            size: { width: 50, height: 30 },
            attrs: {
              portRoot: {
                magnetSelector: "pipeEnd",
                magnet: true, // Enable magnet for linking
              },
              pipeBody: {
                width: "calc(w)",
                height: "calc(h)",
                y: "calc(h / -2 - 5)",
                fill: {
                  type: "linearGradient",
                  stops: [
                    { offset: "0%", color: "gray" },
                    { offset: "30%", color: "white" },
                    { offset: "70%", color: "white" },
                    { offset: "100%", color: "gray" },
                  ],
                  attrs: {
                    x1: "0%",
                    y1: "0%",
                    x2: "0%",
                    y2: "100%",
                  },
                },
              },
              pipeEnd: {
                width: 10,
                refCx: "50%", // Center horizontally
                refCy: "50%", // Center vertically
                height: "calc(h+6)",
                y: "calc(h / -2 - 7)",
                stroke: "gray",
                strokeWidth: 3,
                fill: "white",
                magnet: true,
              },
            },
          },
          out: {
            ...portsOut,
            position: {
              name: "absolute",
              args: {
                x: "calc(w / 2)",
                y: "calc(h / 2)",
              },
            },
            markup: util.svg`
              <rect @selector="pipeBody" />
              <rect @selector="pipeEnd" />
            `,
            size: { width: 60, height: 30 },
            attrs: {
              portRoot: {
                magnetSelector: "pipeEnd",
                magnet: true,
              },
              pipeBody: {
                magnet: true,
                width: "calc(w)",
                height: "calc(h)",
                y: "calc(h / -2 -5)",
                fill: {
                  type: "linearGradient",
                  stops: [
                    { offset: "0%", color: "gray" },
                    { offset: "30%", color: "white" },
                    { offset: "70%", color: "white" },
                    { offset: "100%", color: "gray" },
                  ],
                  attrs: {
                    x1: "0%",
                    y1: "0%",
                    x2: "0%",
                    y2: "100%",
                  },
                },
              },
              pipeEnd: {
                width: 10,
                refCx: "50%", // Center horizontally
                refCy: "50%", // Center vertically
                height: "calc(h+6)",
                y: "calc(h / -2 - 7)",
                stroke: "gray",
                strokeWidth: 3,
                fill: "white",
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
            z: 0,
            attrs: {
              label: {
                text: "in",
                fill: "#383838",
              },
              pipeBody: {
                x: "calc(-1 * w)",
              },
              pipeEnd: {
                x: "calc(-1 * w)",
              },
            },
          },
          {
            group: "out",
            id: "out",
            z: 0,
            attrs: {
              label: {
                text: "out",
                fill: "#383838",
              },
              pipeEnd: {
                x: "calc(w - 10)",
              },
            },
          },
        ],
      },
    };
  }

  preinitialize() {
    this.markup = util.svg` 
      <circle @selector="bigCircle" />
      <circle @selector="smallCircle" />
      <rect @selector="rectangleSmall"/>
      <rect @selector="rectangleBig"/>
      <rect @selector="blueBox"/>
      <image @selector="graph" />
      <text @selector="label" />
      <text @selector="mld" />
      <text @selector="m3h" />
    `;
  }
}
class FlowMeter2 extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "FlowMeter",
      size: {
        width: 30, // Custom size for flow meter
        height: 50,
      },
      flowRateM3h: 0, // Flow rate in cubic meters per hour (m³/h)
      flowRateMLD: 0, // Flow rate in megaliters per day (MLD)
      attrs: {
        node: {
          size: 2,
        },
        bigCircle: {
          cx: "22",
          cy: "-20",
          r: "25",
          fill: "lightgray",
        },
        smallCircle: {
          cx: "22",
          cy: "-20",
          r: "18",
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "gray" },
              { offset: "50%", color: "#f5f5f5" },
              { offset: "100%", color: "gray" },
            ],
            attrs: {
              x1: "0%",
              y1: "0%",
              x2: "0%",
              y2: "100%",
            },
          },
        },
        label: {
          text: "Flow : 0 m3/h",
          fontSize: 12,
          fontFamily: "sans-serif",
          fontWeight: "bold",
          fill: "blue",
          textAnchor: "middle",
          refX: "50%",
          refY: "100%",
          yAlignment: "middle",
        },
        label: {
          text: "Flow Meter",
          fontSize: 12,
          fontFamily: "sans-serif",
          fontWeight: "bold",
          fill: "black",
          textAnchor: "middle",
          refX: "60%",
          refY: "-110%",
          yAlignment: "middle",
        },
        m3h: {
          text: "Flow : 0 m3/h",
          fontSize: 12,
          fontFamily: "sans-serif",
          fontWeight: "bold",
          fill: "blue",
          textAnchor: "middle",
          refX: "50%",
          refY: "100%",
          yAlignment: "middle",
        },
        mld: {
          text: "0 MLD",
          fontSize: 12,
          fontFamily: "sans-serif",
          fontWeight: "bold",
          fill: "blue",
          textAnchor: "middle",
          refX: "100%",
          refY: "140%",
          yAlignment: "middle",
        },
        panel: {
          text: "Flow Meter",
          href: "./Images/Elements/flowMeter.jpg", // Add a custom icon if necessary
        },
        rectangleSmall: {
          x: 7,
          height: "5",
          width: "30",
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "gray" }, // Light metallic gray
              { offset: "50%", color: "#f5f5f5" }, // Light gray in the middle
              { offset: "100%", color: "gray" }, // Darker gray towards the bottom
            ],
          },
        },
        rectangleBig: {
          y: 5,
          height: "5",
          width: "45",
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "gray" }, // Light metallic gray
              { offset: "50%", color: "#f5f5f5" }, // Light gray in the middle
              { offset: "100%", color: "gray" }, // Darker gray towards the bottom
            ],
          },
        },
        blueBox: {
          y: 10,
          x: -7,
          height: "25",
          width: "60",
          fill: "skyblue",
        },
        graph: {
          x: "5",
          y: "65",
          width: "25",
          height: "60",
          href: "./Images/Elements/graph1.svg",
        },
      },
      ports: {
        groups: {
          in: {
            ...portsIn,
            position: {
              name: "absolute",
              args: {
                x: "calc(w / 2)",
                y: "calc(h / 2)",
              },
            },
            markup: util.svg`
              <rect @selector="pipeBody" />
              <rect @selector="pipeEnd" />
            `,
            size: { width: 40, height: 24 },
            attrs: {
              portRoot: {
                magnetSelector: "pipeEnd",
                magnet: true, // Enable magnet for linking
              },
              pipeBody: {
                width: "calc(w)",
                height: "calc(h)",
                y: "calc(h / -2 - 3)",
                fill: {
                  type: "linearGradient",
                  stops: [
                    { offset: "0%", color: "gray" },
                    { offset: "30%", color: "white" },
                    { offset: "70%", color: "white" },
                    { offset: "100%", color: "gray" },
                  ],
                  attrs: {
                    x1: "0%",
                    y1: "0%",
                    x2: "0%",
                    y2: "100%",
                  },
                },
              },
              pipeEnd: {
                width: 8,
                refCx: "50%", // Center horizontally
                refCy: "50%", // Center vertically
                height: "calc(h+6)",
                y: "calc(h / -2 - 5)",
                stroke: "gray",
                strokeWidth: 3,
                fill: "white",
                magnet: true,
              },
            },
          },
          out: {
            ...portsOut,
            position: {
              name: "absolute",
              args: {
                x: "calc(w / 2)",
                y: "calc(h / 2)",
              },
            },
            markup: util.svg`
              <rect @selector="pipeBody" />
              <rect @selector="pipeEnd" />
            `,
            size: { width: 55, height: 24 },
            attrs: {
              portRoot: {
                magnetSelector: "pipeEnd",
                magnet: true,
              },
              pipeBody: {
                magnet: true,
                width: "calc(w)",
                height: "calc(h)",
                y: "calc(h / -2 -3)",
                fill: {
                  type: "linearGradient",
                  stops: [
                    { offset: "0%", color: "gray" },
                    { offset: "30%", color: "white" },
                    { offset: "70%", color: "white" },
                    { offset: "100%", color: "gray" },
                  ],
                  attrs: {
                    x1: "0%",
                    y1: "0%",
                    x2: "0%",
                    y2: "100%",
                  },
                },
              },
              pipeEnd: {
                width: 8,
                refCx: "50%", // Center horizontally
                refCy: "50%", // Center vertically
                height: "calc(h+6)",
                y: "calc(h / -2 - 5)",
                stroke: "gray",
                strokeWidth: 3,
                fill: "white",
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
            z: 0,
            attrs: {
              pipeBody: {
                x: "calc(-1 * w)",
              },
              pipeEnd: {
                x: "calc(-1 * w)",
              },
            },
          },
          {
            group: "out",
            id: "out",
            z: 0,
            attrs: {
              label: {
                text: "out",
                fill: "#383838",
              },
              pipeEnd: {
                x: "calc(w - 8)",
              },
            },
          },
        ],
      },
    };
  }

  preinitialize() {
    this.markup = util.svg` 
      <circle @selector="bigCircle" />
      <circle @selector="smallCircle" />
      <rect @selector="rectangleSmall"/>
      <rect @selector="rectangleBig"/>
      <rect @selector="blueBox"/>
      <image @selector="graph" />
      <text @selector="label" />
      <text @selector="mld" />
      <text @selector="m3h" />
    `;
  }
}
class FlowMeter1 extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: "FlowMeter",
      size: {
        width: 15, // Custom size for flow meter
        height: 35,
      },
      flowRateM3h: 0, // Flow rate in cubic meters per hour (m³/h)
      flowRateMLD: 0, // Flow rate in megaliters per day (MLD)
      attrs: {
        node: {
          size: 1,
        },
        bigCircle: {
          cx: "18",
          cy: "-16",
          r: "20",
          fill: "lightgray",
        },
        smallCircle: {
          cx: "18",
          cy: "-16",
          r: "14",
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "gray" },
              { offset: "50%", color: "#f5f5f5" },
              { offset: "100%", color: "gray" },
            ],
            attrs: {
              x1: "0%",
              y1: "0%",
              x2: "0%",
              y2: "100%",
            },
          },
        },
        label: {
          text: "Flow : 0 m3/h",
          fontSize: 10,
          fontFamily: "sans-serif",
          fontWeight: "bold",
          fill: "blue",
          x: "200",
        },
        label: {
          text: "Flow Meter",
          fontSize: 10,
          fontFamily: "sans-serif",
          fontWeight: "bold",
          fill: "black",
          textAnchor: "middle",
          refX: "105%",
          refY: "-125%",
          yAlignment: "middle",
        },
        m3h: {
          text: "Flow : 0 m3/h",
          fontSize: 10,
          fontFamily: "sans-serif",
          fontWeight: "bold",
          fill: "blue",
          textAnchor: "middle",
          x: "20",
          y: "50",
        },
        mld: {
          text: "0 MLD",
          fontSize: 10,
          fontFamily: "sans-serif",
          fontWeight: "bold",
          fill: "blue",
          textAnchor: "middle",
          x: "35",
          y: "65",
        },
        panel: {
          text: "Flow Meter",
          href: "./Images/Elements/flowMeter.jpg", // Add a custom icon if necessary
        },
        rectangleSmall: {
          x: 3,
          height: "5",
          width: "30",
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "gray" }, // Light metallic gray
              { offset: "50%", color: "#f5f5f5" }, // Light gray in the middle
              { offset: "100%", color: "gray" }, // Darker gray towards the bottom
            ],
          },
        },
        rectangleBig: {
          y: 5,
          x: -2,
          height: "4",
          width: "40",
          fill: {
            type: "linearGradient",
            stops: [
              { offset: "0%", color: "gray" }, // Light metallic gray
              { offset: "50%", color: "#f5f5f5" }, // Light gray in the middle
              { offset: "100%", color: "gray" }, // Darker gray towards the bottom
            ],
          },
        },
        blueBox: {
          y: 8,
          x: -7,
          height: "20",
          width: "50",
          fill: "skyblue",
        },
        graph: {
          x: "5",
          y: "60",
          width: "20",
          height: "50",
          href: "./Images/Elements/graph1.svg",
        },
      },
      ports: {
        groups: {
          in: {
            ...portsIn,
            position: {
              name: "absolute",
              args: {
                x: "calc(w / 2)",
                y: "calc(h / 2)",
              },
            },
            markup: util.svg`
              <rect @selector="pipeBody" />
              <rect @selector="pipeEnd" />
            `,
            size: { width: 35, height: 20 },
            attrs: {
              portRoot: {
                magnetSelector: "pipeEnd",
                magnet: true, // Enable magnet for linking
              },
              pipeBody: {
                width: "calc(w)",
                height: "calc(h)",
                y: "calc(h / -2)",
                fill: {
                  type: "linearGradient",
                  stops: [
                    { offset: "0%", color: "gray" },
                    { offset: "30%", color: "white" },
                    { offset: "70%", color: "white" },
                    { offset: "100%", color: "gray" },
                  ],
                  attrs: {
                    x1: "0%",
                    y1: "0%",
                    x2: "0%",
                    y2: "100%",
                  },
                },
              },
              pipeEnd: {
                width: 8,
                refCx: "50%", // Center horizontally
                refCy: "50%", // Center vertically
                height: "calc(h+6)",
                y: "calc(h / -2 - 3)",
                stroke: "gray",
                strokeWidth: 3,
                fill: "white",
                magnet: true,
              },
            },
          },
          out: {
            ...portsOut,
            position: {
              name: "absolute",
              args: {
                x: "calc(w / 2)",
                y: "calc(h / 2)",
              },
            },
            markup: util.svg`
              <rect @selector="pipeBody" />
              <rect @selector="pipeEnd" />
            `,
            size: { width: 55, height: 20 },
            attrs: {
              portRoot: {
                magnetSelector: "pipeEnd",
                magnet: true,
              },
              pipeBody: {
                magnet: true,
                width: "calc(w)",
                height: "calc(h)",
                y: "calc(h / -2)",
                fill: {
                  type: "linearGradient",
                  stops: [
                    { offset: "0%", color: "gray" },
                    { offset: "30%", color: "white" },
                    { offset: "70%", color: "white" },
                    { offset: "100%", color: "gray" },
                  ],
                  attrs: {
                    x1: "0%",
                    y1: "0%",
                    x2: "0%",
                    y2: "100%",
                  },
                },
              },
              pipeEnd: {
                width: 8,
                refCx: "50%", // Center horizontally
                refCy: "50%", // Center vertically
                height: "calc(h+6)",
                y: "calc(h / -2 - 3)",
                stroke: "gray",
                strokeWidth: 3,
                fill: "white",
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
            z: 0,
            attrs: {
              pipeBody: {
                x: "calc(-1 * w)",
              },
              pipeEnd: {
                x: "calc(-1 * w)",
              },
            },
          },
          {
            group: "out",
            id: "out",
            z: 0,
            attrs: {
              label: {
                text: "out",
                fill: "#383838",
              },
              pipeEnd: {
                x: "calc(w - 8)",
              },
            },
          },
        ],
      },
    };
  }

  preinitialize() {
    this.markup = util.svg` 
      <circle @selector="bigCircle" />
      <circle @selector="smallCircle" />
      <rect @selector="rectangleSmall"/>
      <rect @selector="rectangleBig"/>
      <rect @selector="blueBox"/>
      <image @selector="graph" />
      <text @selector="label" />
      <text @selector="mld" />
      <text @selector="m3h" />
    `;
  }
}
