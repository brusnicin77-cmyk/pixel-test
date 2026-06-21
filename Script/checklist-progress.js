document.addEventListener('DOMContentLoaded', () => {
    // Находим все чеклисты на странице
    const checklists = document.querySelectorAll('.check__boxes');

    checklists.forEach((list) => {
        // Получаем уникальный ID этого чеклиста (например, "list-1")
        const listId = list.getAttribute('data-checklist-id');
        
        // Ищем элементы только ВНУТРИ текущего чеклиста
        const checkboxes = list.querySelectorAll('.real-checkbox');
        const progressBar = list.querySelector('.progress-bar');
        const progressText = list.querySelector('.progress-text');
        const progressCounter = list.querySelector('.progress-counter');

        // Функция обновления прогресса именно для этого чеклиста
        function updateProgress() {
            const total = checkboxes.length;
            const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
            const percent = total > 0 ? Math.round((checkedCount / total) * 100) : 0;

            if (progressBar) progressBar.style.width = `${percent}%`;
            if (progressText) progressText.textContent = `${percent}%`;
            if (progressCounter) progressCounter.textContent = `Выполнено: ${checkedCount}/${total}`;
        }

        // 1. Восстанавливаем состояние чекбоксов из LocalStorage
        checkboxes.forEach((checkbox, index) => {
            // Ключ теперь уникален и для списка, и для строки (например, "list-1_checkbox_0")
            const savedState = localStorage.getItem(`${listId}_checkbox_${index}`);
            if (savedState === 'true') {
                checkbox.checked = true;
            }
        });

        // Инициализируем прогресс для текущего списка
        updateProgress();

        // 2. Слушаем изменения (клики)
        checkboxes.forEach((checkbox, index) => {
            checkbox.addEventListener('change', () => {
                localStorage.setItem(`${listId}_checkbox_${index}`, checkbox.checked);
                updateProgress();
            });
        });
    });
});