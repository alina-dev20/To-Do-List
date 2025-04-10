// Получаем элементы
const inputField = document.querySelector('#todo-form input[type="text"]');
const addButton = document.getElementById('input-button');
const listContainer = document.getElementById('list-container');
const completedCounter = document.getElementById('completed-counter');
const uncompletedCounter = document.getElementById('uncompleted-counter');
const filterButton = document.getElementById('filter-priority'); // Кнопка для фильтрации по приоритету

// Модальное окно для редактирования
const modal = document.createElement('div');
const modalContent = document.createElement('div');
const modalInput = document.createElement('input');
const modalSaveButton = document.createElement('button');
const modalCloseButton = document.createElement('button');

// Стиль для модального окна
modal.style.display = 'none';
modal.style.position = 'fixed';
modal.style.top = '0';
modal.style.left = '0';
modal.style.width = '100%';
modal.style.height = '100%';
modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
modal.style.justifyContent = 'center';
modal.style.alignItems = 'center';
modal.style.zIndex = '9999';

modalContent.style.backgroundColor = 'white';
modalContent.style.padding = '20px';
modalContent.style.borderRadius = '5px';
modalContent.style.textAlign = 'center';

modalInput.style.width = '100%';
modalInput.style.padding = '10px';
modalInput.style.marginBottom = '10px';

modalSaveButton.textContent = 'Save';
modalSaveButton.style.marginRight = '10px';
modalCloseButton.textContent = 'Close';

// Добавляем элементы в модальное окно
modalContent.appendChild(modalInput);
modalContent.appendChild(modalSaveButton);
modalContent.appendChild(modalCloseButton);
modal.appendChild(modalContent);
document.body.appendChild(modal);

// Массив для хранения задач
let tasks = [];

// Функция обновления счётчиков
function updateCounters() {
    const completed = tasks.filter(task => task.completed).length;
    const uncompleted = tasks.length - completed;
    
    completedCounter.textContent = completed;
    uncompletedCounter.textContent = uncompleted;
}

// Функция добавления задачи
function addTask(priority = 'Medium') {
    const taskText = inputField.value.trim();
    if (taskText === '') return;

    const task = {
        text: taskText,
        priority: priority,
        completed: false
    };

    // Создание элементов
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    const span = document.createElement('span');
    const editButton = document.createElement('button');
    
    const deleteButton = document.createElement('button'); 

    checkbox.type = 'checkbox';
    span.textContent = taskText;
    span.style.marginLeft = '10px';

    // Добавляем приоритет
    listItem.classList.add(priority.toLowerCase());  // Добавляем класс для приоритета
    listItem.dataset.priority = priority;

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
        task.completed = checkbox.checked;
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
        modal.style.display = 'flex'; // Открыть модальное окно
        modalInput.value = span.textContent; // Заполняем поле текущим текстом задачи

        modalSaveButton.addEventListener('click', () => {
            const newText = modalInput.value.trim();
            if (newText !== '') {
                span.textContent = newText;
                modal.style.display = 'none'; // Закрываем модальное окно
                updateCounters();
            }
        });

        modalCloseButton.addEventListener('click', () => {
            modal.style.display = 'none'; // Закрыть модальное окно без изменений
        });
    });

    // Событие для кнопки Delete (удалить задачу)
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

    tasks.push(task);  // Добавляем задачу в массив
    updateCounters();
}

// Сортировка задач по приоритету
function sortTasksByPriority() {
    const sortedTasks = [...tasks].sort((a, b) => {
        const priorities = ['High', 'Medium', 'Low'];
        return priorities.indexOf(b.priority) - priorities.indexOf(a.priority);
    });

    listContainer.innerHTML = ''; // Очищаем текущий список

    sortedTasks.forEach(task => addTask(task.priority));  // Добавляем задачи в отсортированном порядке
}
// Фильтрация задач по приоритету
function filterHighPriorityTasks() {
    const highPriorityTasks = tasks.filter(task => task.priority === 'High');
    listContainer.innerHTML = ''; // Очищаем текущий список

    highPriorityTasks.forEach(task => addTask(task.priority));  // Добавляем только высокоприоритетные задачи
}

// Слушатель для добавления новой задачи
addButton.addEventListener('click', () => {
    const taskText = inputField.value.trim();
    if (taskText !== '') {
        const priority = document.querySelector('input[name="priority"]:checked')?.value || 'Medium';  // Получаем выбранный приоритет
        addTask(priority);
    }
    inputField.value = ''; // Очистить поле ввода
});

// Пример добавления задач
addTask("Купить молоко", "High");
addTask("Позвонить маме", "Low");

// Слушатель для фильтрации по высокому приоритету
filterButton.addEventListener('click', filterHighPriorityTasks);

// Пример сортировки задач по приоритету
sortTasksByPriority();