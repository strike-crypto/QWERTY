// ==========================================
// УПРАВЛЕНИЕ ЗВУКАМИ
// ==========================================

let currentAudio = null;

// Функция для включения звука
function playSound(id) {
    const audio = document.getElementById(id);

    if (!audio) {
        console.error(`❌ Ошибка: Тег <audio> с id="${id}" не найден в HTML!`);
        return;
    }

    // Если нажали на тот же звук, который сейчас играет —
    // останавливаем его
    if (currentAudio === audio && !audio.paused) {
        audio.pause();
        audio.currentTime = 0;
        currentAudio = null;
        return;
    }

    // Если другой звук уже играет — останавливаем его
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    // Запускаем выбранный звук с начала
    audio.currentTime = 0;

    audio.play().then(() => {
        currentAudio = audio;
    }).catch(error => {
        console.warn(
            `⚠️ Браузер заблокировал автозапуск для ${id}:`,
            error.message
        );
    });

    // Когда звук закончился сам
    audio.onended = function () {
        if (currentAudio === audio) {
            currentAudio = null;
        }
    };
}


// ==========================================
// ПОЛНАЯ ОСТАНОВКА ВСЕХ ЗВУКОВ
// ==========================================

function stopAllSounds() {
    const allAudios = document.querySelectorAll('audio');

    allAudios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });

    currentAudio = null;
}


// ==========================================
// ЛОГИКА ДЛЯ ПОИСКОВИКА ЗВУКОВ
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('soundSearch');
    const btnWrappers = document.querySelectorAll('.btn-wrapper');
    const noResultsMessage = document.getElementById('noResults');

    // Проверяем, существует ли строка поиска на странице
    if (searchInput) {
        searchInput.addEventListener('input', function() {

            // Переводим запрос в нижний регистр
            // и убираем лишние пробелы
            const query = this.value.toLowerCase().trim();

            let hasMatches = false;

            btnWrappers.forEach(wrapper => {

                // Получаем теги
                const tags = wrapper.getAttribute('data-tags')
                    ? wrapper.getAttribute('data-tags').toLowerCase()
                    : '';

                // Получаем название кнопки
                const titleElement = wrapper.querySelector('.btn-title');

                const title = titleElement
                    ? titleElement.textContent.toLowerCase()
                    : '';

                // Проверяем совпадение
                if (
                    tags.includes(query) ||
                    title.includes(query)
                ) {
                    wrapper.style.display = '';
                    hasMatches = true;
                } else {
                    wrapper.style.display = 'none';
                }
            });

            // Сообщение "Звук не найден"
            if (hasMatches || query === '') {
                if (noResultsMessage) {
                    noResultsMessage.style.display = 'none';
                }
            } else {
                if (noResultsMessage) {
                    noResultsMessage.style.display = 'block';
                }
            }
        });
    }
});
