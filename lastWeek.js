// localStorage.clear()

// SELECTORS

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const filterItemsAll = document.querySelector('.filter')
const todoList = document.querySelector('.todo-list');
const todoListAll = document.querySelectorAll('.todo-list');
const todoListMonCurr = document.querySelector('.todo-list-mon-curr');
const todoListTuesCurr = document.querySelector('.todo-list-tues-curr');
const todoListWedCurr = document.querySelector('.todo-list-wed-curr');
const todoListThursCurr = document.querySelector('.todo-list-thurs-curr');
const todoListFriCurr = document.querySelector('.todo-list-fri-curr');
const todoListSatCurr = document.querySelector('.todo-list-sat-curr');
const todoListSunCurr = document.querySelector('.todo-list-sun-curr');
const filterOption = document.querySelector('.filter-todo');
const thisWeekCal = document.querySelector('.this-week-cal');
const thisWeekCalMon = document.querySelector('.this-week-cal-mon');
const thisWeekCalTues = document.querySelector('.this-week-cal-tues');
const thisWeekCalWed = document.querySelector('.this-week-cal-wed');
const thisWeekCalThurs = document.querySelector('.this-week-cal-thurs');
const thisWeekCalFri = document.querySelector('.this-week-cal-fri');
const thisWeekCalSat = document.querySelector('.this-week-cal-sat');
const thisWeekCalSun = document.querySelector('.this-week-cal-sun');
const thisWeek = document.querySelectorAll('.this-week-cal-day');
const time = document.querySelectorAll('.time')
const closeTimeButton = document.querySelector('.close-time-btn')
const hour = document.querySelectorAll('.hour')
const minutes = document.querySelectorAll('.minutes')
const amPm = document.querySelectorAll('.ampm')
const chosenHour = document.querySelector('.chosen-hour')
const chosenMinutes = document.querySelector('.chosen-minutes')
const chosenAmPm = document.querySelector('.chosen-am-pm')
const startButton = document.getElementsByClassName('start-btn')
const endButton = document.getElementsByClassName('end-btn')
const setTimeButton = document.querySelector('.set-time-btn')
const hiddenTimePicker = document.querySelector('.hidden-time-picker')
let startOrEndTimeButton;
const pageLeftArrow = document.querySelector('#page-left')



// EVENT LISTENERS

// when page loads, run the function that gets todos, start times and end times from local storage
document.addEventListener('DOMContentLoaded', getTodos);
document.addEventListener('DOMContentLoaded', getStartTimes);
document.addEventListener('DOMContentLoaded', getEndTimes);
// had to create the next 3 event listeners so that all elements with class that are created in js (not in html file) will load before running an event listener on them
document.addEventListener('DOMContentLoaded', editTodoItem);
document.addEventListener('DOMContentLoaded', () => Array.from(startButton).forEach(element => element.addEventListener('click', showTimePicker)));
document.addEventListener('DOMContentLoaded', () => Array.from(endButton).forEach(element => element.addEventListener('click', showTimePicker)));
closeTimeButton.addEventListener('click', closeClock)
todoButton.addEventListener('click', showCalendar);
Array.from(todoListAll).forEach(element => element.addEventListener('click', deleteCheck));
filterOption.addEventListener('click', filterTodo);
Array.from(thisWeek).forEach(element => element.addEventListener('click', addTodoThisWeek));
Array.from(hour).forEach(hour => hour.addEventListener('click',  () => chosenHour.innerText = hour.innerText ));
Array.from(minutes).forEach(minutes => minutes.addEventListener('click', () => chosenMinutes.innerText = minutes.innerText ));
Array.from(amPm).forEach(ampm => ampm.addEventListener('click', () => chosenAmPm.innerText = ampm.innerText));
Array.from(hour).forEach(hour => hour.addEventListener('click', function () {
    hour.classList.remove("time-picker-white-font");
    hour.classList.toggle('time-picker-green-font');
}))
Array.from(minutes).forEach(minutes => minutes.addEventListener('click', function () {
    minutes.classList.remove("time-picker-white-font");
    minutes.classList.toggle('time-picker-green-font');
}))
Array.from(amPm).forEach(amPm => amPm.addEventListener('click', function () {
    amPm.classList.remove("time-picker-white-font");
    amPm.classList.toggle('time-picker-green-font');
}))
document.addEventListener('click', previousWeek);




