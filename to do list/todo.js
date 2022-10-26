const taskInput = document.querySelector(".task-input input");
filters = document.querySelectorAll(".filters span"),
clearAll = document.querySelector(".clear-btn")
taskBox = document.querySelector(".task-box");

let editId;
let isEditedTask = false;
let todos = JSON.parse(localStorage.getItem("todo-list"));     //getting local storage todo-list

filters.forEach(btn =>{
    btn.addEventListener("click",()=>{
        //console.log(btn);
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

function showTodo(filters){
    let li="";
    if(todos){
        todos.forEach((todo,id)=>{
            //console.log(id,todo);
            let isCompleted = todo.status=="completed" ? "checked" :"";          //if todo is completed then set iscompleted to checked
            if(filters==todo.status || filters=="all"){
                li +=  `<li class="task">
                        <label for="${id}">
                            <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                            <p class=${isCompleted}>${todo.name}</p>
                        </label>
                        <div class="settings">
                            <i onclick ="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                            <ul class="task-menu">
                            <li onclick ="editTask(${id},'${todo.name}')"><i class="fa-regular fa-pen-to-square"></i>Edit</li>
                            <li onclick ="deleteTask(${id})"><i class="fa-regular fa-trash-can"></i>Delete</li>
                            </ul>
                        </div>
                    </li>`;
            }
            
        });
    }
    
    taskBox.innerHTML = li || `<span>You don't have any task here!</span>`;                   //if li isnt empty insert this value  inside taskbar else insert span

}
showTodo("all");

function deleteTask(deleteId){
    //console.log(deleteId);
    todos.splice(deleteId,1);         //removing selected tasks from arr/todos
    localStorage.setItem("todo-list",JSON.stringify(todos));
    showTodo("all");
}

clearAll.addEventListener("click",()=>{
     todos.splice(0,todos.length);         //removing all tasks from arr/todos
     localStorage.setItem("todo-list",JSON.stringify(todos));
     showTodo("all");
});

function showMenu(selected){
    //console.log(selected);
    let taskMenu = selected.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click",e=>{
        //removing show class from the task menu on the document click
        if(e.target.tagName!="I" || e.target!=selected){
            taskMenu.classList.remove("show");
        }
    });
}

function editTask(taskId,taskName){
    //console.log(taskId,taskName);
    taskInput.value = taskName;
    isEditedTask = true;
    editId = taskId;
}

function updateStatus(selected){
    //console.log(selected);
    let taskName = selected.parentElement.lastElementChild;         //getting paragraph that contains task name
    if(selected.checked){
        taskName.classList.add("checked");
        todos[selected.id].status="completed";    //updating status to completed,if selected
    }
    else{
        taskName.classList.remove("checked");
        todos[selected.id].status="pending";
    }
    localStorage.setItem("todo-list",JSON.stringify(todos));
}

taskInput.addEventListener("keyup",e => {
    let userTask = taskInput.value.trim();            //trim-prevents from submitting empty values
    if(e.key == "Enter" && userTask){
        //console.log(userTask)
        if(!isEditedTask){
            //if edited task isnt true
            if(!todos){
                todos=[];         //if todos dont exist pass an empyt array to todos
            }
            let taskInfo = {name: userTask,status:"pending"};
            todos.push(taskInfo);    //adding new task to todos
        }
        else{
            todos[editId].name=userTask;
            isEditedTask = false;
        }
       
        taskInput.value="";
        localStorage.setItem("todo-list",JSON.stringify(todos));
        showTodo("all");
    }
});