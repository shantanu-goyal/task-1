//Imports
import { addTitleEventListener, addKeyPressEventListener, addClickEventListener, addFormEventListener } from './event-listeners.js';
import { renderItems, setActiveElementOnLoad } from './utility.js';


/* This function is called when the website is loaded. This sets the initial selection to the first item
and loads the image and the title in the right column.*/
function initialise() {
    renderItems();
    setActiveElementOnLoad();
    addFormEventListener();
    addTitleEventListener();
    addKeyPressEventListener();
    addClickEventListener();
}

initialise();