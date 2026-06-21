function resizePage() {
    const baseWidth = 1536; // Исходная ширина вашего макета
    const currentWidth = window.innerWidth;
    const wrapper = document.getElementById('page-wrapper');
    
    if (!wrapper) return;

    // Считаем коэффициент масштабирования
    const scale = currentWidth / baseWidth;
    
    // Применяем масштабирование к обертке
    wrapper.style.transform = `scale(${scale})`;
    
    // Корректируем размеры body, чтобы не появлялись пустые области
    document.body.style.width = currentWidth + 'px';
    document.body.style.height = (window.innerHeight / scale) + 'px';
}

// Вызываем при загрузке страницы и любом изменении размеров окна
window.addEventListener('resize', resizePage);
window.addEventListener('DOMContentLoaded', resizePage);