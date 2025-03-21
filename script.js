document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const cubes = document.querySelectorAll(".cube");
  
  let selectedCube = null;
  let offsetX = 0, offsetY = 0;

  // Optional: Position cubes in a grid initially
  cubes.forEach((cube, index) => {
    const cols = 4; // Adjust this based on the grid configuration
    const gap = 10;
    const cubeWidth = 100;
    const cubeHeight = 100;
    const col = index % cols;
    const row = Math.floor(index / cols);
    const x = col * (cubeWidth + gap) + 10; // starting offset same as container padding
    const y = row * (cubeHeight + gap) + 10;
    cube.style.left = `${x}px`;
    cube.style.top = `${y}px`;
  });

  // Mousedown: When a cube is clicked, set it as selected and record offsets.
  cubes.forEach(cube => {
    cube.addEventListener("mousedown", (e) => {
      selectedCube = cube;
      selectedCube.classList.add("dragging");
      const rect = selectedCube.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
    });
  });

  // Mousemove: If a cube is selected, update its position based on the mouse.
  document.addEventListener("mousemove", (e) => {
    if (selectedCube) {
      // Calculate new position relative to the container.
      let newX = e.clientX - offsetX - container.getBoundingClientRect().left;
      let newY = e.clientY - offsetY - container.getBoundingClientRect().top;
      
      // Determine boundaries
      const maxX = container.clientWidth - selectedCube.offsetWidth;
      const maxY = container.clientHeight - selectedCube.offsetHeight;
      
      // Clamp the new position within the container boundaries.
      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));
      
      selectedCube.style.left = newX + "px";
      selectedCube.sty
