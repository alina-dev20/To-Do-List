// Получаем элементы
const inputField = document.querySelector('#todo-form input[type="text"]');
const addButton = document.getElementById('input-button');
const listContainer = document.getElementById('list-container');
const completedCounter = document.getElementById('completed-counter');
const uncompletedCounter = document.getElementById('uncompleted-counter');

// Функция обновления счётчиков
function updateCounters() {
    const tasks = document.querySelectorAll('#list-container li');
    let completed = 0;
    let uncompleted = 0;

    tasks.forEach(task => {
        const checkbox = task.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            completed++;
        } else {
            uncompleted++;
        }
    });

    completedCounter.textContent = completed;
    uncompletedCounter.textContent = uncompleted;
}

// Функция добавления задачи
function addTask() {
    const taskText = inputField.value.trim();
    if (taskText === '') return;

    // Создание элементов
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    const span = document.createElement('span');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    checkbox.type = 'checkbox';
    span.textContent = taskText;
    span.style.marginLeft = '10px';

    // Кнопка "Edit" (карандаш)
    editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    editButton.style.backgroundColor = 'white';
    editButton.style.border = 'none';
    editButton.style.cursor = 'pointer';
    editButton.style.marginLeft = '10px';
    editButton.style.padding = '5px 8px';
    editButton.style.borderRadius = '5px';

    // Кнопка "Delete" (крестик)
    deleteButton.innerHTML = '<i class="fas fa-times"></i>';
    deleteButton.style.backgroundColor = 'white';
    deleteButton.style.border = 'none';
    deleteButton.style.cursor = 'pointer';
    deleteButton.style.marginLeft = '10px';
    deleteButton.style.padding = '5px 8px';
    deleteButton.style.borderRadius = '5px';

    // Событие при смене состояния чекбокса
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            span.style.textDecoration = 'line-through';
            span.style.color = 'gray';
        } else {
            span.style.textDecoration = 'none';
            span.style.color = '';
        }
        updateCounters();
    });

    // Событие для кнопки "Edit" (редактировать задачу)
    editButton.addEventListener('click', () => {
        const newText = prompt('Edit task:', span.textContent);
        if (newText !== null && newText.trim() !== '') {
            span.textContent = newText.trim();
            updateCounters();
        }
    });

    // Событие для кнопки "Delete" (удалить задачу)
    deleteButton.addEventListener('click', () => {
        listContainer.removeChild(listItem);
        updateCounters();
    });

    // Добавление элементов в список
    listItem.appendChild(checkbox);
    listItem.appendChild(span);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    listContainer.appendChild(listItem);

    inputField.value = '';
    updateCounters();
}