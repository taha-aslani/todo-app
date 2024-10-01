document.getElementById("submittodo").addEventListener("click", function(event){
    var todo_text = document.getElementById("inputtodo").value;
    console.log(todo_text);
    showTodo('s')
})

var todos = [
    {
        id: 1,
        text: "hello world!",
        isDone: false,
        importance: "low"
    }
];

function addTodo(object){
    document.getElementById("empty").style.display = "none";
    todos.push({
        id: object.id,
        text: object.text,
        isDone: object.isDone,
        importance: object.importance
    });
    setCookie("todos", JSON.stringify(todos), 1);
}

function removeTodo(object){
    document.getElementById("todolist").innerHTML = "";
    showEmpty();
}

function showTodo(object){
    document.getElementById("todolist").innerHTML = "";
    todos.forEach((todo) => {
        let nDiv = document.createElement("div");
        nDiv.innerHTML = `${todo.id} , ${todo.text} , ${todo.importance} , ${todo.isDone}`
        document.getElementById("todolist").appendChild(nDiv)
    });
}

function getTodos(object){

}

function showEmpty(){
    let emptySpan = document.createElement("div");
    emptySpan.id = "empty";
    emptySpan.classList.add("empty-todo");
    emptySpan.innerText = "there is nothing to show here!";
    document.getElementById("todolist").appendChild(emptySpan);
}


// cookies

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
  
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}