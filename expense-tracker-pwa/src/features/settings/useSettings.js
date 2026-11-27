import { createContext, useContext } from 'react';

/**
 * @typedef {import('./settingsStorage').AppSettings} AppSettings
 * @typedef {{
 *   settings: AppSettings,
 *   setNotificationsEnabled: (enabled: boolean) => void,
 *   setDarkModeEnabled: (enabled: boolean) => void,
 * }} SettingsContextValue
 */

export const SettingsContext = createContext(/** @type {SettingsContextValue | null} */ (null));

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings debe usarse dentro de SettingsProvider');
  }
  return context;
}