function showCalendar(event) {
    event.preventDefault();
    // window.location.href = "calendar.html"
    thisWeekCal.classList.toggle('hide');
}

function previousWeek() {
    
}

function addTodoThisWeek(event) {
    // prevent form from submitting
    event.preventDefault();
    // create Todo div
    thisWeekCal.classList.toggle('hide');
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // create li
    const newTodo = document.createElement('input');
    newTodo.setAttribute('type', 'text')
    newTodo.setAttribute('value', todoInput.value)
    // newTodo.innerText = todoInput.value;
    
    newTodo.classList.add('todo-item');
    // APPEND TO DIV    
    todoDiv.appendChild(newTodo);
    // ADD TODO TO LOCAL STORAGE
    // saveLocalTodos(todoInput.value);
    addDayToInputValue(event) 
    // Start time button
    const startTime = document.createElement('button');
    startTime.innerHTML = 'Start';
    startTime.classList.add('start-btn');
    todoDiv.appendChild(startTime);
    startTime.onclick = showTimePicker;
    // End time button
    const endTime = document.createElement('button');
    endTime.innerHTML = 'End';
    endTime.classList.add('end-btn');
    todoDiv.appendChild(endTime); 
    endTime.onclick = showTimePicker;         
    // Checkmark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    // trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
  
    // APPEND TO UL 
    const item = event.target;   
    if(item.classList.contains('this-week-cal-mon')){
        todoListMonCurr.appendChild(todoDiv)
    } else if (item.classList.contains('this-week-cal-tues')) {
        todoListTuesCurr.appendChild(todoDiv)
    } else if (item.classList.contains('this-week-cal-wed')){
        todoListWedCurr.appendChild(todoDiv)
    } else if (item.classList.contains('this-week-cal-thurs')) {
        todoListThursCurr.appendChild(todoDiv)
    } else if (item.classList.contains('this-week-cal-fri')) {
        todoListFriCurr.appendChild(todoDiv)
    } else if (item.classList.contains('this-week-cal-sat')) {
        todoListSatCurr.appendChild(todoDiv)
    } else if (item.classList.contains('this-week-cal-sun')) {
        todoListSunCurr.appendChild(todoDiv)
    }   
           
    // Clear todo input value after each entry
    todoInput.value = "";  

}



function addDayToInputValue(event){    
    // save todo input values to local storage
    const item = event.target;
    // add .day so we can put in correct section when recalling from local storage
    if(item.classList.contains('this-week-cal-mon')) {
        saveLocalTodos(todoInput.value + '.mon');
    } else if (item.classList.contains('this-week-cal-tues')) {
        saveLocalTodos(todoInput.value + '.tues');
    } else if (item.classList.contains('this-week-cal-wed')) {
        saveLocalTodos(todoInput.value + '.wed');
    } else if (item.classList.contains('this-week-cal-thurs')) {
        saveLocalTodos(todoInput.value + '.thurs');
    } else if (item.classList.contains('this-week-cal-fri')) {
        saveLocalTodos(todoInput.value + '.fri');
    } else if (item.classList.contains('this-week-cal-sat')) {
        saveLocalTodos(todoInput.value + '.sat');
    } else if (item.classList.contains('this-week-cal-sun')) {
        saveLocalTodos(todoInput.value + '.sun');
    } 

}




function chooseHour(e) {    
    chosenHour.innerText = hour.innerText 
}


function closeClock() {
    Array.from(time).forEach(element => element.classList.toggle('hide')) 
    
    Array.from(hour).forEach(hour => hour.classList.add("time-picker-white-font"))
    Array.from(minutes).forEach(minutes => minutes.classList.add("time-picker-white-font"))
    Array.from(amPm).forEach(amPm => amPm.classList.add("time-picker-white-font"))
    
}

function showTimePicker( e ) {
    startOrEndTimeButton = e.target
    Array.from(time).forEach(element => element.classList.toggle('hide')) 
}

