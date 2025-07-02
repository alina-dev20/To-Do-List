// Получаем элементы DOM 
const inputField = document.querySelector('#todo-form input[type="text"]'); 
const addButton = document.getElementById('input-button');
const listContainer = document.getElementById('list-container');
const completedCounter = document.getElementById('completed-counter');
const uncompletedCounter = document.getElementById('uncompleted-counter');
const categoryFilter = document.getElementById('category-filter');

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
modal.style.backgroundColor = 'rgba(255, 255, 255, 0.106)';
modal.style.justifyContent = 'center';
modal.style.alignItems = 'center';
modal.style.zIndex = '9999';

modalContent.style.backgroundColor = '#a46fd6';
modalContent.style.padding = '40px';
modalContent.style.borderRadius = '10px';
modalContent.style.textAlign = 'center';

modalSaveButton.textContent = 'Save';
modalSaveButton.style.backgroundColor = '#8a2be2'; 
modalSaveButton.style.color = 'white'; 
modalSaveButton.style.padding = '12px 24px'; 
modalSaveButton.style.border = 'none'; 
modalSaveButton.style.borderRadius = '5px'; 
modalSaveButton.style.cursor = 'pointer'; 
modalSaveButton.style.transition = 'background-color 0.3s ease';

modalSaveButton.addEventListener('mouseover', () => {
    modalSaveButton.style.backgroundColor = '#5f1eb0'; 
});
modalSaveButton.addEventListener('mouseout', () => {
    modalSaveButton.style.backgroundColor = '#8a2be2'; 
});

modalCloseButton.textContent = 'Close';
modalCloseButton.style.backgroundColor = '#e74c3c'; 
modalCloseButton.style.color = 'white'; 
modalCloseButton.style.padding = '12px 24px'; 
modalCloseButton.style.border = 'none'; 
modalCloseButton.style.borderRadius = '5px'; 
modalCloseButton.style.cursor = 'pointer'; 
modalCloseButton.style.transition = 'background-color 0.3s ease';

modalCloseButton.addEventListener('mouseover', () => {
    modalCloseButton.style.backgroundColor = '#c0392b'; 
});
modalCloseButton.addEventListener('mouseout', () => {
    modalCloseButton.style.backgroundColor = '#e74c3c'; 
});

modalInput.style.width = '100%';
modalInput.style.padding = '10px';
modalInput.style.marginBottom = '10px';

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

    // Получаем категорию и теги
    const category = document.getElementById('category-select').value;
    const tags = document.getElementById('tags-input').value.trim().split(',').map(tag => tag.trim());

    // Создание элементов
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    const span = document.createElement('span');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const categorySpan = document.createElement('span');
    const tagsSpan = document.createElement('span');

    checkbox.type = 'checkbox';
    span.textContent = taskText;
    span.style.marginLeft = '10px';

    categorySpan.textContent = `Категория: ${category}`;
    categorySpan.style.marginLeft = '10px';
    
    tagsSpan.textContent = `Теги: ${tags.join(', ')}`;
    tagsSpan.style.marginLeft = '10px';

    // Добавляем класс для категории
    categorySpan.classList.add('category');

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
    listItem.appendChild(categorySpan);
    listItem.appendChild(tagsSpan);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    listContainer.appendChild(listItem);

    inputField.value = '';
    updateCounters();
}

// Фильтрация задач по категории
categoryFilter.addEventListener('change', () => {
    const selectedCategory = categoryFilter.value;
    const tasks = document.querySelectorAll('#list-container li');
    tasks.forEach(task => {
        const taskCategory = task.querySelector('.category').textContent;
        if (selectedCategory === 'all' || taskCategory.includes(selectedCategory)) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
});

// Пример добавления задачи
addButton.addEventListener('click', () => {
    addTask();
});
