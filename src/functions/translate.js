import ua from './locale/ua.js';
import ru from './locale/ru.js';
import en from './locale/en.js';

// Функция для определения языка на основе хеша и localStorage
export const langDetect = () => {
    let lang = localStorage.getItem('lang');

    // Если язык не найден в localStorage, но есть хеш в URL, используем его
    if (!lang && location.hash) {
        lang = location.hash.replace('#', '');  // Убираем символ '#'
        localStorage.setItem('lang', lang);
    }

    // Если язык не найден, устанавливаем дефолтный 'ua'
    if (!lang) {
        lang = 'ua';
        location.hash = lang; // Устанавливаем хеш в URL
    } else {
        location.hash = lang; // Устанавливаем хеш, если он был в localStorage
    }

    // Добавляем обработчик изменения хеша
    window.addEventListener("hashchange", () => {
        lang = location.hash.replace('#', ''); // Убираем символ '#'
        localStorage.setItem('lang', lang); // Сохраняем в localStorage
        loadTranslation(lang); // Загружаем перевод
    });

    return lang;
};

// Функция для загрузки переводов
export const loadTranslation = (lang) => {
    let translations;

    switch(lang) {
        case 'ru':
            translations = ru;
            break;
        case 'en':
            translations = en;
            break;
        case 'ua':
        default:
            translations = ua; // Дефолтный язык (ua)
    }

    updatePageContent(translations);
};

// Функция для обновления контента на странице
const updatePageContent = (translations) => {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[key]) {
            element.innerHTML = translations[key]; // Изменяем текст
        }
    });
};

// Главная функция, которая инициализирует все
export const translate = () => {
    const lang = langDetect();
    loadTranslation(lang);
};
