// // Define the scale factor for the minimap to ensure it shows the entire paper
// const minimapScale = 0.1; // Adjust this scale factor as needed based on the size of your main paper

// // Create a separate graph for the minimap and link it with the main paper's graph
// const minimapGraph = new joint.dia.Graph();
// const minimap = new joint.dia.Paper({
//   el: document.getElementById("minimap"), // Container element for the minimap
//   model: minimapGraph,
//   width: 300, // Minimap container size
//   height: 200, // Minimap container size
//   gridSize: 1,
//   interactive: false, // Disable interactions in the minimap itself
//   async: true,
//   background: {
//     color: "#FFFFFF", // Set the minimap background color to white
//   },
//   drawGrid: false, // Disable grid drawing in the minimap
// });

// // Sync the minimap graph with the main graph
// graph.on("add remove change", () => {
//   minimapGraph.fromJSON(graph.toJSON()); // Synchronize the minimap's graph whenever the main graph changes
//   //minimap.scaleContentToFit({ padding: 0 }); // Scale the minimap to fit the entire content
// });

// // Set initial scale and viewbox to match the main paper's size
// minimap.scale(minimapScale, minimapScale);

// // Create a rectangle that represents the current viewport of the main paper
// const viewportRect = new joint.shapes.standard.Rectangle();
// viewportRect.attr({
//   body: {
//     fill: "rgba(173, 216, 230, 0.5)", // Light blue fill with transparency to indicate the current view
//     stroke: "#3498DB", // Darker blue border for the viewport rectangle
//     strokeWidth: 1,
//   },
// });
// viewportRect.addTo(minimapGraph); // Add the viewport rectangle to the minimap

// // Function to update the viewport rectangle position and size
// function updateViewportRect() {
//   const scaleX = scale; // The main paper's current x scale
//   const scaleY = scale; // The main paper's current y scale (assuming uniform scaling)

//   // Get the main paper's translation (current top-left corner position)
//   const translate = paper.translate();

//   // Calculate the visible width and height of the main paper's current view
//   const viewWidth = config.paeprWidth / scaleX; // Width of the visible area on the main paper
//   const viewHeight = config.paperHeight / scaleY; // Height of the visible area on the main paper

//   // Position and resize the viewport rectangle on the minimap to reflect the current view
//   viewportRect.position(
//     (-translate.tx / scaleX) * minimapScale,
//     (-translate.ty / scaleY) * minimapScale
//   );
//   viewportRect.resize(viewWidth * minimapScale, viewHeight * minimapScale);
// }

// // Update the viewport rectangle whenever the main paper is zoomed or panned
// paper.on("translate scale", updateViewportRect);

// // Initial call to position the viewport rectangle correctly
// updateViewportRect();
