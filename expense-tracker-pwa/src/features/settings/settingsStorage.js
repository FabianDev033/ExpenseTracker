import { readStorageJSON, writeStorageJSON } from '../../storage/localStorage';
import { STORAGE_KEYS } from '../../storage/storageKeys';

/** @typedef {{ notificationsEnabled: boolean, darkModeEnabled: boolean }} AppSettings */

/** @type {Readonly<AppSettings>} */
export const DEFAULT_SETTINGS = Object.freeze({
  notificationsEnabled: false,
  darkModeEnabled: false,
});

/**
 * Lee los ajustes persistidos en localStorage.
 * Si no hay datos, el JSON está dañado o alguna propiedad es inválida, aplica los valores por defecto.
 *
 * @returns {AppSettings}
 */
export function readSettings() {
  const parsed = readStorageJSON(STORAGE_KEYS.settings, /** @type {unknown} */ (null));
  if (!parsed || typeof parsed !== 'object') {
    return { ...DEFAULT_SETTINGS };
  }

  const candidate = /** @type {Record<string, unknown>} */ (parsed);
  return {
    notificationsEnabled:
      typeof candidate.notificationsEnabled === 'boolean'
        ? candidate.notificationsEnabled
        : DEFAULT_SETTINGS.notificationsEnabled,
    darkModeEnabled:
      typeof candidate.darkModeEnabled === 'boolean'
        ? candidate.darkModeEnabled
        : DEFAULT_SETTINGS.darkModeEnabled,
  };
}

/**
 * Guarda los ajustes en localStorage.
 *
 * @param {AppSettings} settings
 * @returns {boolean}
 */
export function saveSettings(settings) {
  return writeStorageJSON(STORAGE_KEYS.settings, settings);
}
