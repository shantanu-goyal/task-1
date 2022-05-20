import items from './items.js';


function initialise(){
    let listContainer=document.querySelector('.list');
    listContainer.childNodes[1].classList.add('active');
    let image=document.querySelector('.image');
    image.setAttribute('src',items[currentIndex-1].previewImage);
    let text=document.querySelector('.text');
    text.innerHTML=items[currentIndex-1].title;
}




function updateSelection(currentIndex,newIndex,length){
    //Index Cannot go outside of the bounds
    if(newIndex>length || newIndex<1){    
        return;
    }
    let listContainer=document.querySelector('.list');
    listContainer.childNodes[currentIndex].classList.toggle('active');
    listContainer.childNodes[newIndex].classList.toggle('active');
    let image=document.querySelector('.image');
    image.setAttribute('src',items[newIndex-1].previewImage);
    let text=document.querySelector('.text');
    text.innerHTML=items[newIndex-1].title;
}

var length=items.length;
let currentIndex=1;
let listContainer=document.querySelector('.list');
let fragment=document.createDocumentFragment();

items.forEach((item)=>{
    //Creating a wrapper
    let outerDiv=document.createElement('div');
    //Adding the class outerdiv to the outermost div containing the icon and the title
    outerDiv.classList.add('outerdiv');
    //Creating the icon of the image
    let icon=document.createElement('img');
    icon.classList.add('icon');
    icon.setAttribute('src',item.previewImage);
    // Creating a div for title
    let title=document.createElement('div');
    title.classList.add('title');
    title.innerHTML=item.title;
    //Appending icon to outerdiv
    outerDiv.appendChild(icon);
    //Appending title to outerdiv
    outerDiv.appendChild(title);
    //Appending outerdiv to fragment
    fragment.appendChild(outerDiv);
})
//Adding the list to the list container
listContainer.append(fragment);

initialise();


// Creating event Listners for all items in the list

document.querySelectorAll('.outerdiv').forEach(item => {
    item.addEventListener('click', event => {
        let parent = item.parentNode;
        var index = Array.prototype.indexOf.call(parent.children, item);
        updateSelection(currentIndex,Number(index)+1,length);
        currentIndex=Number(index)+1;
    })
})





document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
        case 38:
            if(currentIndex>1){
                updateSelection(currentIndex,currentIndex-1,length);
                currentIndex=currentIndex-1;
            }
            break;
        case 40:
            if(currentIndex<length)
            {
                updateSelection(currentIndex,currentIndex+1,length);
                currentIndex=currentIndex+1;
            }
            break;
    }
});