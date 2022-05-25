//Current Position of the selection. By default the first item in the item array is selected.
var currentIndex = 1;

export function getCurrentIndex() {
  return currentIndex;
}
export function setCurrentIndex(newIndex) {
  currentIndex = newIndex;
}
