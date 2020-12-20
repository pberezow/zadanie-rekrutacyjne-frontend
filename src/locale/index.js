import Locale from 'i18n-js'

import PL from './strings/pl'
import EN from './strings/en'

const DefaultLocale = 'pl'

Locale.defaultLocale = DefaultLocale
Locale.locale = DefaultLocale
Locale.translations = {
  pl: PL,
  en: EN
}

export default Locale