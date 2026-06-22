document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.querySelector('.quiz-container');
    const cards = document.querySelectorAll('.quiz-card');
    const resultCard = document.getElementById('quizResult');
    const resultImage = document.getElementById('resultImage');
    const resultScore = document.getElementById('resultScore');
    const resultStatus = document.getElementById('resultStatus');
    const reviewBtn = document.getElementById('reviewBtn');
    
    let currentStep = 0;

    // Находим кнопки "Следующий вопрос" и "Завершить"
    const nextButtons = document.querySelectorAll('.quiz-container .quiz-link:not(#restartBtn):not(#reviewBtn)');

    nextButtons.forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault(); // Отменяем переход по ссылке #

            const currentCard = cards[currentStep];
            const selectedRadio = currentCard.querySelector('.real-radio:checked');

            // Проверка на выбор ответа
            if (!selectedRadio) {
                // Мягкая вспышка рамки карточки в красный цвет, если ответ не выбран
                currentCard.style.borderColor = '#ED5762';
                setTimeout(() => {
                    currentCard.style.borderColor = '#6C55F7'; 
                }, 500);
                return; 
            }

            // Скрываем текущий вопрос
            currentCard.classList.remove('active');
            currentStep++;

            if (currentStep < cards.length) {
                // Показываем следующий
                cards[currentStep].classList.add('active');
            } else {
                // Если прошли все 10 — выводим плагин результатов
                showQuizResults();
            }
        });
    });

    function showQuizResults() {
        let totalScore = 0;

        // Вычисляем сумму правильных ответов
        cards.forEach(card => {
            const checked = card.querySelector('.real-radio:checked');
            if (checked && checked.value === "1") {
                totalScore++;
            }
        });

        // Задаем текстовый счетчик
        resultScore.textContent = `${totalScore}/10`;

        // Настройка плагина в зависимости от условий ТЗ
        if (totalScore <= 4) {
            resultCard.style.borderColor = '#ED5762';
            resultStatus.style.color = '#ED5762';
            resultImage.src = 'IMG/result-1.png'; // путь к картинке result-1
            resultStatus.textContent = 'низкий уровень безопасности';
        } else if (totalScore <= 7) {
            resultCard.style.borderColor = '#ED8F16';
            resultStatus.style.color = '#ED8F16'; 
            resultImage.src = 'IMG/result-2.png'; // путь к картинке result-2
            resultStatus.textContent = 'средний уровень безопасности';
        } else {
            resultCard.style.borderColor = '#50C23D';
            resultStatus.style.color = '#50C23D'; 
            resultImage.src = 'IMG/result-3.png'; // путь к картинке result-3
            resultStatus.textContent = 'высокий уровень безопасности';
        }

        // Показываем плагин результатов
        resultCard.style.display = 'flex';
    }

    // ЛОГИКА ДЛЯ КНОПКИ "ПОСМОТРЕТЬ ОТВЕТЫ"
    reviewBtn.addEventListener('click', (event) => {
        event.preventDefault();

        // Включаем CSS-режим просмотра ответов
        quizContainer.classList.add('review-mode');

        // Перемещаем карточку результатов на самый верх (над вопросами), чтобы пользователь её видел
        quizContainer.prepend(resultCard);

        // Прокручиваем страницу к началу теста, чтобы просмотр начинался сверху
        resultCard.scrollIntoView({ behavior: 'smooth' });
        
        // Скрываем саму кнопку просмотра, оставляя только "Пройти заново"
        reviewBtn.style.display = 'none';
    });
});