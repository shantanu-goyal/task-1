import { getCurrentIndex, setCurrentIndex } from './variables.js'
import { updateLabel } from './utility.js';
import { updateSelection, fib } from './utility.js';
import items from './items.js';

const LENGTH = items.length;
var currentIndex;

export function addTitleEventListener() {
  let text = document.querySelector('.text');
  text.addEventListener('change', function (event) {
    currentIndex = getCurrentIndex();
    items[currentIndex - 1].title = text.value;
    updateLabel(currentIndex, text.value);
  });
}


export function addKeyPressEventListener() {
  document.addEventListener('keydown', function (event) {
    switch (event.code) {
      case "ArrowUp":
        currentIndex = getCurrentIndex();
        if (currentIndex > 1) {
          updateSelection(currentIndex, currentIndex - 1, LENGTH);
          setCurrentIndex(currentIndex - 1);
        }
        break;
      case "ArrowDown":
        currentIndex = getCurrentIndex();
        if (currentIndex < LENGTH) {
          updateSelection(currentIndex, currentIndex + 1, LENGTH);
          setCurrentIndex(currentIndex + 1);
        }
        break;
    }
  });
}



export function addClickEventListener() {
    let listContainer=document.querySelector('.list');
    listContainer.addEventListener('click',function(event){
      currentIndex=getCurrentIndex();
      let newIndex=event.target.dataset.index;
      if(newIndex){
        updateSelection(currentIndex,Number(newIndex),LENGTH);
        setCurrentIndex(Number(newIndex));
      }
    })
}

export function addFormEventListener() {
  document.getElementsByTagName('form')[0].addEventListener('submit', function (event) {
    event.preventDefault();
  })
}

export function addComputeButtonClick(){
  document.querySelector('.fibonacci').addEventListener('click',function(event){
    console.time('mainThreadBlock');
    console.log("Fibonacci computed from Main Thread: ",fib(45))
    console.timeEnd('mainThreadBlock')
  });
}



