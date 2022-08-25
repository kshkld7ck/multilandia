const getTranslation = (code, capitalize = true) => {
    if (translations[code]) {
        return capitalize ? translations[code].capitalize() : translations[code]
    }

    return `[${code}]`;
};

export default getTranslation