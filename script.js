// Получаем элементы
const inputField = document.querySelector('#todo-form input[type="text"]');
const addButton = document.getElementById('input-button');
const listContainer = document.getElementById('list-container');
const completedCounter = document.getElementById('completed-counter');
const uncompletedCounter = document.getElementById('uncompleted-counter');

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

    inputField.value = '';
    updateCounters();
}

// Пример добавления задачи
// addButton.addEventListener('click', () => {
//     addTask();
// });

// Пример добавление задачи
addTask("Купить молоко");
addTask("Позвонить маме");

// Слушатель для добавления новой задачи
addButton.addEventListener('click', () => {
    const taskText = inputField.value.trim();
    if (taskText !== '') {
        addTask(taskText);
    }
    inputField.value = ''; // Очистить поле ввода
});