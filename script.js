//Imports
import items from './items.js';

// Storing the length of the item array.
const length = items.length;

//Current Position of the selection. By default the first item in the item array is selected.
let currentIndex = 1;


let listContainer = document.querySelector('.list');
let fragment = document.createDocumentFragment();


//The function returns the shortend label if it exceeds the maximum length.
function getShortenedLabel(label) {
    const MAX_LENGTH=30;
    if(label.length>MAX_LENGTH){
        //Shortend Label
        return label.substring(0,15)+"..."+label.slice(-10);
    }
    return label;
}


/* This function is called when the website is loaded. This sets the initial selection to the first item
and loads the image and the title in the right column.*/
function initialise() {
    let listContainer = document.querySelector('.list');
    
    //Adds a class 'active' to the label-container div
    listContainer.childNodes[1].classList.add('active');
    
    let image = document.querySelector('.image');
    image.setAttribute('src', items[currentIndex - 1].previewImage);
    let text = document.querySelector('.text');
    text.value = items[currentIndex - 1].title;
}


// This function when invoked updates the label
function updateLabel(currentIndex,text){
    
    let listContainer = document.querySelector('.list');
    //We get the label container which we have to update
    let currentLabelContainer=listContainer.childNodes[currentIndex];
    // Updating the value of the label inside the labelcontainer
    currentLabelContainer.childNodes[1].innerHTML=getShortenedLabel(text);
}


function updateSelection(currentIndex, newIndex, length) {
    //Index Cannot go outside of the bounds
    if (newIndex > length || newIndex < 1 || newIndex==currentIndex) {
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


items.forEach((item) => {
    //Creating a label contaiber wrapper
    let labelContainer = document.createElement('div');
    //Adding the class 'label-container' to the outermost div containing the icon and the label
    labelContainer.classList.add('label-container');
    //Creating the icon of the image
    let icon = document.createElement('img');
    icon.classList.add('icon');
    icon.setAttribute('src', item.previewImage);
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

// Adding an event listener that updates the selection of the label on click.
document.querySelectorAll('.label-container').forEach(item => {
    item.addEventListener('click', event => {
        
        /* The variable parent contains the value of the parent node. In this case it is the list container / element */
        let parent = item.parentNode;
        
        // Finding the index of the current node in parent's childNode list
        var index = Array.prototype.indexOf.call(parent.children, item);
        
        // Function call for updating the current selection 
        updateSelection(currentIndex, Number(index) + 1, length);
        
        // Updating the current position of the selection
        currentIndex = Number(index) + 1;
    })
})


// Updating the selection on key press
document.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
        case 38: //Key code of up key

            // If going up is possible
            if (currentIndex > 1) {
                updateSelection(currentIndex, currentIndex - 1, length);
                currentIndex = currentIndex - 1;
            }
            break;
        case 40: // Key code of down key

            // If going down is possible
            if (currentIndex < length) {
                updateSelection(currentIndex, currentIndex + 1, length);
                currentIndex = currentIndex + 1;
            }
           break;
    }
});

//Updating the title of the image
let text=document.querySelector('.text');
text.addEventListener('change',function(event){
    items[currentIndex-1].title=text.value;
    updateLabel(currentIndex,text.value);
    
});


initialise();