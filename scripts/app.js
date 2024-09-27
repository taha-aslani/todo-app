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
}

function removeTodo(object){
    document.getElementById("empty").style.display = "block";
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