// Функция для включения звука
function playSound(id) {
    const audio = document.getElementById(id);
    
    if (!audio) {
        console.error(`❌ Ошибка: Тег <audio> с id="${id}" не найден в HTML!`);
        return;
    }
    
    // Сбрасываем дорожку на начало, чтобы можно было кликать часто
    audio.currentTime = 0; 
    
    // Включаем звук
    audio.play().catch(error => {
        console.warn(`⚠️ Браузер заблокировал автозапуск для ${id}:`, error.message);
    });
}

// Функция для полной остановки всех звуков сразу
function stopAllSounds() {
    const allAudios = document.querySelectorAll('audio');
    
    allAudios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
}

// === ЛОГИКА ДЛЯ ПОИСКОВИКА ЗВУКОВ ===
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('soundSearch');
    const btnWrappers = document.querySelectorAll('.btn-wrapper');
    const noResultsMessage = document.getElementById('noResults');

    // Проверяем, существует ли строка поиска на странице
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            // Переводим запрос в нижний регистр и убираем лишние пробелы по краям
            const query = this.value.toLowerCase().trim();
            let hasMatches = false;

            btnWrappers.forEach(wrapper => {
                // Извлекаем теги из data-tags и название кнопки
                const tags = wrapper.getAttribute('data-tags') ? wrapper.getAttribute('data-tags').toLowerCase() : '';
                const titleElement = wrapper.querySelector('.btn-title');
                const title = titleElement ? titleElement.textContent.toLowerCase() : '';

                // Если поисковый запрос есть в тегах или в названии кнопки
                if (tags.includes(query) || title.includes(query)) {
                    wrapper.style.display = ''; // Показываем кнопку
                    hasMatches = true;
                } else {
                    wrapper.style.display = 'none'; // Скрываем кнопку
                }
            });

            // Если совпадений нет и запрос не пустой — показываем сообщение об ошибке
            if (hasMatches || query === '') {
                if (noResultsMessage) noResultsMessage.style.display = 'none';
            } else {
                if (noResultsMessage) noResultsMessage.style.display = 'block';
            }
        });
    }
});