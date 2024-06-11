const items = document.querySelectorAll('.item');
const dropZones = document.querySelectorAll('.drop-zone');
const untrackedDropZone = document.getElementById('unranked-drop-zone');

let dragged;

function onDragStart(event) {
  dragged = event.target;
}

function onDragOver(event) {
  event.preventDefault();
}

function onDropItem(event) {
  event.preventDefault();
  const dropZoneItems = this.querySelectorAll('.item');
  const isItemDropped = Array.from(dropZoneItems).some(
    (item) => item === dragged
  );
  if (isItemDropped) {
    return;
  }
  this.append(dragged);
}

function onDblClickItem() {
  const untrackedItems = untrackedDropZone.querySelectorAll('.item');
  const isItemDropped = Array.from(untrackedItems).some(
    (item) => item === this
  );
  if (isItemDropped) {
    return;
  }
  untrackedDropZone.append(this);
}

function init() {
  items.forEach((item) => {
    item.addEventListener('dragstart', onDragStart);
    item.addEventListener('dblclick', onDblClickItem);
  });
  dropZones.forEach((dropZone) => {
    dropZone.addEventListener('dragover', onDragOver);
    dropZone.addEventListener('drop', onDropItem);
  });
}

init();
