// Your code here.
const items = document.querySelectorAll('.item');
let selectedItem = null;
let offsetX = 0;
let offsetY = 0;

items.forEach(item => {
  item.addEventListener('mousedown', (event) => {
    selectedItem = item;
    offsetX = event.clientX - item.getBoundingClientRect().left;
    offsetY = event.clientY - item.getBoundingClientRect().top;
    
    // Add mousemove and mouseup event listeners to the document
    document.addEventListener('mousemove', dragItem);
    document.addEventListener('mouseup', dropItem);
  });
});

function dragItem(event) {
  if (!selectedItem) return;

  // Calculate the new position of the item
  const containerRect = document.querySelector('.items').getBoundingClientRect();
  
  let newLeft = event.clientX - offsetX;
  let newTop = event.clientY - offsetY;

  // Constrain the item within the container's bounds
  newLeft = Math.max(containerRect.left, Math.min(newLeft, containerRect.right - selectedItem.offsetWidth));
  newTop = Math.max(containerRect.top, Math.min(newTop, containerRect.bottom - selectedItem.offsetHeight));
  
  // Apply the new position
  selectedItem.style.position = 'absolute';
  selectedItem.style.left = `${newLeft - containerRect.left}px`;
  selectedItem.style.top = `${newTop - containerRect.top}px`;
}

function dropItem() {
  // Remove the event listeners after the mouse is released
  document.removeEventListener('mousemove', dragItem);
  document.removeEventListener('mouseup', dropItem);
  selectedItem = null;
}