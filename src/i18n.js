import i18n from "i18next";
import translation_es from './translations/es';
import translation_en from './translations/en';


i18n.init({
    // we init with resources
    lang: 'es',
    resources: {
        es: {
            translations: translation_es
        },
        en: {
            translations: translation_en
        }
    },
    fallbackLng: "es",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: ".", // we use content as keys

    interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ","
    },

    react: {
        wait: true
    }
});

export default i18n;
