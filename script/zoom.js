let scale = 1; // Initial scale of the paper
const zoomSpeed = 0.02; // Zoom speed (change as per your preference)
const minScale = 0.4; // Minimum zoom level to prevent excessive zoom out
const maxScale = 4; // Maximum zoom level to prevent excessive zoom in

// Function to handle zooming in and out
function zoomPaper(delta, x, y) {
  // Calculate new scale
  const newScale =
    delta > 0
      ? Math.min(maxScale, scale + zoomSpeed) // Zoom in
      : Math.max(minScale, scale - zoomSpeed); // Zoom out

  // Calculate the change in scale to maintain zoom centering around the mouse position
  const zoomFactor = newScale / scale;

  // Calculate new translation to keep the zoom centered at mouse position
  const newTx = x - zoomFactor * (x - paper.translate().tx);
  const newTy = y - zoomFactor * (y - paper.translate().ty);

  // Update the paper scale and translation
  paper.scale(newScale, newScale);
  paper.translate(newTx, newTy);

  // Store the new scale value
  scale = newScale;
}

// Zoom in/out based on mouse scroll and position
paper.on("blank:mousewheel cell:mousewheel", function (event, x, y, delta) {
  try {
    event.preventDefault(); // Prevent default scrolling behavior
    zoomPaper(delta, x, y);
  } catch (error) {}
});

// --- Add panning support --- //
let isPanning = false;
let lastMousePosition = { x: 0, y: 0 };

// Mouse down event to start panning
paper.on("blank:pointerdown", function (evt) {
  isPanning = true;
  lastMousePosition.x = evt.clientX;
  lastMousePosition.y = evt.clientY;
});

// Mouse move event to perform panning
paper.on("blank:pointermove", function (evt) {
  if (!isPanning) return;

  // Calculate the difference in mouse position
  const dx = evt.clientX - lastMousePosition.x;
  const dy = evt.clientY - lastMousePosition.y;

  // Update the last mouse position
  lastMousePosition.x = evt.clientX;
  lastMousePosition.y = evt.clientY;

  // Translate the paper based on the mouse movement
  paper.translate(paper.translate().tx + dx, paper.translate().ty + dy);
});

// Mouse up event to stop panning
paper.on("blank:pointerup", function () {
  isPanning = false;
});
