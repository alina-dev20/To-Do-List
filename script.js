// Получаем элементы DOM 
const inputField = document.querySelector('#todo-form input[type="text"]'); //inputField: это поле ввода для добавления задачи.
const addButton = document.getElementById('input-button'); //addButton: кнопка для добавления новой задачи
const listContainer = document.getElementById('list-container'); //listContainer: контейнер для списка задач.
const completedCounter = document.getElementById('completed-counter'); //completedCounter и uncompletedCounter: элементы для отображения количества выполненных и невыполненных задач.
const uncompletedCounter = document.getElementById('uncompleted-counter');

// Модальное окно для редактирования
const modal = document.createElement('div'); //modal: это само модальное окно, которое будет отображаться поверх страницы.
const modalContent = document.createElement('div'); //modalContent: контейнер для содержимого модального окна.
const modalInput = document.createElement('input'); //modalInput: поле ввода для редактирования текста задачи.
const modalSaveButton = document.createElement('button'); //modalSaveButton и modalCloseButton: кнопки для сохранения изменений и закрытия модального окна.
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
modalSaveButton.style.backgroundColor = '#8a2be2'; // Фиолетовый цвет фона
modalSaveButton.style.color = 'white'; // Белый цвет текста
modalSaveButton.style.padding = '12px 24px'; // Отступы внутри кнопки
modalSaveButton.style.border = 'none'; // Убираем стандартную границу
modalSaveButton.style.borderRadius = '5px'; // Скругляем углы
modalSaveButton.style.cursor = 'pointer'; // Курсор в виде руки при наведении
modalSaveButton.style.transition = 'background-color 0.3s ease'; // Плавное изменение фона при наведении

// Эффект при наведении для кнопки "Save"
modalSaveButton.addEventListener('mouseover', () => {
    modalSaveButton.style.backgroundColor = '#5f1eb0';  // Темный фиолетовый при наведении
});
modalSaveButton.addEventListener('mouseout', () => {
    modalSaveButton.style.backgroundColor = '#8a2be2';  // Исходный фиолетовый цвет кнопки
});

// Стиль для кнопки "Close"
modalCloseButton.textContent = 'Close';
modalCloseButton.style.backgroundColor = '#e74c3c'; // Красный цвет фона
modalCloseButton.style.color = 'white'; // Белый цвет текста
modalCloseButton.style.padding = '12px 24px'; // Отступы внутри кнопки
modalCloseButton.style.border = 'none'; // Убираем стандартную границу
modalCloseButton.style.borderRadius = '5px'; // Скругляем углы
modalCloseButton.style.cursor = 'pointer'; // Курсор в виде руки при наведении
modalCloseButton.style.transition = 'background-color 0.3s ease'; // Плавное изменение фона при наведении

// Эффект при наведении для кнопки "Close"
modalCloseButton.addEventListener('mouseover', () => {
    modalCloseButton.style.backgroundColor = '#c0392b';  // Темный красный при наведении
});
modalCloseButton.addEventListener('mouseout', () => {
    modalCloseButton.style.backgroundColor = '#e74c3c';  // Исходный красный цвет кнопки
});

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
addButton.addEventListener('click', () => {
    addTask();
});