setTimeButton.addEventListener( 'click', function () {
  startOrEndTimeButton.innerText = chosenHour.innerText + ':' + chosenMinutes.innerText + " " + chosenAmPm.innerText;
  startOrEndTimeButton.style.backgroundColor = '#ffad00';
          startOrEndTimeButton.style.color = 'white'; 
Array.from(time).forEach(element => element.classList.toggle('hide')); 
Array.from(hour).forEach(hour => hour.classList.add("time-picker-white-font"))
Array.from(minutes).forEach(minutes => minutes.classList.add("time-picker-white-font"))
Array.from(amPm).forEach(amPm => amPm.classList.add("time-picker-white-font"))

})




// SAVE START AND END TIMES TO LOCAL STORAGE ON PAGE CLOSE/REFRESH
window.onbeforeunload = closingCode;
function closingCode(){
      
    let startTimesUpdate = []
    
    Array.from(startButton).forEach(button => startTimesUpdate.push(button.innerText))

    
    if (localStorage.getItem('startTimesSaveLastWeek') === null) {
        startTimes = [];
    } else {
        startTimes = JSON.parse(localStorage.getItem('startTimesSaveLastWeek'))
    }
    startTimes = startTimesUpdate    
    
    localStorage.setItem('startTimesSaveLastWeek', JSON.stringify(startTimes))   

    let endTimesUpdate = []
    
    Array.from(endButton).forEach(button => endTimesUpdate.push(button.innerText))

    
    if (localStorage.getItem('endTimesSaveLastWeek') === null) {
        endTimes = [];
    } else {
        endTimes = JSON.parse(localStorage.getItem('endTimesSaveLastWeek'))
    }
    endTimes = endTimesUpdate
    
    
    localStorage.setItem('endTimesSaveLastWeek', JSON.stringify(endTimes))   
    
    
}

function getStartTimes(){ 
       
    
    if (localStorage.getItem('startTimesSaveLastWeek') === null) {
        startTimes = [];
        
    } else {
        startTimes = JSON.parse(localStorage.getItem('startTimesSaveLastWeek'))
    }  

   startButtonTimes = Array.from(startButton)  

   for (let i = 0; i < startButtonTimes.length; i++) {
       
       startButtonTimes[i].innerText = startTimes[i]
       if (startButtonTimes[i].innerText !== 'Start') {
       startButtonTimes[i].style.backgroundColor = '#ffad00'
       startButtonTimes[i].style.color = 'white'
       }

   }  
    
}

function getEndTimes(){   
    
    if (localStorage.getItem('endTimesSaveLastWeek') === null) {
        endTimes = [];
        
    } else {
        endTimes = JSON.parse(localStorage.getItem('endTimesSaveLastWeek'))
    }  

   endButtonTimes = Array.from(endButton)  

   for (let i = 0; i < endButtonTimes.length; i++) {
         
       endButtonTimes[i].innerText = endTimes[i]
       if (endButtonTimes[i].innerText !== 'End') {
       endButtonTimes[i].style.backgroundColor = '#ffad00'
       endButtonTimes[i].style.color = 'white'
       }
    }

   }      
    
    

