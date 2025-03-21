// script.js
document.addEventListener('DOMContentLoaded', function() {
    const cubes = document.querySelectorAll('.cube');
    const container = document.querySelector('.container');
    let selectedCube = null;
    let offset = [0, 0];

    // Function to handle mousedown event
    function handleMouseDown(e) {
        if (e.target.classList.contains('cube')) {
            selectedCube = e.target;
            offset = [
                selectedCube.offsetLeft - e.clientX,
                selectedCube.offsetTop - e.clientY
            ];
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
    }

    // Function to handle mousemove event
    function handleMouseMove(e) {
        if (selectedCube) {
            let x = e.clientX + offset[0];
            let y = e.clientY + offset[1];

            // Boundary checking to keep cube within container
            if (x < 0) x = 0;
            if (y < 0) y = 0;
            if (x + selectedCube.offsetWidth > container.offsetWidth) x = container.offsetWidth - selectedCube.offsetWidth;
            if (y + selectedCube.offsetHeight > container.offsetHeight) y = container.offsetHeight - selectedCube.offsetHeight;

            selectedCube.style.position = 'absolute';
            selectedCube.style.left = `${x}px`;
            selectedCube.style.top = `${y}px`;
        }
    }

    // Function to handle mouseup event
    function handleMouseUp() {
        selectedCube = null;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    // Add event listener for mousedown on the container
    container.addEventListener('mousedown', handleMouseDown);
});



