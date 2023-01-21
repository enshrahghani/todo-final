import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-analytics.js";
import { getDatabase, push, set, ref, onValue, update, remove } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDSKKwI5fR0sPB1ExgHP8HS6PugEK5scYM",
    authDomain: "todo-connected-with-database.firebaseapp.com",
    projectId: "todo-connected-with-database",
    storageBucket: "todo-connected-with-database.appspot.com",
    messagingSenderId: "159771918538",
    appId: "1:159771918538:web:a69fcfa6f0daa6e5c13433",
    measurementId: "G-RWBXB8GE2Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const Db = getDatabase()

//FIreBase Khtm//


window.add = function () {
    var obj = {
        todo: document.getElementById('a').value
    }

    var Userref = push(ref(Db, 'Todos/'))
    obj.id = Userref.key

    set(Userref, obj)
}


window.get = function () {
    var render = document.getElementById('render')

    onValue(ref(Db, 'Todos/'), function (todo) {
        render.innerHTML = ""
        var Todos = Object.values(todo.val())
        for (var i = 0; i < Todos.length; i++) {
            var app = Todos[i]
            console.log(app.todo)
            render.innerHTML += `
            <li> <h3 class="ms-3 pt-4">${app.todo}
            <span class="d-flex flex-row-reverse">
            <button onclick="TodoUpdate('${app.id}')" class="btn bg-warning text-black mx-2 p-2 px-5 text-light">EDIT</button>
            <button onclick="Tododel('${app.id}')" class="btn bg-info text-black text-center p-2 px-5  text-light">DELETE</button> 
            </span>
            </h3> </li> <br/>`
        }
        var a = document.getElementById('a').value = ""

    })
}
get()
window.Tododel = function (id) {
    remove(ref(Db, `Todos/${id}`))
}
window.deleteAll = function (id) {
    remove(ref(Db, `Todos/`))
}

window.TodoUpdate = function (id) {
    // console.log(id);
    var NewTodo = prompt('Enter Update')

    update(ref(Db, `Todos/${id}`), {
        todo: NewTodo
    })
}