function editTodoItem(e) {
    // function for editing todo item and storing the edited value in local storage

    
    let inputElements = document.getElementsByClassName('todo-item')
  
    // find matching element in local storage when the input is clicked.  in order to match value to local storage value, I have to add .day to the end of the value.  I don't have to worry about .dayCompleted because I made the input field read only when marked completed     
    Array.from(inputElements).forEach(element => element.addEventListener('focus', findCurrValueMatch))

    function findCurrValueMatch(e) {
        const item = e.target.parentElement.parentElement
        inputValue = e.target.value
        
        if(item.classList.contains('todo-list-mon-curr')) {
            inputValue = inputValue + '.mon'
        } else if (item.classList.contains('todo-list-tues-curr')) {
            inputValue = inputValue + '.tues'
        } else if (item.classList.contains('todo-list-wed-curr')) {
            inputValue = inputValue + '.wed'
        } else if (item.classList.contains('todo-list-thurs-curr')) {
            inputValue = inputValue + '.thurs'
        } else if (item.classList.contains('todo-list-fri-curr')) {
            inputValue = inputValue + '.fri'
        } else if (item.classList.contains('todo-list-sat-curr')) {
            inputValue = inputValue + '.sat'
        } else if (item.classList.contains('todo-list-sun-curr')) {
            inputValue = inputValue + '.sun'
        }  
     
    
    
    let todos = JSON.parse(localStorage.getItem('todosLastWeek'))
    
    todos.forEach(function(element, i) {
        if (inputValue === element) {
            Array.from(inputElements).forEach(element => element.addEventListener('blur', function(){
                editedValue = (e.target.value)
                if(item.classList.contains('todo-list-mon-curr')) {
                    editedValue = editedValue + '.mon'
                } else if (item.classList.contains('todo-list-tues-curr')) {
                    editedValue = editedValue + '.tues'
                } else if (item.classList.contains('todo-list-wed-curr')) {
                    editedValue = editedValue + '.wed'
                } else if (item.classList.contains('todo-list-thurs-curr')) {
                    editedValue = editedValue + '.thurs'
                } else if (item.classList.contains('todo-list-fri-curr')) {
                    editedValue = editedValue + '.fri'
                } else if (item.classList.contains('todo-list-sat-curr')) {
                    editedValue = editedValue + '.sat'
                } else if (item.classList.contains('todo-list-sun-curr')) {
                    editedValue = editedValue + '.sun'
                }  
                todos.splice(todos.indexOf(todos[i]), 1, editedValue)
                localStorage.setItem('todosLastWeek', JSON.stringify(todos))              

            }))
        }
    })
   
    }   
    
}



function deleteCheck(e) {
    const item = e.target;
    // Delete todo
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        // animation when trash can clicked
        todo.classList.add('fall');
        // REMOVE FROM LOCAL STORAGE
        removeLocalTodos(todo);
        // add event listener so item removed after animation is complete
        todo.addEventListener('transitionend', function() {
            todo.remove();
            
        })
    }
    e.preventDefault

    // Checkmark completed
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed')
        
        // update local storage to show completed or to remove completed status        
        if(todo.classList.contains('completed')) {
            console.log(todo)
            todo.firstChild.setAttribute("readonly", "readonly")
            updateCompletedInLocalStorage(item)
        } else if (!todo.classList.contains('completed')) {
            todo.firstChild.removeAttribute("readonly", "readonly")
            removeCompletedInLocalStorage(item)
        }     
        
    }
}

function updateCompletedInLocalStorage(item) {
    // add this to local storage values so that on page reload, the completed items will still be marked completed
    let completedDay= ''
    let addDay = item.parentElement.parentElement
    if(addDay.classList.contains('todo-list-mon-curr')) {
        completedDay = '.monCompleted'
    } else if(addDay.classList.contains('todo-list-tues-curr')) {
        completedDay = '.tuesCompleted'
    } else if(addDay.classList.contains('todo-list-wed-curr')) {
        completedDay = '.wedCompleted'
    } else if(addDay.classList.contains('todo-list-thurs-curr')) {
        completedDay = '.thursCompleted'
    } else if(addDay.classList.contains('todo-list-fri-curr')) {
        completedDay = '.friCompleted'
    } else if(addDay.classList.contains('todo-list-sat-curr')) {
        completedDay = '.satCompleted'
    } else if(addDay.classList.contains('todo-list-sun-curr')) {
        completedDay = '.sunCompleted'
    }      

    let todos = JSON.parse(localStorage.getItem('todosLastWeek'))
    todos.forEach(function(completedTodo,i) {
        let matchItem = item.previousSibling.value
        let newTodo = completedTodo.substring(0,completedTodo.lastIndexOf('.'))
        if(matchItem === newTodo) {
        todos.splice(todos.indexOf(todos[i]), 1, newTodo + completedDay)}
        localStorage.setItem('todosLastWeek', JSON.stringify(todos))
      
        
    })
    
}

