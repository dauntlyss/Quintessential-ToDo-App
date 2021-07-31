const inputBox = document.querySelector(".inputfield input");
const addBtn = document.querySelector(".inputfield button");
const todoList = document.querySelector(".todoList");
const trashBtn = document.getElementsByClassName("fa-trash");
const clearAllBtn = document.querySelector(".footer button");

//Change the look of the add button if nothing is in the taskfield
inputBox.onkeyup = function() {
    let userData = inputBox.value;
    if (userData.trim() != 0) {
        addBtn.classList.add("active");
    } else {
        addBtn.classList.remove("active");
    }
}

//recalling showTasks for ever load
showTasks();

//eventHandler for when the user clicks the add button
addBtn.addEventListener('click', function() {
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Task");
    if (getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage); //transforming the string into a JavaScript object
    }
    listArr.push(userData);
    localStorage.setItem("New Task", JSON.stringify(listArr)); //transforming the object back to a strong
    showTasks();
})

todoList.addEventListener('keypress', function(e) {
    if (e.key == 'Enter') {
        let userData = inputBox.value;
        let getLocalStorage = localStorage.getItem("New Task");
        if (getLocalStorage == null) {
        listArr = [];
        } else {
        listArr = JSON.parse(getLocalStorage); //transforming the string into a JavaScript object
        }
        listArr.push(userData);
        localStorage.setItem("New Task", JSON.stringify(listArr)); //transforming the object back to a strong
        showTasks();    
    } 
})

//adds tasks to the ul
function showTasks() {
    let getLocalStorage = localStorage.getItem("New Task");
    if (getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage); //transforming the string into a JavaScript object
    }
    if (listArr.length > 0) {
        clearAllBtn.classList.add("active");
    } else {{
        clearAllBtn.classList.remove("active");
    }}
    const pendingNumber = document.querySelector(".pendingNumber");
    pendingNumber.innerText = listArr.length;
    let newLitag = '';
    listArr.forEach((element, index) => {
        newLitag += `<li>${element} <span onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLitag;
    inputBox.value = "";
 }

 //deletes tasks
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Task");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);
    localStorage.setItem("New Task", JSON.stringify(listArr)); 
    showTasks();
}

//delete all button function
clearAllBtn.addEventListener('click', function() {
    listArr = [];
    localStorage.setItem("New Task", JSON.stringify(listArr));
    showTasks();
})