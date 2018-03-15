import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import nb from './nb-NO/translation.json';
import en from './en/translation.json';

i18n.use(reactI18nextModule).init({
  fallbackLng: 'nb',
  resources: {
    nb,
    en
    // add language here
  },
  ns: ['shared'],
  defaultNS: 'shared',
  debug: true,

  // cache: {
  //   enabled: true
  // },

  interpolation: {
    escapeValue: false // not needed for react as it does escape per default to prevent xss!
  }
});

export default i18n;
