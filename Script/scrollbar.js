document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar");
  if (!sidebar) return;

  // 1. Восстанавливаем позицию при загрузке страницы
  const savedScrollTop = localStorage.getItem("sidebar-scroll");
  if (savedScrollTop !== null) {
    sidebar.scrollTop = parseInt(savedScrollTop, 10);
  }

  // 2. Сохраняем позицию при клике на ссылки внутри панели
  sidebar.addEventListener("click", (e) => {
    if (e.target.closest("a")) { 
      localStorage.setItem("sidebar-scroll", sidebar.scrollTop);
    }
  });
});