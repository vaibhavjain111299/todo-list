const todoInput = document.getElementById("todo-input");
//const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const selectedValue = document.getElementById("priority-select");
const description = document.getElementById("description");
const lastDate = document.getElementById("due-date");
const addButton = document.getElementById("new-task");
const formContainer = document.querySelector(".form");
const submitInput = document.querySelector('input[type="submit"]');
const overlay = document.getElementById("overlay");
const closeButton = document.querySelector(".close");
const newTaskForm = document.querySelector("[data-new-task-form]");
let formOpen = false;

document.addEventListener("DOMContentLoaded", closeForm);
submitInput.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
document.addEventListener("DOMContentLoaded", getTodos);

function openOrCloseForm() {

    if (formOpen) {
        formContainer.style.pointerEvents = "none";
        formContainer.style.transform = "scale(0)";
        overlay.style.opacity = 0;
        formOpen = false;

    } else {
        submitInput.value = "submit";
        formContainer.style.pointerEvents = "auto";
        formContainer.style.transform = "scale(1)";
        overlay.style.opacity = 1;
        formOpen = true;
    }
}

addButton.addEventListener("click", () => {
    newTaskForm.reset();
    openOrCloseForm();
});


function closeForm() {
    formContainer.style.transform = "scale(0)";
    overlay.style.opacity = 0;
    formOpen = false;
}

closeButton.addEventListener("click", () => {
    closeForm();
});



function addTodo(e) {


    e.preventDefault();
    const todoLi = document.createElement("li");
    todoLi.classList.add("todo-li");

    if ((todoInput.value && lastDate.value && description.value) === "") {
    } else {

        const priorityButton = document.createElement("button");
        if (selectedValue.value === "High") {
            priorityButton.classList.add("priority-btn-red");
        }
        else if (selectedValue.value === "Medium") {
            priorityButton.classList.add("priority-btn-yellow");
        }
        else {
            priorityButton.classList.add("priority-btn-green");
        }
        todoLi.appendChild(priorityButton);

        const newTodo = document.createElement("h3");
        newTodo.innerText = todoInput.value;
        newTodo.classList.add("todo-item");
        todoLi.appendChild(newTodo);

        const dueDate = document.createElement("p");
        dueDate.innerText = lastDate.value;
        dueDate.classList.add("due-date-todo");
        todoLi.appendChild(dueDate);

        const desc = document.createElement("p");
        desc.classList.add("desc-todo");
        desc.innerText = description.value;
        todoLi.appendChild(desc);

        saveLocalTodos(todoInput.value, lastDate.value, description.value, selectedValue.value);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add("complete-btn");
        todoLi.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        trashButton.classList.add("trash-btn");
        todoLi.appendChild(trashButton);

        todoList.appendChild(todoLi);

        todoInput.value = "";
        description.value = "";
        lastDate.value = "";

        closeForm();
    }
}

function deleteTodo(e) {
    item = e.target;

    //deleting to-do
    if (item.classList[0] === "trash-btn") {
        todo = item.parentElement;
        removeLocalTodos(todo);
        todo.remove();
    }

    //checking to-do
    if (item.classList[0] === "complete-btn") {
        todo = item.parentElement;
        todo.classList.toggle("completed");
    }

}

function saveLocalTodos(taskName, dueDate, description, priority) {
    let subTodos = [];
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(subTodos);
    subTodos.push(taskName, dueDate, description, priority);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    let todoName = todo.children[1].innerText;
    let todoDueDate = todo.children[2].innerText;

    for (let i = 0; i < todos.length; i++) {
        if (todos[i][0] == todoName && todos[i][1] == todoDueDate) {
            todos.splice(i, 1);
        }
    }
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    console.log(todos);

    todos.forEach(function (todo) {

        const todoLi = document.createElement("li");
        todoLi.classList.add("todo-li");


        const priorityButton = document.createElement("button");

        if (todo[3] === "High") {
            priorityButton.classList.add("priority-btn-red");
        }
        else if (todo[3] === "Medium") {
            priorityButton.classList.add("priority-btn-yellow");
        }
        else {
            priorityButton.classList.add("priority-btn-green");
        }
        todoLi.appendChild(priorityButton);

        const newTodo = document.createElement("h3");
        newTodo.innerText = todo[0];
        newTodo.classList.add("todo-item");
        todoLi.appendChild(newTodo);


        const dueDate = document.createElement("p");
        dueDate.innerHTML = todo[1];
        dueDate.classList.add("due-date-todo");
        todoLi.appendChild(dueDate);


        const desc = document.createElement("p");
        desc.classList.add("desc-todo");
        desc.innerText = todo[2];
        todoLi.appendChild(desc);


        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add("complete-btn");
        todoLi.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        trashButton.classList.add("trash-btn");
        todoLi.appendChild(trashButton);

        todoList.appendChild(todoLi);

    });


}



