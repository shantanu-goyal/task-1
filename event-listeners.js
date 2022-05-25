import { getCurrentIndex, setCurrentIndex } from './variables.js'
import { updateLabel } from './utility.js';
import { updateSelection } from './utility.js';

import items from './items.js';
const LENGTH = items.length;

export function addTitleEventListener() {
  let text = document.querySelector('.text');
  text.addEventListener('change', function (event) {
    let currentIndex = getCurrentIndex();
    items[currentIndex - 1].title = text.value;
    updateLabel(currentIndex, text.value);
  });
}


export function addKeyPressEventListener() {
  document.addEventListener('keydown', function (event) {
    switch (event.code) {
      case "ArrowUp":
        let cidx = getCurrentIndex();
        if (cidx > 1) {
          updateSelection(cidx, cidx - 1, LENGTH);
          setCurrentIndex(cidx - 1);
        }
        break;
      case "ArrowDown":
        let currentIndex = getCurrentIndex();
        if (currentIndex < LENGTH) {
          updateSelection(currentIndex, currentIndex + 1, LENGTH);
          setCurrentIndex(currentIndex + 1);
        }
        break;
    }
  });
}



export function addClickEventListener() {
  // Adding an event listener that updates the selection of the label on click.
  document.querySelectorAll('.label-container').forEach(item => {
    item.addEventListener('click', event => {
      /* The variable parent contains the value of the parent node. In this case it is the list container / element */
      let parent = item.parentNode;
      // Finding the index of the current node in parent's childNode list
      var index = Array.prototype.indexOf.call(parent.children, item);
      let currentIndex = getCurrentIndex();
      // Function call for updating the current selection 
      updateSelection(currentIndex, Number(index) + 1, LENGTH);
      // Updating the current position of the selection
      setCurrentIndex(index + 1);
    })
  })
}

export function addFormEventListener() {
  document.getElementsByTagName('form')[0].addEventListener('submit', function (event) {
    event.preventDefault();
  })
}



