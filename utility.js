import items from "./items.js";
import { getCurrentIndex } from "./variables.js";


//The function returns the shortend label if it exceeds the maximum length.
export function getShortenedLabel(label) {
  const MAX_LENGTH = 30;
  if (label.length > MAX_LENGTH) {
    //Shortend Label
    return label.substring(0, 15) + "..." + label.slice(-10);
  }
  return label;
}


// This function when invoked updates the label
export function updateLabel(currentIndex, text) {
  let listContainer = document.querySelector('.list');
  //We get the label container which we have to update
  let currentLabelContainer = listContainer.childNodes[currentIndex];
  // Updating the value of the label inside the labelcontainer
  currentLabelContainer.childNodes[1].innerHTML = getShortenedLabel(text);
}

export function updateSelection(currentIndex, newIndex, length) {
  //Index Cannot go outside of the bounds
  if (newIndex > length || newIndex < 1 || newIndex == currentIndex) {
    return;
  }
  let listContainer = document.querySelector('.list');
  //We remove the active class from the current label container
  listContainer.childNodes[currentIndex].classList.toggle('active');
  // We add the active class to the new label container
  listContainer.childNodes[newIndex].classList.toggle('active');
  // Setting the value of the image and the title
  let image = document.querySelector('.image');
  image.setAttribute('src', items[newIndex - 1].previewImage);
  let text = document.querySelector('.text');
  text.value = items[newIndex - 1].title;
}


function setIconAttributes(icon,link){
  icon.classList.add('icon');
  icon.setAttribute('src', link);
  icon.setAttribute('alt', "icon")
  icon.setAttribute('height','35px');
  icon.setAttribute('width','35px');
  icon.setAttribute('loading','lazy');
  return icon;
}

export function renderItems() {
  let listContainer = document.querySelector('.list');
  let fragment = document.createDocumentFragment();
  var idx=1;
  items.forEach((item) => {
    //Creating a label contaiber wrapper
    let labelContainer = document.createElement('div');
    //Adding the class 'label-container' to the outermost div containing the icon and the label
    labelContainer.classList.add('label-container');
    labelContainer.setAttribute('data-index',idx++);
    //Creating the icon of the image
    let icon = document.createElement('img');
    var link=item.previewImage;
    link=link.slice(0,-11);
    link+="w=35&h=35";
    icon=setIconAttributes(icon,link);
    // Creating a div for label
    let label = document.createElement('div');
    label.classList.add('label');
    label.innerHTML = getShortenedLabel(item.title);
    //Appending icon to label container
    labelContainer.appendChild(icon);
    //Appending label to label container
    labelContainer.appendChild(label);
    //Appending label container to fragment
    fragment.appendChild(labelContainer);
  })
  //Adding all the label containers  to the list container
  listContainer.append(fragment);
}

export function setActiveElementOnLoad() {
  let listContainer = document.querySelector('.list');
  let currentIndex=getCurrentIndex();
  listContainer.childNodes[currentIndex].classList.add('active');
  let image = document.querySelector('.image');
  image.setAttribute('src', items[currentIndex - 1].previewImage);
  image.classList.toggle('show')
  let text = document.querySelector('.text');
  text.value = items[currentIndex - 1].title;
}
