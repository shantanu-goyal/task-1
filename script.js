//Imports
import { addTitleEventListener, addKeyPressEventListener, addClickEventListener, addFormEventListener ,addComputeButtonClick} from './event-listeners.js';
import { renderItems, setActiveElementOnLoad,fib} from './utility.js';


// Woker 
function initialiseWebWorker(){
    const myWorker = new Worker('./worker.js');
    console.time('workerTime')
    myWorker.postMessage(45)
    myWorker.onmessage = function(event) {
        console.timeEnd('workerTime')
        console.log("Fibonacci Computed from worker: ",event.data)
    };
    
}


/* This function is called when the website is loaded. This sets the initial selection to the first item
and loads the image and the title in the right column.*/
function initialise() {
    console.time("loadTime");  
    if(window.Worker){
        initialiseWebWorker();
    }
    // console.log(fib(40));
    renderItems();
    setActiveElementOnLoad();
    addFormEventListener();
    addTitleEventListener();
    addKeyPressEventListener();
    addClickEventListener();
    addComputeButtonClick();
    console.timeEnd("loadTime");
    
}

initialise();