function removeCompletedInLocalStorage(item) {
    // add this to local storage values so that on page reload, the completed items will be UNMARKED completed
    let removeCompleted= ''
    let addDay = item.parentElement.parentElement
    if(addDay.classList.contains('todo-list-mon-curr')) {
        removeCompleted = '.mon'
    } else if(addDay.classList.contains('todo-list-tues-curr')) {
        removeCompleted = '.tues'
    } else if(addDay.classList.contains('todo-list-wed-curr')) {
        removeCompleted = '.wed'
    } else if(addDay.classList.contains('todo-list-thurs-curr')) {
        removeCompleted = '.thurs'
    } else if(addDay.classList.contains('todo-list-fri-curr')) {
        removeCompleted = '.fri'
    } else if(addDay.classList.contains('todo-list-sat-curr')) {
        removeCompleted = '.sat'
    } else if(addDay.classList.contains('todo-list-sun-curr')) {
        removeCompleted = '.sun'
    }      

    let todos = JSON.parse(localStorage.getItem('todosLastWeek'))
    todos.forEach(function(completedTodo,i) {
        let matchItem = item.previousSibling.value
        let newTodo = completedTodo.substring(0,completedTodo.lastIndexOf('.'))
        if(matchItem === newTodo) {
        todos.splice(todos.indexOf(todos[i]), 1, newTodo + removeCompleted)}
        localStorage.setItem('todosLastWeek', JSON.stringify(todos))
      
        
    })
    
}

function filterTodo(e) {
    const todos = [todoListMonCurr,todoListTuesCurr,todoListWedCurr,todoListThursCurr,todoListFriCurr,todoListSatCurr,todoListSunCurr]

    const todosMonCurr = todos[0].childNodes
    const todosTuesCurr = todos[1].childNodes
    const todosWedCurr = todos[2].childNodes
    const todosThursCurr = todos[3].childNodes
    const todosFriCurr = todos[4].childNodes
    const todosSatCurr = todos[5].childNodes
    const todosSunCurr = todos[6].childNodes

    

    const allTodosCurr = [todosMonCurr,todosTuesCurr,todosWedCurr,todosThursCurr,todosFriCurr,todosSatCurr,todosSunCurr]  
    
    // because childNodes is an array, we need to have a forEach loop for both allTodosCurr and each element inside of that array
    
    allTodosCurr.forEach(element => element.forEach(function (todo) { 
        const todoStyle = todo.style;  
        if(todoStyle != undefined && todoStyle != null){
            switch (e.target.value) {
                // we gave the options 'all', 'completed', and 'uncompleted' a value in html (which matches their name).  this is what we are looking for in the below switch.
                case "all":
                    todoStyle.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains('completed')) {
                        todoStyle.display = 'flex';
                    } else {
                        todoStyle.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (todo.classList.contains('completed')){
                        todoStyle.display = 'none';
                    }
                    else{
                        todoStyle.display = "flex";
                    }
                    break;
            }
        }
    }))
}
            // target is targeting the option and value is getting value of all, completed or uncompleted     


function saveLocalTodos(todo) {
    
    let todos;
    if (localStorage.getItem('todosLastWeek') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todosLastWeek'))
    }
    todos.push(todo);
    // todo = todo input value (todoInput.value) which was declared in the addTodoThisWeek function, which is where saveLocalTodos is called
    localStorage.setItem('todosLastWeek', JSON.stringify(todos))

}



// receive todo as parameter because we are going to call this function inside of the function addTodo so that when we add a todo, we are also adding it to local storage.

// to check to see if we already have a todos in our local storage - create variable todos then write the if statement.  if statement says that if there is nothing in todos, create empty array

// else statement says that if there is already something in localstorage, we're going to take it back and put it into an array (parse it back into an array).  in other words - if we have an array, we are going to push in a new todo to it

// next we grab the todos and push into the todo.  the thing that we are passing into the paramater todo is being pushed into the todos array

// last we set todos back into local storage

