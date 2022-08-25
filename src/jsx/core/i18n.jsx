import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "copyright": "Ⓒ BY World, 2021. All rights reserved",
            "details": "More details",

        }
    },
    ru: {
        translation: {
            "copyright": "Ⓒ BY World, 2021. Все права защищены",
            "parus": "Международный музыкальный фестиваль",
            "gastro": "Приглашаем Вас расширить горизонты вкуса в ресторане",
            "details": "Подробнее",
            
        }
    }
};


i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "ru",

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });


export default i18n;