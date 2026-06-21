document.addEventListener('DOMContentLoaded', () => {
    // Находим все чекбоксы на странице
    const checkboxes = document.querySelectorAll('.real-checkbox');

    // 1. Восстанавливаем состояние чекбоксов из LocalStorage при загрузке страницы
    checkboxes.forEach((checkbox, index) => {
        // Ключ для каждого чекбокса будет уникальным на основе его индекса (например, "checkbox_0")
        const savedState = localStorage.getItem(`checkbox_${index}`);
        
        // Если в хранилище записано 'true', отмечаем чекбокс
        if (savedState === 'true') {
            checkbox.checked = true;
        }
    });

    // 2. Слушаем изменения (клики) на чекбоксах и сохраняем их состояние
    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', () => {
            // Сохраняем true или false в зависимости от того, зажат чекбокс или нет
            localStorage.setItem(`checkbox_${index}`, checkbox.checked);
        });
    });
});