function getTodos() {    
    
    let todos;
    if (localStorage.getItem('todosLastWeek') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todosLastWeek'));
    }
   
    todos.forEach(function(todo) {
    // create Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    if (todo.endsWith('.monCompleted') || todo.endsWith('.tuesCompleted') || todo.endsWith('.wedCompleted') || todo.endsWith('.thursCompleted') || todo.endsWith('.friCompleted') || todo.endsWith('.satCompleted') || todo.endsWith('.sunCompleted')) {
        todoDiv.classList.add('completed')
    }
    // create input
    
    const newTodo = document.createElement('input');
    newTodo.setAttribute('type', 'text');
    newTodo.setAttribute('value', todo.substring(0,todo.lastIndexOf('.')));
    // remove .day from end of inner text
       
    
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // Start time button
    const startTime = document.createElement('button');
    startTime.innerText = 'Start'
    
    startTime.classList.add('start-btn');
    todoDiv.appendChild(startTime);
    // End time button
    const endTime = document.createElement('button');
    endTime.innerText = 'End';
    endTime.classList.add('end-btn');
    todoDiv.appendChild(endTime);    
       // Checkmark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    // trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    // APPEND TO UL
    if (todo.endsWith('.mon') || todo.endsWith('.monCompleted')) {
    todoListMonCurr.appendChild(todoDiv)
    } else if (todo.endsWith('.tues') || todo.endsWith('.tuesCompleted')) {
        todoListTuesCurr.appendChild(todoDiv)
    } else if (todo.endsWith('.wed') || todo.endsWith('.wedCompleted')) {
        todoListWedCurr.appendChild(todoDiv)
    } else if (todo.endsWith('.thurs' || todo.endsWith('.thursCompleted'))) {
        todoListThursCurr.appendChild(todoDiv)
    } else if (todo.endsWith('.fri' || todo.endsWith('.friCompleted'))) {
        todoListFriCurr.appendChild(todoDiv)
    } else if (todo.endsWith('.sat') || todo.endsWith('.satCompleted')) {
        todoListSatCurr.appendChild(todoDiv)
    } else if (todo.endsWith('.sun') || todo.endsWith('.sunCompleted')) {
        todoListSunCurr.appendChild(todoDiv)
    }
  
    
    })


}

// first check to see if there is anything in local storage. 

// if nothing in local storage, create empty array

// if something in local storage, get it back by adding it to todos array

// next we loop over each todo in the todos array and recreate the code from addTodo  (from create todo div to append to ul) with these changes:  change newTodo.innerText to todo because we are now taking this value from local storage.  delete save to local storage line.

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todosLastWeek') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todosLastWeek'));
    }
    console.log(todos)
      
    let todoIndex = todo.children[0].value;
    console.log(todoIndex)
    console.log(todo.parentElement)
    if (todo.parentElement.classList.contains('todo-list-mon-curr')) {
        todoIndex = todoIndex + '.mon'
    } else if (todo.parentElement.classList.contains('todo-list-tues-curr')) {
        todoIndex = todoIndex + '.tues'
    } else if (todo.parentElement.classList.contains('todo-list-wed-curr')) {
        todoIndex = todoIndex + '.wed'
    } else if (todo.parentElement.classList.contains('todo-list-thurs-curr')) {
        todoIndex = todoIndex + '.thurs'
    } else if (todo.parentElement.classList.contains('todo-list-fri-curr')) {
        todoIndex = todoIndex + '.fri'
    } else if (todo.parentElement.classList.contains('todo-list-sat-curr')) {
        todoIndex = todoIndex + '.sat'
    } else if (todo.parentElement.classList.contains('todo-list-sun-curr')) {
        todoIndex = todoIndex + '.sun'
    } 
    // if(todo.previousSibling.classList.contains('completed')) {
    //     todoIndex = todoIndex + '.completed'

    // }   
   
    todos.splice(todos.indexOf(todoIndex), 1);
    
    localStorage.setItem('todosLastWeek', JSON.stringify(todos));
    
   

}



// first check to see if there are any todos. 

// if there is something in local storage, we need to remove it. we need to remove the position of the element that we're clicking on.  so if we delete the first list item, we need to remove the first list item from the local storage array.  we have to get the index of the element that we want to remove.

// todoIndex drills down to the text inside the todo in local storage   

// todos.splice removes the todo from the local storage array

// localStorage.setItem is to set back to local storage after the todo is removed from the array.


// summary - when we click on the trash button, we are actually clicking on (accessing) the div (the todo).  the todo is the div.  then we need to navigate down to the text inside the div/input field because this is what is stored in local storage.  we need to do this so we can find the index of the text in local storage, then remove it from the local storage array using the splice method.  





