export class Localizer {
  constructor() {
    this.localeMaps = {};
    this.selectedLocale = null;
    this.fallbackLocale = null;
  }

  /**
   * Adds the given locale json to the class or replaces the existing one, if already set.
   * If `useLocale` has not been called to set the user-selected locale, the first locale set
   * using this function will be set as the default.
   *
   * If `useFallbackLocale` has not been called to set the user-selected fallback locale,
   * the first locale set using this function will be set as the default.
   * @param {string} localName e.g. 'EN'
   * @param {object} localJs e.g. { HELLO_WORLD: (value) => `hello world, this is a ${value }` }
   */
  setLocale(localName, localJs) {
    this.localeMaps[localName] = localJs;
    if (!this.selectedLocale) {
      this.selectedLocale = localName;
    }
    if (!this.fallbackLocale) {
      this.fallbackLocale = localName;
    }
    this._backfillLocaleWithFallbackValues(localName);
  }

  /**
   * Alters the original localeMap of the given localName so that if the fallback locale
   * has any key/value pairs that don't exist in the given localeMap, they will be added
   * with the fallback locale language.
   *
   * For example, if the given localeMap had: `{ greeting: "szia", red: "viros" }` and the
   * fallback localeMap had: `{ greeting: "hello", signout: "Log Out" }`, then the given
   * localeMap will be altered so that it has: `{ greeting: "szia", red: "viros", signout: "Log Out" }`.
   *
   * Also, if the given localeMap has a value type different from the fallback localeMap's of the same
   * key, the fallback localeMap's value will replace it.
   *
   * @param {string} localName e.g. 'EN'
   */
  _backfillLocaleWithFallbackValues(localName) {
    if (this.fallbackLocale === localName) {
      return;
    }
    this.localeMaps[localName] = Localizer._backfill(
      this.localeMaps[localName],
      this.localeMaps[this.fallbackLocale],
    );
  }

  static _backfill(currentLocaleMapLevel, fallbackLocaleMapLevel) {
    const modifiedLocaleMap = Localizer._deepCopy(currentLocaleMapLevel);
    Object.keys(fallbackLocaleMapLevel).forEach(key => {
      if (
        !modifiedLocaleMap[key] ||
        typeof modifiedLocaleMap[key] !== typeof fallbackLocaleMapLevel[key]
      ) {
        modifiedLocaleMap[key] = Localizer._deepCopy(fallbackLocaleMapLevel[key]);
      }
      if (fallbackLocaleMapLevel[key] !== null && typeof fallbackLocaleMapLevel[key] === 'object') {
        modifiedLocaleMap[key] = Localizer._backfill(
          modifiedLocaleMap[key],
          fallbackLocaleMapLevel[key],
        );
      }
    });
    return modifiedLocaleMap;
  }

  static _deepCopy(arg) {
    return JSON.parse(JSON.stringify(arg));
  }

  /**
   * Sets the user-selected locale.
   * @param {string} localName e.g. 'EN'
   */
  useLocale(localName) {
    this.selectedLocale = localName;
  }

  /**
   * Returns the user-selected locale
   */
  get localeMap() {
    return this.localeMaps[this.selectedLocale];
  }

  /**
   * Sets the user-selected fallback locale.
   *
   * If the user-selected preferred locale does not exist, perhaps the translation is
   * not finished yet, this fallback locale will be set on the localeMap instead.
   * The fallback locale should almost always be English.
   *
   * @param {string} localName e.g. 'EN'
   */
  useFallbackLocale(localName) {
    this.fallbackLocale = localName;
  }

  /**
   * Returns the user-selected fallback locale
   */
  get fallbackLocaleMap() {
    return this.localeMaps[this.fallbackLocale];
  }
}

export default new Localizer();