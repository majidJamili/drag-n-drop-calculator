


const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')
function summation(array) {
    var total = 0;
    for(let value of array){
        total += parseInt(value); 
    }; 
    return total; 

}


window.onload = function updateContainers(){    
    containers.forEach(container =>{
            const draggableItems = container.querySelectorAll('.draggable');
            const itemArray =[];
            draggableItems.forEach(draggable=>{
                const itemValue = draggable.innerHTML; 
                console.log(itemValue); 
                itemArray.push(itemValue); 
            })
            const containerTotal = summation(itemArray); 
            container.querySelector('.container-total').innerHTML = containerTotal; 
    })
}




containers.forEach(container=>{
    container.addEventListener('dragend',()=>{
        const containedItems = container.querySelectorAll('.draggable');
        var valueArray = [];
        containedItems.forEach(item => {
            var  valueItem = item.innerHTML; 
            valueArray.push(valueItem);          
        }) 
        console.log(summation(valueArray)); 
        
        container.querySelector('.container-total').innerHTML = summation(valueArray); 
        

    })

})
draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging')
    })
  
    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging')
    })
  })
  
  containers.forEach(container => {
    container.addEventListener('dragover', e => {
      e.preventDefault()
      const afterElement = getDragAfterElement(container, e.clientY)
      const draggable = document.querySelector('.dragging')
      if (afterElement == null) {
        container.appendChild(draggable)
      } else {
        container.insertBefore(draggable, afterElement)
      }
    })
  })
  
  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
  
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect()
      const offset = y - box.top - box.height / 2
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child }
      } else {
        return closest
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element
  }