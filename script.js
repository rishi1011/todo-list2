const form = document.getElementById('form');
const input = form.querySelector('input');
const todoList = form.querySelector('ul.list');

const todos = JSON.parse(localStorage.getItem('todoList'));

if (todos) {
    todos.forEach(todo => addTodo(todo));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    addTodo();

    input.value = '';
});

function addTodo(todo) {
    let todoText = input.value;

    if (todo) todoText = todo.text;

    if (!todoText) return;

    const li = document.createElement('li');
    li.innerText = todoText;

    if (todo && todo.completed) {
        li.classList.add('completed');
    }

    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        updateLS();
    });

    li.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        e.target.remove();
        updateLS();
    })

    todoList.appendChild(li);

    updateLS();
}

function updateLS() {
    const todoEls = document.querySelectorAll('.list > li');

    const todos = [];

    todoEls.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed'),
        });
    });

    localStorage.setItem('todoList', JSON.stringify(todos));
}

