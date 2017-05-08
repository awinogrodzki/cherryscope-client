import i18n from 'i18n-js';
import translations from 'translations';

i18n.locale = 'en';
i18n.defaultLocale = 'en';
i18n.translations = translations;

export function t(key) {
  return i18n.t(key);
}
