import en from './languages/en';
import de from './languages/en';

// Автоматично взима структурата от en (който е основен)
type Translation = typeof en;

// Обект с всички езици
const translations = {
  en,
  de,
};

// Тип за поддържаните езици
type Language = keyof typeof translations;

// Текущ език
let currentLang: Language = 'en'; // по подразбиране

/**
 * Променя текущия език
 */
export const setLanguage = (lang: Language) => {
  currentLang = lang;
};

/**
 * Функция за получаване на превода
 */
export const t = new Proxy({} as Translation, {
  get(_, key: keyof Translation) {
    return translations[currentLang][key];
  },
});