const addTodoBtn = document.getElementById('add-todo-button');
const newTodoInput = document.getElementById('todo-input');
const todoListWrapper = document.getElementById('todo-list-wrapper');
const todoItem = document.getElementById('label')

const todos = [
    {
        id: 1,
        task: 'Call the dentist',
        completed: false,
    },
    {
        id: 2,
        task: 'Book flight tickets',
        completed: true,
    },
];

addTodoBtn.addEventListener('click', () => {
    newTodoInput.value !== '' &&
        todos.push({
            id: 3,
            task: newTodoInput.value,
            completed: false,
        });
    resetTodo();
    createTodo();
    newTodoInput.value = '';
});

todoListWrapper.addEventListener('click', (event) => {
    toggleTodo(event.target.id)
})

const createTodo = () => {
    todos &&
        todos.map(todo => {
            const li = document.createElement('li');
            li.classList.add('todo-list');
            const label = document.createElement('label');
            label.classList.add('checkbox');
            const input = document.createElement('input');
            input.setAttribute('type', 'checkbox');
            input.setAttribute('name', 'todo-checkbox');
            input.setAttribute('id', `todo-checkbox${todo.id}`);
            todo.completed && input.setAttribute('checked', '');
            const textSpan = document.createElement('span');
            textSpan.classList.add('todo-text');
            textSpan.textContent = todo.task;
            const strike = document.createElement('s');
            strike.classList.add('todo-text');
            strike.textContent = todo.task;
            const deleteIcon = document.createElement('span');
            deleteIcon.classList.add('todo-delete');
            deleteIcon.setAttribute('id', 'delete-todo');
            deleteIcon.textContent = 'x';
            label.append(input, todo.completed ? strike : textSpan);
            li.append(label, deleteIcon);
            todoListWrapper.appendChild(li);
        });
};

createTodo();

const resetTodo = () => {
    const list = document.querySelectorAll('li');
    list && list.forEach(li => todoListWrapper.removeChild(li));
};

const toggleTodo = (id) => {
    if (id) {
        console.log(id)
        const list = document.querySelectorAll('li')
    }
}